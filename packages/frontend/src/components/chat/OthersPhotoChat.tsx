import { PhotoChatContent } from '@team-10/lib';
import React from 'react';

import { mergeClassNames } from '../../utils/style';

import styles from './Chat.module.css';

interface Props {
  dark: boolean;
  content: PhotoChatContent;
}
const OthersPhotoChat: React.FC<Props> = ({ dark, content }) => (
  <div className={mergeClassNames('rounded-2xl overflow-hidden', styles.maxWidth)} style={{ maxHeight: 280 }}>
    <img className={dark ? 'opacity-50' : ''} src={content.photo} alt={content.alt} />
  </div>
);

export default OthersPhotoChat;
