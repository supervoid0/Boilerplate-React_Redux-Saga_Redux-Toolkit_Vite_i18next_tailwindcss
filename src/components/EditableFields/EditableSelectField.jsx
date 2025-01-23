// React imports
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Ant Design imports
import { Select, Typography } from 'antd';
import { CheckOutlined, EditTwoTone } from '@ant-design/icons';

const { Text } = Typography;

function EditableSelectField({
  copyable = false,
  fieldName,
  value,
  onSubmit,
  label,
  options = [],
  width = 240,
  size = 'middle',
  validvalues = {},
  loading = false,
  disabled = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState(value);

  useEffect(() => setSelected(value), [value]);

  const handleSubmit = () => {
    onSubmit({ [fieldName]: selected });
    setIsEditing(false);
  };

  const displayValue = validvalues[value] || value || 'unassigned';

  return (
    <div style={{ width: `${width}px` }}>
      {label && <div className="w-full pb-0.5">{label}</div>}
      <div className="flex gap-2 font-semibold min-h-8">
        {isEditing ? (
          <div className="w-10/12">
            <Select
              loading={loading}
              disabled={disabled}
              onSelect={setSelected}
              showSearch
              style={{ width: '100%' }}
              placeholder="Select"
              options={options}
              value={selected}
              size={size}
            />
          </div>
        ) : (
          <div className="flex items-center max-w-60">
            <Text ellipsis copyable={copyable}>
              {displayValue}
            </Text>
          </div>
        )}

        <div className="flex items-center">
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
      </div>
    </div>
  );
}

EditableSelectField.propTypes = {
  copyable: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number,
  size: PropTypes.string,
  validvalues: PropTypes.object,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default memo(EditableSelectField);
