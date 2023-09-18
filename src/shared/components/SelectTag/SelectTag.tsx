import React, { FC, useState } from 'react';

import './_SelectTag.scss';
import arrowLogo from '../../../assets/icons/down-arrow-black.png';

interface SelectTagProps {
  selectArray: { value: string; data: string; id: number }[];
  className: string;
  value: string;
  inputName: string;
  onClick: (e: React.MouseEvent) => void;
  logo?: typeof arrowLogo;
  arrow: typeof arrowLogo;
  readonly?: boolean;
}

const SelectTag: FC<SelectTagProps> = ({
  selectArray,
  className,
  inputName,
  value,
  onClick,
  logo,
  arrow,
  readonly,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    if (readonly) return;
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={['dropdown', className, isDropdownOpen ? 'active' : ''].join(
        ' ',
      )}
      onClick={toggleDropdown}
    >
      <div className={readonly ? 'select select-readonly' : 'select'}>
        <div className={'select-logo'}>
          {logo && <img src={logo} alt={'arrow'} />}
          <span>{value}</span>
        </div>

        {!readonly && <img src={arrow} alt={'arrow'} />}
      </div>
      <input type='hidden' value={value} name={inputName} />
      <ul className={'dropdown-menu'}>
        {selectArray.map(({ data, id }) => (
          <li key={id} onClick={onClick}>
            {data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectTag;
