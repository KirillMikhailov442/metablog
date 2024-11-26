'use client';

import { FC } from 'react';
import styles from './NotFound.module.scss';
import Image from 'next/image';

import not_found_img from '@assets/not-found.png';
import Button from '@components/UI/Button/Button';
import { useRouter } from 'next/navigation';

const NotFoundScreen: FC = () => {
  const { back } = useRouter();
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={not_found_img}
        alt="not found image"
      />
      <h2>Page not found</h2>
      <Button onClick={() => back()}>Come back</Button>
    </div>
  );
};

export default NotFoundScreen;
