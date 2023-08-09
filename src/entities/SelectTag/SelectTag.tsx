import { FC } from 'react';

interface SelectTagProps {
  defaultData: string;
  selectArray: { value: string; data: string; id: number }[];
}

const SelectTag: FC<SelectTagProps> = ({ selectArray, defaultData }) => {
  return (
    <select>
      <option value=''>{defaultData}</option>
      {selectArray.map(({ value, data, id }) => (
        <option key={id} value={value}>
          {data}
        </option>
      ))}
    </select>
  );
};

export default SelectTag;
