import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const SelectForm = ({
  value,
  handleChange,
  label,
  options,
  multiple = false,
  ...props
}) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
        <Select
          labelId={`select-label-${label}`}
          id={`select-${label}`}
          value={value || (multiple ? [] : '')} // Убедимся, что value — массив для multiple
          label={label}
          onChange={(e) =>
            handleChange(multiple ? e.target.value : e.target.value) // Передаем массив для multiple
          }
          multiple={multiple} // Включение режима множественного выбора
          {...props}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectForm;
