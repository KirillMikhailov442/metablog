'use client';

import styles from './About.module.scss';
import { NextPage } from 'next';
import client from '@/contentful';
import { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ConfigEntrySkeleton } from '@/types/config';
import { Document } from '@contentful/rich-text-types';
import getLocale, { Locales } from '@helpers/getLocale';
import { useParams } from 'next/navigation';
import Params from '@/types/params';

const getConfigData = async (locale: Locales) => {
  const localeForReq = getLocale(locale);
  const response = await client.getEntries<ConfigEntrySkeleton>({
    content_type: 'config',
    limit: 1,
    locale: localeForReq,
  });

  return response.items;
};

const AboutScreen: NextPage = () => {
  const [content, setContent] = useState<Document>();
  const { locale } = useParams<Params>();
  useEffect(() => {
    const request = async () => {
      const data = await getConfigData(locale);
      await setContent(
        locale == 'ru'
          ? data[0].fields.descriptionRU
          : data[0].fields.description,
      );
    };
    request();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {content &&
          documentToReactComponents(content, {
            renderNode: {
              'embedded-asset-block': node => {
                return (
                  <img
                    src={node.data.target.fields.file.url}
                    alt={node.data.target.fields.file.url}
                  />
                );
              },
            },
          })}
      </div>
    </div>
  );
};

export default AboutScreen;
