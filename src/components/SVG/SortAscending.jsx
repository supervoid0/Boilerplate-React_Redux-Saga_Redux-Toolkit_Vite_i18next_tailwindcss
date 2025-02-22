import React from 'react';
import PropTypes from 'prop-types';

function SortAscending({ size = '1em', color = '#000000', className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M9 8.24994C8.81 8.24994 8.62 8.17994 8.47 8.02994L6.5 6.05994L4.53 8.02994C4.24 8.31994 3.76 8.31994 3.47 8.02994C3.18 7.73994 3.18 7.25994 3.47 6.96994L5.97 4.46994C6.26 4.17994 6.74 4.17994 7.03 4.46994L9.53 6.96994C9.82 7.25994 9.82 7.73994 9.53 8.02994C9.38 8.17994 9.19 8.24994 9 8.24994Z'
        fill={color}
      />
      <path
        d='M6.5 19.75C6.09 19.75 5.75 19.41 5.75 19V5C5.75 4.59 6.09 4.25 6.5 4.25C6.91 4.25 7.25 4.59 7.25 5V19C7.25 19.41 6.91 19.75 6.5 19.75Z'
        fill={color}
      />
      <path
        d='M20 8.25H12C11.59 8.25 11.25 7.91 11.25 7.5C11.25 7.09 11.59 6.75 12 6.75H20C20.41 6.75 20.75 7.09 20.75 7.5C20.75 7.91 20.41 8.25 20 8.25Z'
        fill={color}
      />
      <path
        d='M16 14.25H12C11.59 14.25 11.25 13.91 11.25 13.5C11.25 13.09 11.59 12.75 12 12.75H16C16.41 12.75 16.75 13.09 16.75 13.5C16.75 13.91 16.41 14.25 16 14.25Z'
        fill={color}
      />
      <path
        d='M14 17.25H12C11.59 17.25 11.25 16.91 11.25 16.5C11.25 16.09 11.59 15.75 12 15.75H14C14.41 15.75 14.75 16.09 14.75 16.5C14.75 16.91 14.41 17.25 14 17.25Z'
        fill={color}
      />
      <path
        d='M18 11.25H12C11.59 11.25 11.25 10.91 11.25 10.5C11.25 10.09 11.59 9.75 12 9.75H18C18.41 9.75 18.75 10.09 18.75 10.5C18.75 10.91 18.41 11.25 18 11.25Z'
        fill={color}
      />
    </svg>
  );
}

SortAscending.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  className: PropTypes.string,
};

export default SortAscending;
