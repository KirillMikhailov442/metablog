'use client';

import { FC } from 'react';
import styles from './Hero.module.scss';

import Image from 'next/image';
import Tag from '@components/UI/Tag/Tag';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ILecture } from '@/types/lecture';
import { ISubject } from '@/types/subject';
import { Link } from '@/navigation';

interface HeroProps
  extends Pick<ILecture, 'title' | 'image' | 'date' | 'slug'> {
  subject: Pick<ISubject, 'name' | 'slug'>;
  var?: 'default' | 'comment';
  isNew?: boolean;
}

const HeroDefault: FC<HeroProps> = ({ title, image, date, slug, subject }) => {
  return (
    <motion.div
      initial={{ y: '20%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Link href={`/lectures/${slug}`}>
        <section
          className={clsx(styles.section, styles.backImg)}
          style={{
            backgroundImage: `url(https:${image.fields.file?.url})`,
          }}
        >
          <div className={styles.content}>
            <Tag text={subject.name} slug={subject.slug} />
            <h2 className={styles.text}>{title}</h2>
            <div className={styles.shortInfo}>
              <time className={styles.date}>{date}</time>
            </div>
          </div>
        </section>
      </Link>
    </motion.div>
  );
};

const HeroComment: FC<HeroProps> = ({
  title,
  image,
  date,
  slug,
  subject,
  isNew = true,
}) => {
  return (
    <motion.div
      initial={{ y: '20%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Link href={`/lectures/${slug}`}>
        <section className={styles.section}>
          {isNew && <h4 className={styles.line}>New!</h4>}
          <Image
            layout="responsive"
            src={`http:${image.fields.file?.url}`}
            alt="hero image"
            width={100}
            height={100}
          />
          <motion.div
            initial={{ y: '20%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={styles.comment}
          >
            <Tag text={subject.name} slug={subject.slug} />
            <h2 className={styles.text}>{title}</h2>
            <div className={styles.shortInfo}>
              <time className={styles.date}>{date}</time>
            </div>
          </motion.div>
        </section>
      </Link>
    </motion.div>
  );
};

const Hero: FC<HeroProps> = props => {
  switch (props.var) {
    case 'default':
      return <HeroDefault {...props} />;
    case 'comment':
      return <HeroComment {...props} />;
    default:
      return <HeroDefault {...props} />;
  }
};

export default Hero;
