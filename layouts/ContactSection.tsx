import React from 'react';
import ContactForm from '../components/ContactForm';
import {
  TextInput,
  EmailInput,
  DropdownInput,
  Group,
  InputProps,
} from '../components/FormComponents';
import TextBox from '../components/TextBox';
import styles from '../styles/layouts/ContactSection.module.scss';

interface ContactSectionProps {
  formData: Record<string, string>;
  onInputChange: (label: string, value: string) => void;
  onSubmit: (formData: Record<string, string>) => Promise<void>;
}

export default function ContactSection({
  formData,
  onInputChange,
  onSubmit,
}: ContactSectionProps) {
  const createFormItem = (item: InputProps): InputProps => ({
    ...item,
    value: formData[item.label] || '',
    onChange: (value: string) => onInputChange(item.label, value),
  });

  const formItems = [
    {
      inputs: [
        createFormItem(TextInput('Name', 'Enter your name', '', false, true)),
        createFormItem(
          DropdownInput(
            'Subject',
            'Select your subject',
            [
              { value: 'Applying', label: 'Applying' },
              { value: 'Volunteering', label: 'Volunteering' },
              { value: 'Development', label: 'Development' },
              { value: 'Creative', label: 'Creative' },
              { value: 'Managerial', label: 'Managerial' },
              { value: 'Outreach', label: 'Outreach' },
            ],
            '',
            true
          )
        ),
      ],
    },
    createFormItem(EmailInput('Email', 'Enter your email')),
    createFormItem(TextInput('Message', 'Enter your message', '', true, true)),
  ];

  return (
    <div className={styles.contactSection} id='contact-form'>
      <div className={styles.left}>
        <ContactForm
          title='Get In Touch'
          description='Fill out the form below to contact us.'
          onSubmit={onSubmit}
          formData={formData}
          onInputChange={onInputChange}
          formItems={formItems}
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
            links={[
              {
                icon: '/Icons/discord.svg',
                link: 'https://discord.gg/serea2sPAd',
                text: 'Discord',
              },
              {
                icon: '/Icons/instagram.svg',
                link: 'https://www.instagram.com/trentcsca/',
                text: 'Instagram',
              },
              {
                icon: '/Icons/linkedin.svg',
                link: 'https://www.linkedin.com/company/trent-computer-science-society',
                text: 'LinkedIn',
              },
              {
                icon: '/Icons/github.svg',
                link: 'https://github.com/tcsca',
                text: 'GitHub',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
