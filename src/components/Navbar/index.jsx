import PropTypes from 'prop-types';
import MenuButton from '../NavButton';
import { navMenues } from '../Sidebar/constants';
import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpened, setIsOpened] = useState(false);
  const toggleMenu = () => setIsOpened(!isOpened);

  return (
    <nav className='fixed top-0 left-0 z-50 w-full px-3 py-3 bg-white lg:hidden'>
      <div className='relative flex items-center h-8'>
        <Logo />
        <MenuToggleButton isOpened={isOpened} toggleMenu={toggleMenu} />
        <NavMenu isOpened={isOpened} toggleMenu={toggleMenu} />
      </div>
    </nav>
  );
}

const Logo = () => (
  <Link to='/'>
    <div className='flex h-6 gap-1.5'>
      <div>Logo</div>
      <div className='text-[#00B8EE] font-bold text-lg'>App Title</div>
    </div>
  </Link>
);

const MenuToggleButton = ({ isOpened, toggleMenu }) => (
  <div className='absolute -right-1'>
    <MenuButton isOpened={isOpened} toggleMenu={toggleMenu} />
  </div>
);

const NavMenu = ({ isOpened, toggleMenu }) => (
  <div
    className={`${
      isOpened ? 'block' : 'hidden'
    } z-40 absolute top-9 right-0 rounded-md bg-white border border-gray-100 shadow-lg text-sm p-2`}
  >
    {navMenues.map((each) => (
      <Link to={each.link} key={each.name}>
        <div
          onClick={toggleMenu}
          className='px-2 py-2 font-medium tracking-wide'
        >
          {each.name}
        </div>
      </Link>
    ))}
  </div>
);

NavMenu.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

MenuToggleButton.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};


export default memo(Navbar);
