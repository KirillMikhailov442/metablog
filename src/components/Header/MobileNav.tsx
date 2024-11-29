'use client';

import { motion } from 'framer-motion';
import { FC, useEffect, useRef, useState } from 'react';

import Input from '@components/UI/Input/Input';
import CheckBox from '@components/UI/CheckBox/CheckBox';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { IoLanguage, IoSearch } from 'react-icons/io5';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import { hideComponent, showComponent } from '@store/slices/showComponents';
import { changeThemeInAttr, toggleTheme } from '@store/slices/theme';
import { Dropdown, MenuProps, Space } from 'antd';
import client from '@/contentful';
import { SubjectEntrySkeleton } from '@/types/subject';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ItemType } from 'antd/es/menu/interface';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import getLocale, { Locales } from '@helpers/getLocale';
import Params from '@/types/params';

const listVariants = {
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    y: '20%',
    opacity: 0,
  },

  visible: {
    y: 0,
    opacity: 1,
  },
};

const getSubjects = async (locale: Locales) => {
  const localeForReq = getLocale(locale);
  const response = await client.getEntries<SubjectEntrySkeleton>({
    content_type: 'subjects',
    locale: localeForReq,
  });
  return response.items;
};

const MobileNav: FC = () => {
  const pathName = usePathname();
  const t = useTranslations('header');
  const isOpen = useAppSelector(state => state.showComponents.mobileNavList);
  const dispatch = useAppDispatch();
  const { replace } = useRouter();
  const navRef = useRef<HTMLDivElement>(null);
  const { locale } = useParams<Params>();
  const params = useParams();

  const closeNav = (area: EventTarget) => {
    if (!navRef.current?.contains(area as Node)) {
      dispatch(hideComponent('mobileNavList'));
    }
  };

  const changeLanguage = (lang: string) => {
    replace(
      {
        pathname: pathName,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        params,
      },
      { locale: lang },
    );
  };

  const [listOfLanguages] = useState<ItemType[]>([
    {
      label: <div onClick={() => changeLanguage('ru')}>🇷🇺 Русский</div>,
      key: '0',
    },
    {
      label: <div onClick={() => changeLanguage('en')}>🇬🇧 English</div>,
      key: '1',
    },
    {
      label: <div onClick={() => changeLanguage('zh')}>🇨🇳 中国人</div>,
      key: '2',
    },
  ]);

  const [listOfSubjects, setListOfSubjects] = useState<MenuProps['items']>([
    {
      label: <Link href="">...Loading</Link>,
      key: '0',
    },
  ]);

  useEffect(() => {
    const request = async () => {
      const data = await getSubjects(locale);
      const newList: MenuProps['items'] = await data.map(
        ({ fields }, index) => ({
          label: (
            <Link
              onClick={() => dispatch(hideComponent('mobileNavList'))}
              href={`/subjects/${fields.slug}`}
            >
              {locale == 'ru' ? fields.nameRU : fields.name}
            </Link>
          ),
          key: index,
        }),
      );
      setListOfSubjects(newList);
    };
    request();
  }, []);

  const handleChange = () => {
    dispatch(hideComponent('mobileNavList'));
    dispatch(showComponent('searchbar'));
  };

  const theme = useAppSelector(state => state.theme.theme);

  useEffect(() => {
    dispatch(changeThemeInAttr());
  }, [theme]);
  return (
    <div
      onClick={e => closeNav(e.target)}
      className={clsx(styles.mobileWrapper, {
        [`${styles.mobileWrapperShow}`]: isOpen,
      })}
    >
      <motion.aside
        ref={navRef}
        className={clsx(styles.aside, { [`${styles.open}`]: isOpen })}
      >
        <div className={styles.asideContent}>
          {isOpen && (
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              className={styles.mobileList}
            >
              <motion.li
                onClick={() => dispatch(hideComponent('mobileNavList'))}
                variants={itemVariants}
              >
                <Link
                  className={clsx(styles.mobileListItem, {
                    [`${styles.active}`]: pathName == '/',
                  })}
                  href={'/'}
                >
                  {t('home')}
                </Link>
              </motion.li>
              <motion.li
                onClick={() => dispatch(hideComponent('mobileNavList'))}
                variants={itemVariants}
              >
                <Link
                  className={clsx(styles.mobileListItem, {
                    [`${styles.active}`]: pathName == '/about',
                  })}
                  href={'/about'}
                >
                  {t('about')}
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Dropdown menu={{ items: listOfSubjects }} placement="bottom">
                  <a onClick={e => e.preventDefault()}>
                    <Space>
                      {t('subjects')} <MdKeyboardArrowDown />
                    </Space>
                  </a>
                </Dropdown>
              </motion.li>
              <motion.li
                onClick={() => dispatch(hideComponent('mobileNavList'))}
                variants={itemVariants}
              >
                <Link
                  className={clsx(styles.mobileListItem, {
                    [`${styles.active}`]: pathName == '/contact',
                  })}
                  href={'/contact'}
                >
                  {t('contact')}
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Input
                  className={styles.mobileSearchBar}
                  placeholder={t('searchbarPlaceholder')}
                  onChange={() => handleChange()}
                  icon={<IoSearch />}
                />
              </motion.li>
              <motion.li variants={itemVariants}>
                <CheckBox
                  checked={String(theme) == 'dark'}
                  onChange={() => dispatch(toggleTheme())}
                  className={styles.mobileCheckBox}
                />
              </motion.li>
              <motion.li variants={itemVariants}>
                <Dropdown
                  className={styles.mobileTranslater}
                  menu={{ items: listOfLanguages }}
                >
                  <a onClick={e => e.preventDefault()}>
                    <Space>
                      <IoLanguage size={20} />
                    </Space>
                  </a>
                </Dropdown>
              </motion.li>
            </motion.ul>
          )}
        </div>
      </motion.aside>
    </div>
  );
};

export default MobileNav;
