import client from '@/contentful';
import { SubjectEntrySkeleton } from '@/types/subject';
import SubjectsScreen from '@screens/Subjects/Subjects';
import { Metadata, NextPage } from 'next';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const response = await client.getEntries<SubjectEntrySkeleton>({
    content_type: 'subjects',
    limit: 1,
    'fields.slug': id,
  });

  return {
    title: response.items[0].fields.name,
    description: response.items[0].fields.description,
    keywords: response.items[0].fields.name.split(' '),
  };
}

const SubjectsPage: NextPage = () => <SubjectsScreen />;
export default SubjectsPage;
