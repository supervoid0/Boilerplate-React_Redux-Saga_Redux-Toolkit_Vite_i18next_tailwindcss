import PropTypes from 'prop-types';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { validRoutes } from './constants';
import React, { memo } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes({ token, user, logout, setActiveTab, activeTab }) {
  const location = useLocation();
  if (!token) {
    return <Navigate replace to={'/login'} />;
  }

  if (location.pathname === '/') return <Navigate replace to={'/users'} />;

  if (!validRoutes.includes(location.pathname)) {
    return <Navigate replace to={'/404'} />;
  }

  return (
    <div className='w-full h-screen lg:flex'>
      <Navbar />
      <Sidebar
        user={user}
        logout={logout}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />
      <div id='main-content' className='p-2 mt-14 lg:mt-0 lg:p-4'>
        <Outlet />
      </div>
    </div>
  );
}

PrivateRoutes.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default memo(PrivateRoutes);
