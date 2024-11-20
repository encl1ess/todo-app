import { FC, ReactNode } from 'react';
import './Accordion.css';

interface AccordionProps {
  children: ReactNode;
}

const Accordion: FC<AccordionProps> = ({ children }) => {
  return <ul className="accordion">{children}</ul>;
};

export { Accordion };
