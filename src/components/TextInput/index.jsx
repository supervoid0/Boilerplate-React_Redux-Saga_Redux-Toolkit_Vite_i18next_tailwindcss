import { Input } from 'antd';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

function TextIntput({ onChange, label, value, placeholder, error, status }) {
  return (
    <div className='w-full'>
      <div>{label}</div>
      <div>
        <Input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          status={status}
        />
      </div>
      <div className='h-3 text-xs text-red-600'>{error}</div>
    </div>
  );
}

TextIntput.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  status: PropTypes.string
};

export default memo(TextIntput);
