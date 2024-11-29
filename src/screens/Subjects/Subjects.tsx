'use client';

import client from '@/contentful';
import styles from './Subjects.module.scss';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Card from '@components/Card/Card';
import { ISubject, SubjectEntrySkeleton } from '@/types/subject';
import { ILecture, LectureEntrySkeleton } from '@/types/lecture';
import { useTranslations } from 'next-intl';
import Params from '@/types/params';
import getLocale, { Locales } from '@helpers/getLocale';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';

const getSubject = async (slug: string, locale: Locales) => {
  const localeForReq = getLocale(locale);
  const response = await client.getEntries<SubjectEntrySkeleton>({
    content_type: 'subjects',
    limit: 1,
    locale: localeForReq,
    'fields.slug': slug,
  });
  return response.items[0];
};

const getLectures = async (slug: string, locale: Locales) => {
  const localeForReq = getLocale(locale);
  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    limit: 10,
    locale: localeForReq,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'fields.subject.fields.slug[in]': slug,
    'fields.subject.sys.contentType.sys.id': 'subjects',
  });

  return response.items;
};

const SubjectsScreen: NextPage = () => {
  const [listOfLectures, setListOfLectures] = useState<
    Pick<ILecture, 'title' | 'date' | 'slug' | 'subject' | 'image'>[]
  >([]);
  const [subject, setSubject] =
    useState<Omit<ISubject, 'descriptionRU' | 'nameRU'>>();
  const { id } = useParams();
  const t = useTranslations('subjectPage');
  const { locale } = useParams<Params>();

  useEffect(() => {
    const request = async () => {
      const dataSubject = await getSubject(String(id), locale);
      const newSubject: Omit<ISubject, 'descriptionRU' | 'nameRU'> = await {
        name:
          locale == 'ru' ? dataSubject.fields.nameRU : dataSubject.fields.name,
        description:
          locale == 'ru'
            ? dataSubject.fields.descriptionRU
            : dataSubject.fields.description,
        image: dataSubject.fields.image,
        slug: dataSubject.fields.slug,
      };
      await setSubject(newSubject);

      const dataLectures = await getLectures(dataSubject.fields.slug, locale);
      const newListOfLectures: Pick<
        ILecture,
        'title' | 'date' | 'slug' | 'subject' | 'image'
      >[] = await dataLectures.map(lecutre => ({
        title: locale == 'ru' ? lecutre.fields.titleRU : lecutre.fields.title,
        subject: lecutre.fields.subject,
        image: lecutre.fields.image,
        date: dayjs(lecutre.sys.createdAt).locale(locale).format('D MMMM YYYY'),
        slug: lecutre.fields.slug,
      }));
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
        <h4 className={styles.count}>
          {t('totalLectures')} {listOfLectures.length}
        </h4>
        <div className={styles.grid}>
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
        </div>
      </div>
    </>
  );
};

export default SubjectsScreen;
