import React from 'react';

import Header from './Header';
import Footer from './Footer';
import { mergeClassNames, Styled } from '../utils/style';

const Layout: React.FC<Styled<{}>> = ({ className, style, children }) => (
  <div style={style} className={mergeClassNames('w-full h-full bg-white absolute top-0', className)}>
    {children}

    <Header />
    <Footer />
  </div>
);

export default Layout;
