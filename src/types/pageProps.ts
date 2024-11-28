import { Locales } from '@helpers/getLocale';

export type PageProps = {
  params: Promise<{ id: string; locale: Locales }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
