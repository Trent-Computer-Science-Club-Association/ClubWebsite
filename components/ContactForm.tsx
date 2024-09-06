import React, { type Dispatch, useState } from 'react';
import Select from 'react-select';
import styles from '../styles/components/ContactForm.module.scss';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Types
enum InputType {
  TextInput,
  LongTextInput,
  DropDownInput,
  Group,
}
export enum Constraint {
  Email,
}
interface Input {
  label: string;
  isValid: boolean;
  placeholder: string;
  mandatory: boolean;
}
interface TextInput extends Input {
  type: InputType.TextInput;
  constraints: Constraint[];
  value: string;
  long: boolean;
}
type DropDownItem = { value: string; label: string };
interface DropDownInput extends Input {
  type: InputType.DropDownInput;
  options: DropDownItem[];
  value: string | undefined;
}
type GroupItem = TextInput | DropDownInput;
interface Group {
  type: InputType.Group;
  label: string;
  inputs: GroupItem[];
}
export type FormItem = TextInput | DropDownInput | Group;
// Sub Components
export const TextInput = (
  label: string,
  constraints: Constraint[],
  placeholder: string,
  value?: string,
  long?: boolean,
  mandatory?: boolean
): TextInput => {
  return {
    type: InputType.TextInput,
    label,
    isValid: true,
    constraints,
    placeholder,
    value: value ?? '',
    long: long ?? false,
    mandatory: mandatory ?? false,
  };
};
export const DropdownInput = (
  label: string,
  placeholder: string,
  options: DropDownItem[],
  value?: string,
  mandatory?: boolean
): DropDownInput => {
  if (value != null && !options.some(({ label }) => label == value))
    throw new Error('UIError: Invalid DropDown Value');
  return {
    type: InputType.DropDownInput,
    label,
    isValid: true,
    placeholder: placeholder,
    options,
    value,
    mandatory: mandatory ?? false,
  };
};
export const Group = (label: string, ...inputs: GroupItem[]): Group => {
  return {
    type: InputType.Group,
    label,
    inputs,
  };
};
// Helpers
type Propagate = (changeItem: FormItem) => void;
export const updateItem = (
  formContent: FormItem[],
  label: string,
  formItem: GroupItem
) => {
  return formContent.map((item) => {
    if (item.type === InputType.Group) {
      item.inputs = item.inputs.map((item) => {
        if (item.label === label) return formItem;
        return item;
      });
    } else if (item.label === label) return formItem;
    return item;
  });
};
const isEmailItem = (formItem: FormItem) =>
  formItem.type === InputType.TextInput &&
  formItem.constraints.includes(Constraint.Email);
