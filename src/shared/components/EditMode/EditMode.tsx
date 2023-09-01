import { FC } from 'react';

import './_EditMode.scss';

interface EditModeProps {
  editMode: boolean;
  onEditMode: () => void;
  offEditMode: () => void;
}

const EditMode: FC<EditModeProps> = ({ editMode, onEditMode, offEditMode }) => {
  return (
    <div className={'edit-mode'}>
      {!editMode && <div className={'edit'} onClick={onEditMode} />}
      {editMode && (
        <>
          <div className={'ok'} />
          <div className={'close'} onClick={offEditMode} />
        </>
      )}
    </div>
  );
};

export default EditMode;
