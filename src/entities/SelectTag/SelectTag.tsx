import React, { FC } from 'react';

import './_SelectTag.scss';

import arrow from '../../assets/icons/down-arrow-black.png';

interface SelectTagProps {
  defaultData: string;
  selectArray: { value: string; data: string; id: number }[];
  className: string;
  openDropDown: (e: React.MouseEvent) => void;
}

const SelectTag: FC<SelectTagProps> = ({
  selectArray,
  defaultData,
  className,
  openDropDown,
}) => {
  return (
    <div className={['dropdown', className].join(' ')} onClick={openDropDown}>
      <div className={'select'}>
        <span>{defaultData}</span>
        <img src={arrow} alt={'arrow'} />
      </div>
      <input type='hidden' />
      <ul className={'dropdown-menu'}>
        {selectArray.map(({ value, data, id }) => (
          <li key={id} value={value}>
            {data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectTag;
