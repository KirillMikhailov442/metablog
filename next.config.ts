import type { NextConfig } from 'next';
import createNextIntPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntPlugin();

const nextConfig: NextConfig = {
  env: {
    CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN:
      process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    EMAILJS_USER_ID: process.env.EMAILJS_USER_ID,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
};

export default withNextIntl(nextConfig);
