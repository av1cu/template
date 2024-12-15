import { Grid2, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ButtonItem from '../components/Button';
import InventoryCard from '../components/InventoryCard';
import PasIcon from './../assets/img/FCDD32C4-55B5-4C59-8717-A15A1AACED23-removebg-preview.png';
import GruzIcon from './../assets/img/FD504E0A-3EC0-4EAE-AF86-4845AFE7BEB1-removebg-preview.png';
import ModalMain from '../components/ModalMain';

const Main = () => {
  const [items, setItems] = useState([]);

  const [currentItem, setCurrentItem] = useState({});
  const [modalInventoryListOpen, setModalInventoryListOpen] = useState(false);

  useEffect(() => {
    fetchTrains();
  }, []);

  // Функция для получения списка поездов
  async function fetchTrains() {
    const apiUrl = 'http://localhost:3000/trains';

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
      const response = await fetch(`http://localhost:3000/trains/${id}`, {
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

  const handleOpenInventoryList = (item) => {
    setCurrentItem(item);
    setModalInventoryListOpen(true);
  };

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
          />
        </div>
      </Grid2>
    </Grid2>
  );
};

export default Main;
