import { FC } from 'react';

import './_EditMode.scss';

interface EditModeProps {
  editMode: boolean;
  message: string;
  colorMessage: string;
  onEditMode: () => void;
  offEditMode: () => void;
  sendRequest: () => void;
  className?: string;
}

const EditMode: FC<EditModeProps> = ({
  editMode,
  message,
  colorMessage,
  onEditMode,
  offEditMode,
  sendRequest,
  className,
}) => {
  return (
    <div className={'edit-mode-container'}>
      <p className={`edit-mode-error edit-mode-error-${colorMessage}`}>
        {message}
      </p>
      <div
        className={
          !className ? 'edit-mode' : `edit-mode edit-mode-${className}`
        }
      >
        {!editMode && <div className={'edit'} onClick={onEditMode} />}
        {editMode && (
          <>
            <div className={'ok'} onClick={sendRequest} />
            <div className={'close'} onClick={offEditMode} />
          </>
        )}
      </div>
    </div>
  );
};

export default EditMode;
