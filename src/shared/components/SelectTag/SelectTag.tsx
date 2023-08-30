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
}

const SelectTag: FC<SelectTagProps> = ({
  selectArray,
  className,
  inputName,
  value,
  onClick,
  logo,
  arrow,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={['dropdown', className, isDropdownOpen ? 'active' : ''].join(
        ' ',
      )}
      onClick={toggleDropdown}
    >
      <div className={'select'}>
        <div className={'select-logo'}>
          {logo && <img src={logo} alt={'arrow'} />}
          <span>{value}</span>
        </div>
        <img src={arrow} alt={'arrow'} />
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
