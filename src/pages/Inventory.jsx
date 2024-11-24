import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Grid2, Typography } from '@mui/material';
import InventoryCard from '../components/InventoryCard';
import ModalInventoryList from '../components/ModalInventoryList';
import ModalAddItem from '../components/ModalAddItem';
import ButtonItem from '../components/Button';

const Inventory = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Шины',
      amount: 50,
      data: [
        { id: 1, title: 'Шина A' },
        { id: 2, title: 'Шина B' },
      ],
    },
    {
      id: 2,
      title: 'Воздухораспределитель',
      amount: 5,
      data: [{ id: 1, title: 'Деталь X' }],
    },
    {
      id: 3,
      title: 'Валы',
      amount: 30,
      data: [{ id: 1, title: 'Вал Y' }],
    },
  ]);

  const [currentItem, setCurrentItem] = useState(null);
  const [modalAddItemOpen, setModalAddItemOpen] = useState(false);
  const [modalInventoryListOpen, setModalInventoryListOpen] = useState(false);

  // Handlers for Main Inventory Items
  const handleAddInventoryItem = (newItem) => {
    setItems((prevItems) => [
      ...prevItems,
      { ...newItem, id: Date.now(), data: [] },
    ]);
  };

  const handleEditInventoryItem = (id, updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const handleDeleteInventoryItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Handlers for Nested Data Items
  const handleAddDataItem = (newDataItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === currentItem.id
          ? {
              ...item,
              data: [...item.data, { ...newDataItem, id: Date.now() }],
            }
          : item
      )
    );
    setModalAddItemOpen(false);
  };

  const handleEditDataItem = (inventoryId, dataItemId, updatedDataItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === inventoryId
          ? {
              ...item,
              data: item.data.map((data) =>
                data.id === dataItemId ? { ...data, ...updatedDataItem } : data
              ),
            }
          : item
      )
    );
  };

  const handleDeleteDataItem = (dataItemId) => {
    setItems(
      items.map((item) =>
        item.id == currentItem.id
          ? {
              ...item,
              data: item.data.filter((d) => d.id != dataItemId),
            }
          : item
      )
    );
    setCurrentItem(items.find((i) => i.id == currentItem.id));
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
      <Grid2 size={10} sx={{ p: 2 }}>
        <div className='content'>
          <Typography variant='h4' sx={{ mb: 2 }}>
            Склад
          </Typography>
          <ButtonItem
            label='Добавить'
            variant='outlined'
            size='small'
            handleChange={() => {
              setCurrentItem(null);
              setModalAddItemOpen(true);
            }}
            sx={{ mb: 2 }}
          />
          <Grid2 container spacing={2}>
            {items.map((item) => (
              <Grid2 key={item.id} size={{ xs: 6, md: 4 }}>
                <InventoryCard
                  title={item.title}
                  amount={item.amount}
                  handleClick={() => handleOpenInventoryList(item)}
                  onDelete={() => handleDeleteInventoryItem(item.id)}
                />
              </Grid2>
            ))}
          </Grid2>
          {modalInventoryListOpen && (
            <ModalInventoryList
              open={modalInventoryListOpen}
              handleClose={() => setModalInventoryListOpen(false)}
              items={currentItem.data}
              title={currentItem.title}
              handleAddItem={() => {
                setModalInventoryListOpen(false);
                setModalAddItemOpen(true);
              }}
              handleTakeItem={(dataId) => handleDeleteDataItem(dataId)}
              handleEditItem={(dataItem) =>
                handleEditDataItem(currentItem.id, dataItem)
              }
              handleDeleteItem={(dataItemId) =>
                handleDeleteDataItem(dataItemId)
              }
            />
          )}
          <ModalAddItem
            open={modalAddItemOpen}
            handleClose={() => setModalAddItemOpen(false)}
            handleSave={
              currentItem ? handleAddDataItem : handleAddInventoryItem
            }
          />
        </div>
      </Grid2>
    </Grid2>
  );
};

export default Inventory;
