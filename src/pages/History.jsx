<<<<<<< HEAD
import { Grid2, Pagination, Stack, Typography, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
=======
import { Grid2, Pagination, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
>>>>>>> origin/main
import Sidebar from '../components/Sidebar';
import TableItem from '../components/TableItem';
import ModalShowInfo from '../components/ModalShowInfo';

<<<<<<< HEAD
// Функция для получения всех записей с API
const fetchWagons = async () => {
  try {
    const response = await fetch('http://localhost:1234/api/wagons');// Временное решение после отредактировать 
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные с сервера');
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error; // Бросаем ошибку дальше
  }
};

// Функция для форматирования даты
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU'); // Возвращаем в формате "дд.мм.гггг"
};

const History = () => {
  const [data, setData] = useState([]);          // Храним все данные вагонов
  const [selectedData, setSelectedData] = useState(null);  // Данные для модального окна
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const [loading, setLoading] = useState(true);    // Флаг загрузки
  const [error, setError] = useState(null);        // Ошибка при загрузке данных
  const itemsPerPage = 10; // Количество элементов на странице

  // Загружаем данные с API при монтировании компонента
  useEffect(() => {
    const getData = async () => {
      setLoading(true);  // Устанавливаем флаг загрузки
      setError(null);    // Сбрасываем ошибку
      try {
        const wagonsData = await fetchWagons();
        setData(wagonsData);  // Сохраняем все данные в состоянии
      } catch (err) {
        setError('Не удалось загрузить данные');  // Устанавливаем ошибку
      } finally {
        setLoading(false);  // Завершаем загрузку
      }
    };

    getData();
  }, []);

  // Обработчик клика по строке
const handleRowClick = (rowData) => {
  // Находим индекс выбранного элемента в filteredData
  const selectedRow = rows.find(row => row.some(item => item.value === rowData[0].value)); // Сравниваем по первому значению, например, по номеру вагона
  setSelectedData(selectedRow); // Сохраняем строку из rows в selectedData
};


  // Закрытие модального окна
=======
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

>>>>>>> origin/main
  const handleCloseModal = () => {
    setSelectedData(null);
  };

<<<<<<< HEAD
  // Обработчик изменения страницы
=======
>>>>>>> origin/main
  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

<<<<<<< HEAD
  // Пагинация данных
=======
>>>>>>> origin/main
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
<<<<<<< HEAD

  // Определяем метки для таблицы. Это фиксированные ключи, которые будут всегда.
  const labels = [
    'Номер вагона',
    'Тип вагона',
    'Заказчик',
    'Начало ремонта',
    'Конец ремонта',
    'Тип ремонта',
    'Итого',
    'Итого с НДС',
  ];

  // Фильтруем только нужные данные для отображения в таблице
  const filteredData = paginatedData.map((wagon) => {
    return [
      { label: 'id', value: wagon.id },  // id всегда будет
      { label: 'Номер вагона', value: wagon.wagon_number },
      { label: 'Тип вагона', value: wagon.wagon_type },
      { label: 'Заказчик', value: wagon.customer },
      { label: 'Начало ремонта', value: formatDate(wagon.start_repair) }, // Форматируем дату
      { label: 'Конец ремонта', value: formatDate(wagon.end_repair) }, // Форматируем дату
      { label: 'Тип ремонта', value: wagon.repair_type },
      { label: 'Итого', value: wagon.total },
      { label: 'Итого с НДС', value: wagon.total_with_vat },
    ];
  });

  // Полные данные для модального окна, включая все поля
  const rows = paginatedData.map((wagon) => {
    return [
      { label: 'id', value: wagon.id },  // id всегда будет
      { label: 'Номер вагона', value: wagon.wagon_number },
      { label: 'Тип вагона', value: wagon.wagon_type },
      { label: 'Заказчик', value: wagon.customer },
      { label: 'Начало ремонта', value: formatDate(wagon.start_repair) }, // Форматируем дату
      { label: 'Конец ремонта', value: formatDate(wagon.end_repair) }, // Форматируем дату
      { label: 'Тип ремонта', value: wagon.repair_type },
      { label: 'Группа работ', value: wagon.work_group.join(', ') },  // Отображаем группу работ как строку
      { label: 'Стоимость работ', value: wagon.work_cost },
      { label: 'Расходные материалы', value: wagon.material_cost },
      { label: 'Электроэнергия', value: wagon.energy_cost },
      { label: 'Топливо', value: wagon.fuel_cost },
      { label: 'Социальные отчисления', value: wagon.social_contributions },
      { label: 'Итого', value: wagon.total },
      { label: 'Итого с НДС', value: wagon.total_with_vat },
      
    ];
  });
=======
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
>>>>>>> origin/main

  return (
    <Grid2 container>
      <Grid2 size={2}>
        <Sidebar />
      </Grid2>
      <Grid2 size={10}>
<<<<<<< HEAD
        <div className="content">
          <Typography variant="h4" sx={{ mb: 2 }}>
            История
          </Typography>

          {/* Индикатор загрузки */}
          {loading && <CircularProgress />}

          {/* Сообщение об ошибке */}
          {error && <Typography color="error">{error}</Typography>}

          {/* Отображаем данные, если они есть */}
          {filteredData.length > 0 && !loading && !error ? (
            <TableItem
              rows={filteredData}  // Передаем отфильтрованные данные
              labels={labels}
              onRowClick={handleRowClick}
            />
          ) : (
            !loading && !error && <Typography>Нет данных для отображения</Typography>
          )}

=======
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
>>>>>>> origin/main
          <Stack sx={{ justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
<<<<<<< HEAD
              shape="rounded"
              sx={{ width: '100%' }}
            />
          </Stack>

          {/* Модальное окно с подробной информацией */}
          <ModalShowInfo
            open={!!selectedData}
            handleClose={handleCloseModal}
            data={selectedData || []}  // Передаем полную информацию о выбранном вагоне
=======
              shape='rounded'
              sx={{ width: '100%' }}
            />
          </Stack>
          <ModalShowInfo
            open={!!selectedData}
            handleClose={handleCloseModal}
            data={selectedData || []}
>>>>>>> origin/main
          />
        </div>
      </Grid2>
    </Grid2>
  );
};

export default History;
