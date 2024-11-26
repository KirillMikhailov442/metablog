'use client';

import { FC, useEffect, useState } from 'react';
import Hero from '@components/Hero/Hero';
import Adb from '@components/Adb/Adb';
import styles from './Home.module.scss';
import Button from '@components/UI/Button/Button';
import Subjects from '@components/Subjects/Subjects';
import client from '@/contentful';
import Card from '@components/Card/Card';
import { ILecture, LectureEntrySkeleton } from '@/types/lecture';

const getLectures = async (limit: number) => {
  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    limit,
    skip: 0,
  });

  return response;
};

const HomeScreen: FC = () => {
  const [listOfLectures, setListLectures] = useState<ILecture[]>([]);
  const [paginationNumber, setPaginationNumber] = useState(10);
  const [lecturesTotal, setLecturesTotal] = useState(0);

  useEffect(() => {
    const request = async () => {
      const data = await getLectures(paginationNumber);
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
  }, [paginationNumber]);

  return (
    <>
      <div className="main__container">
        {listOfLectures.length && (
          <Hero
            {...listOfLectures[0]}
            subject={{
              name: listOfLectures[0].subject.fields.name,
              slug: listOfLectures[0].subject.fields.slug,
            }}
          />
        )}
      </div>
      <Subjects />
      <div className="main__container">
        <section className={styles.listOfPosts}>
          <h5 className={styles.title}>Latest Posts</h5>
          <ul className={styles.grid}>
            {[...listOfLectures.slice(1)].map((lecture, index) => (
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
    </>
  );
};

export default HomeScreen;
