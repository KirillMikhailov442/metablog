import ContactScreen from '@screens/Contact/Contact';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Page contact',
};

const ContactPage: NextPage = () => <ContactScreen />;
export default ContactPage;
