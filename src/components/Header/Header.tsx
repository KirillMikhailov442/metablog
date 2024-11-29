'use client';

import { FC, useEffect, useState } from 'react';

import CheckBox from '@components/UI/CheckBox/CheckBox';
import Input from '@components/UI/Input/Input';

import styles from './Header.module.scss';
import Image from 'next/image';

import logo_dark_img from '@assets/logo-dark.png';
import logo_light_img from '@assets/logo-light.png';
import clsx from 'clsx';
import { IoClose, IoLanguage, IoSearch } from 'react-icons/io5';
import { IoMdMenu } from 'react-icons/io';
import MobileNav from './MobileNav';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { showComponent, toggleComponent } from '@store/slices/showComponents';
import { changeThemeInAttr, toggleTheme } from '@store/slices/theme';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { SubjectEntrySkeleton } from '@/types/subject';
import client from '@/contentful';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { ItemType } from 'antd/es/menu/interface';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/navigation';
import { useParams } from 'next/navigation';
import getLocale, { Locales } from '@helpers/getLocale';
import Params from '@/types/params';

const getSubjects = async (locale: Locales) => {
  const localeForReq = getLocale(locale);
  const response = await client.getEntries<SubjectEntrySkeleton>({
    content_type: 'subjects',
    locale: localeForReq,
  });
  return response.items;
};

const Header: FC = () => {
  const pathName = usePathname();
  const t = useTranslations('header');
  const dispatch = useAppDispatch();
  const { replace } = useRouter();
  const isShowMobileNav = useAppSelector(
    state => state.showComponents.mobileNavList,
  );
  const isShowSearchBar = useAppSelector(
    state => state.showComponents.searchbar,
  );
  const { locale } = useParams<Params>();

  const [listOfSubjects, setListOfSubjects] = useState<MenuProps['items']>([
    {
      label: <Link href="">...Loading</Link>,
      key: '0',
    },
  ]);

  const changeLanguage = (lang: string) => {
    replace(
      {
        pathname: pathName,
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

  useEffect(() => {
    const request = async () => {
      const data = await getSubjects(locale);
      const newList: MenuProps['items'] = await data.map(
        ({ fields }, index) => ({
          label: (
            <Link href={`/subjects/${fields.slug}`}>
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

  const theme = useAppSelector(state => state.theme.theme);

  useEffect(() => {
    dispatch(changeThemeInAttr());
  }, [theme]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href={'/'} className={styles.logo}>
            <Image
              className={styles.themeLight}
              src={logo_dark_img}
              alt="logo"
            />
            <Image
              className={styles.themeDark}
              src={logo_light_img}
              alt="logo"
            />
          </Link>
          <nav className={styles.nav}>
            <ul className={clsx(styles.list, styles.primaryNav)}>
              <li>
                <Link
                  className={clsx(styles.listItem, {
                    [`${styles.active}`]: pathName == '/',
                  })}
                  href={'/'}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  className={clsx(styles.listItem, {
                    [`${styles.active}`]: pathName == '/about',
                  })}
                  href={'/about'}
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Dropdown
                  menu={{
                    items: listOfSubjects,
                  }}
                  placement="bottom"
                >
                  <a onClick={e => e.preventDefault()}>
                    <Space
                      className={clsx(styles.listItem, {
                        [`${styles.active}`]: pathName.includes('/subjects/'),
                      })}
                    >
                      {t('subjects')} <MdKeyboardArrowDown />
                    </Space>
                  </a>
                </Dropdown>
              </li>
              <li>
                <Link
                  className={clsx(styles.listItem, {
                    [`${styles.active}`]: pathName == '/contact',
                  })}
                  href={'/contact'}
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </nav>
          <nav className={styles.rightSide}>
            <ul className={clsx(styles.list, styles.secondaryNav)}>
              <li>
                <Dropdown menu={{ items: listOfLanguages }} placement="bottom">
                  <a onClick={e => e.preventDefault()}>
                    <Space>
                      <IoLanguage size={20} />
                    </Space>
                  </a>
                </Dropdown>
              </li>
              {!isShowSearchBar && (
                <li>
                  <Input
                    className={styles.searchBar}
                    placeholder={t('searchbarPlaceholder')}
                    onChange={() => dispatch(showComponent('searchbar'))}
                    icon={<IoSearch />}
                  />
                </li>
              )}
              <li>
                <CheckBox
                  checked={String(theme) == 'dark'}
                  onChange={() => dispatch(toggleTheme())}
                />
              </li>
            </ul>
            <button
              onClick={() => dispatch(toggleComponent('mobileNavList'))}
              className={styles.humburger}
            >
              {!isShowMobileNav ? (
                <IoMdMenu size={25} />
              ) : (
                <IoClose size={25} />
              )}
            </button>
          </nav>
        </div>
      </header>
      <MobileNav />
    </>
  );
};

export default Header;
