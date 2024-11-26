import React, { FC, HTMLAttributes } from 'react';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  var?: 'default' | 'outline';
  children: React.ReactNode | string;
}

const ButtonDefault: FC<ButtonProps> = (
  { className, onClick, children },
  props,
) => (
  <button
    onClick={onClick}
    className={clsx(styles.button, styles.default, className)}
    {...props}
  >
    {children}
  </button>
);

const ButtonOutline: FC<ButtonProps> = (
  { className, onClick, children },
  props,
) => (
  <button
    onClick={onClick}
    className={clsx(styles.button, styles.outline, className)}
    {...props}
  >
    {children}
  </button>
);

const Button: FC<ButtonProps> = props => {
  switch (props.var) {
    case 'default':
      return <ButtonDefault {...props} />;
    case 'outline':
      return <ButtonOutline {...props} />;

    default:
      return <ButtonDefault {...props} />;
  }
};

export default Button;
