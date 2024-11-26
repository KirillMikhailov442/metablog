import client from '@/contentful';
import { LectureEntrySkeleton } from '@/types/lecture';
import SinglePostScreen from '@screens/SingleLecture/SingleLecture';
import { Metadata, NextPage } from 'next';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    limit: 1,
    'fields.slug': id,
  });

  return {
    title: response.items[0].fields.title,
    description: response.items[0].fields.title,
    keywords: response.items[0].fields.title.split(' '),
  };
}

const LecturePage: NextPage = props => <SinglePostScreen {...props} />;

export default LecturePage;
