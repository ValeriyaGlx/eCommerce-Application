import { FC } from 'react';

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
