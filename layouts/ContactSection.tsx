import ContactForm, {
  TextInput,
  EmailInput,
  DropdownInput,
  Group,
} from '../components/ContactForm';
import styles from '../styles/layouts/ContactSection.module.scss';

export default function ContactSection() {
  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      // existing endpoint
      // const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

      // non existing endpoint so no working
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Form submitted successfully');
      } else {
        throw new Error('Server error');
      }

      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error; // Re-throw the error to be caught by the ContactForm component
    }
  };
  return (
    <div className={styles.contactSection}>
      <div className='left'>
        <ContactForm
          title='Get In Touch'
          description='Fill out the form below to contact us.'
          onSubmit={handleSubmit}
          formItems={[
            Group(
              TextInput('Name', 'Enter your name'),
              DropdownInput('Subject', 'Select your subject', [
                'Applying',
                'Volunteering',
                'Development',
                'Creative',
                'Managerial',
                'Outreach',
              ])
            ),
            EmailInput('Email', 'Enter your email'),
            TextInput('Message', 'Enter your message', '', true),
          ]}
        />
      </div>
      <div className='right'>
        <h2>Get In Touch</h2>
        <p>Fill out the form below to contact us.</p>
      </div>
    </div>
  );
}
