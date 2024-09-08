import React, { useState, useEffect } from 'react';
import ContactForm, {
  Constraint,
  TextInput,
  DropdownInput,
  Group,
  updateItem,
  type FormItem,
  type SubmissionResponse,
} from '../components/ContactForm';
import TextBox from '../components/TextBox';
import styles from '../styles/layouts/ContactSection.module.scss';
import { website_config, ContactSubject } from '../config';

interface ContactSectionProps {
  dropDownValue: ContactSubject | undefined;
  onSubmit: (formData: Record<string, string>) => Promise<SubmissionResponse>;
}

export default function ContactSection({
  dropDownValue,
  onSubmit,
}: ContactSectionProps) {
  const clearedForm = [
    Group(
      'Top Level',
      TextInput('Name', [], 'Enter your name', undefined, false, true),
      DropdownInput(
        'Subject',
        'Select your subject',
        Object.entries(ContactSubject).map(([key, value]) => ({
          label: key,
          value: value,
        })),
        dropDownValue,
        true
      )
    ),
    TextInput(
      'Email',
      [Constraint.Email],
      'Enter your email',
      undefined,
      false,
      true
    ),
    TextInput('Message', [], 'Enter your message', undefined, true, true),
  ];
  const [formContent, setFormContent] = useState<FormItem[]>(clearedForm);
  // Handle The DropDown Change
  useEffect(() => {
    setFormContent((currentValue) => {
      return updateItem(
        currentValue,
        'Subject',
        DropdownInput(
          'Subject',
          'Select your subject',
          Object.entries(ContactSubject).map(([key, value]) => ({
            label: key,
            value: value,
          })),
          dropDownValue,
          true
        )
      );
    });
  }, [dropDownValue]);
  return (
    <div className={styles.contactSection} id='contact-form'>
      <div className={styles.left}>
        <ContactForm
          title='Get In Touch'
          description='Fill out the form below to contact us.'
          clearForm={() => setFormContent(clearedForm)}
          onSubmit={onSubmit} // Defines what data is sent to the server and how its handled (ex. adding metadata)
          formContent={formContent}
          setFormContent={setFormContent}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.topBox}>
          <TextBox
            title='Why Join Us?'
            description='Join our community of passionate computer science enthusiasts and explore the latest technologies, collaborate on projects, and network with industry professionals.'
          />
        </div>
        <div className={styles.bottomBox}>
          <TextBox
            title='Get In Touch'
            description='Fill out the form below to contact us.'
            links={website_config.social_icons}
          />
        </div>
      </div>
    </div>
  );
}
