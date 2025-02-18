import { TextField } from '@mui/material';
import React from 'react';

const TextFieldItem = ({
  value,
  handleChange,
  label,
  variant = 'outlined',
  ...props
}) => {
  return (
    <div>
      <TextField
        value={value}
        onChange={handleChange}
        label={label}
        variant={variant}
        {...props}
      />
    </div>
  );
};

export default TextFieldItem;
