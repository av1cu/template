import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const SelectForm = ({ value, handleChange, label, options, ...props }) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id='select-label'>{label}</InputLabel>
        <Select
          labelId='select-label'
          id='select'
          value={value}
          label={label}
          onChange={(e) => {
            handleChange({ value: e.target.value, label: e.target.name });
          }}
          {...props}
        >
          {options.map((opt) => (
            <MenuItem value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectForm;