const validateItem = (formItem: GroupItem) => {
  switch (formItem.type) {
    case InputType.TextInput:
      if (formItem.mandatory) {
        if (formItem.value === '') return false;
        if (isEmailItem(formItem) && !emailRegex.test(formItem.value))
          return false;
      }
      return true;
    case InputType.DropDownInput:
      return (
        formItem.mandatory &&
        formItem.value !== '' &&
        formItem.options.some(({ value }) => value == formItem.value)
      );
    default:
      throw new Error('Impossible: Unhandled type in validateItem');
  }
};
const validateForm = (
  formItem: FormItem[]
): { formContent: FormItem[]; valid: boolean } => {
  let isValid = true;
  const newFormContent = formItem.map((item) => {
    switch (item.type) {
      case InputType.Group: {
        const { formContent: groupContent, valid } = validateForm(item.inputs);
        isValid = isValid && valid;
        // This ignores ts a little but it is safe, typescript just is not strong enough to handle this and splitting it out sucks
        item.inputs = groupContent as GroupItem[];
        return item;
      }
      default: {
        const valid = validateItem(item);
        isValid = isValid && valid;
        item.isValid = valid;
        return item;
      }
    }
  });
  return { formContent: newFormContent, valid: isValid };
};
const renderItem = (formItem: GroupItem, propagate: Propagate) => {
  switch (formItem.type) {
    case InputType.TextInput:
      if (formItem.long) {
        return (
          <textarea
            id={formItem.label}
            value={formItem.value}
            onChange={(e) => {
              formItem.value = e.target.value;
              formItem.isValid = validateItem(formItem);
              propagate(formItem);
            }}
            onBlur={() => {
              formItem.isValid = validateItem(formItem);
              propagate(formItem);
            }}
            placeholder={formItem.placeholder}
            maxLength={5000}
          />
        );
      } else {
        return (
          <>
            <input
              type={
                formItem.constraints.includes(Constraint.Email)
                  ? 'email'
                  : 'text'
              }
              id={formItem.label}
              value={formItem.value}
              onChange={(e) => {
                formItem.value = e.target.value;
                propagate(formItem);
              }}
              onBlur={() => {
                formItem.isValid = validateItem(formItem);
                propagate(formItem);
              }}
              placeholder={formItem.placeholder}
            />
            <p className={styles.errorText}>
              {isEmailItem(formItem)
                ? 'Please enter a valid email address'
                : 'This field is required'}
            </p>
          </>
        );
      }
    case InputType.DropDownInput: {
      const selectedOption = formItem.options.find(
        ({ value }) => value === formItem.value
      );
      return (
        <>
          <Select
            id={formItem.label}
            value={selectedOption}
            onChange={(option) => {
              formItem.value = option ? option.value : '';
              propagate(formItem);
            }}
            onBlur={() => {
              formItem.isValid = validateItem(formItem);
              propagate(formItem);
            }}
            options={formItem.options}
            placeholder={formItem.placeholder}
            className={`reactSelect ${styles.select}`}
            classNamePrefix='react-select'
          />
          <p>This field is required</p>
        </>
      );
    }
  }
};
const renderForm = (formItem: FormItem, propagate: Propagate, key: number) => {
  switch (formItem.type) {
    case InputType.TextInput:
    case InputType.DropDownInput:
      return (
        <span
          className={`${styles.formField} ${formItem.isValid ? '' : styles.invalidField}`}
          key={key}
        >
          <label
            htmlFor={formItem.label}
            className={formItem.mandatory ? styles.mandatory : ''}
          >
            {formItem.label}
          </label>
          {renderItem(formItem, propagate)}
        </span>
      );
    case InputType.Group: {
      const propagateRouter = (changeItem: GroupItem) => {
        formItem.inputs = formItem.inputs.map((item) => {
          if (item.label === changeItem.label) return changeItem;
          return item;
        });
        propagate(formItem);
      };
      return (
        <div className={styles.group} key={key}>
          {formItem.inputs.map((item, i) =>
            renderForm(item, propagateRouter as Propagate, i)
          )}
        </div>
      );
    }
    default:
      throw new Error('Impossible: Unhandled form item renderForm');
  }
};
// Components
type SubmissionState = { state: boolean; message: string } | undefined;
const getSubmissionMessage = (submissionState: SubmissionState) => {
  if (submissionState == undefined) return <></>;
  switch (submissionState.state) {
    case true:
      return (
        <p className={styles.successMessage}>
          Form submitted successfully! We'll get back to you soon.
        </p>
      );
    case false:
      return (
        <p className={styles.errorMessage}>
          {submissionState.message ||
            'There was an error submitting the form. Please email tcscadev@gmail.com or try again later.'}
        </p>
      );
  }
};
interface ContactFormProps {
  title: string;
  description: string;
  formContent: FormItem[]; // This is going to be a reference
  setFormContent: Dispatch<FormItem[]>;
  clearForm: () => void;
  onSubmit: (formData: Record<string, string>) => Promise<void | Response>;
}
const ContactForm = ({
  title,
  description,
  formContent,
  setFormContent,
  clearForm,
  onSubmit,
}: ContactFormProps) => {
  const [submissionState, setSubmissionState] = useState<
    { state: boolean; message: string } | undefined
  >();
  // Render Form
  const onPropagate = (formItem: FormItem) => {
    setFormContent(
      formContent.map((item) => {
        if (item.label === formItem.label) return formItem;
        return item;
      })
    );
  };
  const renderedContent = formContent.map((formItem, i) =>
    renderForm(formItem, onPropagate, i)
  );
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { formContent: newFormContent, valid } = validateForm(formContent);
    setFormContent(newFormContent);
    console.log(valid);
    if (!valid) return;
    // Serailize Form
    const formData: { [key: string]: string } = {};
    formContent.map((item) => {
      if (item.type === InputType.Group) {
        item.inputs.map((subItem) => {
          formData[subItem.label] = subItem.value ?? '';
        });
      } else {
        formData[item.label] = item.value ?? '';
      }
    });
    // Handle Submissions
    try {
      const response = await onSubmit(formData);
      if (response instanceof Response && response.status === 200) {
        setSubmissionState({ state: true, message: '' });
        // Reset form after successful submission
        clearForm();
      } else {
        setSubmissionState({
          state: false,
          message:
            'There was an error submitting the form. Please try again later.',
        });
      }
    } catch (error: any) {
      setSubmissionState({
        state: false,
        message:
          error.message ?? 'An unexpected error occurred. Please try again.',
      });
    }
  };
  // Build UI
  return (
    <form className={styles.container} onSubmit={(e) => submitForm(e)}>
      <h2>{title}</h2>
      <p>{description}</p>
      {renderedContent}
      <button type='submit'>Submit</button>
      {getSubmissionMessage(submissionState)}
    </form>
  );
};
export default ContactForm;
