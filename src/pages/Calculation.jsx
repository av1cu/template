import { Grid2, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TextFieldItem from '../components/TextField';
import ButtonItem from '../components/Button';
import SelectForm from '../components/Select';

const labels = [
  { key: 'wagonNumber', label: 'Номер вагона', type: 'text' },
  { key: 'wagonType', label: 'Тип вагона', type: 'select' },
  { key: 'customer', label: 'Заказчик', type: 'text' },
  // { key: 'contract', label: 'Договор', type: 'text' },
  { key: 'repairStart', label: 'Начало ремонта', type: 'date' },
  { key: 'repairEnd', label: 'Конец ремонта', type: 'date' },
  { key: 'repairType', label: 'Тип ремонта', type: 'select' },
  { key: 'workGroup', label: 'Группа работ', type: 'select' },
  { key: 'workName', label: 'Наименование работ', type: 'text' },
  { key: 'workCost', label: 'Стоимость работ', type: 'number' },
  { key: 'materials', label: 'Расходные материалы', type: 'select' },
  { key: 'materialCost', label: 'Стоимость материалов', type: 'number' },
  { key: 'electricityCost', label: 'Электроэнергия (тенге)', type: 'number' },
  { key: 'fuelCost', label: 'Топливо (тенге)', type: 'number' },
  {
    key: 'socialContributions',
    label: 'Социальные отчисления (тенге)',
    type: 'number',
  },
  // { key: 'executor', label: 'Исполнитель', type: 'select' },
];

const options = {
  wagonType: [
    { label: 'Пассажирский', value: 'Пассажирский' },
    { label: 'Грузовой', value: 'Грузовой' },
    { label: 'Цистерна', value: 'Цистерна' },
    { label: 'Хоппер', value: 'Хоппер' },
  ],
  repairType: [
    { label: 'Капитальный ремонт', value: 'Капитальный ремонт' },
    { label: 'Деповской ремонт', value: 'Деповской ремонт' },
  ],
  workGroup: [
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
  materials: [
    { label: 'Краска', value: 'Краска' },
    { label: 'Металл', value: 'Металл' },
    { label: 'Электрод', value: 'Электрод' },
    { label: 'Древесина', value: 'Древесина' },
  ],
  executor: [
    { label: 'Шермаханов Т', value: 'Шермаханов Т' },
    { label: 'Назаров Б', value: 'Назаров Б' },
    { label: 'Сагымбаев Б', value: 'Сагымбаев Б' },
    { label: 'Дауренбеков М', value: 'Дауренбеков М' },
    { label: 'Утегенов Е', value: 'Утегенов Е' },
    { label: 'Аскаров А', value: 'Аскаров А' },
  ],
  workName: [
    { label: 'Покраска', value: 'Покраска' },
    { label: 'Замена деталей', value: 'Замена деталей' },
    { label: 'Диагностика', value: 'Диагностика' },
  ],
};

const Calculation = () => {
  const [fields, setFields] = useState({});
  const [total, setTotal] = useState(0);
  const [totalWithVAT, setTotalWithVAT] = useState(0);

  const handleFieldChange = (key, value) => {
    setFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const calculateTotal = () => {
    const workCost = parseFloat(fields.workCost || 0);
    const materialCost = parseFloat(fields.materialCost || 0);
    const electricityCost = parseFloat(fields.electricityCost || 0);
    const fuelCost = parseFloat(fields.fuelCost || 0);
    const socialContributions = parseFloat(fields.socialContributions || 0);

    const totalAmount =
      workCost +
      materialCost +
      electricityCost +
      fuelCost +
      socialContributions;

    setTotal(totalAmount);
    setTotalWithVAT(totalAmount * 1.12); // 12% НДС
  };

  const handleFieldsRender = ({ key, label, type }) => {
    if (key === 'workCost' || key === 'materialCost') return;
    if (key === 'workName') {
      return (
        <Grid2 container spacing={1} sx={{ mb: 3 }}>
          <Grid2 size={7}>
            <SelectForm
              label={label}
              value={fields[key]}
              options={options[key]}
              handleChange={(e) => handleFieldChange(key, e.value)}
              size='small'
              full
            />
          </Grid2>
          <Grid2 size={5}>
            <TextFieldItem
              label='Стоимость работ'
              value={fields['workCost']}
              handleChange={(e) =>
                handleFieldChange('workCost', e.target.value)
              }
              size='small'
              type='number'
              fullWidth
            />
          </Grid2>
        </Grid2>
      );
    }

    if (key === 'materials') {
      return (
        <Grid2 container spacing={1} sx={{ mb: 3 }}>
          <Grid2 size={7}>
            <SelectForm
              label={label}
              value={fields[key]}
              options={options[key]}
              handleChange={(e) => handleFieldChange(key, e.value)}
              size='small'
            />
          </Grid2>
          <Grid2 size={5}>
            <TextFieldItem
              label='Стоимость материалов'
              value={fields['materialCost']}
              handleChange={(e) =>
                handleFieldChange('materialCost', e.target.value)
              }
              size='small'
              type='number'
              fullWidth
            />
          </Grid2>
        </Grid2>
      );
    }

    switch (type) {
      case 'select':
        return (
          <SelectForm
            label={label}
            value={fields[label]}
            options={options[key]}
            handleChange={(e) => handleFieldChange(label, e.value)}
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
            type={type}
          />
        );
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
            Калькуляция
          </Typography>
          {labels.map(handleFieldsRender)}
          <ButtonItem
            label='Калькуляция'
            variant='outlined'
            size='small'
            handleChange={calculateTotal}
            sx={{ mb: 2 }}
          />
          <Typography variant='h6'>
            Итого (без НДС): {total.toFixed(2)} тенге
          </Typography>
          <Typography variant='h6'>
            Итого (с НДС): {totalWithVAT.toFixed(2)} тенге
          </Typography>
        </div>
      </Grid2>
    </Grid2>
  );
};

export default Calculation;
