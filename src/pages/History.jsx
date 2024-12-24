import { Grid2, Pagination, Stack, Typography, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TableItem from '../components/TableItem';
import ModalShowInfo from '../components/ModalShowInfo';

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
  const handleCloseModal = () => {
    setSelectedData(null);
  };

  // Обработчик изменения страницы
  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  // Пагинация данных
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  return (
    <Grid2 container>
      <Grid2 size={2}>
        <Sidebar />
      </Grid2>
      <Grid2 size={10}>
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

          <Stack sx={{ justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={Math.ceil(data.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              shape="rounded"
              sx={{ width: '100%' }}
            />
          </Stack>

          {/* Модальное окно с подробной информацией */}
          <ModalShowInfo
            open={!!selectedData}
            handleClose={handleCloseModal}
            data={selectedData || []}  // Передаем полную информацию о выбранном вагоне
          />
        </div>
      </Grid2>
    </Grid2>
  );
};

export default History;
