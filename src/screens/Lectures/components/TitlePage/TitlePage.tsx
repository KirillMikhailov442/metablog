'use client';

import { Link } from '@/navigation';
import styles from './TitlePage.module.scss';
import { motion } from 'framer-motion';
import { FC } from 'react';

export interface TitlePageProps {
  title: string;
  count: number;
}

const TitlePage: FC<TitlePageProps> = ({ title, count }) => {
  return (
    <motion.section
      initial={{ y: '20%', opacity: 0, scale: 0.6 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      className={styles.wrapper}
    >
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>
        <span className={styles.home}>
          <Link href={'/'}>Home</Link>
        </span>
        <span>
          Было найдено: <b>{count}</b> лекций
        </span>
      </p>
    </motion.section>
  );
};

export default TitlePage;
