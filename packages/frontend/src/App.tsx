import React, { useState } from 'react';
import { useSocket } from 'socket.io-react-hook';

import ClassList from './components/classList';
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

  interface ClassInfo {
    coursename: string;
    islive: boolean;
    ismine: boolean;
  }

  const classinfo: ClassInfo[] = [
    {
      coursename: '전산학특강<FE개발>',
      islive: true,
      ismine: true,
    },
    {
      coursename: '컴퓨터 시스템',
      islive: true,
      ismine: false,
    },
    {
      coursename: '알고리즘 개론',
      islive: false,
      ismine: false,
    },
    {
      coursename: '전산기조직',
      islive: false,
      ismine: true,
    },
  ];

  const [classinfos, setClass] = useState(classinfo);
  // type AddClass = (coursename: string, islive: boolean, ismine: boolean) => void

  // const addClass: AddClass = (coursename: string, islive: boolean, ismine: boolean) => {
  //   const newclassinfo = { coursename, islive, ismine };
  //   setClass({...classinfos, newclassinfo});
  // };

  return (
    <div className="App">
      <ClassList classinfos={classinfos} />
    </div>
  );
}

export default App;
