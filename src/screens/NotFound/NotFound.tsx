'use client';

import { FC } from 'react';
import styles from './NotFound.module.scss';
import Image from 'next/image';

import not_found_img from '@assets/not-found.png';
import Button from '@components/UI/Button/Button';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const NotFoundScreen: FC = () => {
  const { back } = useRouter();
  const t = useTranslations('notFoundPage');
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={not_found_img}
        alt="not found image"
      />
      <h2>{t('pageNotFound')}</h2>
      <Button onClick={() => back()}>{t('comeBack')}</Button>
    </div>
  );
};

export default NotFoundScreen;
