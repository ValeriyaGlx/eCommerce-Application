import React, { FC } from 'react';

import './_SelectTag.scss';
import arrowLogo from '../../../assets/icons/down-arrow-black.png';
import { openDropdown } from '../../../features/formCommon/openDropdown';

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
  return (
    <div className={['dropdown', className].join(' ')} onClick={openDropdown}>
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
