import { Button } from '@mui/material';
import React from 'react';

const ButtonItem = ({ variant, label, handleChange, ...props }) => {
  return (
    <div>
      <Button variant={variant} onClick={handleChange} {...props}>
        {label}
      </Button>
    </div>
  );
};

export default ButtonItem;
