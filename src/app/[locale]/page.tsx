import HomeScreen from '@/screens/Home/Home';
import { PageProps } from '@/types/pageProps';
import { Metadata, NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'homeSEO' });

  return {
    title: `Meta Blog | ${t('title')}`,
    description: t('description'),
  };
}

const HomePage: NextPage = () => <HomeScreen />;
export default HomePage;
