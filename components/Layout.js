import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <link
        async
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      <Header />
      {children}
    </>
  );
};

export default Layout;
