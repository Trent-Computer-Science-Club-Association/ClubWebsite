import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from '../styles/components/ContactForm.module.scss';

interface TextInputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  long?: boolean;
  mandatory?: boolean;
}

interface DropdownInputProps {
  label: string;
  options: { value: string; label: string }[];
  value: { value: string; label: string } | null;
  mandatory?: boolean;
}

interface GroupProps {
  inputs: (TextInputProps | DropdownInputProps)[];
}

type FormItem = TextInputProps | DropdownInputProps | GroupProps;

type SubmissionState = { success: true } | { success: false; message: string };

interface ContactFormProps {
  title: string;
  description: string;
  formItems: FormItem[];
  onSubmit: (formData: Record<string, string>) => Promise<void | Response>;
  formData: Record<string, string>;
  onInputChange: (label: string, value: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  title,
  description,
  formItems,
  onSubmit,
  formData,
  onInputChange,
}) => {
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [submissionState, setSubmissionState] =
    useState<SubmissionState | null>(null);

  useEffect(() => {
    validateForm();
  }, [formData, touchedFields]);

  const handleBlur = (label: string) => {
    setTouchedFields((prevTouched) => ({ ...prevTouched, [label]: true }));
  };

  const validateEmail = (email: string): boolean => {
    // This regex comes from https://stackoverflow.com/a/46181
    // see throrough evaluation of the regex here: https://jsfiddle.net/ghvj4gy9/
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    const validateItems = (items: any[]) => {
      items.forEach((item) => {
        if ('inputs' in item) {
          validateItems(item.inputs);
        } else {
          const value = formData[item.label] || '';
          const isTouched = touchedFields[item.label] || false;
          if (
            isTouched &&
            (value.trim() === '' ||
              (item.type === 'email' && !validateEmail(value)))
          ) {
            isValid = false;
          }
        }
      });
    };

    validateItems(formItems);
    setCanSubmit(isValid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    const validateItems = (items: any[]) => {
      items.forEach((item) => {
        if ('inputs' in item) {
          validateItems(item.inputs);
        } else {
          allTouched[item.label] = true;
        }
      });
    };
    validateItems(formItems);
    setTouchedFields(allTouched);

    // Re-validate the form
    validateForm();

    if (canSubmit) {
      await onSubmit(formData).catch((error: any) => {
        setSubmissionState({ success: false, message: error.message });
      });
      if (submissionState) {
        // Reset form after successful submission
        setTouchedFields({});
      }
    }
  };

  const renderFormItem = (item: any, index: number) => {
    if ('inputs' in item) {
      return (
        <div key={`group-${index}`} className={styles.group}>
          {item.inputs.map((input: any, inputIndex: number) => (
            <div
              key={`group-item-${index}-${inputIndex}`}
              className={styles.groupItem}
            >
              {renderFormItem(input, inputIndex)}
            </div>
          ))}
        </div>
      );
    }

    const value = formData[item.label] || '';
    const isTouched = touchedFields[item.label] || false;
    const isInvalid =
      isTouched &&
      (value.trim() === '' || (item.type === 'email' && !validateEmail(value)));

    if (item.type === 'dropdown') {
      const selectedOption = item.options.find(
        (option: { value: string; label: string }) => option.value === value
      );
      return (
        <div
          key={`field-${index}`}
          className={`${styles.formField} ${isInvalid ? styles.invalidField : ''}`}
        >
          <label
            htmlFor={item.label}
            className={isInvalid ? styles.invalidLabel : ''}
          >
            {item.label}
            {item.mandatory && <span className={styles.mandatory}>*</span>}
          </label>
          <Select
            id={item.label}
            value={selectedOption}
            onChange={(option) =>
              onInputChange(item.label, option ? option.value : '')
            }
            onBlur={() => handleBlur(item.label)}
            options={item.options}
            placeholder={item.placeholder}
            className={`${styles.reactSelect} ${isInvalid ? styles.invalidSelect : ''}`}
            classNamePrefix='react-select'
          />
          {isInvalid && (
            <span className={styles.errorText}>This field is required</span>
          )}
        </div>
      );
    }

    return (
      <div
        key={`field-${index}`}
        className={`${styles.formField} ${isInvalid ? styles.invalidField : ''}`}
      >
        <label
          htmlFor={item.label}
          className={isInvalid ? styles.invalidLabel : ''}
        >
          {item.label}
          {item.mandatory && <span className={styles.mandatory}>*</span>}
        </label>
        {item.long ? (
          <textarea
            id={item.label}
            value={value}
            onChange={(e) => onInputChange(item.label, e.target.value)}
            onBlur={() => handleBlur(item.label)}
            placeholder={item.placeholder}
            className={isInvalid ? styles.invalidInput : ''}
            maxLength={5000}
          />
        ) : (
          <input
            type={item.type}
            id={item.label}
            value={value}
            onChange={(e) => onInputChange(item.label, e.target.value)}
            onBlur={() => handleBlur(item.label)}
            placeholder={item.placeholder}
            className={isInvalid ? styles.invalidInput : ''}
          />
        )}
        {isInvalid && (
          <span className={styles.errorText}>
            {item.type === 'email'
              ? 'Please enter a valid email address'
              : 'This field is required'}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={styles.contactForm}>
      <h2>{title}</h2>
      <p>{description}</p>
      <form onSubmit={handleSubmit}>
        {formItems.map((item, index) => renderFormItem(item, index))}
        <button type='submit'>Submit</button>
      </form>
      {submissionState && submissionState.success && (
        <p className={styles.successMessage}>
          Form submitted successfully! We'll get back to you soon.
        </p>
      )}
      {submissionState && !submissionState.success && (
        <p className={styles.errorMessage}>
          There was an error submitting the form. Please email
          tcscadev@gmail.com or try again later.
        </p>
      )}
    </div>
  );
};

function TextInput(
  label: string,
  placeholder: string,
  value: string = '',
  long: boolean = false,
  mandatory: boolean = true,
  onChange?: (value: string) => void
) {
  return { label, type: 'text', placeholder, value, long, mandatory, onChange };
}

const EmailInput = (
  label: string,
  placeholder: string,
  value: string = '',
  mandatory: boolean = true
) => {
  return { label, type: 'email', placeholder, value, mandatory };
};

const DropdownInput = (
  label: string,
  placeholder: string,
  options: { value: string; label: string }[],
  value: string = '',
  mandatory: boolean = true
) => {
  return { label, type: 'dropdown', placeholder, options, value, mandatory };
};

const Group = (...inputs: (TextInputProps | DropdownInputProps)[]) => {
  return { inputs };
};

export default ContactForm;
export { TextInput, EmailInput, DropdownInput, Group };
