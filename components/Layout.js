import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <link
        async
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      {children}
    </div>
  );
};

export default Layout;
