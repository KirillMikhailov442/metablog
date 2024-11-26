import * as contentful from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { ISubject, SubjectEntrySkeleton } from './subject';

export interface LectureFields {
  title: contentful.EntryFieldTypes.Text;
  slug: contentful.EntryFieldTypes.Text;
  subject: SubjectEntrySkeleton;
  date: contentful.EntryFieldTypes.Date;
  image: contentful.Asset;
  content: Document;
  files?: contentful.Asset[];
}

export type LectureEntrySkeleton = {
  contentTypeId: 'lectures';
  fields: LectureFields;
};

export interface ILecture {
  title: string;
  slug: string;
  subject: { fields: ISubject };
  date: string;
  image: contentful.Asset;
  content: Document;
  files?: contentful.Asset[] | undefined;
}
