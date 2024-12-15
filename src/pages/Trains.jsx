import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
  Typography,
} from '@mui/material';
import InventoryCard from '../components/InventoryCard';
import ModalInventoryList from '../components/ModalInventoryList';
import ModalAddItem from '../components/ModalAddItem';
import ButtonItem from '../components/Button';
import TrainCard from '../components/TrainCard';
import ModalAddTrain from '../components/ModalAddTrain';
import TextFieldItem from '../components/TextField';
import SelectForm from '../components/Select';

const labels = [
  { key: 'wagonnumber', label: 'Номер вагона', type: 'text' },
  { key: 'wagontype', label: 'Тип вагона', type: 'select' },
  { key: 'customer', label: 'Заказчик', type: 'text' },
  { key: 'contract', label: 'Договор', type: 'text' },
  { key: 'repairstart', label: 'Начало ремонта', type: 'date' },
  { key: 'repairend', label: 'Конец ремонта', type: 'date' },
  { key: 'repairtype', label: 'Тип ремонта', type: 'select' },
  { key: 'workgroup', label: 'Группа работ', type: 'select' },
  { key: 'workname', label: 'Наименование работ', type: 'text' },
  { key: 'executor', label: 'Исполнитель', type: 'select' },
];

const options = {
  wagontype: [
    { label: 'Пассажирский', value: 'Пассажирский' },
    { label: 'Грузовой', value: 'Грузовой' },
    { label: 'Цистерна', value: 'Цистерна' },
    { label: 'Хоппер', value: 'Хоппер' },
  ],
  repairtype: [
    { label: 'Капитальный ремонт', value: 'Капитальный ремонт' },
    { label: 'Деповской ремонт', value: 'Деповской ремонт' },
  ],
  workgroup: [
    { label: 'Ходовые части', value: 'Ходовые части' },
    { label: 'Рессорное подвешивание', value: 'Рессорное подвешивание' },
    { label: 'Буксы и подшипники', value: 'Буксы и подшипники' },
    { label: 'Автосцепное устройство', value: 'Автосцепное устройство' },
    {
      label: 'Переходные устройства и буферные приборы',
      value: 'Переходные устройства и буферные приборы',
    },
    { label: 'Тормозное оборудование', value: 'Тормозное оборудование' },
    {
      label: 'Наружная фурнитура и замочные работы',
      value: 'Наружная фурнитура и замочные работы',
    },
    { label: 'Отопление и водоснабжение', value: 'Отопление и водоснабжение' },
    { label: 'Столярные работы', value: 'Столярные работы' },
    { label: 'Электро оборудование', value: 'Электро оборудование' },
    { label: 'Сварочные работы', value: 'Сварочные работы' },
    {
      label: 'Наружная и внутренняя окраска',
      value: 'Наружная и внутренняя окраска',
    },
    { label: 'Уборка вагона внутри', value: 'Уборка вагона внутри' },
  ],
  executor: [
    { label: 'Шермаханов Т', value: 'Шермаханов Т' },
    { label: 'Назаров Б', value: 'Назаров Б' },
    { label: 'Сагымбаев Б', value: 'Сагымбаев Б' },
    { label: 'Дауренбеков М', value: 'Дауренбеков М' },
    { label: 'Утегенов Е', value: 'Утегенов Е' },
    { label: 'Аскаров А', value: 'Аскаров А' },
  ],
};

const Trains = () => {
  const [fields, setFields] = useState({});

  const handleFieldChange = (key, value) => {
    setFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFieldsRender = ({ key, label, type }) => {
    const isMultipleSelect = key === 'workgroup'; // Указать ключ для мультивыбора
    switch (type) {
      case 'select':
        return (
          <SelectForm
            label={label}
            value={fields[label] || (isMultipleSelect ? [] : '')} // Убедимся, что value — массив для multiple
            options={options[key]}
            handleChange={(value) => handleFieldChange(label, value)}
            multiple={isMultipleSelect} // Указываем multiple только для нужного поля
            size='small'
            sx={{ mb: 3 }}
          />
        );
      case 'date':
        return (
          <TextFieldItem
            key={key}
            label={label}
            value={fields[label]}
            handleChange={(e) => handleFieldChange(label, e.target.value)}
            fullWidth
            size='small'
            sx={{ mb: 3 }}
            type='date'
            focused
          />
        );
      default:
        return (
          <TextFieldItem
            key={key}
            label={label}
            value={fields[label]}
            handleChange={(e) => handleFieldChange(label, e.target.value)}
            fullWidth
            size='small'
            sx={{ mb: 3 }}
          />
        );
    }
  };

  const mapDataToKeys = (data) => {
    const mappedData = {};

    labels.forEach((label) => {
      const key = label.key;
      const labelName = label.label;

      for (const [k, value] of Object.entries(data)) {
        if (labelName === k) {
          mappedData[key] = value;
        }
      }
    });

    return mappedData;
  };

  const handleAddWagon = async () => {
    try {
      const data = mapDataToKeys(fields);
      data['workgroup'] = Array.isArray(data['workgroup'])
        ? data['workgroup']
        : [data['workgroup']];
      const response = await fetch('http://localhost:3000/trains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert('Вагон успешно добавлен!');
        setFields({}); // Сброс полей после успешной отправки
      } else {
        const error = await response.text();
        alert(`Ошибка: ${error}`);
      }
    } catch (error) {
      console.error('Ошибка при добавлении вагона:', error);
      alert('Произошла ошибка при добавлении вагона.');
    }
  };

  return (
    <Grid2 container>
      <Grid2 size={2}>
        <Sidebar />
      </Grid2>
      <Grid2 size={10}>
        <div className='content'>
          <Typography variant='h4' sx={{ mb: 2 }}>
            Вагоны
          </Typography>
          {labels.map(handleFieldsRender)}
          <ButtonItem
            label='Добавить'
            variant='outlined'
            size='small'
            handleChange={handleAddWagon}
            sx={{ mb: 2 }}
          />
        </div>
      </Grid2>
    </Grid2>
  );
};

export default Trains;
