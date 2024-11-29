import { Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import PasIcon from './../assets/img/FCDD32C4-55B5-4C59-8717-A15A1AACED23-removebg-preview.png';
import GruzIcon from './../assets/img/FD504E0A-3EC0-4EAE-AF86-4845AFE7BEB1-removebg-preview.png';

const InventoryCard = ({ item, handleClick }) => {
  const { data } = item;
  const wagonNumber = data.find((d) => d.label === 'Номер вагона').value;
  const date = data.find((d) => d.label === 'Дата').value;
  const status = data.find((d) => d.label === 'Статус').value;
  const wagonType = data.find((d) => d.label === 'Тип вагона').value;

  // Determine the background color based on status
  const cardStyle = {
    backgroundColor:
      status === 'В процессе'
        ? 'rgba(50, 205, 50, 0.7)'
        : 'rgba(30, 144, 255, 0.7)', // green for passenger, blue for completed
    cursor: 'pointer',
  };

  return (
    <div onClick={handleClick}>
      <Card sx={status === 'В ожидании' ? { cursor: 'pointer' } : cardStyle}>
        <CardContent>
          <Stack
            direction='row'
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant='h6'>{`Вагон №${wagonNumber}`}</Typography>
            <img
              src={wagonType === 'Пассажирский' ? PasIcon : GruzIcon}
              alt={`${wagonType} Icon`}
              style={{ width: '50px', height: '50px' }}
            />
          </Stack>
          <Typography>Дата: {date}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryCard;
