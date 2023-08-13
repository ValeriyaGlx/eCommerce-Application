import React, { FC } from 'react';

import './_SelectTag.scss';
import arrow from '../../assets/icons/down-arrow-black.png';
import { openDropdown } from '../../features/formCommon/openDropdown';

interface SelectTagProps {
  selectArray: { value: string; data: string; id: number }[];
  className: string;
  value: string;
  inputName: string;
  onClick: (e: React.MouseEvent) => void;
}

const SelectTag: FC<SelectTagProps> = ({
  selectArray,
  className,
  inputName,
  value,
  onClick,
}) => {
  return (
    <div className={['dropdown', className].join(' ')} onClick={openDropdown}>
      <div className={'select'}>
        <span>{value}</span>
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
