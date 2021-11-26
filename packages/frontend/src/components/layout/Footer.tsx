/* eslint-disable max-len */
import { Speaker224Filled, EyeShow24Filled } from '@fluentui/react-icons';
import { MemberJSON } from '@team-10/lib';
import React, { CSSProperties } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import useMainClassroom from '../../hooks/useMainClassroom';
import useScreenType from '../../hooks/useScreenType';
import meState from '../../recoil/me';
import ScreenType from '../../types/screen';
import AmbientButton from '../buttons/AmbientButton';

import FooterMember from './FooterMember';

interface Props {
  members: MemberJSON[];
}

const Footer: React.FC<Props> = ({ members }) => {
  const screenType = useScreenType();
  const location = useLocation();
  const history = useHistory();
  const me = useRecoilValue(meState.atom);
  const mainClassroom = useMainClassroom();
  const inClassroom = /^\/classrooms\/\w{3}-\w{3}-\w{3}$/.test(location.pathname);

  let displayCount = 6;

  return (
    (screenType === ScreenType.Desktop || screenType === ScreenType.MobilePortrait ? (
      <div
        className="flex fixed border-t-4 border-primary-500 bg-white z-layout bottom-0 w-100vw items-center content-center justify-between"
        style={{ height: 'calc(env(safe-area-inset-bottom, 0px) + 76px)' }}
      >
        <div className="flex items-center content-center justify-center">
          {/* Members in the current class */}
          {members.map((member) => {
            displayCount -= 1;
            return (
              (member.isHost || member.isSpeaking || member.isMe) ? (
                <FooterMember
                  name={member.id}
                  img={member.img}
                  isHost={member.isHost}
                  isMe={member.isMe}
                  isSpeaking={member.isSpeaking}
                />
              ) : screenType === ScreenType.Desktop && displayCount >= 0 ? (
                <FooterMember
                  name={member.id}
                  img={member.img}
                  isHost={member.isHost}
                  isMe={member.isMe}
                  isSpeaking={member.isSpeaking}
                />
              ) : screenType === ScreenType.MobilePortrait && displayCount >= 2 ? (
                <FooterMember
                  name={member.id}
                  img={member.img}
                  isHost={member.isHost}
                  isMe={member.isMe}
                  isSpeaking={member.isSpeaking}
                />
              ) : (
                ''
              ));
          })}
          {/* Number of users in the current class */}
          {screenType === ScreenType.Desktop && members.length > 6 && (
            <div className="font-bold order-last">
              +
              {members.length - 6}
            </div>
          )}
          {screenType === ScreenType.MobilePortrait && members.length > 4 && (
            <div className="font-bold order-last">
              +
              {members.length - 4}
            </div>
          )}
        </div>
        {/* Speaking button when in class */}
        <div className="justify-end order-last">
          {inClassroom ? (
            <div className="w-10">
              <AmbientButton
                alt="Speak"
                className="font-bold bg-pink-500"
                icon={<Speaker224Filled />}
                onClick={() => {
                }} // TODO
              >
                Speak
              </AmbientButton>
            </div>
          ) : (
            <div className="flex px-7 font-bold">
              {/* mainClassroom?.name */}
              전산학특강: 프런트엔드 개발
            </div>
          )}
        </div>
      </div>
    ) : screenType === ScreenType.MobileLandscape ? (
      <div
        className="flex fixed z-layout bottom-0 w-100vw items-center content-center justify-end"
        style={{ height: 'calc(env(safe-area-inset-bottom, 0px) + 76px)' }}
      >
        <AmbientButton
          alt="Chat Visibility"
          className="bg-gray-500 mx-2"
          icon={<EyeShow24Filled />}
          onClick={() => {
          }} // TODO
        />
        <AmbientButton
          alt="Speak"
          className="bg-gray-500 ml-2 mr-4"
          icon={<Speaker224Filled />}
          onClick={() => {
          }} // TODO
        />
      </div>
    ) : (
      <div>Empty</div>
    ))
  );
};

export default Footer;
