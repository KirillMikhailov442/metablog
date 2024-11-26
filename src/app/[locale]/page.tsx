import HomeScreen from '@/screens/Home/Home';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Meta Blog | Home',
  description: 'Page home',
};

const HomePage: NextPage = () => <HomeScreen />;
export default HomePage;
