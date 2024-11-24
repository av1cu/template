import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Grid2, Typography } from '@mui/material';
import InventoryCard from '../components/InventoryCard';
import ModalInventoryList from '../components/ModalInventoryList';
import ModalAddItem from '../components/ModalAddItem';
import ButtonItem from '../components/Button';
import TrainCard from '../components/TrainCard';
import ModalAddTrain from '../components/ModalAddTrain';

const Trains = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      data: [
        { label: 'Название вагона', value: 'Вагон 101' },
        { label: 'Компания', value: 'Казахстан Темир Жолы' },
        { label: 'Срок выдачи', value: '2024-11-20' },
        { label: 'Тип ремонта', value: 'Покраска' },
        { label: 'Деталь', value: 'Шины' },
        { label: 'Цена', value: '5000 тг' },
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
      ],
    },
  ]);
  const [modalAddItemOpen, setModalAddItemOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const handleAddItem = () => {
    setEdit(false);
    setModalAddItemOpen(true);
  };

  const handleEdit = (item) => {
    setEdit(true);
    setCurrentItem(item);
    setModalAddItemOpen(true);
  };

  const handleSave = (newData) => {
    if (edit) {
    }
    const formattedData = Object.keys(newData).map((key) => ({
      label: dummyLabels.find((field) => field.label === key)?.label || key,
      value: newData[key],
    }));
    const newItem = {
      id: items.length + 1,
      data: formattedData,
    };
    if (edit) {
      setItems(
        items.map((i) =>
          currentItem.id == i.id
            ? { id: currentItem.id, data: formattedData }
            : i
        )
      );
    } else {
      setItems((prevItems) => [...prevItems, newItem]);
    }
    setModalAddItemOpen(false);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const dummyLabels = [
    { key: 'name', label: 'Название вагона' },
    { key: 'company', label: 'Компания' },
    { key: 'dateIssued', label: 'Срок выдачи' },
    { key: 'repairType', label: 'Тип ремонта' },
    { key: 'partName', label: 'Деталь' },
    { key: 'price', label: 'Цена' },
  ];

  return (
    <Grid2 container>
      <Grid2 size={2}>
        <Sidebar />
      </Grid2>
      <Grid2 size={10} sx={{ p: 2 }}>
        <div className='content'>
          <Typography variant='h4' sx={{ mb: 2 }}>
            Вагоны
          </Typography>
          <ButtonItem
            label='Добавить'
            variant='outlined'
            size='small'
            handleChange={handleAddItem}
            sx={{ mb: 2 }}
          />
          <Grid2 container spacing={2}>
            {items.map((item, index) => (
              <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <TrainCard
                  title={item.title}
                  item={item}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </Grid2>
            ))}
          </Grid2>
          <ModalAddTrain
            open={modalAddItemOpen}
            handleClose={() => setModalAddItemOpen(false)}
            handleSave={handleSave}
            edit={edit}
            item={currentItem}
          />
        </div>
      </Grid2>
    </Grid2>
  );
};

export default Trains;
