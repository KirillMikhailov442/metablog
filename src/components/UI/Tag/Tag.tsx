import { FC } from 'react';
import styles from './Tag.module.scss';
import clsx from 'clsx';
import { ISubject } from '@/types/subject';
import { Link } from '@/navigation';

interface TagProps extends Pick<ISubject, 'slug'> {
  text?: string;
  var?: 'default' | 'transparent';
  className?: string;
}

const TagDefault: FC<TagProps> = ({ text, className, slug }, props) => {
  return (
    <Link
      className={clsx(styles.tag, styles.blue, className)}
      href={`/subjects/${slug}`}
      {...props}
    >
      {text}
    </Link>
  );
};

const TagSky: FC<TagProps> = ({ text, className, slug }, props) => {
  return (
    <Link
      className={clsx(styles.tag, styles.sky, className)}
      href={`/subjects/${slug}`}
      {...props}
    >
      {text}
    </Link>
  );
};

const Tag: FC<TagProps> = props => {
  switch (props.var) {
    case 'default':
      return <TagDefault {...props} />;
    case 'transparent':
      return <TagSky {...props} />;
    default:
      return <TagDefault {...props} />;
  }
};

export default Tag;
