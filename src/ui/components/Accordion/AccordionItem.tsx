import { FC, useState, ReactNode } from 'react';
import './Accordion.css';
import clsx from 'clsx';
import { Paragraph } from '@/ui/components/Paragraph';

interface AccordionItemProps {
  label: string;
  children: ReactNode;
  isAccent?: boolean;
}

const AccordionItem: FC<AccordionItemProps> = ({
  children,
  label,
  isAccent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordionItem = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion-item">
      <button
        className={clsx(
          'accordion-item__button',
          isAccent && 'accordion-item__button--accent',
        )}
        onClick={toggleAccordionItem}
      >
        <img
          src={
            isAccent ? './icons/booking-ok.svg' : './icons/booking-features.svg'
          }
          alt={`${isExpanded ? 'Hide' : 'Show'} tasks' list`}
        />
        <Paragraph size="large">{label}</Paragraph>

        <Paragraph className="accordion-item__state" size="medium">
          {isExpanded ? 'Hide' : 'Show'}
          <img
            src="./icons/angle-down.svg"
            alt={`${isExpanded ? 'Hide' : 'Show'} tasks' list`}
            className={clsx(isExpanded && 'icon__arrow--expanded')}
          />
        </Paragraph>
      </button>
      {isExpanded && <div className="accordion-item__content">{children}</div>}
    </div>
  );
};

export { AccordionItem };
