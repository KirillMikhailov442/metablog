import client from '@/contentful';
import { LectureEntrySkeleton } from '@/types/lecture';
import { PageProps } from '@/types/pageProps';
import getLocale from '@helpers/getLocale';
import SinglePostScreen from '@screens/SingleLecture/SingleLecture';
import { Metadata, NextPage } from 'next';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = (await params).id;
  const locale = (await params).locale;

  const localeForReq = getLocale(locale);

  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    limit: 1,
    'fields.slug': id,
    locale: localeForReq,
  });

  return {
    title:
      locale == 'ru'
        ? response.items[0].fields.titleRU
        : response.items[0].fields.title,
    description:
      locale == 'ru'
        ? response.items[0].fields.titleRU
        : response.items[0].fields.title,
    keywords:
      locale == 'ru'
        ? response.items[0].fields.titleRU.split(' ')
        : response.items[0].fields.title.split(' '),
  };
}

const LecturePage: NextPage = () => <SinglePostScreen />;

export default LecturePage;
