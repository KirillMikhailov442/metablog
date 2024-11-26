'use client';

import { FC, HTMLAttributes } from 'react';
import styles from './Adb.module.scss';
import { motion } from 'framer-motion';

const Adb: FC<HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <motion.section
      initial={{ opacity: 0, y: '20%' }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={styles.wrapper}
    >
      <div className={styles.adb} {...props}>
        <p className={styles.subtitle}>Advertisement</p>
        <h5 className={styles.title}>You can place ads</h5>
        <p className={styles.size}>750x100</p>
      </div>
    </motion.section>
  );
};

export default Adb;
