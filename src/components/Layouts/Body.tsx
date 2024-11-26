'use client';

import useAppSelector from '@/hooks/useAppSelector';
import React, { FC, HTMLAttributes } from 'react';

interface BodyProps extends HTMLAttributes<HTMLBodyElement> {
  children: React.ReactNode;
  font: string;
}

const Body: FC<BodyProps> = ({ font, children, ...props }) => {
  const isNoScroll = useAppSelector(state =>
    Object.values(state.showComponents).find(item => item == true),
  );
  return (
    <body
      className={font}
      style={{ overflow: isNoScroll ? 'hidden' : '' }}
      {...props}
    >
      {children}
    </body>
  );
};

export default Body;
