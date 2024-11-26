'use client';

import client from '@/contentful';
import styles from './Subjects.module.scss';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Card from '@components/Card/Card';
import { ISubject, SubjectEntrySkeleton } from '@/types/subject';
import { ILecture, LectureEntrySkeleton } from '@/types/lecture';

const getSubject = async (slug: string) => {
  const response = await client.getEntries<SubjectEntrySkeleton>({
    content_type: 'subjects',
    limit: 1,
    'fields.slug': slug,
  });
  return response.items[0];
};

const getLectures = async (slug: string) => {
  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    limit: 10,
    'fields.subject.fields.slug[in]': slug,
  });
  console.log(response);

  return response.items;
};

const SubjectsScreen: NextPage = () => {
  const [listOfLectures, setListOfLectures] = useState<ILecture[]>([]);
  const [subject, setSubject] = useState<ISubject>();
  const { id } = useParams();

  useEffect(() => {
    const request = async () => {
      const dataSubject = await getSubject(String(id));
      const newSubject: ISubject = await {
        name: dataSubject.fields.name,
        description: dataSubject.fields.description,
        image: dataSubject.fields.image,
        slug: dataSubject.fields.slug,
      };
      await setSubject(newSubject);

      const dataLectures = await getLectures(dataSubject.fields.slug);
      const newListOfLectures: ILecture[] = await dataLectures.map(
        ({ fields }) => ({
          title: fields.title,
          subject: fields.subject,
          image: fields.image,
          date: fields.date,
          slug: fields.slug,
          content: fields.content,
        }),
      );
      await setListOfLectures(newListOfLectures);
    };
    request();
  }, []);
  return (
    <>
      <div
        className={styles.head}
        style={{
          backgroundImage: `url(https:${subject?.image?.fields.file?.url})`,
        }}
      >
        <h1 className={styles.name}>{subject?.name}</h1>
        <h5 className={styles.description}>{subject?.description}</h5>
      </div>
      <div className={styles.container}>
        <h4 className={styles.count}>Всего лекций: {listOfLectures.length}</h4>
        <div className={styles.grid}>
          {listOfLectures.map((lecture, index) => (
            <Card
              {...lecture}
              subject={{
                name: lecture.subject.fields.name,
                slug: lecture.subject.fields.slug,
              }}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SubjectsScreen;
