import React from 'react';
import Select from 'react-select';
import styles from '../styles/components/ContactForm.module.scss';

interface BaseInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  isInvalid?: boolean;
  mandatory?: boolean;
}

interface TextInputProps extends BaseInputProps {
  type: 'text' | 'email';
  placeholder: string;
  long?: boolean;
}

interface DropdownInputProps extends BaseInputProps {
  type: 'dropdown';
  options: { value: string; label: string }[];
  placeholder: string;
}

export type InputProps = TextInputProps | DropdownInputProps;

export const TextInputField: React.FC<TextInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  isInvalid,
  long,
  mandatory,
}) => (
  <div
    className={`${styles.formField} ${isInvalid ? styles.invalidField : ''}`}
  >
    <label htmlFor={label} className={isInvalid ? styles.invalidLabel : ''}>
      {label}
      {mandatory && <span className={styles.mandatory}>*</span>}
    </label>
    {long ? (
      <textarea
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={isInvalid ? styles.invalidInput : ''}
        maxLength={5000}
      />
    ) : (
      <input
        type={type}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={isInvalid ? styles.invalidInput : ''}
      />
    )}
    {isInvalid && (
      <span className={styles.errorText}>
        {type === 'email'
          ? 'Please enter a valid email address'
          : 'This field is required'}
      </span>
    )}
  </div>
);

export const DropdownInputField: React.FC<DropdownInputProps> = ({
  label,
  options,
  value,
  onChange,
  onBlur,
  isInvalid,
  placeholder,
  mandatory,
}) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      className={`${styles.formField} ${isInvalid ? styles.invalidField : ''}`}
    >
      <label htmlFor={label} className={isInvalid ? styles.invalidLabel : ''}>
        {label}
        {mandatory && <span className={styles.mandatory}>*</span>}
      </label>
      <Select
        id={label}
        value={selectedOption}
        onChange={(option) => {
          if (option) {
            onChange((option as { value: string; label: string }).value);
          } else {
            onChange('');
          }
        }}
        onBlur={onBlur}
        options={options}
        placeholder={placeholder}
        className={`${styles.reactSelect} ${isInvalid ? styles.invalidSelect : ''}`}
        classNamePrefix='react-select'
      />
      {isInvalid && (
        <span className={styles.errorText}>This field is required</span>
      )}
    </div>
  );
};

interface GroupProps {
  inputs: InputProps[];
}

export const Group: React.FC<GroupProps> = ({ inputs }) => (
  <div className={styles.group}>
    {inputs.map((input, index) => (
      <div
        key={`group-item-${index}`}
        className={`${styles.groupItem} ${input.isInvalid ? styles.invalidField : ''}`}
      >
        {input.type === 'dropdown' ? (
          <DropdownInputField {...input} />
        ) : (
          <TextInputField {...input} />
        )}
      </div>
    ))}
  </div>
);

export const FormField: React.FC<InputProps> = (props) => {
  if (props.type === 'dropdown') {
    return <DropdownInputField {...props} />;
  } else {
    return <TextInputField {...props} isInvalid={props.isInvalid} />;
  }
};

// Helper functions to create form items
export function TextInput(
  label: string,
  placeholder: string,
  value: string = '',
  long: boolean = false,
  mandatory: boolean = true
): TextInputProps {
  return {
    type: 'text',
    label,
    placeholder,
    value,
    long,
    mandatory,
  } as TextInputProps;
}

export function EmailInput(
  label: string,
  placeholder: string,
  value: string = '',
  mandatory: boolean = true
): TextInputProps {
  return {
    type: 'email',
    label,
    placeholder,
    value,
    mandatory,
  } as TextInputProps;
}

export function DropdownInput(
  label: string,
  placeholder: string,
  options: { value: string; label: string }[],
  value: string = '',
  mandatory: boolean = true
): DropdownInputProps {
  return {
    type: 'dropdown',
    label,
    placeholder,
    options,
    value,
    mandatory,
  } as DropdownInputProps;
}
