import { makeSelectToken } from '../App/selectors';
import { attemptLogin } from './reducer';
import { loginPageStateSelector } from './selectors';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import React, { memo, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(loginPageStateSelector());
  const token = useSelector(makeSelectToken());
  const [form, setForm] = useState({});

  if (token) return <Navigate to='/' />;

  const { loading } = state;

  const onSubmit = () => {
    dispatch(attemptLogin(form));
  };

  const onChangeForm = (key, value) => {
    const newForm = { ...form };
    newForm[key] = value;
    setForm(newForm);
  };

  return (
    <div className='bg-[#25CCFF] h-full w-full flex justify-center items-center shadow-inner relative'>
      <div className='px-8 py-10 bg-white drop-shadow-xl rounded-xl w-80'>
        <div className='flex items-center justify-center'>
          <div className='flex h-7 gap-1.5'>
            <div className=''>Logo</div>
            <div className='text-[#00B8EE] text-lg font-medium'>Title</div>
          </div>
        </div>
        <div className='grid grid-rows-2 gap-4 px-3 py-6 text-xs font-medium'>
          {/* UserName */}
          <div className='flex flex-col'>
            <div className='pb-1'>Email</div>
            <div>
              <Input
                value={form.email}
                onChange={(e) => onChangeForm('email', e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className='flex flex-col'>
            <div className='pb-1'>Password</div>
            <div>
              <Input.Password
                value={form.password}
                onChange={(e) => onChangeForm('password', e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </div>
        </div>
        <div className='px-3'>
          <button
            loading={loading}
            onClick={onSubmit}
            className='hover:drop-shadow-lg w-full py-1.5 text-white bg-[#00B8EE]
           rounded-md text-sm drop-shadow-xl text-center'
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginPage);
