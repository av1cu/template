import React, { useState } from 'react';
import SelectForm from '../../components/Select';
import { Card, CardContent, Container, Stack, Typography } from '@mui/material';
import ButtonItem from '../../components/Button';
import { useNavigate } from 'react-router';
import styles from './auth.module.css';

const City = () => {
  const [city, setCity] = useState({ label: '', value: null });
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/auth/login');
  };

  return (
    <div className={styles.bg}>
      <Container maxWidth='xs' className={styles.container}>
        <Typography variant='h4' align='center' sx={{ mb: 4 }}>
          Добро пожаловать
        </Typography>
        <Card sx={{ width: '100%' }}>
          <CardContent sx={{ pt: 4 }}>
            <SelectForm
              label='Выберите город'
              options={[
                { label: 'Алматы', value: 'almaty' },
                { label: 'Актобе', value: 'aktobe' },
                { label: 'Кызылорда', value: 'kyzylorda' },
              ]}
              value={city.value}
              handleChange={(c) => setCity(c)}
              variant='outlined'
              sx={{ mb: 2 }}
              size='small'
            />
            <ButtonItem
              label='Продолжить'
              variant='outlined'
              handleChange={handleSubmit}
              size='small'
              fullWidth
            />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default City;
