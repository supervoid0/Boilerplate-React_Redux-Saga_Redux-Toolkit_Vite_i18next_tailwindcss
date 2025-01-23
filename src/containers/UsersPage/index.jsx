// External Libraries
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';

// Ant Design Components and Icons
import {
  Table,
  Space,
  Button,
  // Input,
  Select,
  Modal,
  Tag,
  Popconfirm,
  Tooltip,
} from 'antd';
import { DeleteFilled, EditTwoTone, PlusOutlined } from '@ant-design/icons';

// Local Components
import DataEntryWrapper from '../../components/DataEntryWrapper';
import PageTitle from '../../components/PageTitle';
import TextInput from '../../components/TextInput';

// Constants and Utilities
import {
  validUserTypeLabel,
  validUserTypes,
} from '../../utils/common-constants';
import { validate } from '../../utils/functions';
import { tagColorByUserTypes, userFormValidation } from './constants';

// Redux Actions and Selectors
import {
  deleteUser,
  editUser,
  getUsers,
  createUser,
  setIsUserModalOpen,
  setForm,
  onChangeForm,
} from './reducer';
import { usersStateSelector } from './selectors';

const actionIcons = {
  Delete: <DeleteFilled className='text-red' />,
  Edit: <EditTwoTone />,
};

const createColumns = () => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    align: 'center',
    ellipsis: true,
    render: (email) => (
      <Tooltip title={email}>
        <span>{email}</span>
      </Tooltip>
    ),
  },
  {
    title: 'User Type',
    dataIndex: 'userType',
    key: 'userType',
    align: 'center',
    render: (_, record) => (
      <span>
        <Tag color={tagColorByUserTypes[record.userType] || 'red'}>
          {validUserTypeLabel[record.userType] || 'Unknown'}
        </Tag>
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    render: (_, { actions }) => (
      <Space size='small'>
        {Object.keys(actions).map((actionKey) =>
          actionKey === 'Delete' ? (
            <Popconfirm
              key={actionKey}
              placement='bottomRight'
              title='Are you sure?'
              onConfirm={() => actions[actionKey]()}
              okText='Yes'
              cancelText='No'
            >
              <Button danger size='small'>
                {actionIcons[actionKey]}
              </Button>
            </Popconfirm>
          ) : (
            <Button
              size='small'
              key={actionKey}
              onClick={() => actions[actionKey]()}
            >
              {actionIcons[actionKey]}
            </Button>
          ),
        )}
      </Space>
    ),
  },
];

const Users = () => {
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const usersState = useSelector(usersStateSelector());

  const {
    users,
    isUserModalOpen,
    isFetchingUsers,
    isSubmittingForm,
    form,
  } = usersState;
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const onClickEdit = (user) => {
    setFormErrors({});
    const { userID, firstName, lastName, email, userType } = user;
    setIsEditing(true);
    dispatch(
      setForm({
        firstName,
        lastName,
        userType,
        email,
        userID,
      }),
    );
    dispatch(setIsUserModalOpen(true));
  };

  const getFormattedData = (users = []) => {
    const formattedData = users.map((each) => {
      const { userID } = each;
      const newDatum = {
        ...each,
        name: `${each.lastName} ${each.firstName}`,
        actions: {
          Edit: () => onClickEdit(each),
          Delete: () => dispatch(deleteUser(userID)),
        },
        key: userID,
      };
      return newDatum;
    });
    return formattedData;
  };

  const changeForm = (field, value) => {
    dispatch(onChangeForm({ field, value }));
  };

  const onSubmitNew = async () => {
    const hasError = validate(
      form,
      userFormValidation,
      setFormErrors,
      formErrors,
    );
    if (!hasError) {
      dispatch(createUser(form));
    }
  };

  const onSubmitEdit = async () => {
    const hasError = validate(
      form,
      userFormValidation,
      setFormErrors,
      formErrors,
    );
    if (!hasError) dispatch(editUser(form));
  };

  const handleCancel = () => {
    setFormErrors({});
    setIsEditing(false);
    dispatch(setForm({}));
    dispatch(setIsUserModalOpen(false));
  };

  const formattedUsersData = useMemo(() => getFormattedData(users), [users]);
  const columns = useMemo(() => createColumns(), []);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className='flex flex-col w-full h-full lg:gap-3 lg:pl-5'>
      <PageTitle title={'Users Management'} />
      <div className='flex items-center gap-3'>
        <div className='ml-auto'>
          <Modal
            style={{ top: 20 }}
            width='400px'
            title={isEditing ? 'Edit User' : 'Create new user'}
            open={isUserModalOpen}
            onOk={() => {
              if (isEditing) {
                onSubmitEdit();
              } else {
                onSubmitNew();
              }
            }}
            onCancel={handleCancel}
            confirmLoading={isSubmittingForm}
            okText={isEditing ? 'Edit' : 'Create'}
            destroyOnClose={true}
          >
            <div className='w-full py-3'>
              <div className='grid grid-rows-3'>
                <div className='pb-1'>
                  <div>User Type</div>
                  <div>
                    <DataEntryWrapper error={formErrors.userType}>
                      <Select
                        placeholder={'Select User Type'}
                        status={formErrors.userType ? 'error' : null}
                        value={form.userType}
                        style={{ width: '100%' }}
                        onChange={(v) => changeForm('userType', v)}
                        options={Object.keys(validUserTypes).map((key) => ({
                          value: validUserTypes[key],
                          label: key,
                        }))}
                      />
                    </DataEntryWrapper>
                  </div>
                </div>
                <div className='pb-1'>
                  <div className='grid w-full grid-cols-2 gap-3'>
                    <TextInput
                      label={'First Name'}
                      value={form.firstName}
                      placeholder={'Input First Name'}
                      onChange={(v) => changeForm('firstName', v)}
                      error={formErrors.firstName}
                      status={formErrors.firstName ? 'error' : null}
                    />
                    <TextInput
                      label={'Last Name'}
                      value={form.lastName}
                      placeholder={'Input Last Name'}
                      onChange={(v) => changeForm('lastName', v)}
                      error={formErrors.lastName}
                      status={formErrors.lastName ? 'error' : null}
                    />
                  </div>
                </div>

                <div className='pb-1'>
                  <TextInput
                    label={'Email'}
                    value={form.email}
                    placeholder={'Input Email'}
                    onChange={(v) => changeForm('email', v)}
                    error={formErrors.email}
                    status={formErrors.email ? 'error' : null}
                  />
                </div>
                {/* <div className='pb-1'>
                  <div>Password</div>
                  <div>
                    <Input.Password
                      value={form.password}
                      placeholder='Input password'
                      onChange={(e) => changeForm('password', e.target.value)}
                      status={formErrors.password ? 'error' : null}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </Modal>
          <Button
            type='primary'
            onClick={() => {
              setIsEditing(false);
              setFormErrors({});
              dispatch(setForm({}));
              dispatch(setIsUserModalOpen(true));
            }}
          >
            <span>
              <PlusOutlined />
            </span>
            <span>Create</span>
          </Button>
        </div>
      </div>
      <div className='mt-3'>
        <Table
          columns={columns}
          dataSource={formattedUsersData}
          size='small'
          loading={isFetchingUsers}
        />
      </div>
    </div>
  );
};

export default memo(Users);
