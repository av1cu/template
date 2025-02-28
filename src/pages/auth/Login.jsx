import { Card, CardContent, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import ButtonItem from '../../components/Button';
import styles from './auth.module.css';
import TextFieldItem from '../../components/TextField';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { SERVER } from '../../const';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Для загрузки
  const [error, setError] = useState(''); // Для отображения ошибки
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(SERVER+"/auth/login", {
        username: login,
        password: password,
      });

      const token = response.data.token; // Предположим, что токен приходит в data.token
      
      // Сохраняем токен в localStorage
      localStorage.setItem('authToken', token);

      // Редиректим пользователя на главную страницу или другую защищенную страницу
      navigate('/');
    } catch (error) {
      // Обработка ошибок, например, неправильный логин или пароль
      setError('Неверный логин или пароль');
      console.error('Ошибка при логине:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.bg}>
      <Container maxWidth="xs" className={styles.container}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Авторизация
        </Typography>
        <Card sx={{ width: '100%' }}>
          <CardContent>
            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

            <TextFieldItem
              label="Логин"
              value={login}
              handleChange={handleLoginChange}
              size="small"
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextFieldItem
              label="Пароль"
              value={password}
              handleChange={handlePasswordChange}
              size="small"
              fullWidth
              sx={{ mb: 1 }}
              type="password"
            />
            <ButtonItem
              label={loading ? 'Загрузка...' : 'Войти'}
              variant="outlined"
              handleChange={handleSubmit}
              size="small"
              fullWidth
              disabled={loading} // Делаем кнопку неактивной, если идет запрос
            />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
