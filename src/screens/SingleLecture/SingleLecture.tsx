'use client';

import { useEffect, useRef, useState } from 'react';
import File from '@components/UI/File/File';
import styles from './SingleLecture.module.scss';
import Tag from '@components/UI/Tag/Tag';
import Image from 'next/image';
import Adb from '@components/Adb/Adb';
import moment from 'moment';

import { motion, useScroll, useSpring } from 'framer-motion';
import { NextPage } from 'next';
import { useParams } from 'next/navigation';
import client from '@/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ILecture, LectureEntrySkeleton } from '@/types/lecture';

const getLectue = async (slug: string) => {
  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    limit: 1,
    'fields.slug': slug,
  });
  return response.items[0];
};

const SingleLectureScreen: NextPage = () => {
  const postRef = useRef(null);
  const { id } = useParams();
  const { scrollYProgress } = useScroll({
    target: postRef,
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [pageContent, setPageContent] = useState<ILecture>();

  useEffect(() => {
    const request = async () => {
      const data = await getLectue(String(id));
      await setPageContent(data.fields);
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
              text={String(pageContent.subject.fields.name)}
              slug={String(pageContent.subject.fields.slug)}
            />
          )}
          <h2 className={styles.headerText}>{pageContent?.title}</h2>
          <div className={styles.shortInfo}>
            {/* <Image
              className={styles.avatar}
              width={36}
              height={36}
              alt="author image"
              src={author_img}
            />
            <p className={styles.authorName}>Jason Francisco</p> */}
            <time className={styles.date}>
              {moment(pageContent?.date).format('MMMM Do YYYY')}
            </time>
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
