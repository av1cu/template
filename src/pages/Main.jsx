import { Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ButtonItem from '../components/Button';
import InventoryCard from '../components/InventoryCard';
import PasIcon from './../assets/img/FCDD32C4-55B5-4C59-8717-A15A1AACED23-removebg-preview.png';
import GruzIcon from './../assets/img/FD504E0A-3EC0-4EAE-AF86-4845AFE7BEB1-removebg-preview.png';
import ModalMain from '../components/ModalMain';
import { SERVER } from '../const';

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
  { key: 'status', label: 'Статус', type: 'text' },
];

const Main = () => {
  const [items, setItems] = useState([]);

  const [currentItem, setCurrentItem] = useState({});
  const [modalInventoryListOpen, setModalInventoryListOpen] = useState(false);

  useEffect(() => {
    fetchTrains();
  }, []);

  // Функция для получения списка поездов
  async function fetchTrains() {
    const apiUrl = SERVER + '/trains';

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      const trains = await response.json();
      setItems(trains);
    } catch (error) {
      console.error('Ошибка при получении списка поездов:', error);
      throw error; // Пробрасываем ошибку, чтобы её можно было обработать выше
    }
  }

  const deleteTrain = async (id) => {
    try {
      const response = await fetch(SERVER + `/trains/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        fetchTrains();
        setModalInventoryListOpen(false);
      } else if (response.status === 404) {
        console.error('Train not found');
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
      const workGroups = currentItem.data.find(
        (row) => row.label === 'Группа работ'
      );
      if (Array.isArray(workGroups.value)) {
        const sorted = [
          currentWorkGroup,
          ...workGroups.value.filter((item) => item !== currentWorkGroup),
        ];
        const dataToSend = currentItem.data.filter(
          (row) => row.label !== 'Группа работ'
        );
        dataToSend.forEach((row) => {
          if (row.label === 'Статус') {
            row.value = status;
          }
        });
        const response = await fetch(SERVER + '/trains/' + currentItem.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            mapDataToKeys([
              ...dataToSend,
              { label: 'Группа работ', value: sorted },
            ])
          ),
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          fetchTrains();
          alert('Статус обновлен');
        } else {
          const error = await response.text();
          alert(`Ошибка: ${error}`);
        }
      } else {
        const dataToSend = currentItem;
        console.log(dataToSend.data);
        dataToSend.data.forEach((row) => {
          if (row.label === 'Статус') {
            row.value = status;
          }
          if (row.label === 'Группа работ') {
            row.value = [row.value];
          }
        });

        const response = await fetch(SERVER + '/trains/' + currentItem.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mapDataToKeys(dataToSend.data)),
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          fetchTrains();
          alert('Статус обновлен');
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
          <Grid2 container spacing={2}>
            {items.map((item) => (
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
        </div>
      </Grid2>
    </Grid2>
  );
};

export default Main;
