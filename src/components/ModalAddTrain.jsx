import React, { useEffect, useState } from 'react';
import ModalItem from './ModalItem';
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
  Stack,
} from '@mui/material';
import InventoryItemCard from './InventoryItemCard';
import ButtonItem from './Button';
import TextFieldItem from './TextField';

const ModalAddTrain = ({ open, handleClose, item, edit, handleSave }) => {
  const [fields, setFields] = useState({});
  const [calc, setCalc] = useState(false);

  const dummyLabels = [
    { key: 'name', label: 'Название вагона' },
    { key: 'company', label: 'Компания' },
    { key: 'dateIssued', label: 'Срок выдачи' },
    { key: 'repairType', label: 'Тип ремонта' },
    { key: 'partName', label: 'Деталь' },
    { key: 'price', label: 'Цена' },
  ];

  useEffect(() => {
    if (edit && item) {
      const initialFields = dummyLabels.reduce((acc, field) => {
        const matchingField = item.data.find(
          (dataItem) => dataItem.label === field.label
        );
        acc[field.label] = matchingField ? matchingField.value : '';
        return acc;
      }, {});
      setFields(initialFields);
    } else {
      setFields(
        dummyLabels.reduce((acc, field) => ({ ...acc, [field.label]: '' }), {})
      );
    }
  }, [edit, item]);

  const handleFieldChange = (key, value) => {
    setFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveClick = () => {
    handleSave(fields);
  };

  const handleCalc = () => {
    setCalc(true);
  };

  return (
    <div>
      <ModalItem
        open={open}
        handleClose={handleClose}
        title={edit ? 'Редактировать' : 'Добавить'}
      >
        {dummyLabels.map(({ key, label }) => (
          <TextFieldItem
            key={key}
            label={label}
            value={fields[label]}
            handleChange={(e) => handleFieldChange(label, e.target.value)}
            fullWidth
            size='small'
            sx={{ mb: 2 }}
          />
        ))}
        <ButtonItem
          label='Сохранить'
          variant='outlined'
          size='small'
          handleChange={handleCalc}
          sx={{ mb: 2 }}
        />
        <Dialog
          open={calc}
          onClose={() => setCalc(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Продолжить?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Стоимость: 100 000
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCalc(false)}>Нет</Button>
            <Button onClick={handleSaveClick} autoFocus>
              Да
            </Button>
          </DialogActions>
        </Dialog>
      </ModalItem>
    </div>
  );
};

export default ModalAddTrain;
