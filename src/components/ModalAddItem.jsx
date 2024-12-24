import React, { useState } from 'react';
import ModalItem from './ModalItem';
import { Grid2, Stack } from '@mui/material';
import InventoryItemCard from './InventoryItemCard';
import ButtonItem from './Button';
import TextFieldItem from './TextField';

const ModalAddItem = ({
  open,
  handleClose,
  handleSave,
  item = {},
  edit = false,
}) => {
  const [name, setName] = useState(item.title || '');
  const [amount, setAmount] = useState(item.amount || '');

  const handleSaveClick = () => {
    const newItem = { title: name, amount: Number(amount) };
    handleSave(newItem);
    handleClose();
  };

  return (
    <div>
      <ModalItem
        open={open}
        handleClose={handleClose}
        title={edit ? 'Редактировать' : 'Добавить'}
      >
        <TextFieldItem
          label='Название'
          value={name}
          handleChange={(e) => setName(e.target.value)}
          fullWidth
          size='small'
          sx={{ mb: 2 }}
        />
        <TextFieldItem
          label='Количество'
          value={amount}
          handleChange={(e) => setAmount(e.target.value)}
          fullWidth
          size='small'
          sx={{ mb: 2 }}
        />
        <ButtonItem
          label='Сохранить'
          variant='outlined'
          size='small'
          handleChange={handleSaveClick}
          sx={{ mb: 2 }}
        />
      </ModalItem>
    </div>
  );
};

export default ModalAddItem;
