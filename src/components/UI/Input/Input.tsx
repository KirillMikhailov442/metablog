import React, { FC, HTMLAttributes, RefObject, useId } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  var?: 'default' | 'outline';
  icon?: React.JSX.Element;
  placeholder?: string;
  value?: string;
  error?: string;
  name?: string;
  list?: string;
  ref?: RefObject<HTMLInputElement>;
}

const InputDefault: FC<InputProps> = (
  {
    className,
    icon,
    placeholder,
    onChange,
    onBlur,
    value,
    error,
    name,
    list,
    ref,
  },
  props,
) => {
  const id = useId();
  return (
    <>
      <label className={clsx(styles.wrapper, className)} htmlFor={id}>
        <input
          className={clsx(styles.input, styles.inputDefault)}
          type="text"
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          list={list}
          ref={ref}
          {...props}
        />
        <span className={styles.button}>{icon}</span>
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

const InputOutline: FC<InputProps> = (
  {
    className,
    icon,
    placeholder,
    onChange,
    onBlur,
    value,
    error,
    name,
    list,
    ref,
  },
  props,
) => {
  const id = useId();
  return (
    <>
      <label className={clsx(styles.wrapper, className)} htmlFor={id}>
        <input
          className={clsx(styles.input, styles.inputOutline)}
          type="text"
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          list={list}
          ref={ref}
          {...props}
        />
        <span className={styles.button}>{icon}</span>
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

const Input: FC<InputProps> = props => {
  switch (props.var) {
    case 'default':
      return <InputDefault {...props} />;
    case 'outline':
      return <InputOutline {...props} />;
    default:
      return <InputDefault {...props} />;
  }
};

export default Input;
