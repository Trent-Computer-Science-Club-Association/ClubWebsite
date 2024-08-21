import React, { useState, useEffect } from 'react';
import styles from '../styles/components/ContactForm.module.scss';
import { FormField, Group, InputProps } from '../components/FormComponents';

export type FormItem = InputProps | { inputs: InputProps[] };

interface ContactFormProps {
  title: string;
  description: string;
  formItems: FormItem[];
  onSubmit: (formData: Record<string, string>) => Promise<void>;
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
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    validateForm();
  }, [formData, touchedFields]);

  const handleBlur = (label: string) => {
    setTouchedFields((prevTouched) => ({ ...prevTouched, [label]: true }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    const validateItems = (items: FormItem[]) => {
      items.forEach((item) => {
        if ('inputs' in item) {
          validateItems(item.inputs);
        } else {
          const value = formData[item.label] || '';
          const isTouched = touchedFields[item.label] || false;
          if (
            isTouched &&
            ((item.mandatory && value.trim() === '') ||
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
    const touchAllFields = (items: FormItem[]) => {
      items.forEach((item) => {
        if ('inputs' in item) {
          touchAllFields(item.inputs);
        } else {
          allTouched[item.label] = true;
        }
      });
    };
    touchAllFields(formItems);
    setTouchedFields(allTouched);

    // Re-validate the form
    validateForm();

    if (canSubmit) {
      try {
        await onSubmit(formData);
        setSubmissionStatus('success');
        // Reset form after successful submission
        setTouchedFields({});
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmissionStatus('error');
      }
    }
  };

  const renderFormItem = (item: FormItem, index: number) => {
    if ('inputs' in item) {
      return <Group key={`group-${index}`} inputs={item.inputs} />;
    }

    const value = formData[item.label] || '';
    const isTouched = touchedFields[item.label] || false;
    const isInvalid =
      isTouched &&
      ((item.mandatory && value.trim() === '') ||
        (item.type === 'email' && !validateEmail(value)));

    return (
      <FormField
        key={`field-${index}`}
        {...item}
        value={value}
        onChange={(value: string) => onInputChange(item.label, value)}
        onBlur={() => handleBlur(item.label)}
        isInvalid={isInvalid}
      />
    );
  };

  return (
    <div className={styles.contactForm}>
      <h2>{title}</h2>
      <p>{description}</p>
      <form onSubmit={handleSubmit}>
        {formItems.map((item, index) => renderFormItem(item, index))}
        <button type='submit' disabled={!canSubmit}>
          Submit
        </button>
      </form>
      {submissionStatus === 'success' && (
        <p className={styles.successMessage}>
          Form submitted successfully! We'll get back to you soon.
        </p>
      )}
      {submissionStatus === 'error' && (
        <p className={styles.errorMessage}>
          There was an error submitting the form. Please email
          tcscadev@gmail.com or try again later.
        </p>
      )}
    </div>
  );
};

export default ContactForm;
