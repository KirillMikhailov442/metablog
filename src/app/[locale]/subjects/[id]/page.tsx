import client from '@/contentful';
import { PageProps } from '@/types/pageProps';
import { SubjectEntrySkeleton } from '@/types/subject';
import getLocale from '@helpers/getLocale';
import SubjectsScreen from '@screens/Subjects/Subjects';
import { Metadata, NextPage } from 'next';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = (await params).id;
  const locale = (await params).locale;

  const localeForReq = getLocale(locale);

  const response = await client.getEntries<SubjectEntrySkeleton>({
    content_type: 'subjects',
    limit: 1,
    'fields.slug': id,
    locale: localeForReq,
  });

  return {
    title:
      locale == 'ru'
        ? response.items[0].fields.nameRU
        : response.items[0].fields.name,
    description:
      locale == 'ru'
        ? response.items[0].fields.descriptionRU
        : response.items[0].fields.descriptionRU,
    keywords:
      locale == 'ru'
        ? response.items[0].fields.nameRU.split(' ')
        : response.items[0].fields.name.split(' '),
  };
}

const SubjectsPage: NextPage = () => <SubjectsScreen />;
export default SubjectsPage;
