import { Metadata } from 'next';
import NotFoundPage from '../not-found';
import { getTranslations } from 'next-intl/server';
import { PageProps } from '@/types/pageProps';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'notFoundSEO' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

const AllCath = () => <NotFoundPage />;
export default AllCath;
