import { Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import PasIcon from './../assets/img/FCDD32C4-55B5-4C59-8717-A15A1AACED23-removebg-preview.png';
import GruzIcon from './../assets/img/FD504E0A-3EC0-4EAE-AF86-4845AFE7BEB1-removebg-preview.png';
import formatDate from '../utils/formatDate';

const InventoryCard = ({ item, handleClick }) => {
  const { data } = item;
  const wagonNumber = data.find((d) => d.label === 'Номер вагона').value;
  const date = data.find((d) => d.label === 'Дата').value;
  const status = data.find((d) => d.label === 'Статус').value;
  const wagonType = data.find((d) => d.label === 'Тип вагона').value;
  let wagongr = data.find((d) => d.label === 'Группа работ').value;
  wagongr = Array.isArray(wagongr) ? wagongr[0] : wagongr;

  const colors = [
    {
      value: 'Ходовые части',
      color: 'rgba(255, 99, 71, 0.7)',
      processColor: 'rgba(255, 69, 0, 0.7)',
    },
    {
      value: 'Рессорное подвешивание',
      color: 'rgba(255, 215, 0, 0.7)',
      processColor: 'rgba(255, 140, 0, 0.7)',
    },
    {
      value: 'Буксы и подшипники',
      color: 'rgba(70, 130, 180, 0.7)',
      processColor: 'rgba(95, 158, 160, 0.7)',
    },
    {
      value: 'Автосцепное устройство',
      color: 'rgba(50, 205, 50, 0.7)',
      processColor: 'rgba(34, 139, 34, 0.7)',
    },
    {
      value: 'Переходные устройства и буферные приборы',
      color: 'rgba(138, 43, 226, 0.7)',
      processColor: 'rgba(106, 90, 205, 0.7)',
    },
    {
      value: 'Тормозное оборудование',
      color: 'rgba(220, 20, 60, 0.7)',
      processColor: 'rgba(178, 34, 34, 0.7)',
    },
    {
      value: 'Наружная фурнитура и замочные работы',
      color: 'rgba(210, 105, 30, 0.7)',
      processColor: 'rgba(139, 69, 19, 0.7)',
    },
    {
      value: 'Отопление и водоснабжение',
      color: 'rgba(165, 42, 42, 0.7)',
      processColor: 'rgba(128, 0, 0, 0.7)',
    },
    {
      value: 'Столярные работы',
      color: 'rgba(139, 69, 19, 0.7)',
      processColor: 'rgba(210, 105, 30, 0.7)',
    },
    {
      value: 'Электро оборудование',
      color: 'rgba(255, 215, 0, 0.7)',
      processColor: 'rgba(255, 140, 0, 0.7)',
    },
    {
      value: 'Сварочные работы',
      color: 'rgba(255, 69, 0, 0.7)',
      processColor: 'rgba(220, 20, 60, 0.7)',
    },
    {
      value: 'Наружная и внутренняя окраска',
      color: 'rgba(30, 144, 255, 0.7)',
      processColor: 'rgba(70, 130, 180, 0.7)',
    },
    {
      value: 'Уборка вагона внутри',
      color: 'rgba(0, 250, 154, 0.7)',
      processColor: 'rgba(46, 139, 87, 0.7)',
    },
  ];

  const calcStyle = (status, workgroup) => {
    console.log(workgroup);
    if (status === 'Готово') {
      return { backgroundColor: 'rgba(50, 205, 50, 0.7)', cursor: 'pointer' };
    } else if (status === 'В процессе') {
      return {
        backgroundColor: colors.find((c) => c.value == workgroup)?.color,
        cursor: 'pointer',
      };
    }
  };

  // Determine the background color based on status
  const cardStyle = calcStyle(status, wagongr);

  return (
    <div onClick={handleClick}>
      <Card sx={status === 'Не начато' ? { cursor: 'pointer' } : cardStyle}>
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
          <Typography>Дата: {formatDate(date)}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryCard;
