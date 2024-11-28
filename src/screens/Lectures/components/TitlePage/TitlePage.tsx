'use client';

import { Link } from '@/navigation';
import styles from './TitlePage.module.scss';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useTranslations } from 'next-intl';

export interface TitlePageProps {
  title: string;
  count: number;
}

const TitlePage: FC<TitlePageProps> = ({ title, count }) => {
  const t = useTranslations('lecturesPage');
  return (
    <motion.section
      initial={{ y: '20%', opacity: 0, scale: 0.6 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      className={styles.wrapper}
    >
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>
        <span className={styles.home}>
          <Link href={'/'}>{t('home')}</Link>
        </span>
        <span>
          {t('wasFound')} <b>{count}</b> {t('lectures')}
        </span>
      </p>
    </motion.section>
  );
};

export default TitlePage;
