import React from 'react';
import { useSocket } from 'socket.io-react-hook';

import ClassAddButton from './components/ClassAddButton';
import ClassButton from './components/ClassButton';
import './App.css';

function App() {
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
    console.log('hi');
  }, []);

  return (
    <div className="App">
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 m-8">
        <li>
          <ClassButton courseName="전산학특강<FE개발>" isLive isMine />
        </li>
        <li>
          <ClassButton courseName="컴퓨터 시스템" isLive isMine={false} />
        </li>
        <li>
          <ClassButton courseName="전산기조직" isLive={false} isMine />
        </li>
        <li>
          <ClassButton courseName="알고리즘 개론" isLive={false} isMine={false} />
        </li>
        <li>
          <ClassAddButton />
        </li>
      </ul>
    </div>
  );
}

export default App;
