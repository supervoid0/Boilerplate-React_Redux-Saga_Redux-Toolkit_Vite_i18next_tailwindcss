import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Layout } from '../../layouts';
import { routes } from '../../utils';
import { fetchUsers } from './reducer';
import { usersSelector } from './selectors';

const Users = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const users = useSelector(usersSelector());

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Layout pageTitle={t('containers.users.title')}>
      <div> Users</div>
    </Layout>
  );
};

export default Users;
