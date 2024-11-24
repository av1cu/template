import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Grid2, Typography } from '@mui/material';
import InventoryCard from '../components/InventoryCard';
import ModalInventoryList from '../components/ModalInventoryList';
import ModalAddItem from '../components/ModalAddItem';
import ButtonItem from '../components/Button';

const Inventory = () => {
  const [items, setItems] = useState([
    { id: 1, amount: 50, title: 'Шины' },
    { id: 2, amount: 5, title: 'Воздухораспределитель' },
    { id: 3, amount: 30, title: 'Валы' },
  ]);
  const [openModalInventoryList, setOpenModalInventoryList] = useState(false);
  const [modalInventoryList, setModalInventoryList] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [modalAddItemOpen, setModalAddItemOpen] = useState(false);

  const handleItemSelect = (item) => {
    setModalInventoryList([
      { id: 1, title: 'Шина' },
      { id: 2, title: 'Шина' },
      { id: 3, title: 'Шина' },
      { id: 4, title: 'Шина' },
      { id: 5, title: 'Шина' },
      { id: 6, title: 'Шина' },
    ]);
    setCurrentItem(item);
    setOpenModalInventoryList(true);
  };

  const handleAddItem = () => {
    setOpenModalInventoryList(false);
    setModalAddItemOpen(true);
  };

  const handleTakeItem = () => {};

  return (
    <Grid2 container>
      <Grid2 size={2}>
        <Sidebar />
      </Grid2>
      <Grid2 size={10} sx={{ p: 2 }}>
        <div className='content'>
          <Typography variant='h4' sx={{ mb: 2 }}>
            Склад
          </Typography>
          <ButtonItem
            label='Добавить'
            variant='outlined'
            size='small'
            handleChange={handleAddItem}
            sx={{ mb: 2 }}
          />
          <Grid2 container spacing={2}>
            {items.map((item, index) => (
              <Grid2 key={index} size={{ xs: 6, md: 4 }}>
                <InventoryCard
                  title={item.title}
                  amount={item.amount}
                  handleClick={() => handleItemSelect(item)}
                />
              </Grid2>
            ))}
          </Grid2>
          <ModalInventoryList
            open={openModalInventoryList}
            handleClose={() => setOpenModalInventoryList(false)}
            items={modalInventoryList}
            title={currentItem.title}
            handleAddItem={handleAddItem}
            handleTakeItem={handleTakeItem}
          />
          <ModalAddItem
            open={modalAddItemOpen}
            handleClose={() => setModalAddItemOpen(false)}
          />
        </div>
      </Grid2>
    </Grid2>
  );
};

export default Inventory;
