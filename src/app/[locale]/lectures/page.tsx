import { PageProps } from '@/types/pageProps';
import LecturesScreen from '@screens/Lectures/Lectures';
import { Metadata, NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'lecturesSEO' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

const LecturesPage: NextPage = () => <LecturesScreen />;

export default LecturesPage;
