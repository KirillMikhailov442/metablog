import { PageProps } from '@/types/pageProps';
import NotFoundScreen from '@screens/NotFound/NotFound';
import { Metadata, NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

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

const NotFoundPage: NextPage = () => <NotFoundScreen />;

export default NotFoundPage;
