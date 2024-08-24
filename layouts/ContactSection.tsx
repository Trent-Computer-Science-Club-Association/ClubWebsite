import React from 'react';
import ContactForm, {
  TextInput,
  EmailInput,
  DropdownInput,
  Group,
} from '../components/ContactForm';
import TextBox from '../components/TextBox';
import styles from '../styles/layouts/ContactSection.module.scss';
import { website_config } from '../config';

interface ContactSectionProps {
  formData: Record<string, string>;
  onInputChange: (label: string, value: string) => void;
  onSubmit: (formData: Record<string, string>) => Promise<void | Response>;
}

export default function ContactSection({
  formData,
  onInputChange,
  onSubmit,
}: ContactSectionProps) {
  return (
    <div className={styles.contactSection} id='contact-form'>
      <div className={styles.left}>
        <ContactForm
          title='Get In Touch'
          description='Fill out the form below to contact us.'
          onSubmit={onSubmit} // Defines what data is sent to the server and how its handled (ex. adding metadata)
          formData={formData}
          onInputChange={onInputChange} // How to handle input being changed (for example, validation)
          formItems={[
            Group(
              TextInput('Name', 'Enter your name'),
              DropdownInput('Subject', 'Select your subject', [
                { value: 'Applying', label: 'Applying' },
                { value: 'Volunteering', label: 'Volunteering' },
                { value: 'Development', label: 'Development' },
                { value: 'Creative', label: 'Creative' },
                { value: 'Managerial', label: 'Managerial' },
                { value: 'Outreach', label: 'Outreach' },
              ])
            ),
            EmailInput('Email', 'Enter your email'),
            TextInput('Message', 'Enter your message', '', true),
          ]}
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
