import { FC, useState, ReactNode } from 'react';
import './Accordion.css';
import clsx from 'clsx';
import { Paragraph } from '@/ui/components/Paragraph';

interface AccordionItemProps {
  label: string;
  children: ReactNode;
  onClick?: (value: string) => void;
}

const AccordionItem: FC<AccordionItemProps> = ({
  children,
  onClick,
  label,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordionItem = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion-item">
      <button className="accordion-item__button" onClick={toggleAccordionItem}>
        <img
          src="/icons/booking-features.svg"
          alt=""
          className="icon icon__document"
        />
        <Paragraph size="large">{label}</Paragraph>

        <Paragraph className="accordion-item__state" size="medium">
          {isExpanded ? 'Hide' : 'Show'}
          <img
            src="/icons/angle-down.svg"
            alt=""
            className={clsx(
              'icon icon__arrow',
              isExpanded && 'icon__arrow--expanded',
            )}
          />
        </Paragraph>
      </button>
      {isExpanded && <div className="accordion-item__content">{children}</div>}
    </div>
  );
};

export { AccordionItem };
