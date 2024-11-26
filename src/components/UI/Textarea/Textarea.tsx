import { FC, HTMLAttributes } from 'react';
import styles from './Textarea.module.scss';
import clsx from 'clsx';

interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
  var?: 'default' | 'outline';
  placeholder?: string;
  value?: string;
  error?: string;
  name?: string;
}

const TextareaDefault: FC<TextareaProps> = (
  { className, placeholder, value, error, onChange, onBlur, name },
  props,
) => {
  return (
    <>
      <textarea
        className={clsx(styles.textarea, styles.default, className)}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        {...props}
      ></textarea>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

const TextareaOutline: FC<TextareaProps> = (
  { className, placeholder, value, error, onChange, onBlur, name },
  props,
) => {
  return (
    <>
      <textarea
        className={clsx(styles.textarea, styles.outline, className)}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        {...props}
      ></textarea>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

const Textarea: FC<TextareaProps> = props => {
  switch (props.var) {
    case 'default':
      return <TextareaDefault {...props} />;
    case 'outline':
      return <TextareaOutline {...props} />;

    default:
      return <TextareaDefault {...props} />;
  }
};

export default Textarea;
