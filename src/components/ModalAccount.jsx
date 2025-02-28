import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close'; // Иконка для кнопки "X"
import styles from './accountModal.module.css'; // Подключим стили для модального окна
import { SERVER } from '../const';

const AccountModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [error, setError] = useState(''); // Стейт для отображения ошибок

const handleSubmit = async () => {
  if (newPassword === confirmPassword) {
    try {
      // Получаем токен из localStorage
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('Токен не найден, пожалуйста, войдите в систему');
        return;
      }

      // Отправляем запрос на сервер для смены пароля
      const response = await fetch(SERVER+'/auth/changepassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: oldPassword,  // Используем currentPassword, как на сервере
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Если все прошло успешно
        alert('Пароль успешно изменен!');
        handleClose(); // Закрыть модальное окно
      } else {
        // Если ошибка на сервере
        setError(data.message || 'Произошла ошибка при смене пароля');
      }
    } catch (error) {
      console.error(error);
      setError('Произошла ошибка при попытке смены пароля');
    }
  } else {
    setError('Пароли не совпадают!');
  }
};


  const handleLogout = () => {
    // Удаляем токен из localStorage при выходе
    localStorage.removeItem('authToken');
    
    // Логика выхода из аккаунта (например, редирект на страницу входа)
    console.log('Выход из аккаунта');
    
    // Например, редирект на страницу входа:
    navigate('/auth/login');
    
    handleClose(); // Закрыть модальное окно после выхода
  };

  return (
    <Modal open={open} onClose={handleClose} className={styles.modal}>
      <Box className={styles.modalContent}>
        {/* Кнопка закрытия модального окна */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          className={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" gutterBottom>
          Сменить пароль
        </Typography>

        {/* Ошибка */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Поля для старого и нового пароля */}
        <TextField
          label="Старый пароль"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="Новый пароль"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Подтвердите новый пароль"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Кнопки */}
        <div className={styles.buttonContainer}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Сменить пароль
          </Button>
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AccountModal;
