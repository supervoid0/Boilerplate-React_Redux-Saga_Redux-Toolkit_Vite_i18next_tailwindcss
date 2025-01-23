// import { validUserTypeLabel } from '../../utils/common-constants';
// import { getTolerableSizedString } from '../../utils/functions';
import PropTypes from 'prop-types';
import NavItems from './NavItems';
import { navMenues } from './constants';
import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { validUserTypeLabel } from '../../utils/common-constants';
function Sidebar({ user, logout }) {
  const { firstName = '', lastName = '', userType = '' } = user;
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={`hidden relative lg:block w-16 xl:w-60  text-white`}>
      <div className='absolute top-0 left-0 z-50 w-16 h-full shadow-2xl xl:w-60'>
        <div className='h-full w-full grid grid-rows-[150px_1fr_180px]  gap-4'>
          {/* Brand Name */}
          <div>
            <Link to={'/'}>
              <div className='flex items-center justify-center gap-2 pt-3 font-semibold xl:pt-5'>
                <div>
                  Logo
                </div>
                <div className='hidden text-xl xl:block'>App Title</div>
              </div>
            </Link>
          </div>

          {/* Menus */}
          <div className='flex flex-col items-center text-sm font-medium'>
            {navMenues.map((each) => (
              <NavItems key={each.name} item={each} selected={pathname} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default memo(Sidebar);
