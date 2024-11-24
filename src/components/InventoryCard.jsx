import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const InventoryCard = ({ title, amount, handleClick, ...props }) => {
  return (
    <div onClick={handleClick}>
      <Card sx={amount < 30 ? { background: '#ff5252' } : {}}>
        <CardContent>
          <Typography variant='h6'>{title}</Typography>
          <Typography>Количество: {amount}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryCard;
