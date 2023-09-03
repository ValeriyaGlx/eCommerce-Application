import { FC } from 'react';

import './_EditMode.scss';

interface EditModeProps {
  editMode: boolean;
  onEditMode: () => void;
  offEditMode: () => void;
  sendRequest: () => void;
}

const EditMode: FC<EditModeProps> = ({
  editMode,
  onEditMode,
  offEditMode,
  sendRequest,
}) => {
  return (
    <div>
      <div className={'edit-mode'}>
        {!editMode && <div className={'edit'} onClick={onEditMode} />}
        {editMode && (
          <>
            <div className={'ok'} onClick={sendRequest} />
            <div className={'close'} onClick={offEditMode} />
          </>
        )}
      </div>
      <div className={'edit-mode-error'}></div>
    </div>
  );
};

export default EditMode;
