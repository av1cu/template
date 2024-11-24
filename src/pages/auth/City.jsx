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
    <Container maxWidth='xs' className={styles.container}>
      <Typography variant='h4' align='center' sx={{ mb: 4 }}>
        Добро пожаловать
      </Typography>
      <Card sx={{ width: '100%' }}>
        <CardContent sx={{ pt: 4 }}>
          <SelectForm
            options={[
              { label: 'Алматы', value: 'almaty' },
              { label: 'Астана', value: 'astana' },
              { label: 'Шымкент', value: 'shymkent' },
              { label: 'Караганда', value: 'karaganda' },
              { label: 'Актобе', value: 'aktobe' },
              { label: 'Тараз', value: 'taraz' },
              { label: 'Павлодар', value: 'pavlodar' },
              { label: 'Усть-Каменогорск', value: 'ust-kamenogorsk' },
              { label: 'Семей', value: 'semey' },
              { label: 'Кызылорда', value: 'kyzylorda' },
              { label: 'Атырау', value: 'atyrau' },
              { label: 'Костанай', value: 'kostanay' },
              { label: 'Петропавловск', value: 'petropavlovsk' },
              { label: 'Актау', value: 'aktau' },
              { label: 'Темиртау', value: 'temirtau' },
              { label: 'Кокшетау', value: 'kokshetau' },
              { label: 'Талдыкорган', value: 'taldykorgan' },
              { label: 'Экибастуз', value: 'ekibastuz' },
              { label: 'Рудный', value: 'rudnyi' },
              { label: 'Жезказган', value: 'zhezkazgan' },
              { label: 'Балхаш', value: 'balkhash' },
              { label: 'Сатпаев', value: 'satpayev' },
              { label: 'Аксай', value: 'aksai' },
              { label: 'Жанаозен', value: 'zhanaozen' },
              { label: 'Кентау', value: 'kentau' },
              { label: 'Байконур', value: 'baikonur' },
              { label: 'Шу', value: 'shu' },
              { label: 'Сарыагаш', value: 'saryagash' },
              { label: 'Щучинск', value: 'shchuchinsk' },
            ]}
            label={city.label}
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
  );
};

export default City;
