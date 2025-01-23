import PropTypes from 'prop-types';
import React, { memo } from 'react';

function PageTitle({ title }) {
  return <div className='pb-2 text-xl font-medium md:text-3xl'>{title}</div>;
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default memo(PageTitle);
