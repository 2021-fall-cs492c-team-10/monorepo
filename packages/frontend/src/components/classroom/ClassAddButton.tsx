import React from 'react';

import { useSetRecoilState } from 'recoil';

import dialogState from '../../recoil/dialog';

import JoinCreateContent from './JoinCreateContent';

interface Props {
  handleCreate: (courseName: string) => void;
}

const ClassAddButton: React.FC<Props> = ({ handleCreate }) => {
  const setDialog = useSetRecoilState(dialogState.atom);
  const setDialogVisible = useSetRecoilState(dialogState.visible);

  return (
    <div>
      <button
        type="button"
        className="rounded-8 w-full h-48 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 flex justify-center items-center transition-button"
        onClick={() => {
          setDialog({
            visible: true,
            element: <JoinCreateContent
              handleCreate={handleCreate}
              onClose={() => setDialogVisible(false)}
            />,
            onClose: () => setDialogVisible(false),
          });
        }}
        style={{ maxWidth: 380, minWidth: 'min(100%, 300px)' }}
      >
        <div>
          <div className="text-title text-center text-gray-600" style={{ fontSize: 108, lineHeight: '96px', margin: '-20px 0 -4px 0' }}>+</div>
          <div className="text-big text-center text-gray-600 font-bold">Join or Create Class</div>
        </div>
      </button>
    </div>
  );
};

export default ClassAddButton;
