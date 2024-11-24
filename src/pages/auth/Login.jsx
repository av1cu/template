import { Card, CardContent, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import ButtonItem from '../../components/Button';
import styles from './auth.module.css';
import TextFieldItem from '../../components/TextField';
import { useNavigate } from 'react-router';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    navigate('/inventory');
  };
  return (
    <Container maxWidth='xs' className={styles.container}>
      <Typography variant='h4' align='center' sx={{ mb: 4 }}>
        Авторизация
      </Typography>
      <Card sx={{ width: '100%' }}>
        <CardContent>
          <TextFieldItem
            label='Логин'
            value={login}
            handleChange={handleLoginChange}
            size='small'
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextFieldItem
            label='Пароль'
            value={password}
            handleChange={handlePasswordChange}
            size='small'
            fullWidth
            sx={{ mb: 1 }}
            type='password'
          />
          <ButtonItem
            label='Войти'
            variant='outlined'
            handleChange={handleSubmit}
            size='small'
            fullWidth
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
