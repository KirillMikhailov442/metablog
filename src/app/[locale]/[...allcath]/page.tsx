import { Metadata } from 'next';
import NotFoundPage from '../not-found';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'Page not found',
};

const AllCath = () => <NotFoundPage />;
export default AllCath;
