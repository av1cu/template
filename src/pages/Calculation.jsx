<<<<<<< HEAD
import { Grid2, Stack, Typography, Snackbar, Alert  } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Импортируем хук useLocation
=======
import { Grid2, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
>>>>>>> origin/main
import Sidebar from '../components/Sidebar';
import TextFieldItem from '../components/TextField';
import ButtonItem from '../components/Button';
import SelectForm from '../components/Select';

const labels = [
  { key: 'wagonNumber', label: 'Номер вагона', type: 'text' },
  { key: 'wagonType', label: 'Тип вагона', type: 'select' },
  { key: 'customer', label: 'Заказчик', type: 'text' },
<<<<<<< HEAD
=======
  // { key: 'contract', label: 'Договор', type: 'text' },
>>>>>>> origin/main
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
<<<<<<< HEAD
  { key: 'socialContributions', label: 'Социальные отчисления (тенге)', type: 'number' },
=======
  {
    key: 'socialContributions',
    label: 'Социальные отчисления (тенге)',
    type: 'number',
  },
  // { key: 'executor', label: 'Исполнитель', type: 'select' },
>>>>>>> origin/main
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
<<<<<<< HEAD
    { label: 'Переходные устройства и буферные приборы', value: 'Переходные устройства и буферные приборы' },
    { label: 'Тормозное оборудование', value: 'Тормозное оборудование' },
    { label: 'Наружная фурнитура и замочные работы', value: 'Наружная фурнитура и замочные работы' },
=======
    {
      label: 'Переходные устройства и буферные приборы',
      value: 'Переходные устройства и буферные приборы',
    },
    { label: 'Тормозное оборудование', value: 'Тормозное оборудование' },
    {
      label: 'Наружная фурнитура и замочные работы',
      value: 'Наружная фурнитура и замочные работы',
    },
>>>>>>> origin/main
    { label: 'Отопление и водоснабжение', value: 'Отопление и водоснабжение' },
    { label: 'Столярные работы', value: 'Столярные работы' },
    { label: 'Электро оборудование', value: 'Электро оборудование' },
    { label: 'Сварочные работы', value: 'Сварочные работы' },
<<<<<<< HEAD
    { label: 'Наружная и внутренняя окраска', value: 'Наружная и внутренняя окраска' },
=======
    {
      label: 'Наружная и внутренняя окраска',
      value: 'Наружная и внутренняя окраска',
    },
>>>>>>> origin/main
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
<<<<<<< HEAD
=======
  workName: [
    { label: 'Покраска', value: 'Покраска' },
    { label: 'Замена деталей', value: 'Замена деталей' },
    { label: 'Диагностика', value: 'Диагностика' },
  ],
>>>>>>> origin/main
};

const Calculation = () => {
  const [fields, setFields] = useState({});
  const [total, setTotal] = useState(0);
  const [totalWithVAT, setTotalWithVAT] = useState(0);
<<<<<<< HEAD
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State для Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Получаем данные с помощью useLocation
  const location = useLocation();
  const { state } = location;

  console.log("######################################", state?.data);  // Для отладки

  // Если данные переданы, устанавливаем их в состояние
  useEffect(() => {
    if (state && state.data) {
      const initialFields = {};

      // Преобразуем данные в объект, где ключ - это label, а значение - это value
      state.data.forEach(item => {
        initialFields[item.label] = item.value;
      });

      setFields(initialFields);
    }
  }, [state]);

  const handleFieldChange = (key, value) => {
    setFields(prev => ({
=======

  const handleFieldChange = (key, value) => {
    setFields((prev) => ({
>>>>>>> origin/main
      ...prev,
      [key]: value,
    }));
  };
<<<<<<< HEAD
  
=======
>>>>>>> origin/main

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
<<<<<<< HEAD
  const addTotalToFields = (fields) => {
    const workCost = parseFloat(fields.workCost || 0);
    const materialCost = parseFloat(fields.materialCost || 0);
    const electricityCost = parseFloat(fields.electricityCost || 0);
    const fuelCost = parseFloat(fields.fuelCost || 0);
    const socialContributions = parseFloat(fields.socialContributions || 0);
  
    // Вычисление общей стоимости и стоимости с НДС
    const totalAmount =
      workCost +
      materialCost +
      electricityCost +
      fuelCost +
      socialContributions;
  
    const totalWithVAT = totalAmount * 1.12; // 12% НДС
  
    // Возвращаем новый объект с добавленными полями
    return {
      ...fields,
      total: totalAmount,
      totalWithVAT: totalWithVAT,
    };
  };
  

  const handleFieldsRender = ({ key, label, type }) => {
    // Поле рендерится всегда, даже если нет данных, просто значение будет пустым
    const fieldValue = fields[label] || '';  // Если данных нет, оставляем пустым

    if (key === 'workCost' || key === 'materialCost') return;

    if (key === 'workGroup') {
      return (
        <SelectForm
          label={label}
          value={Array.isArray(fields[label]) ? fields[label] : []} // Убедитесь, что значение — массив
          options={options[key]}
          handleChange={(value) => handleFieldChange(label, value)}  // handleChange будет работать с массивом
          multiple  // Для работы с множественным выбором
          size='small'
          sx={{ mb: 3 }}
        />
      );
    }
    
    if (key === 'workName') {
      return (
        <Grid2 container spacing={1} sx={{ mb: 3 }} key={label}>
          <Grid2 size={7}>
            <TextFieldItem
              label={label} // Название поля
              value={fields[key] || ''}  // Текущее значение из состояния
              handleChange={(e) => handleFieldChange(key, e.target.value)} // Обработчик изменения
              size='small'
              fullWidth
=======

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
>>>>>>> origin/main
            />
          </Grid2>
          <Grid2 size={5}>
            <TextFieldItem
              label='Стоимость работ'
<<<<<<< HEAD
              value={fields['workCost'] || ''} // Значение для workCost
              handleChange={(e) => handleFieldChange('workCost', e.target.value)} // Обработчик изменения для workCost
=======
              value={fields['workCost']}
              handleChange={(e) =>
                handleFieldChange('workCost', e.target.value)
              }
>>>>>>> origin/main
              size='small'
              type='number'
              fullWidth
            />
          </Grid2>
        </Grid2>
      );
    }
<<<<<<< HEAD
  
    if (key === 'materials') {
      return (
        <Grid2 container spacing={1} sx={{ mb: 3 }} key={label}>
          <Grid2 size={7}>
            <SelectForm
              label={label}
              value={fieldValue}
              options={options[key]}
              handleChange={(value) => handleFieldChange(label, value)}
=======

    if (key === 'materials') {
      return (
        <Grid2 container spacing={1} sx={{ mb: 3 }}>
          <Grid2 size={7}>
            <SelectForm
              label={label}
              value={fields[key]}
              options={options[key]}
              handleChange={(e) => handleFieldChange(key, e.value)}
>>>>>>> origin/main
              size='small'
            />
          </Grid2>
          <Grid2 size={5}>
            <TextFieldItem
              label='Стоимость материалов'
<<<<<<< HEAD
              value={fields['materialCost'] || ''}  // Если нет значения, то оставляем пустым
=======
              value={fields['materialCost']}
>>>>>>> origin/main
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
<<<<<<< HEAD
    const isMultipleSelect = key === 'workGroup'; // Указать ключ для мультивыбора
=======

>>>>>>> origin/main
    switch (type) {
      case 'select':
        return (
          <SelectForm
            label={label}
<<<<<<< HEAD
            value={fields[label] || (isMultipleSelect ? [] : '')} // Убедимся, что value — массив для multiple
            options={options[key]}
            handleChange={(value) => handleFieldChange(label, value)}
            multiple={isMultipleSelect} // Указываем multiple только для нужного поля
=======
            value={fields[label]}
            options={options[key]}
            handleChange={(e) => handleFieldChange(label, e.value)}
>>>>>>> origin/main
            size='small'
            sx={{ mb: 3 }}
          />
        );
      case 'date':
<<<<<<< HEAD
        // Для типа 'date' форматируем дату в формате yyyy-MM-dd
        const formattedDate = fieldValue ? new Date(fieldValue).toISOString().split('T')[0] : '';
=======
>>>>>>> origin/main
        return (
          <TextFieldItem
            key={key}
            label={label}
<<<<<<< HEAD
            value={formattedDate}  // Форматированная дата
=======
            value={fields[label]}
>>>>>>> origin/main
            handleChange={(e) => handleFieldChange(label, e.target.value)}
            fullWidth
            size='small'
            sx={{ mb: 3 }}
            type='date'
            focused
          />
        );
<<<<<<< HEAD
        case 'array': 
        // Для типа array (например, для "Группы работ"), выводим данные как текст, но сохраняем массив
        return (
          <TextFieldItem
            key={key}
            label={label}
            value={Array.isArray(fieldValue) ? fieldValue.join(', ') : ''}  // Преобразуем массив в строку
            handleChange={(e) => {
              const updatedArray = e.target.value.split(',').map(item => item.trim());
              handleFieldChange(label, updatedArray); // Записываем массив обратно
            }}
            fullWidth
            size='small'
            sx={{ mb: 3 }}
            type="text"
          />
        );
=======
>>>>>>> origin/main
      default:
        return (
          <TextFieldItem
            key={key}
            label={label}
<<<<<<< HEAD
            value={fieldValue}
=======
            value={fields[label]}
>>>>>>> origin/main
            handleChange={(e) => handleFieldChange(label, e.target.value)}
            fullWidth
            size='small'
            sx={{ mb: 3 }}
            type={type}
          />
        );
    }
  };
<<<<<<< HEAD
  const handleSave = async () => {
    try {
      // Добавляем total и totalWithVAT в fields
      const updatedFields = addTotalToFields(fields);
  
      // Отправляем обновленные данные на сервер
      const response = await fetch('http://localhost:1234/api/wagons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),  // Отправляем обновленный объект
      });
  
      console.log(JSON.stringify(updatedFields)); // Для отладки
  
      if (!response.ok) {
        setSnackbarMessage(response.status);
        setSnackbarSeverity('error');
      } else {
        setSnackbarMessage('Данные успешно сохранены!');
        setSnackbarSeverity('success');
      }
    } catch (error) {
      setSnackbarMessage('Произошла ошибка при отправке данных.');
      setSnackbarSeverity('error');
    }
  
    setSnackbarOpen(true);
  };
  
=======
>>>>>>> origin/main

  return (
    <Grid2 container>
      <Grid2 size={2}>
        <Sidebar />
      </Grid2>
      <Grid2 size={10}>
<<<<<<< HEAD
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert
              onClose={() => setSnackbarOpen(false)}
              severity={snackbarSeverity}
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
=======
>>>>>>> origin/main
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
<<<<<<< HEAD
          <ButtonItem
            label='Сохранить'
            variant='outlined'
            size='small'
            onClick={handleSave}
          />
=======
>>>>>>> origin/main
          <Typography variant='h6'>
            Итого (без НДС): {total.toFixed(2)} тенге
          </Typography>
          <Typography variant='h6'>
            Итого (с НДС): {totalWithVAT.toFixed(2)} тенге
          </Typography>
        </div>
      </Grid2>
    </Grid2>
<<<<<<< HEAD
  );  
=======
  );
>>>>>>> origin/main
};

export default Calculation;
