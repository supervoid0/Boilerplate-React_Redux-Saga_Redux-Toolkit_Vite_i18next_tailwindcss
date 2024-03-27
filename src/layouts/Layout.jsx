import React from 'react';
import { useSelector } from 'react-redux';

import { Navbar } from '../components';
import { loadingSelector } from './../containers/App/selectors';

const Layout = ({ pageTitle, ...props }) => {
  const loading = useSelector(loadingSelector());

  return (
    <div className="font-roboto font-thin">
      <Navbar />
        {loading ? <div className="text-center">... loading ...</div> : props.children}
    </div>
  );
};

export default Layout;
