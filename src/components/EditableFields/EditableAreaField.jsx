import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Typography } from 'antd';
import { CheckOutlined, EditTwoTone } from '@ant-design/icons';

const { Paragraph } = Typography;
const { TextArea } = Input;

function EditableAreaField({
  copyable = false,
  fieldName,
  value,
  onSubmit,
  label,
  editable = false,
  rows = 5,
  placeholder,
  maxLength,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(value);

  const handleSubmit = () => {
    onSubmit({ [fieldName]: inputText });
    setIsEditing(false);
  };

  const renderEditControl = () => {
    if (!editable) return null;
    return isEditing ? (
      <CheckOutlined
        onClick={handleSubmit}
        style={{ fontSize: '16px', color: 'green' }}
      />
    ) : (
      <EditTwoTone
        style={{ fontSize: '16px' }}
        onClick={() => setIsEditing(true)}
      />
    );
  };

  useEffect(() => setInputText(value), [value]);

  return (
    <div className={`w-11/12 pb-4`}>
      <div className='w-full md:pb-1'>{label}</div>
      <div className='flex gap-2 font-semibold min-h-20'>
        {((!editable || !isEditing) && (
          <Paragraph
            style={{ margin: 0 }}
            ellipsis={{
              rows,
              expandable: true,
              symbol: 'more',
            }}
            copyable={copyable}
          >
            {value || 'unassigned'}
          </Paragraph>
        )) || (
          <TextArea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            maxLength={maxLength}
            showCount
            style={{
              resize: 'none',
            }}
          />
        )}

        <div>{renderEditControl()}</div>
      </div>
    </div>
  );
}

EditableAreaField.propTypes = {
  copyable: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.node,
  editable: PropTypes.bool,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
};

export default memo(EditableAreaField);
