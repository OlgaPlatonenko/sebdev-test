import { FC } from 'react';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { LoginForm } from '../../components';
import { login } from '../../api/login';
import { IUserLoginInput } from '../../api/types';
import { setIsLoggedIn, setUsername } from '../../store/userSlice';

interface LoginScreenProps {}

const LoginScreen: FC<LoginScreenProps> = () => {
  const routeHistory = useHistory();
  const reduxDispatch = useDispatch();

  const onSubmit = (data: IUserLoginInput) => {
    const user = login(data);

    if (!user) {
      message.error('Ошибка авторизации');
      localStorage.removeItem('authToken');
      reduxDispatch(setIsLoggedIn(false));
      return;
    }

    localStorage.setItem('authToken', user.token);
    reduxDispatch(setIsLoggedIn(true));
    reduxDispatch(setUsername(user.username));
    routeHistory.push('/');
  };

  return (
    <div>
      <LoginForm
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default LoginScreen;
