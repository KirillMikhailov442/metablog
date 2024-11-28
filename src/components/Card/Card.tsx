'use client';

import { FC } from 'react';
import styles from './Card.module.scss';
import Image from 'next/image';
import Tag from '@components/UI/Tag/Tag';
import { motion } from 'framer-motion';
import { ILecture } from '@/types/lecture';
import { ISubject } from '@/types/subject';
import { Link } from '@/navigation';

interface CardProps
  extends Pick<ILecture, 'title' | 'slug' | 'image' | 'date'> {
  subject: Pick<ISubject, 'name' | 'slug'>;
}

const itemVariants = {
  hidden: {
    y: 40,
    opacity: 0,
  },

  visible: {
    y: 0,
    opacity: 1,
  },
};

const Card: FC<CardProps> = ({ title, image, slug, date, subject }, props) => {
  return (
    <motion.li
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.card}
      {...props}
    >
      <Link className={styles.content} href={`/lectures/${slug}`}>
        <Image
          className={styles.img}
          src={`https:${image.fields.file?.url}`}
          alt="card image"
          layout="responsive"
          width={100}
          height={100}
        />
        <Tag className={styles.tag} text={subject.name} slug={subject.slug} />
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.shortInfo}>
          <time className={styles.date}>{date}</time>
        </div>
      </Link>
    </motion.li>
  );
};

export default Card;
