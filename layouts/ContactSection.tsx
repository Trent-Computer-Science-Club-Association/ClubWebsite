// TODO: Cleanup this file
// TODO: When we clear the form clear the urlParams without causing a reload or scroll
// TODO: Make sure we only scroll on first navigation somehow (Look into this)

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ContactForm, {
  Constraint,
  TextInput,
  DropdownInput,
  Group,
  type FormItem,
  type SubmissionResponse,
} from '../components/ContactForm';
import { processFormData } from '../pages/api/submitForm';
import TextBox from '../components/TextBox';
import styles from '../styles/layouts/ContactSection.module.scss';
import {
  website_config,
  ContactSubject,
  contactSubject,
  type ContactSection,
} from '../config';

const generateForm = (dropDownValue: ContactSubject | undefined) => [
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

interface ContactSectionProps {
  section: ContactSection;
  className?: string;
}
export default function ContactSection({
  section,
  className,
}: ContactSectionProps) {
  const { submission_url } = section;
  const onSubmit = async (
    formData: Record<string, string>
  ): Promise<SubmissionResponse> => {
    const validFormData = processFormData(formData);
    if (validFormData == undefined) {
      // Invalid Form Submission
      return {
        success: false,
        status: 500, // Unknown Response
        message: `Impossible Invalid Payload Provided, Please Contact ${website_config.email}.`,
      };
    } else {
      // Submit Our Form
      try {
        const response = await fetch(submission_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validFormData),
        });
        // Build A Blanket Response
        const submissionResponse: SubmissionResponse = {
          success: false,
          status: response.status,
          message: 'An unknown error occurred. Please try again.',
        };
        // Process the response
        if (response.status == 200 && response.ok) {
          const data = await response.json();
          if ('message' in data && typeof data.message === 'string') {
            submissionResponse.success = true;
            submissionResponse.message = data.message;
          }
        }
        return submissionResponse;
      } catch (e) {
        console.error('Failed to submit form, unhandled error', e);
        return {
          success: false,
          status: 500, // Unknown Response
          message: 'An unknown error occurred. Please try again.',
        };
      }
    }
  };
  // Drop Down Value
  const queryParams = useSearchParams();
  const rawValue = queryParams.get('subject');
  const dropDownValueResult = contactSubject.safeParse(rawValue);
  const dropDownValue = dropDownValueResult.success
    ? dropDownValueResult.data
    : undefined;
  // Build Form
  const [formContent, setFormContent] = useState<FormItem[]>(
    generateForm(dropDownValue)
  );
  useEffect(() => {
    if (dropDownValue == undefined) return;
    setFormContent(generateForm(dropDownValue));
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dropDownValue]);
  return (
    <div className={`${styles.container} ${className ?? ''}`} id='contact-form'>
      <div className={styles.left}>
        {/* <Suspense> */}
        <ContactForm
          title='Get In Touch'
          description='Fill out the form below to contact us.'
          clearForm={() => setFormContent(generateForm(undefined))}
          onSubmit={onSubmit} // Defines what data is sent to the server and how its handled (ex. adding metadata)
          formContent={formContent}
          setFormContent={setFormContent}
        />
        {/* </Suspense> */}
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
