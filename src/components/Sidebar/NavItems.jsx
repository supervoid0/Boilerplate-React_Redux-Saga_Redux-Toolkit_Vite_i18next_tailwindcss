import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

function NavItems({ item, selected }) {
  const { name, icon, link } = item;
  return (
    <Link to={link} className='w-full'>
      <div
        className={`flex justify-center w-full items-center h-14 border-b cursor-pointer ${
          selected === link ? 'bg-black bg-opacity-5' : 'bg-inherit'
        }`}
      >
        <div className='xl:w-36 grid xl:grid-cols-[24px_auto] items-center gap-2.5'>
          <div>
            <img alt={`${name} icon`} src={icon} />
          </div>
          <span className='hidden xl:block'>{name}</span>
        </div>
      </div>
    </Link>
  );
}

NavItems.propTypes = {
  item: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
};

export default memo(NavItems);
