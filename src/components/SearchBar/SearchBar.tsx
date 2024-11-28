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
import getLocale, { Locales } from '@helpers/getLocale';
import { useParams } from 'next/navigation';
import Params from '@/types/params';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';

const getLectures = async (text: string, locale: Locales) => {
  const localeForReq = getLocale(locale);

  if (locale == 'ru') {
    const response = await client.getEntries<LectureEntrySkeleton>({
      content_type: 'lectures',
      'fields.titleRU[match]': text,
      locale: 'en-US',
    });
    return response.items;
  }

  const response = await client.getEntries<LectureEntrySkeleton>({
    content_type: 'lectures',
    'fields.title[match]': text,
    locale: localeForReq,
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
    Pick<ILecture, 'title' | 'date' | 'slug' | 'subject'>[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { locale } = useParams<Params>();
  const t = useTranslations('searchbar');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(hideComponent('searchbar'));
    formRef.current?.reset();
    setText('');
    setLectures([]);
    push(`/lectures?query=${text}`);
  };

  const closeSearchBar = (area: EventTarget) => {
    if (!searchBarWrapperRef.current?.contains(area as Node)) {
      dispatch(hideComponent('searchbar'));
    }
  };

  const handleChange = async () => {
    setIsLoading(true);
    const data = await getLectures(text, locale);
    const newList: Pick<ILecture, 'title' | 'date' | 'slug' | 'subject'>[] =
      data.map(lecture => ({
        title: locale == 'ru' ? lecture.fields.titleRU : lecture.fields.title,
        date: dayjs(lecture.sys.createdAt).locale(locale).format('D MMMM YYYY'),
        subject: lecture.fields.subject,
        slug: lecture.fields.slug,
      }));

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
