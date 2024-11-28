'use client';

import { FC, useEffect, useState } from 'react';
import styles from './Subjects.module.scss';
import 'react-multi-carousel/lib/styles.css';
import Carousel, { DotProps } from 'react-multi-carousel';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import client from '@/contentful';
import { ISubject, SubjectEntrySkeleton } from '@/types/subject';
import { Link } from '@/navigation';
import getLocale, { Locales } from '@helpers/getLocale';
import { useParams } from 'next/navigation';
import Params from '@/types/params';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 4,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1200, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CustomDot: FC<DotProps> = ({ onClick, active, ...props }) => {
  return (
    <li
      className={clsx(styles.dot, { [`${styles.dotActive}`]: active })}
      onClick={onClick}
      {...props}
    ></li>
  );
};

const Subject: FC<
  Omit<ISubject, 'nameRU' | 'description' | 'descriptionRU'>
> = ({ slug, image, name }) => {
  return (
    <li>
      <Link
        className={styles.subject}
        style={{ backgroundImage: `url(http:${image.fields.file?.url})` }}
        href={`/subjects/${slug}`}
      >
        <h1>{name}</h1>
      </Link>
    </li>
  );
};

const getSubjects = async (locale: Locales) => {
  const localeForReq = getLocale(locale);
  const response = await client.getEntries<SubjectEntrySkeleton>({
    content_type: 'subjects',
    locale: localeForReq,
  });
  return response.items;
};

const Subjects: FC = () => {
  const { locale } = useParams<Params>();

  useEffect(() => {
    const request = async () => {
      const data = await getSubjects(locale);
      const newList: Omit<
        ISubject,
        'nameRU' | 'description' | 'descriptionRU'
      >[] = await data.map(subject => ({
        slug: subject.fields.slug,
        name: locale == 'ru' ? subject.fields.nameRU : subject.fields.name,
        image: subject.fields.image,
      }));
      setListSubjects(newList);
    };
    request();
  }, []);

  const [listSubjects, setListSubjects] = useState<
    Omit<ISubject, 'nameRU' | 'description' | 'descriptionRU'>[]
  >([]);

  return (
    <motion.section
      initial={{ y: '20%', opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className={styles.section}
    >
      <Carousel
        swipeable
        draggable={false}
        showDots
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={6000}
        keyBoardControl
        customDot={<CustomDot />}
        dotListClass={styles.dotList}
        className={styles.carousel}
      >
        {listSubjects.map((subject, index) => (
          <Subject {...subject} key={index} />
        ))}
        {!listSubjects && <p>Loading...</p>}
      </Carousel>
    </motion.section>
  );
};

export default Subjects;
