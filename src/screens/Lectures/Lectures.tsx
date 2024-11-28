'use client';

import { FC, useEffect, useState } from 'react';
import styles from './Lectures.module.scss';
import TitlePage from './components/TitlePage/TitlePage';

import Button from '@components/UI/Button/Button';
import Adb from '@components/Adb/Adb';
import client from '@/contentful';
import { ILecture, LectureEntrySkeleton } from '@/types/lecture';
import { useParams, useSearchParams } from 'next/navigation';
import Card from '@components/Card/Card';
import { useTranslations } from 'next-intl';
import getLocale, { Locales } from '@helpers/getLocale';
import Params from '@/types/params';
import no_lectures_img from '@assets/no-lectures.png';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';
import Image from 'next/image';

const getLectures = async (text: string, limit: number, locale: Locales) => {
  const localeForReq = getLocale(locale);

  if (locale == 'ru') {
    const response = await client.getEntries<LectureEntrySkeleton>({
      content_type: 'lectures',
      limit,
      'fields.titleRU[match]': text,
      locale: 'en-US',
    });

    return response;
  }

  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    limit,
    'fields.title[match]': text,
    locale: localeForReq,
  });

  return response;
};

const LecturesScreen: FC = () => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('query');

  const [listOfLectures, setListLectures] = useState<
    Omit<ILecture, 'content' | 'contentRU' | 'subjectRU' | 'titleRU'>[]
  >([]);
  const [paginationNumber, setPaginationNumber] = useState(10);
  const [lecturesTotal, setLecturesTotal] = useState(0);
  const { locale } = useParams<Params>();
  const t = useTranslations('lecturesPage');

  useEffect(() => {
    const request = async () => {
      const data = await getLectures(
        String(queryParam),
        paginationNumber,
        locale,
      );
      const newList = await data.items.map(lecture => ({
        slug: lecture.fields.slug,
        title: locale == 'ru' ? lecture.fields.titleRU : lecture.fields.title,
        image: lecture.fields.image,
        date: dayjs(lecture.sys.createdAt).locale(locale).format('D MMMM YYYY'),
        subject: lecture.fields.subject,
      }));
      await setLecturesTotal(data.total);
      await setListLectures(newList);
    };
    request();
  }, [paginationNumber, queryParam]);

  if (!queryParam) {
    return (
      <div className="main__container">
        <div className={styles.noLectures}>
          <h2>{t('notLectures')}</h2>
          <Image
            src={no_lectures_img}
            alt="no lectures"
            width={200}
            height={200}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="main__container">
      <TitlePage
        title={`${t('searchByRequest')} ${queryParam}`}
        count={listOfLectures.length}
      />
      <section className={styles.listOfPosts}>
        {listOfLectures.length ? (
          <h5 className={styles.title}>{t('moreLectures')}</h5>
        ) : (
          'Loading...'
        )}
        <ul className={styles.grid}>
          {listOfLectures.map((lecture, index) => (
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
  );
};

export default LecturesScreen;
