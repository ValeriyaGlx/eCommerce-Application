import { FC } from 'react';
import './_InputSubmit.scss';

interface InputSubmitProps {
  className: string;
  value: string;
}

const InputSubmit: FC<InputSubmitProps> = ({ className, value }) => {
  return (
    <>
      <input className={className} type={'submit'} value={value} />
    </>
  );
};

export default InputSubmit;
