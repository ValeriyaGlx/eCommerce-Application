import { FC } from 'react';

import './_EditMode.scss';

interface EditModeProps {
  editMode: boolean;
  message: string;
  colorMessage: string;
  onEditMode: () => void;
  offEditMode: () => void;
  sendRequest: () => void;
}

const EditMode: FC<EditModeProps> = ({
  editMode,
  message,
  colorMessage,
  onEditMode,
  offEditMode,
  sendRequest,
}) => {
  return (
    <div className={'edit-mode-container'}>
      <p className={`edit-mode-error edit-mode-error-${colorMessage}`}>
        {message}
      </p>
      <div className={'edit-mode'}>
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
