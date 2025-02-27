import { Card, CardContent, Stack, Typography, Box } from '@mui/material';
import React from 'react';
import PasIcon from './../assets/img/FCDD32C4-55B5-4C59-8717-A15A1AACED23-removebg-preview.png';
import GruzIcon from './../assets/img/FD504E0A-3EC0-4EAE-AF86-4845AFE7BEB1-removebg-preview.png';
import CisternIcon from "./../assets/img/cistern.png";
import HopperIcon from "./../assets/img/hopper.png";
import formatDate from '../utils/formatDate';

const wagonIcons = {
  Пассажирский: PasIcon,
  Грузовой: GruzIcon,
  Цистерна: CisternIcon,
  Хоппер: HopperIcon,
};

const InventoryCard = ({ item, handleClick }) => {
  const { data } = item;
  const wagonNumber = data.find((d) => d.label === 'Номер вагона').value;
  const date = data.find((d) => d.label === 'Дата').value;
  const status = data.find((d) => d.label === 'Статус').value;
  const wagonType = data.find((d) => d.label === "Тип вагона").value;

  
  // Новый объект с группами работ и их статусами
  const groupStatuses = data.find((d) => d.label === 'Статус группы работ')?.value || [];
  
  const colors = [
    { value: 'Ходовые части', color: 'rgba(255, 99, 71, 0.7)', processColor: 'rgba(255, 69, 0, 0.7)' }, // Красный и оранжевый
    { value: 'Рессорное подвешивание', color: 'rgba(255, 215, 0, 0.7)', processColor: 'rgba(255, 165, 0, 0.7)' }, // Желтый и оранжевый
    { value: 'Буксы и подшипники', color: 'rgba(70, 130, 180, 0.7)', processColor: 'rgba(100, 149, 237, 0.7)' }, // Синий и светло-синий
    { value: 'Автосцепное устройство', color: 'rgba(50, 205, 50, 0.7)', processColor: 'rgba(34, 139, 34, 0.7)' }, // Зелёный
    { value: 'Переходные устройства и буферные приборы', color: 'rgba(138, 43, 226, 0.7)', processColor: 'rgba(75, 0, 130, 0.7)' }, // Фиолетовый и индиго
    { value: 'Тормозное оборудование', color: 'rgba(220, 20, 60, 0.7)', processColor: 'rgba(255, 69, 0, 0.7)' }, // Бордовый и оранжевый
    { value: 'Наружная фурнитура и замочные работы', color: 'rgba(210, 105, 30, 0.7)', processColor: 'rgba(160, 82, 45, 0.7)' }, // Коричневый и темно-коричневый
    { value: 'Отопление и водоснабжение', color: 'rgba(165, 42, 42, 0.7)', processColor: 'rgba(255, 99, 71, 0.7)' }, // Коралл и красный
    { value: 'Столярные работы', color: 'rgba(139, 69, 19, 0.7)', processColor: 'rgba(205, 133, 63, 0.7)' }, // Темно-коричневый и золотистый
    { value: 'Электро оборудование', color: 'rgba(255, 215, 0, 0.7)', processColor: 'rgba(255, 140, 0, 0.7)' }, // Желтый и оранжевый
    { value: 'Сварочные работы', color: 'rgba(255, 69, 0, 0.7)', processColor: 'rgba(178, 34, 34, 0.7)' }, // Красный и темно-красный
    { value: 'Наружная и внутренняя окраска', color: 'rgba(30, 144, 255, 0.7)', processColor: 'rgba(70, 130, 180, 0.7)' }, // Голубой и синий
    { value: 'Уборка вагона внутри', color: 'rgba(0, 250, 154, 0.7)', processColor: 'rgba(0, 128, 0, 0.7)' }, // Мятный и зелёный
  ];
  
  

  // Функция для получения статуса для каждой группы
  const getStatusForGroup = (group) => {
    const statusObj = groupStatuses.find((item) => item.value === group);
    return statusObj ? statusObj.status : 'Не начато'; // Если не найдено, возвращаем дефолтное значение
  };

  // Сортируем статусные группы так, чтобы "Готово" всегда было слева, а "В ожидании" — справа
  const sortedGroupStatuses = groupStatuses.sort((a, b) => {
    if (a.status === 'Готово') return -1;  // "Готово" первым
    if (b.status === 'Готово') return 1;
    if (a.status === 'В ожидании') return 1;  // "В ожидании" последним
    if (b.status === 'В ожидании') return -1;
    return 0;  // Для остальных статусов оставляем порядок как есть
  });

  // Создаём стили для каждого статуса
  const calcSegmentStyle = (status, workgroup) => {
    if (status === 'Готово') return { backgroundColor: 'rgba(50, 205, 50, 0.7)' }; // Зелёный для готового
    if (status === 'В ожидании') return { backgroundColor: 'rgba(169, 169, 169, 0.7)' }; // Серый для не начатого
    if (status === 'В процессе') {
      const groupColor = colors.find((g) => g.value === workgroup)?.processColor;
      return { backgroundColor: groupColor || 'rgba(192, 192, 192, 0.7)' }; // Уникальный цвет для в процессе
    }
  };

  return (
    <div onClick={handleClick}>
      <Card sx={{ cursor: 'pointer', position: 'relative', borderRadius: '16px' }}>
        <CardContent>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{`Вагон №${wagonNumber}`}</Typography>
            <img
               src={wagonIcons[wagonType] || GruzIcon} // Если тип не найден, ставим грузовой
               alt={`${wagonType} Icon`}
               style={{ width: "50px", height: "50px" }}
            />
          </Stack>
          <Typography>Дата: {formatDate(date)}</Typography>
        </CardContent>

        {/* Индикатор состояния работ - горизонтальная линия, расположенная внизу */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '5px',
            marginTop: 2,
            borderRadius: '0 0 16px 16px', // Добавляем округление для нижней части
            display: 'flex',
            backgroundColor: 'lightgray', // Цвет фона для улучшения визуала
          }}
        >
          {sortedGroupStatuses.map((groupStatus, index) => {
            const group = groupStatus.value;
            const status = groupStatus.status;
            return (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  height: '100%',
                  ...calcSegmentStyle(status, group),
                }}
              />
            );
          })}
        </Box>
      </Card>
    </div>
  );
};

export default InventoryCard;
