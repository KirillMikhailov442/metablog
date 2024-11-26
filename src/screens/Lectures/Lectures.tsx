'use client';

import { FC, useEffect, useState } from 'react';
import styles from './Lectures.module.scss';
import TitlePage from './components/TitlePage/TitlePage';

import Button from '@components/UI/Button/Button';
import Adb from '@components/Adb/Adb';
import client from '@/contentful';
import { ILecture, LectureEntrySkeleton } from '@/types/lecture';
import { useSearchParams } from 'next/navigation';
import Card from '@components/Card/Card';

const getLectures = async (text: string, limit: number) => {
  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    limit,
    'fields.title[match]': text,
  });

  return response;
};

const LecturesScreen: FC = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');

  const [listOfLectures, setListLectures] = useState<ILecture[]>([]);
  const [paginationNumber, setPaginationNumber] = useState(10);
  const [lecturesTotal, setLecturesTotal] = useState(0);

  useEffect(() => {
    const request = async () => {
      const data = await getLectures(String(queryParam), paginationNumber);
      const newList = await data.items.map(lecture => ({
        slug: lecture.fields.slug,
        title: lecture.fields.title,
        image: lecture.fields.image,
        date: lecture.fields.date,
        subject: lecture.fields.subject,
        content: lecture.fields.content,
      }));
      await setLecturesTotal(data.total);
      await setListLectures(newList);
    };
    request();
  }, [paginationNumber, queryParam]);

  return (
    <div className="main__container">
      <TitlePage
        title={`Поиск на запрос: ${queryParam}`}
        count={listOfLectures.length}
      />
      <section className={styles.listOfPosts}>
        {listOfLectures.length ? (
          <h5 className={styles.title}>Latest Posts</h5>
        ) : (
          'Loading...'
        )}
        <ul className={styles.grid}>
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
        </ul>
        {lecturesTotal > paginationNumber && (
          <footer className={styles.footer}>
            <Button
              onClick={() => setPaginationNumber(prev => prev + 10)}
              className={styles.buttonView}
              var="outline"
            >
              Загрузить остальные лекции
            </Button>
          </footer>
        )}
      </section>
      <Adb />
    </div>
  );
};

export default LecturesScreen;
