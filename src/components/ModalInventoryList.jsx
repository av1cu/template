import React, { useState } from 'react';
import ModalItem from './ModalItem';
import { Grid2, Stack } from '@mui/material';
import InventoryItemCard from './InventoryItemCard';
import ButtonItem from './Button';

const ModalInventoryList = ({
  open,
  handleClose,
  title,
  items,
  handleAddItem,
  handleTakeItem,
  handleEditItem,
  handleDeleteItem,
}) => {
  return (
    <div>
      <ModalItem open={open} handleClose={handleClose} title={title}>
        <ButtonItem
          label='Добавить'
          variant='outlined'
          size='small'
          handleChange={() => handleAddItem()}
          sx={{ mb: 2 }}
        />
        <Grid2 container spacing={2}>
          {items.map((item, index) => (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <InventoryItemCard
                item={item}
                handleTakeItem={() => handleTakeItem(item.id)}
                // handleEditItem={() => handleOpenEditModal(item)}
                handleDeleteItem={() => handleDeleteItem(item.id)}
              />
            </Grid2>
          ))}
        </Grid2>
      </ModalItem>
    </div>
  );
};

export default ModalInventoryList;
