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
        console.error('Unauthorized, redirecting to login');
        window.location.href = '/template/#/auth/login'; // Перенаправление на страницу логина
      }
      const trains = await response.json();

      // Сортировка по номеру вагона (wagonNumber) перед установкой состояния
      const sortedTrains = trains.sort((a, b) => {
        const wagonNumberA = a.data.find(item => item.label === 'Номер вагона')?.value || '';
        const wagonNumberB = b.data.find(item => item.label === 'Номер вагона')?.value || '';
        return wagonNumberA.localeCompare(wagonNumberB);
      });

      setItems(sortedTrains);
    } catch (error) {
      console.error('Ошибка при получении списка поездов:', error);
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
        window.location.href = '/template/#/auth/login'; // Перенаправление на страницу логина
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

  const handleWorkGroupStatusChange = async (statuses, workGroups) => {
    try {
      const workGroupsData = currentItem.data.find((row) => row.label === 'Группа работ');
      
      // Если группа состоит из нескольких элементов, обновляем её
      let updatedWorkGroups = [];
      if (Array.isArray(workGroupsData.value)) {
        updatedWorkGroups = workGroupsData.value.map((group) =>
          workGroups.includes(group) ? group : null
        ).filter(Boolean);
      } else {
        updatedWorkGroups = workGroups;
      }
  
      // Обновляем только 'Группа работ' и 'Статус группы работ'
      const updatedData = currentItem.data.map((row) => {
        if (row.label === 'Группа работ') {
          return { ...row, value: updatedWorkGroups };
        }
        if (row.label === 'Статус группы работ') {
          return { ...row, value: statuses.map((status, index) => ({
            value: updatedWorkGroups[index],
            status
          })) };
        }
        return row;
      });
  
      // Создаем объект для отправки на сервер
      const dataToSend = {
        ...currentItem,
        data: updatedData,
      };
  
      // Отправляем PUT запрос
      const token = localStorage.getItem('authToken');
      const response = await fetch(SERVER + '/trains/' + currentItem.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(mapDataToKeys(dataToSend.data)),
      });
  
      // Обработка ответа
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        fetchTrains();
        alert('Статус обновлен');
      } else if (response.status === 401) {
        // Если токен просрочен или отсутствует
        console.error('Unauthorized, redirecting to login');
        window.location.href = '/template/#/auth/login'; // Перенаправление на страницу логина
      } else {
        const error = await response.text();
        alert(`Ошибка: ${error}`);
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
    top: 10,
    right: 82,
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
              top: 0,
              right: 24,
              width: 50,
              height: 50,
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
