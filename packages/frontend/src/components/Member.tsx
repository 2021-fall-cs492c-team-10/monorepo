import React from 'react';

import profile from '../assets/profile.png';
import { mergeClassNames, Styled } from '../utils/style';

interface Props {
    name: string;
    img: string;
    my: boolean;
    speaking: boolean;
    background: string;
}

const Member: React.FC<Styled<Props>> = ({
    name, img, my, speaking, background,
  }) => (
    <div>
    {
        speaking && (
            <button type="button" className="w-9 h-9 ml-2 mr-5 px-2 py-2 bg-pink-500 rounded-full items-center content-center justify-center animate-ping">
                <img src={profile} alt="profile" style={{ height: "20px", width: "20px" }}/>
            </button>
        )
    }
    {
        my && (
            <button type="button" className="w-9 h-9 ml-2 mr-5 px-2 py-2 bg-gray-400 rounded-full items-center content-center justify-center">
                <img src={profile} alt="profile" style={{ height: "20px", width: "20px" }}/>
            </button>
        )
    }
    </div>
  );

export default Member;


