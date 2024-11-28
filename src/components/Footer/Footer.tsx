'use client';

import { FC, useEffect, useState } from 'react';
import styles from './Footer.module.scss';
import Image from 'next/image';
import { FaFigma, FaGithub, FaTelegramPlane } from 'react-icons/fa';

import logo_dark_img from '@assets/mini-logo-dark.svg';
import logo_light_img from '@assets/mini-logo-light.svg';
import name_website_dark_img from '@assets/name-website-dark.svg';
import name_website_light_img from '@assets/name-website-light.svg';
import client from '@/contentful';
import { ConfigEntrySkeleton, IConfig } from '@/types/config';
import { ISubject, SubjectEntrySkeleton } from '@/types/subject';
import { IoLogoVercel } from 'react-icons/io5';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import getLocale, { Locales } from '@/utils/helpers/getLocale';
import { useParams } from 'next/navigation';
import Params from '@/types/params';
import {
  LINK_TO_FIGMA,
  LINK_TO_GITHUB,
  LINK_TO_TELEGRAM,
  LINK_TO_VERCEL,
} from '@conts/links';

const getSubjects = async (locale: Locales) => {
  const localeForReq = getLocale(locale);
  const response = await client.getEntries<SubjectEntrySkeleton>({
    content_type: 'subjects',
    limit: 5,
    locale: localeForReq,
  });
  return response.items;
};

const getConfigData = async (locale: Locales) => {
  const localeForReq = getLocale(locale);
  const response = await client.getEntries<ConfigEntrySkeleton>({
    content_type: 'config',
    locale: localeForReq,
  });
  return response.items[0];
};

const Footer: FC = () => {
  const [listSubjects, setListSubjects] = useState<
    Omit<ISubject, 'nameRU' | 'descriptionRU'>[]
  >([]);
  const { locale } = useParams<Params>();
  const [config, setCofnig] =
    useState<Pick<IConfig, 'email' | 'phone' | 'shortDescription'>>();

  useEffect(() => {
    const request = async () => {
      const subjectsData = await getSubjects(locale);
      const newList: Omit<ISubject, 'nameRU' | 'descriptionRU'>[] =
        await subjectsData.map(subject => ({
          slug: subject.fields.slug,
          name: locale == 'ru' ? subject.fields.nameRU : subject.fields.name,
          image: subject.fields.image,
        }));
      setListSubjects(newList);

      const configData = await getConfigData(locale);
      setCofnig({
        email: configData.fields.email,
        phone: configData.fields.phone,
        shortDescription:
          locale == 'ru'
            ? configData.fields.shortDescriptionRU
            : configData.fields.shortDescription,
      });
    };
    request();
  }, []);

  const t = useTranslations('footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ul className={styles.content}>
          <li className={styles.about}>
            <h6 className={styles.title}>{t('about')}</h6>
            <p className={styles.text}>{config?.shortDescription}</p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <b>{t('email')}</b>
                {config?.email}
              </li>
              <li className={styles.listItem}>
                <b>{t('tel')}</b>
                {config?.phone}
              </li>
            </ul>
          </li>
          <li className={styles.listOfLinks}>
            <h6 className={styles.title}>{t('quickLinks')}</h6>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link className={styles.listLink} href={'/'}>
                  {t('listOfLinks.home')}
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link className={styles.listLink} href={'/about'}>
                  {t('listOfLinks.about')}
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link className={styles.listLink} href={'/lectures'}>
                  {t('listOfLinks.lectures')}
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link className={styles.listLink} href={'/contact'}>
                  {t('listOfLinks.contact')}
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles.listOfLinks}>
            <h6 className={styles.title}>{t('subjects')}</h6>
            <ul className={styles.list}>
              {listSubjects.map((subject, index) => (
                <li className={styles.listItem} key={index}>
                  <Link
                    className={styles.listLink}
                    href={`/subjects/${subject.slug}`}
                  >
                    {subject.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <div className={styles.copyright}>
          <div className={styles.copyrightInfo}>
            <Link href={'/'}>
              <Image
                className={styles.themeLight}
                src={logo_dark_img}
                alt="logo image"
                width={48}
                height={48}
              />
              <Image
                className={styles.themeDark}
                src={logo_light_img}
                alt="logo image"
                width={48}
                height={48}
              />
            </Link>
            <div style={{ marginLeft: 12 }}>
              <Image
                className={styles.themeLight}
                src={name_website_dark_img}
                alt="name image"
              />
              <Image
                className={styles.themeDark}
                src={name_website_light_img}
                alt="name image"
              />
              <p>© JS Template 2023. All Rights Reserved.</p>
            </div>
          </div>
          <nav>
            <ul className={styles.copyrightLinks}>
              <li>
                <Link
                  className={styles.copyrightLinksItem}
                  href={LINK_TO_GITHUB}
                  target="_blank"
                >
                  <FaGithub size={25} />
                </Link>
              </li>
              <li>
                <Link
                  className={styles.copyrightLinksItem}
                  href={LINK_TO_VERCEL}
                  target="_blank"
                >
                  <IoLogoVercel size={25} />
                </Link>
              </li>
              <li>
                <Link
                  className={styles.copyrightLinksItem}
                  href={LINK_TO_FIGMA}
                  target="_blank"
                >
                  <FaFigma size={25} />
                </Link>
              </li>
              <li>
                <Link
                  className={styles.copyrightLinksItem}
                  href={LINK_TO_TELEGRAM}
                  target="_blank"
                >
                  <FaTelegramPlane size={25} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
