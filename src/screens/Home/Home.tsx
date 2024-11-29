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
import { useTranslations } from 'next-intl';
import getLocale, { Locales } from '@helpers/getLocale';
import { useParams } from 'next/navigation';
import Params from '@/types/params';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';

const getLectures = async (limit: number, locale: Locales) => {
  const localeForReq = getLocale(locale);
  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    limit,
    skip: 0,
    locale: localeForReq,
  });

  return response;
};

const HomeScreen: FC = () => {
  const [listOfLectures, setListLectures] = useState<
    Omit<ILecture, 'contentRU' | 'titleRU' | 'subjectRU'>[]
  >([]);
  const [paginationNumber, setPaginationNumber] = useState(10);
  const [lecturesTotal, setLecturesTotal] = useState(0);
  const { locale } = useParams<Params>();
  const t = useTranslations('homePage');

  useEffect(() => {
    const request = async () => {
      const data = await getLectures(paginationNumber, locale);
      const newList = await data.items.map(lecture => ({
        slug: lecture.fields.slug,
        title: locale == 'ru' ? lecture.fields.titleRU : lecture.fields.title,
        image: lecture.fields.image,
        date: dayjs(lecture.sys.createdAt).locale(locale).format('D MMMM YYYY'),
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
        {listOfLectures.length ? (
          <Hero
            {...listOfLectures[0]}
            subject={{
              name:
                locale == 'ru'
                  ? listOfLectures[0].subject.fields.nameRU
                  : listOfLectures[0].subject.fields.name,
              slug: listOfLectures[0].subject.fields.slug,
            }}
          />
        ) : (
          'loading...'
        )}
      </div>
      <Subjects />
      <div className="main__container">
        <section className={styles.listOfPosts}>
          <h5 className={styles.title}>{t('moreLectures')}</h5>
          <ul className={styles.grid}>
            {[...listOfLectures.slice(1)].map((lecture, index) => (
              <Card
                {...lecture}
                subject={{
                  name:
                    locale == 'ru'
                      ? lecture.subject.fields.nameRU
                      : lecture.subject.fields.name,
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
                {t('loadMoreLectures')}
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
