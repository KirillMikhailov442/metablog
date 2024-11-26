import NotFoundScreen from '@screens/NotFound/NotFound';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'Page not found',
};

const NotFoundPage: NextPage = () => <NotFoundScreen />;

export default NotFoundPage;
