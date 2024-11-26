import * as contentful from 'contentful';

export interface SubjectFields {
  name: contentful.EntryFieldTypes.Text;
  slug: contentful.EntryFieldTypes.Text;
  image: contentful.Asset;
  description?: contentful.EntryFieldTypes.Text;
}

export type SubjectEntrySkeleton = {
  contentTypeId: 'subjects';
  fields: SubjectFields;
};

export interface ISubject {
  name: string;
  slug: string;
  image: contentful.Asset;
  description?: string | undefined;
}
