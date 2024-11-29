'use client';

import { useEffect, useRef, useState } from 'react';
import File from '@components/UI/File/File';
import styles from './SingleLecture.module.scss';
import Tag from '@components/UI/Tag/Tag';
import Image from 'next/image';
import Adb from '@components/Adb/Adb';

import { motion, useScroll, useSpring } from 'framer-motion';
import { NextPage } from 'next';
import { useParams } from 'next/navigation';
import client from '@/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ILecture, LectureEntrySkeleton } from '@/types/lecture';
import Params from '@/types/params';
import getLocale, { Locales } from '@helpers/getLocale';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';

const getLectue = async (slug: string, locale: Locales) => {
  const localeForReq = getLocale(locale);
  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    limit: 1,
    'fields.slug': slug,
    locale: localeForReq,
  });
  return response.items[0];
};

const SingleLectureScreen: NextPage = () => {
  const postRef = useRef(null);
  const { id } = useParams();
  const { locale } = useParams<Params>();
  const { scrollYProgress } = useScroll({
    target: postRef,
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [pageContent, setPageContent] =
    useState<
      Pick<
        ILecture,
        'title' | 'date' | 'image' | 'subject' | 'content' | 'files'
      >
    >();

  useEffect(() => {
    const request = async () => {
      const data = await getLectue(String(id), locale);
      await setPageContent({
        title: locale == 'ru' ? data.fields.titleRU : data.fields.title,
        date: dayjs(data.sys.createdAt).locale(locale).format('D MMMM YYYY'),
        image: data.fields.image,
        subject: data.fields.subject,
        content: locale == 'ru' ? data.fields.contentRU : data.fields.content,
        files: data.fields.files,
      });
    };
    request();
  }, []);

  return (
    <>
      <motion.div className={styles.progressBar} style={{ scaleX }} />
      <div ref={postRef} className={styles.container}>
        <header className={styles.header}>
          {pageContent && (
            <Tag
              text={String(
                locale == 'ru'
                  ? pageContent.subject.fields.nameRU
                  : pageContent.subject.fields.name,
              )}
              slug={String(pageContent.subject.fields.slug)}
            />
          )}
          <h2 className={styles.headerText}>{pageContent?.title}</h2>
          <div className={styles.shortInfo}>
            <time className={styles.date}>{pageContent?.date}</time>
          </div>
        </header>
        {pageContent?.image && (
          <Image
            className={styles.image}
            src={`http:${pageContent?.image.fields.file?.url}`}
            alt={String(pageContent?.image.fields.file?.fileName)}
            layout="responsive"
            width={200}
            height={200}
          />
        )}
        <div className={styles.content}>
          {pageContent &&
            documentToReactComponents(pageContent?.content, {
              renderNode: {
                'embedded-asset-block': node => {
                  return (
                    <img
                      src={node.data.target.fields.file.url}
                      alt={node.data.target.fields.file.url}
                    />
                  );
                },
              },
            })}
          <ul>
            {pageContent?.files?.map((file, index) => (
              <File
                key={index}
                fileName={String(file.fields.file?.fileName)}
                pathToFile={`https:${file.fields.file?.url}`}
              />
            ))}
          </ul>
        </div>
      </div>
      <Adb />
    </>
  );
};

export default SingleLectureScreen;
