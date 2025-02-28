import { Grid2, Typography, IconButton,Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ButtonItem from '../components/Button';
import InventoryCard from '../components/InventoryCard';
import PasIcon from './../assets/img/FCDD32C4-55B5-4C59-8717-A15A1AACED23-removebg-preview.png';
import GruzIcon from './../assets/img/FD504E0A-3EC0-4EAE-AF86-4845AFE7BEB1-removebg-preview.png';
import ModalMain from '../components/ModalMain';
import ModalHelp from '../components/ModalHelp';
import { SERVER } from '../const';

const labels = [
  { key: 'wagonNumber', label: 'Номер вагона', type: 'text' },
  { key: 'wagonType', label: 'Тип вагона', type: 'select' },
  { key: 'customer', label: 'Заказчик', type: 'text' },
  { key: 'contract', label: 'Договор', type: 'text' },
  { key: 'repairStart', label: 'Начало ремонта', type: 'date' },
  { key: 'repairEnd', label: 'Конец ремонта', type: 'date' },
  { key: 'repairType', label: 'Тип ремонта', type: 'select' },
  { key: 'workgroup', label: 'Группа работ', type: 'select' },
  { key: 'workname', label: 'Наименование работ', type: 'text' },
  { key: 'executor', label: 'Исполнитель', type: 'select' },
  { key: 'status', label: 'Статус', type: 'text' },
  { key: 'workgroupStatus', label: 'Статус группы работ', type: 'text' },
];

const Main = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [modalInventoryListOpen, setModalInventoryListOpen] = useState(false);
  const [modalHelpOpen, setModalHelpOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');


  useEffect(() => {
    fetchTrains();
  }, []);

  // Функция для получения списка поездов
  async function fetchTrains() {
    const apiUrl = SERVER + '/trains';
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        // Если токен просрочен или отсутствует
        console.error('Unauthorized, redirecting to login');
        window.location.href = '/#/auth/login'; // Перенаправление на страницу логина
      }
      const trains = await response.json();
      setItems(trains);
    } catch (error) {
      console.error('Ошибка при получении списка поездов:', error);
      // throw error; // Пробрасываем ошибку, чтобы её можно было обработать выше
    }
  }

  const deleteTrain = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(SERVER + `/trains/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        fetchTrains();
        setModalInventoryListOpen(false);
      } else if (response.status === 404) {
        console.error('Train not found');
      } else if (response.status === 401) {
        // Если токен просрочен или отсутствует
        console.error('Unauthorized, redirecting to login');
        window.location.href = '/#/auth/login'; // Перенаправление на страницу логина
      } else {
        console.error('Failed to delete train');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const mapDataToKeys = (data) => {
    const mappedData = {};

    labels.forEach((label) => {
      const key = label.key;
      const labelName = label.label;

      data.forEach((entry) => {
        if (labelName === entry.label) {
          mappedData[key] = entry.value;
        }
      });
    });

    return mappedData;
  };

  const handleWorkGroupStatusChange = async (status, currentWorkGroup) => {
    try {
      const workGroups = currentItem.data.find((row) => row.label === 'Группа работ');
      
      if (Array.isArray(workGroups.value)) {
        // Если есть несколько групп, сортируем их
        const sorted = [
          currentWorkGroup,
          ...workGroups.value.filter((item) => item !== currentWorkGroup),
        ];
  
        // Обновляем данные о группе работ
        const dataToSend = currentItem.data.filter((row) => row.label !== 'Группа работ');
        const workStatuses = currentItem.data.find((row) => row.label === 'Статус группы работ');
        
        const groupStatus = workStatuses.value === 'Нет статусов'
          ? [{ value: currentWorkGroup, status }]
          : workStatuses.value.map((item) =>
              item.value === currentWorkGroup ? { value: currentWorkGroup, status } : item
            );
  
        // Логика для изменения статуса вагона
        dataToSend.forEach((row) => {
          if (row.label === 'Статус') {
            if (status === 'Готово' && groupStatus.every((item) => item.status === 'Готово') && groupStatus.length === sorted.length) {
              // Если все группы работ готовы, ставим статус вагона как 'Готово'
              row.value = 'Готово';
            } else if (status === 'Готово') {
              // Если хотя бы одна группа не готова, ставим статус вагона как 'В ожидании'
              row.value = 'В ожидании';
            } else {
              row.value = status; // Иначе, статус вагона обновляется в зависимости от статуса группы работ
            }
          }
        });
  
        // Обновляем данные с новой группой работ
        const mapped = mapDataToKeys([
          ...dataToSend,
          { label: 'Группа работ', value: sorted },
        ]);
        mapped.workgroupStatus = groupStatus;
        const token = localStorage.getItem('authToken');
        const response = await fetch(SERVER + '/trains/' + currentItem.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(mapped),
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          fetchTrains();
          alert('Статус обновлен');
        } else if (response.status === 401) {
          // Если токен просрочен или отсутствует
          console.error('Unauthorized, redirecting to login');
          window.location.href = '/#/auth/login'; // Перенаправление на страницу логина
        } else {
          const error = await response.text();
          alert(`Ошибка: ${error}`);
        }
      } else {
        // Если группа работ состоит из одного элемента
        const dataToSend = currentItem;
        const groupStatus = [{ value: currentWorkGroup, status }];
        dataToSend.data.forEach((row) => {
          if (row.label === 'Статус') {
            row.value = status;
          }
          if (row.label === 'Группа работ') {
            row.value = [row.value];
          }
          if (row.label === 'Статус группы работ') {
            row.value = groupStatus;
          }
        });

        const token = localStorage.getItem('authToken');
  
        const response = await fetch(SERVER + '/trains/' + currentItem.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(mapDataToKeys(dataToSend.data)),
        });
    
        if (response.ok) {
          const result = await response.json();
          fetchTrains();
          alert('Статус обновлен');
        } else if (response.status === 401) {
          // Если токен просрочен или отсутствует
          console.error('Unauthorized, redirecting to login');
          window.location.href = '/#/auth/login'; // Перенаправление на страницу логина
        } else {
          const error = await response.text();
          alert(`Ошибка: ${error}`);
        }
      }
    } catch (e) {
      console.log(e);
      alert('Что-то пошло не так');
    }
  };
  

  const handleOpenInventoryList = (item) => {
    setCurrentItem(item);
    setModalInventoryListOpen(true);
  };

  console.log(items);

  return (
    <Grid2 container>
      <Grid2 size={2}>
        <Sidebar />
      </Grid2>
      <Grid2 size={10}>
        <div className='content'>
          <Typography variant='h4' sx={{ mb: 2 }}>
            Главная
          </Typography>
  
          <FormControl
  sx={{
    width: 160,
    position: 'absolute',
    top: 12,
    right: 64,
  }}
  size="small"
>
  <InputLabel 
    id="status-select-label"
    sx={{
      color: '#ddd', // Светлый текст для контраста
      '&.Mui-focused': { color: '#fff' }, // Подсветка при фокусе
    }}
    shrink // Фикс бага с проваливанием
  >
    Статус
  </InputLabel>
  <Select
    labelId="status-select-label"
    value={selectedStatus || ''}
    onChange={(e) => setSelectedStatus(e.target.value || null)}
    displayEmpty
    sx={{
      backgroundColor: '#333',
      borderRadius: 1,
      color: '#fff',
      transition: 'all 0.2s ease-in-out',
      '& .MuiSelect-icon': { color: 'gray' },
      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#888' },
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#bbb' },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' },
    }}
  >
    <MenuItem value="">Все</MenuItem>
    <MenuItem value="В процессе">В процессе</MenuItem>
    <MenuItem value="Не начато">Не начато</MenuItem>
    <MenuItem value="Готово">Готово</MenuItem>
  </Select>
</FormControl>


  
          {/* Circular Button with Custom Image */}
          <IconButton
            sx={{
              position: 'absolute',
              top: 4,
              right: 24,
              width: 40,
              height: 40,
              borderRadius: '50%',
            }}
            onClick={() => setModalHelpOpen(true)} // Открываем ModalHelp
          >
            <img
              src={require('../assets/img/help-icon.png')}
              alt="Help"
              style={{ width: '20px', height: '20px' }}
            />
          </IconButton>
  
          <Grid2 container spacing={2}>
  {Array.isArray(items) && items
    .filter((item) => {
      // Находим статус в data каждого элемента
      const statusItem = item.data.find((entry) => entry.label === 'Статус');
      const itemStatus = statusItem ? statusItem.value : null;

      return selectedStatus ? itemStatus === selectedStatus : true;
    })
    .map((item) => (
      <Grid2 key={item.id} size={{ xs: 6, md: 3 }}>
        <InventoryCard
          item={item}
          handleClick={() => handleOpenInventoryList(item)}
        />
      </Grid2>
    ))}
</Grid2>

  
          <ModalMain
            open={modalInventoryListOpen}
            handleClose={() => setModalInventoryListOpen(false)}
            data={currentItem.data || []}
            id={currentItem?.id}
            fetchTrains={fetchTrains}
            deleteTrain={deleteTrain}
            handleWorkGroupStatusChange={handleWorkGroupStatusChange}
          />
  
          {/* Добавляем компонент ModalHelp */}
          <ModalHelp
            open={modalHelpOpen}
            handleClose={() => setModalHelpOpen(false)} // Закрываем окно помощи
          />
        </div>
      </Grid2>
    </Grid2>
  );
  
  
  
};

export default Main;
