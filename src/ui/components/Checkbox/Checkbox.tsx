import { FC, useId } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  isChecked: boolean;
  label: string;
  onChange: (value: string) => void;
  value: string;
}

const Checkbox: FC<CheckboxProps> = ({ isChecked, label, onChange, value }) => {
  const handleChange = () => {
    onChange?.(value);
  };

  const id = useId();
  return (
    <label htmlFor={id} className="checkbox">
      <input
        type="checkbox"
        id={id}
        name={value}
        onChange={handleChange}
        checked={isChecked}
      />
      {label}
    </label>
  );
};

export { Checkbox };
