import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@styles/reset.css';
import '@styles/globalStyles.scss';
import '@styles/colors.css';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import Body from '@components/Layouts/Body';
import StoreProvider from '@components/Layouts/StoreProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import favicon_icon from '../../../public/favicon.ico';
import Searchbar from '@components/SearchBar/SearchBar';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Meta Blog',
    template: 'Meta Blog | %s',
  },
  description: "Site with translation of Grodilov's lecture",
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages();
  return (
    <StoreProvider>
      <html lang={locale}>
        <head>
          <link rel="icon" href={favicon_icon.src} sizes="any" />
        </head>
        <Body font={`${roboto.className}`}>
          <NextIntlClientProvider messages={messages}>
            <Searchbar />

            <AntdRegistry>
              <div className="wrapper">
                <Header />
                <main className="main">{children}</main>
                <Footer />
              </div>
            </AntdRegistry>
          </NextIntlClientProvider>
        </Body>
      </html>
    </StoreProvider>
  );
}
