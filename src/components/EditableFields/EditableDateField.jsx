import { CheckOutlined, EditTwoTone } from '@ant-design/icons';
import { DatePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';

const { Text } = Typography;

function EditableDateField({
  editable,
  copyable,
  fieldName,
  value,
  onSubmit,
  label,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(value);

  useEffect(() => setNewDate(value), [value]);

  const handleDateChange = (date, dateString) => {
    setNewDate(dayjs(dateString).toISOString());
  };

  const handleSubmit = () => {
    onSubmit({ [fieldName]: newDate });
    setIsEditing(false);
  };

  const renderDateField = () =>
    isEditing ? (
      <DatePicker
        inputReadOnly
        size='small'
        status={newDate ? 'error' : null}
        value={newDate ? dayjs(newDate) : null}
        onChange={handleDateChange}
        style={{ width: '100%' }}
      />
    ) : (
      <Text ellipsis copyable={copyable}>
        {(value && dayjs(value).format('MM/DD/YYYY')) || 'unassigned'}
      </Text>
    );

  const renderEditButton = () => (
    <div>
      {isEditing ? (
        <CheckOutlined
          onClick={handleSubmit}
          style={{ fontSize: '16px', color: 'green' }}
        />
      ) : (
        <EditTwoTone
          style={{ fontSize: '16px' }}
          onClick={() => setIsEditing(true)}
        />
      )}
    </div>
  );

  return (
    <div className='w-36 '>
      <div className='w-full md:pb-1'>{label}</div>
      <div className='flex items-center gap-2 font-semibold'>
        {renderDateField()}
        {editable && renderEditButton()}
      </div>
    </div>
  );
}

EditableDateField.propTypes = {
  editable: PropTypes.bool,
  copyable: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
};

export default memo(EditableDateField);
