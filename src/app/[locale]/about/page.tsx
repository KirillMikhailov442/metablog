import { Metadata, NextPage } from 'next';
import AboutScreen from '@screens/About/About';

export const metadata: Metadata = {
  title: 'About',
  description: 'Page about',
};

const AboutPage: NextPage = () => <AboutScreen />;

export default AboutPage;
