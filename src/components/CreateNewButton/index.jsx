import React, { memo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

function CreateNewButton({ onClick }) {
  return (
    <Button onClick={onClick} type='primary' size='middle'>
      <span>
        <PlusOutlined />
      </span>
      <span>Create</span>
    </Button>
  );
}

export default memo(CreateNewButton);
