// React and Router imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from 'react-router-dom';

// Other imports
import PropTypes from 'prop-types';

// i18n imports
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, it } from '../../locales';

// Ant Design imports
import { message, notification } from 'antd';
import {
  SmileOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

// Local imports
import { LoginPage, UsersPage } from '..';
import PrivateRoutes from '../../components/PrivateRoutes';
import { history } from '../../utils';
import {
  attemptLogout,
  loadUser,
  setActiveTab,
} from './reducer';
import { AppStateSelector } from './selectors';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: en },
    it: { translation: it },
  },
});

// PropTypes for notification object
const NotificationPropType = PropTypes.shape({
  type: PropTypes.oneOf(['error', 'warning', 'success', 'loading', 'info']),
  title: PropTypes.string,
  description: PropTypes.string,
  placement: PropTypes.string,
  key: PropTypes.string,
  duration: PropTypes.number,
});

const App = () => {
  const dispatch = useDispatch();
  const appState = useSelector(AppStateSelector());
  const [messageApi, contextHolder] = message.useMessage();
  const [
    notificationApi,
    notificationContextHolder,
  ] = notification.useNotification({
    stack: {
      threshold: 2,
    },
  });

  const {
    currentUser,
    // loading,
    token,
    alertMessage,
    activeTab,
    notificationObject,
  } = appState;


  const NOTIFICATION_ICONS = {
    warning: <WarningOutlined style={{ color: 'orange' }} />,
    success: <CheckCircleOutlined style={{ color: 'green' }} />,
    error: <CloseCircleOutlined style={{ color: 'red' }} />,
    loading: <LoadingOutlined style={{ color: '#108ee9' }} />,
    info: <SmileOutlined style={{ color: '#108ee9' }} />,
  };

  const showNotification = ({
    type = 'error',
    title,
    description,
    placement = 'top',
    key,
    duration,
  }) => {
    notificationApi.open({
      message: title,
      description,
      icon: NOTIFICATION_ICONS[type] || NOTIFICATION_ICONS.info,
      placement,
      duration,
      ...(key ? { key } : {}),
    });
  };

  const showMessage = (type = 'error', content = '', key) => {
    messageApi.open({
      key,
      type,
      content,
      duration: 3,
    });
  };

  useEffect(() => {
    if (Object.keys(alertMessage).length) {
      showMessage(alertMessage.type, alertMessage.text);
    }
  }, [alertMessage]);

  useEffect(() => {
    if (Object.keys(notificationObject).length) {
      showNotification(notificationObject);
    }
  }, [notificationObject]);

  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, [token]);

  const propsGroup = {
    user: currentUser,
    token,
    logout: () => dispatch(attemptLogout()),
    setActiveTab: (tab) => dispatch(setActiveTab(tab)),
    activeTab,
  };

  return (
    <div
      className='w-full antialiased h-dvh font-poppins bg-slate-100'
      id='app-root'
    >
      {contextHolder}
      {notificationContextHolder}
      <HistoryRouter history={history}>
        <Routes>
          <Route exact path='/login' element={<LoginPage />} />
          <Route path='/' element={<PrivateRoutes {...propsGroup} />}>
            <Route exact path='/users' element={<UsersPage />} />
          </Route>
        </Routes>
      </HistoryRouter>
    </div>
  );
};

App.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  logout: PropTypes.func,
  setActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
  alertMessage: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
  }),
  notificationObject: NotificationPropType,
};

export default App;
