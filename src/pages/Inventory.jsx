import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Grid2, Pagination, Stack, Typography } from '@mui/material';
import InventoryCard from '../components/InventoryCard';
import ModalInventoryList from '../components/ModalInventoryList';
import ModalAddItem from '../components/ModalAddItem';
import ButtonItem from '../components/Button';
import TableItem from '../components/TableItem';

const Inventory = () => {
  const [data, setData] = useState([
    {
      id: 1,
      data: [
        { label: 'Наименование', value: 'Шурупы' },
        { label: 'Код', value: 'SRP001' },
        { label: 'Количество', value: '150' },
        { label: 'Себестоимость', value: '2.50' },
        { label: 'Сумма оборот', value: '375.00' },
      ],
    },
    {
      id: 2,
      data: [
        { label: 'Наименование', value: 'Гайки' },
        { label: 'Код', value: 'NTK002' },
        { label: 'Количество', value: '200' },
        { label: 'Себестоимость', value: '1.75' },
        { label: 'Сумма оборот', value: '350.00' },
      ],
    },
    {
      id: 3,
      data: [
        { label: 'Наименование', value: 'Болты' },
        { label: 'Код', value: 'BLT003' },
        { label: 'Количество', value: '100' },
        { label: 'Себестоимость', value: '3.00' },
        { label: 'Сумма оборот', value: '300.00' },
      ],
    },
    {
      id: 4,
      data: [
        { label: 'Наименование', value: 'Дюбели' },
        { label: 'Код', value: 'DUB004' },
        { label: 'Количество', value: '250' },
        { label: 'Себестоимость', value: '1.20' },
        { label: 'Сумма оборот', value: '300.00' },
      ],
    },
    {
      id: 5,
      data: [
        { label: 'Наименование', value: 'Шайбы' },
        { label: 'Код', value: 'WBR005' },
        { label: 'Количество', value: '300' },
        { label: 'Себестоимость', value: '0.50' },
        { label: 'Сумма оборот', value: '150.00' },
      ],
    },
    {
      id: 6,
      data: [
        { label: 'Наименование', value: 'Клей' },
        { label: 'Код', value: 'GLU006' },
        { label: 'Количество', value: '50' },
        { label: 'Себестоимость', value: '5.00' },
        { label: 'Сумма оборот', value: '250.00' },
      ],
    },
    {
      id: 7,
      data: [
        { label: 'Наименование', value: 'Кабель' },
        { label: 'Код', value: 'CBL007' },
        { label: 'Количество', value: '500' },
        { label: 'Себестоимость', value: '0.80' },
        { label: 'Сумма оборот', value: '400.00' },
      ],
    },
    {
      id: 8,
      data: [
        { label: 'Наименование', value: 'Лампы' },
        { label: 'Код', value: 'LMP008' },
        { label: 'Количество', value: '60' },
        { label: 'Себестоимость', value: '8.50' },
        { label: 'Сумма оборот', value: '510.00' },
      ],
    },
    {
      id: 9,
      data: [
        { label: 'Наименование', value: 'Розетки' },
        { label: 'Код', value: 'SCK009' },
        { label: 'Количество', value: '80' },
        { label: 'Себестоимость', value: '7.00' },
        { label: 'Сумма оборот', value: '560.00' },
      ],
    },
    {
      id: 10,
      data: [
        { label: 'Наименование', value: 'Выключатели' },
        { label: 'Код', value: 'SWT010' },
        { label: 'Количество', value: '90' },
        { label: 'Себестоимость', value: '6.50' },
        { label: 'Сумма оборот', value: '585.00' },
      ],
    },
    {
      id: 11,
      data: [
        { label: 'Наименование', value: 'Провода' },
        { label: 'Код', value: 'WRD011' },
        { label: 'Количество', value: '150' },
        { label: 'Себестоимость', value: '3.20' },
        { label: 'Сумма оборот', value: '480.00' },
      ],
    },
    {
      id: 12,
      data: [
        { label: 'Наименование', value: 'Ручки дверные' },
        { label: 'Код', value: 'HDR012' },
        { label: 'Количество', value: '40' },
        { label: 'Себестоимость', value: '12.00' },
        { label: 'Сумма оборот', value: '480.00' },
      ],
    },
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
            Склад
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

export default Inventory;
