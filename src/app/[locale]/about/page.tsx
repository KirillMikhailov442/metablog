import { Metadata, NextPage } from 'next';
import AboutScreen from '@screens/About/About';
import { getTranslations } from 'next-intl/server';
import { PageProps } from '@/types/pageProps';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'aboutSEO' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

const AboutPage: NextPage = () => <AboutScreen />;

export default AboutPage;
