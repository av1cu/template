import React, { useState } from 'react';
import ModalItem from './ModalItem';
import { Grid2, Stack } from '@mui/material';
import InventoryItemCard from './InventoryItemCard';
import ButtonItem from './Button';
import TextFieldItem from './TextField';

const ModalAddItem = ({ open, handleClose, item, handleSave }) => {
  const [name, setName] = useState('');
  return (
    <div>
      <ModalItem open={open} handleClose={handleClose} title='Добавить'>
        <TextFieldItem
          label='Название'
          value={name}
          handleChange={(e) => setName(e.target.value)}
          fullWidth
          size='small'
          sx={{ mb: 2 }}
        />
        <ButtonItem
          label='Сохранить'
          variant='outlined'
          size='small'
          handleChange={handleSave}
          sx={{ mb: 2 }}
        />
      </ModalItem>
    </div>
  );
};

export default ModalAddItem;
