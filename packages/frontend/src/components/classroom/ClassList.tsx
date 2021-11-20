import React from 'react';

import generateClassroomHash from '../../functions/generateClassroomHash';
import { Classroom } from '../../types/classroom';

import ClassAddButton from './ClassAddButton';
import ClassButton from './ClassButton';
import styles from './ClassList.module.css';

interface Props {
  classrooms: Classroom[];
  setClassroom: React.Dispatch<React.SetStateAction<Classroom[]>>;
}

type HandleCreate = (courseName: string) => void;

const ClassList: React.FC<Props> = ({ classrooms, setClassroom }) => {
  const handleCreate: HandleCreate = (name: string) => {
    const newClass = {
      hash: generateClassroomHash(),
      name,
      videoId: null,
      isLive: false,
      isMine: true,
    };
    setClassroom([...classrooms, newClass]);
  };

  return (
    <ul className={styles.container}>
      {classrooms.map((classroom) => (
        <li key={classroom.hash}>
          <ClassButton
            classroom={classroom}
          />
        </li>
      ))}
      <li>
        <ClassAddButton handleCreate={handleCreate} />
      </li>
    </ul>
  );
};

export default ClassList;
