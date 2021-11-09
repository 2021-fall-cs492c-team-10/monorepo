import { NumberSymbol20Filled } from '@fluentui/react-icons';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { useSocket } from 'socket.io-react-hook';

import ClassList from './components/ClassList';
import Debug from './components/Debug';
import ScreenHeightMeasure from './components/ScreenHeightMeasure';
import YTPlayer from './components/YTPlayer';
import YTWrapper from './components/YTWrapper';
import useScreenType, { ScreenType } from './hooks/useScreenType';

function App() {
  const screenType = useScreenType();
  const { socket, connected } = useSocket(
    '/',
    process.env.NODE_ENV === 'production' || !process.env.REACT_APP_PROXY_URL
      ? undefined
      : {
        host: process.env.REACT_APP_PROXY_URL.replace(/https?:\/\//g, ''),
      },
  );

  React.useEffect(() => {
    fetch('/api')
      .then((r) => r.text())
      .then((s) => console.log(`/: ${s}`));
  }, []);

  interface ClassInfo {
    courseName: string;
    live: boolean;
    my: boolean;
    background: string;
  }

  const classinfo: ClassInfo[] = [
    {
      background: 'bg-pink-500',
      courseName: '전산학특강<FE개발>',
      live: true,
      my: true,
    },
    {
      background: 'bg-violet-100',
      courseName: '컴퓨터 시스템',
      live: true,
      my: false,
    },
    {
      background: 'bg-pink-300',
      courseName: '알고리즘 개론',
      live: false,
      my: false,
    },
    {
      background: 'bg-violet-500',
      courseName: '전산기조직',
      live: false,
      my: true,
    },
  ];

  const [videoId, setVideoId] = React.useState<string | undefined>(undefined);
  const [classinfos, setClass] = React.useState(classinfo);

  return (
    <Router>
      {/* 화면 vh 조정 */}
      <ScreenHeightMeasure />

      <Debug>
        <span className="bold text-blue-500">
          {connected ? 'Connected!' : 'Disconnected.'}
        </span>
        <br />
        {/* Tailwind screen prefix에 대한 workaround (이슈 #49 참조) */}
        <span
          className={{
            [ScreenType.MobilePortait]: 'text-red-500',
            [ScreenType.MobileLandscape]: 'text-green-500',
            [ScreenType.Desktop]: 'text-blue-500',
          }[screenType]}
        >
          Screen type:
          {' '}
          {ScreenType[screenType]}
        </span>
        <br />
        <button
          type="button"
          onClick={() => {
            setVideoId(videoId ? undefined : 'Zyi9QUB-fyo');
          }}
        >
          {videoId ? 'Remove videoId' : 'Set videoId'}
        </button>
      </Debug>
      <div className="w-full h-full bg-white">
        {/* Example usage of `YTWrapper` and `YTPlayer`. */}
        <Route
          path="/"
          render={({ location, history }) => {
            const inClass = /^\/classes\/\d+$/.test(location.pathname);
            return (
              <div>
                <YTWrapper
                  isPresent={!!videoId}
                  inClass={inClass}
                  onClick={() => {
                    history.push('/classes/12345');
                  }}
                >
                  <YTPlayer videoId={videoId} />
                </YTWrapper>
                <ClassList classInfos={classinfos} />
              </div>
            );
          }}
        />
      </div>
      <div className="absolute top-0 left-0 z-10">
        <Route
          path="/classes/:id"
          render={() => (
            <Link to="/">Back</Link>
          )}
        />
        <Route
          path="/test/tailwind"
          render={() => (
            <div className="p-8 w-80 flex flex-col gap-4">
              {/* Sample input */}
              <div className="relative w-full h-12">
                <div className="text-gray-700 mr-4 absolute left-5 top-3.5 select-none pointer-events-none">
                  <NumberSymbol20Filled />
                </div>
                <input
                  className="bg-gray-200 text-emph w-full h-full pr-5 pl-14 rounded-full font-mono"
                />
              </div>
              {/* Sample button */}
              <button
                type="button"
                className="
                  w-full h-12 rounded-full
                  flex items-center justify-center
                  bg-primary-500 hover:bg-primary-500 active:bg-primary-700
                  text-white text-emph font-bold
                  shadow-button hover:shadow-button-hover active:shadow-button shadow-color-primary
                  "
              >
                <div className="mr-3 select-none pointer-events-none">
                  <NumberSymbol20Filled />
                </div>
                <span>Re-hash</span>
              </button>
            </div>
          )}
        />
      </div>
    </Router>
  );
}

export default App;
