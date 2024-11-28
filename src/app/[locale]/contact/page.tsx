import { PageProps } from '@/types/pageProps';
import ContactScreen from '@screens/Contact/Contact';
import { Metadata, NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale, namespace: 'contactSEO' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

const ContactPage: NextPage = () => <ContactScreen />;
export default ContactPage;
