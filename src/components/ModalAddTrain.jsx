import React, { useEffect, useState } from 'react';
import ModalItem from './ModalItem';
import { Grid2, Stack } from '@mui/material';
import InventoryItemCard from './InventoryItemCard';
import ButtonItem from './Button';
import TextFieldItem from './TextField';

const ModalAddTrain = ({ open, handleClose, item, edit, handleSave }) => {
  const [fields, setFields] = useState({});

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
          handleChange={handleSaveClick}
          sx={{ mb: 2 }}
        />
      </ModalItem>
    </div>
  );
};

export default ModalAddTrain;
