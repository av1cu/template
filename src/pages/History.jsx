import { Grid2, Pagination, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TableItem from '../components/TableItem';
import ModalShowInfo from '../components/ModalShowInfo';

const History = () => {
  const [data, setData] = useState([
    {
      id: 1,
      data: [
        { label: 'Номер вагона', value: '001' },
        { label: 'Тип вагона', value: 'Пассажирский' },
        { label: 'Заказчик', value: 'Казахстан Темир Жолы' },
        { label: 'Договор', value: '№123/2024' },
        { label: 'Начало ремонта', value: '2024-11-10' },
        { label: 'Конец ремонта', value: '2024-11-10' },
        { label: 'Тип ремонта', value: 'Покраска' },
        { label: 'Группа работ', value: 'Основные работы' },
        { label: 'Наименование работ', value: 'Покраска кузова' },
        { label: 'Наименование затрат', value: 'Краска, материалы' },
        { label: 'Плановая сумма', value: '50000' },
        { label: 'Фактическая сумма', value: '48000' },
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
        { label: 'Конец ремонта', value: '2024-11-10' },
        { label: 'Тип ремонта', value: 'Обновление' },
        { label: 'Группа работ', value: 'Техническое обслуживание' },
        { label: 'Наименование работ', value: 'Обновление системы управления' },
        { label: 'Наименование затрат', value: 'Запчасти, установка' },
        { label: 'Плановая сумма', value: '70000' },
        { label: 'Фактическая сумма', value: '69000' },
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
        { label: 'Конец ремонта', value: '2024-11-10' },
        { label: 'Тип ремонта', value: 'Починка' },
        { label: 'Группа работ', value: 'Капитальный ремонт' },
        { label: 'Наименование работ', value: 'Замена колесных пар' },
        { label: 'Наименование затрат', value: 'Колеса, материалы' },
        { label: 'Плановая сумма', value: '100000' },
        { label: 'Фактическая сумма', value: '95000' },
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
        { label: 'Конец ремонта', value: `2024-11-${15 + (index % 15)}` },
        {
          label: 'Тип ремонта',
          value:
            index % 3 === 0
              ? 'Покраска'
              : index % 3 === 1
              ? 'Обновление'
              : 'Починка',
        },
        { label: 'Группа работ', value: 'Ремонт оборудования' },
        { label: 'Наименование работ', value: 'Замена электрики' },
        { label: 'Наименование затрат', value: 'Электрические кабели' },
        { label: 'Плановая сумма', value: `${50000 + index * 100}` },
        { label: 'Фактическая сумма', value: `${48000 + index * 100}` },
      ],
    })),
  ]);

  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleRowClick = (rowData) => {
    // Pass the full data of the clicked row to the modal
    const id = rowData.find((d) => d.label === 'id')?.value;
    const fullData = data.find((item) => item.id === id);
    setSelectedData(fullData.data);
  };

  const handleCloseModal = () => {
    setSelectedData(null);
  };

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const visibleLabels = [
    'Номер вагона',
    'Тип вагона',
    'Заказчик',
    'Договор',
    'Начало ремонта',
    'Конец ремонта',
    'Тип ремонта',
  ];

  // Фильтрация данных по видимым полям
  const labels =
    paginatedData[0]?.data
      .filter((item) => visibleLabels.includes(item.label))
      .map((item) => item.label) || [];

  const rows = paginatedData.map((wagon) => [
    ...wagon.data.filter((item) => visibleLabels.includes(item.label)),
    { label: 'id', value: wagon.id },
  ]);

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
            onRowClick={handleRowClick}
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
          <ModalShowInfo
            open={!!selectedData}
            handleClose={handleCloseModal}
            data={selectedData || []}
          />
        </div>
      </Grid2>
    </Grid2>
  );
};

export default History;
