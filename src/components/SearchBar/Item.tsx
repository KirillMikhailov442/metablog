'use client';

import { ILecture } from '@/types/lecture';
import styles from './SearchBar.module.scss';
import { FC } from 'react';
import { useRouter } from '@/navigation';
import useAppDispatch from '@/hooks/useAppDispatch';
import { hideComponent } from '@store/slices/showComponents';
import { motion } from 'framer-motion';

const Item: FC<Pick<ILecture, 'title' | 'date' | 'slug'>> = ({
  title,
  date,
  slug,
}) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(hideComponent('searchbar'));
    push(`/lectures/${slug}`);
  };
  return (
    <motion.li
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      onClick={() => handleClick()}
      className={styles.item}
    >
      <h4>
        {title} <time>{date}</time>
      </h4>
    </motion.li>
  );
};

export default Item;
