import { FC } from 'react';

import './_ModalChangePasswordReq.scss';

interface ModalChangePasswordReqProps {
  status: string;
  description: string;
}

const ModalChangePasswordReq: FC<ModalChangePasswordReqProps> = ({
  status,
  description,
}) => {
  return (
    <div className={'modal-request-bg'}>
      <div className={'modal-request'}>
        <h3>{status}</h3>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default ModalChangePasswordReq;
