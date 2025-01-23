import PropTypes from 'prop-types';
import React, { memo } from 'react';

function DataEntryWrapper({
  children,
  label,
  error,
  showError = true,
  labelBg = 'bg-slate-100',
}) {
  return (
    <div className='relative'>
      <div
        className={`absolute text-xs z-20 rounded -top-2 left-2 px-1 ${labelBg}`}
      >
        {label}
      </div>
      {children}
      <div
        className={`text-red-600 text-xs h-3 ${showError ? 'block' : 'hidden'}`}
      >
        {error}
      </div>
    </div>
  );
}

DataEntryWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  showError: PropTypes.bool,
  labelBg: PropTypes.string,
};

export default memo(DataEntryWrapper);
