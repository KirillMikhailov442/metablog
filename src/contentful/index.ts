import * as contentful from 'contentful';
export const accessToken = String(
  process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
);
export const SPACE = String(process.env.CONTENTFUL_SPACE_ID);
export const ENVIRONMENT = String(process.env.CONTENTFUL_ENVIRONMENT);
const client = contentful.createClient({
  space: SPACE,
  environment: ENVIRONMENT,
  accessToken,
});

export default client;
