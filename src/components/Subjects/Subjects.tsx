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

const Subject: FC<ISubject> = ({ slug, image, name }) => {
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

const getSubjects = async () => {
  const response = await client.getEntries<SubjectEntrySkeleton>({
    content_type: 'subjects',
  });
  return response.items;
};

const Subjects: FC = () => {
  useEffect(() => {
    const request = async () => {
      const data = await getSubjects();
      const newList: ISubject[] = await data.map(subject => ({
        slug: subject.fields.slug,
        name: subject.fields.name,
        image: subject.fields.image,
      }));
      setListSubjects(newList);
    };
    request();
  }, []);
  const [listSubjects, setListSubjects] = useState<ISubject[]>([]);
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
