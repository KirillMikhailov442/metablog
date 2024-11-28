import * as contentful from 'contentful';

export interface ConfigFields {
  email?: contentful.EntryFieldTypes.Text;
  phone: contentful.EntryFieldTypes.Text;
  shortDescription: Document;
  shortDescriptionRU: Document;
  description: Document;
  descriptionRU: Document;
}

export type ConfigEntrySkeleton = {
  contentTypeId: 'config';
  fields: ConfigFields;
};

export interface IConfig {
  email?: string;
  phone: string;
  shortDescription: string;
  shortDescriptionRU: string;
  description: Document;
  descriptionRU: Document;
}
