'use client';

import styles from './SearchBar.module.scss';
import React, { useEffect, useRef, useState } from 'react';

import Input from '@UI/Input/Input';
import Button from '@UI/Button/Button';

import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { hideComponent } from '@store/slices/showComponents';
import { useRouter } from '@/navigation';
import client from '@/contentful';
import { ILecture, LectureEntrySkeleton } from '@/types/lecture';
import { CircularProgress } from '@mui/material';
import Item from './Item';
import { useTranslations } from 'next-intl';

const getLectures = async (text: string) => {
  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    'fields.title[match]': text,
  });
  return response.items;
};

const Searchbar = () => {
  const dispatch = useAppDispatch();
  const isShowSearchBar = useAppSelector(
    state => state.showComponents.searchbar,
  );
  const { push } = useRouter();
  const searchBarWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [text, setText] = useState('');
  const [lectures, setLectures] = useState<
    Pick<ILecture, 'title' | 'date' | 'slug'>[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('searchbar');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(hideComponent('searchbar'));
    formRef.current?.reset();
    setText('');
    setLectures([]);
    push(`/lectures?query=${text}`);
  };

  const closeSearchBar = (area: any) => {
    if (!searchBarWrapperRef.current?.contains(area)) {
      dispatch(hideComponent('searchbar'));
    }
  };

  const handleChange = async () => {
    setIsLoading(true);
    const data = await getLectures(text);
    const newList: Pick<ILecture, 'title' | 'date' | 'slug'>[] = data.map(
      lecture => ({
        title: lecture.fields.title,
        date: lecture.fields.date,
        slug: lecture.fields.slug,
      }),
    );

    setLectures(newList);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isShowSearchBar) {
      inputRef.current?.focus();
    }
  }, [isShowSearchBar]);

  if (isShowSearchBar) {
    return (
      <div onClick={e => closeSearchBar(e.target)} className={styles.wrapper}>
        <div className={styles.searchbar}>
          <div ref={searchBarWrapperRef}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              onChange={handleChange}
              className={styles.form}
            >
              <Input
                onChange={e => setText(e.currentTarget.value)}
                value={text}
                ref={inputRef}
                className={styles.input}
              />
              <Button className={styles.button}>{t('search')}</Button>
            </form>
            {lectures.length > 0 && (
              <div className={styles.result}>
                <ul className={styles.resultContent}>
                  {!isLoading ? (
                    lectures.map((lecture, index) => (
                      <Item {...lecture} key={index} />
                    ))
                  ) : (
                    <div className={styles.loading}>
                      <CircularProgress />
                    </div>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Searchbar;
