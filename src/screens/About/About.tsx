'use client';

import styles from './About.module.scss';
import { NextPage } from 'next';
import client from '@/contentful';
import { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ConfigEntrySkeleton } from '@/types/config';
import { Document } from '@contentful/rich-text-types';

const getConfigData = async () => {
  const response = await client.getEntries<ConfigEntrySkeleton>({
    content_type: 'config',
    limit: 1,
  });

  return response.items;
};

const AboutScreen: NextPage = () => {
  const [content, setContent] = useState<Document>();
  useEffect(() => {
    const request = async () => {
      const data = await getConfigData();
      await setContent(data[0].fields.description);
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
