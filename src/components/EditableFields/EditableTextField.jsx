import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Typography } from 'antd';
import { CheckOutlined, EditTwoTone } from '@ant-design/icons';

const { Text } = Typography;

const EditIcon = ({ onClick }) => (
  <EditTwoTone
    style={{ fontSize: '16px' }}
    onClick={onClick}
    role='button'
    aria-label='Edit field'
  />
);

const SaveIcon = ({ onClick }) => (
  <CheckOutlined
    onClick={onClick}
    style={{ fontSize: '16px', color: 'green' }}
    role='button'
    aria-label='Save changes'
  />
);

const DisplayValue = ({ value, copyable }) => (
  <div className='flex items-center max-w-60'>
    <Text ellipsis copyable={copyable}>
      {value || 'unassigned'}
    </Text>
  </div>
);

// Separate edit component
const EditInput = ({ id, value, onChange, onKeyDown }) => (
  <div className='w-10/12'>
    <Input
      id={id}
      size='middle'
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoFocus
    />
  </div>
);

function EditableTextField({
  copyable = false,
  fieldName,
  value = '',
  onSubmit,
  label,
  editable = false,
  width,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(value);

  useEffect(() => setInputText(value), [value]);

  const handleSubmit = () => {
    onSubmit({ [fieldName]: inputText });
    setIsEditing(false);
  };

  const handleChange = (e) => setInputText(e.target.value);

  return (
    <div style={{ width: `${width}px` }}>
      <div className='w-full pb-0.5'>
        <label htmlFor={`editable-field-${fieldName}`}>{label}</label>
      </div>
      <div className='flex gap-2 font-semibold min-h-8'>
        {!editable || !isEditing ? (
          <DisplayValue value={value} copyable={copyable} />
        ) : (
          <EditInput
            id={`editable-field-${fieldName}`}
            value={inputText}
            onChange={handleChange}
          />
        )}

        {editable && (
          <div className='flex items-center'>
            {!isEditing ? (
              <EditIcon onClick={() => setIsEditing(true)} />
            ) : (
              <SaveIcon onClick={handleSubmit} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

EditIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

SaveIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
};

DisplayValue.propTypes = {
  value: PropTypes.string,
  copyable: PropTypes.bool,
};

EditInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

EditableTextField.propTypes = {
  copyable: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
  editable: PropTypes.bool,
  width: PropTypes.number,
};

export default memo(EditableTextField);
