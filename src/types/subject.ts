import * as contentful from 'contentful';

export interface SubjectFields {
  name: contentful.EntryFieldTypes.Text;
  nameRU: contentful.EntryFieldTypes.Text;
  slug: contentful.EntryFieldTypes.Text;
  image: contentful.Asset;
  description?: contentful.EntryFieldTypes.Text;
  descriptionRU?: contentful.EntryFieldTypes.Text;
}

export type SubjectEntrySkeleton = {
  contentTypeId: 'subjects';
  fields: SubjectFields;
};

export interface ISubject {
  name: string;
  nameRU: string;
  slug: string;
  image: contentful.Asset;
  description?: string | undefined;
  descriptionRU?: string | undefined;
}
