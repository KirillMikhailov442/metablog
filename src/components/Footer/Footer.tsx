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

const getSubjects = async () => {
  const response = await client.getEntries<SubjectEntrySkeleton>({
    content_type: 'subjects',
    limit: 5,
  });
  return response.items;
};

const getConfigData = async () => {
  const response = await client.getEntries<ConfigEntrySkeleton>({
    content_type: 'config',
  });
  return response.items[0];
};

const Footer: FC = () => {
  const [listSubjects, setListSubjects] = useState<ISubject[]>([]);
  const [config, setCofnig] =
    useState<Pick<IConfig, 'email' | 'phone' | 'shortDescription'>>();

  useEffect(() => {
    const request = async () => {
      const subjectsData = await getSubjects();
      const newList: ISubject[] = await subjectsData.map(subject => ({
        slug: subject.fields.slug,
        name: subject.fields.name,
        image: subject.fields.image,
      }));
      setListSubjects(newList);

      const configData = await getConfigData();
      setCofnig(configData.fields);
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
                  href={'https://github.com/KirillMikhailov442/meta-blog'}
                >
                  <FaGithub size={25} />
                </Link>
              </li>
              <li>
                <Link className={styles.copyrightLinksItem} href={'/'}>
                  <IoLogoVercel size={25} />
                </Link>
              </li>
              <li>
                <Link className={styles.copyrightLinksItem} href={'/'}>
                  <FaFigma size={25} />
                </Link>
              </li>
              <li>
                <Link className={styles.copyrightLinksItem} href={'/'}>
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
