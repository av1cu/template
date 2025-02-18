import { Grid2, Pagination, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TableItem from '../components/TableItem';

const Schedule = () => {
  const [data, setData] = useState([
    {
      id: 1,
      data: [
        { label: 'Номер вагона', value: '001' },
        { label: 'Тип вагона', value: 'Пассажирский' },
        { label: 'Заказчик', value: 'Казахстан Темир Жолы' },
        { label: 'Договор', value: '№123/2024' },
        { label: 'Начало ремонта', value: '2024-11-10' },
        { label: 'Тип ремонта', value: 'Покраска' },
        { label: 'Статус', value: 'Готово' },
      ],
    },
    {
      id: 2,
      data: [
        { label: 'Номер вагона', value: '002' },
        { label: 'Тип вагона', value: 'Грузовой' },
        { label: 'Заказчик', value: 'Российские Железные Дороги' },
        { label: 'Договор', value: '№124/2024' },
        { label: 'Начало ремонта', value: '2024-11-12' },
        { label: 'Тип ремонта', value: 'Обновление' },
        { label: 'Статус', value: 'В процессе' },
      ],
    },
    {
      id: 3,
      data: [
        { label: 'Номер вагона', value: '003' },
        { label: 'Тип вагона', value: 'Пассажирский' },
        { label: 'Заказчик', value: 'Укрзализныця' },
        { label: 'Договор', value: '№125/2024' },
        { label: 'Начало ремонта', value: '2024-11-14' },
        { label: 'Тип ремонта', value: 'Починка' },
        { label: 'Статус', value: 'Готово' },
      ],
    },
    // Добавлено ещё 27 записей для полной пагинации
    ...Array.from({ length: 27 }, (_, index) => ({
      id: index + 4,
      data: [
        { label: 'Номер вагона', value: `00${index + 4}` },
        {
          label: 'Тип вагона',
          value: index % 2 === 0 ? 'Грузовой' : 'Пассажирский',
        },
        { label: 'Заказчик', value: 'Глобал Логистика' },
        { label: 'Договор', value: `№12${index + 4}/2024` },
        { label: 'Начало ремонта', value: `2024-11-${15 + (index % 15)}` },
        {
          label: 'Тип ремонта',
          value:
            index % 3 === 0
              ? 'Покраска'
              : index % 3 === 1
              ? 'Обновление'
              : 'Починка',
        },
        { label: 'Статус', value: index % 2 === 0 ? 'В процессе' : 'Готово' },
      ],
    })),
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const labels = paginatedData[0]?.data.map((item) => item.label) || [];
  const rows = paginatedData.map((wagon) => wagon.data);

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              data: item.data.map((field) =>
                field.label === 'Статус'
                  ? { ...field, value: newStatus }
                  : field
              ),
            }
          : item
      )
    );
  };

  return (
    <Grid2 container>
      <Grid2 size={2}>
        <Sidebar />
      </Grid2>
      <Grid2 size={10}>
        <div className='content'>
          <Typography variant='h4' sx={{ mb: 2 }}>
            Расписание
          </Typography>
          <TableItem
            rows={rows}
            labels={labels}
            onStatusChange={handleStatusChange}
          />
          <Stack sx={{ justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              shape='rounded'
              sx={{ width: '100%' }}
            />
          </Stack>
        </div>
      </Grid2>
    </Grid2>
  );
};

export default Schedule;
