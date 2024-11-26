'use client';

import { FC, HTMLAttributes, useId } from 'react';
import styles from './CheckBox.module.scss';
import clsx from 'clsx';
import { IoMdSunny } from 'react-icons/io';

interface CheckBoxProps extends HTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

const CheckBox: FC<CheckBoxProps> = (
  { className, onChange, checked },
  props,
) => {
  const id = useId();
  return (
    <label className={clsx(styles.wrapper, className)} htmlFor={id}>
      <input
        className={styles.input}
        type="checkbox"
        name={id}
        onChange={onChange}
        id={id}
        checked={checked}
        hidden
        {...props}
      />
      <span className={styles.back}></span>
      <span className={styles.emulation}>
        <IoMdSunny />
      </span>
    </label>
  );
};

export default CheckBox;
