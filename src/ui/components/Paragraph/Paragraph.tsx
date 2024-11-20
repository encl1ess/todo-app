import { FC, ReactNode } from 'react';
import './Paragraph.css';
import clsx from 'clsx';

interface ParagraphProps {
  size?: 'medium' | 'large';
  children: ReactNode;
  className?: string;
}

const Paragraph: FC<ParagraphProps> = ({ size, children, className }) => {
  return (
    <p className={clsx('text', size && `text--${size}`, className)}>
      {children}
    </p>
  );
};

export { Paragraph };
