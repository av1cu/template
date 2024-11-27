import { Grid2, Pagination, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TableItem from '../components/TableItem';

const Schedule = () => {
  const [data, setData] = useState([
    {
      id: 1,
      data: [
        { label: 'Название вагона', value: 'Вагон 101' },
        { label: 'Компания', value: 'Казахстан Темир Жолы' },
        { label: 'Срок выдачи', value: '2024-11-20' },
        { label: 'Тип ремонта', value: 'Покраска' },
        { label: 'Деталь', value: 'Шины' },
        { label: 'Цена', value: '5000 тг' },
        { label: 'Cтатус', value: 'Готово' },
      ],
    },
    {
      id: 2,
      data: [
        { label: 'Название вагона', value: 'Вагон 102' },
        { label: 'Компания', value: 'Российские Железные Дороги' },
        { label: 'Срок выдачи', value: '2024-11-15' },
        { label: 'Тип ремонта', value: 'Обновление' },
        { label: 'Деталь', value: 'Воздухораспределитель' },
        { label: 'Цена', value: '12000 тг' },
        { label: 'Cтатус', value: 'Готово' },
      ],
    },
    {
      id: 3,
      data: [
        { label: 'Название вагона', value: 'Вагон 103' },
        { label: 'Компания', value: 'Укрзализныця' },
        { label: 'Срок выдачи', value: '2024-11-18' },
        { label: 'Тип ремонта', value: 'Починка' },
        { label: 'Деталь', value: 'Валы' },
        { label: 'Цена', value: '8000 тг' },
        { label: 'Cтатус', value: 'Готово' },
      ],
    },
    {
      id: 4,
      data: [
        { label: 'Название вагона', value: 'Вагон 104' },
        { label: 'Компания', value: 'Белорусская Железная Дорога' },
        { label: 'Срок выдачи', value: '2024-11-22' },
        { label: 'Тип ремонта', value: 'Покраска' },
        { label: 'Деталь', value: 'Шины' },
        { label: 'Цена', value: '4500 тг' },
        { label: 'Cтатус', value: 'В процессе' },
      ],
    },
  ]);
  const labels = data[0]?.data.map((item) => item.label) || [];
  const rows = data.map((wagon) => wagon.data.map((item) => item.value));

  return (
    <Grid2 container>
      <Grid2 size={2}>
        <Sidebar />
      </Grid2>
      <Grid2 size={10} sx={{ p: 2 }}>
        <div className='content'>
          <Typography variant='h4' sx={{ mb: 2 }}>
            Расписание
          </Typography>
          <TableItem rows={rows} labels={labels} />
          <Stack sx={{ justifyContent: 'center', mt: 2 }}>
            <Pagination count={10} shape='rounded' sx={{ width: '100%' }} />
          </Stack>
        </div>
      </Grid2>
    </Grid2>
  );
};

export default Schedule;
