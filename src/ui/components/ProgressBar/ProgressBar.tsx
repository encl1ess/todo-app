import { FC } from 'react';
import './ProgressBar.css';
import clsx from 'clsx';

interface ProgressBarProps {
  title?: string;
  value: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ title, value }) => {
  return (
    <div className="progress-bar">
      {title && <h1 className="progress-bar__title">{title}</h1>}
      <div className="progress-bar__container">
        <div
          className={clsx('progress-bar__track')}
          style={{
            width: `${value}%`,
            ...(value < 24 && { marginLeft: `${value - 24}px` }),
          }}
        >
          <span
            className={clsx(
              'progress-bar__value',
              value < 10 && 'progress-bar__value--right-shift',
              value >= 10 && value < 12 && 'progress-bar__value--small-shift',
            )}
          >
            {value}%
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProgressBar };
