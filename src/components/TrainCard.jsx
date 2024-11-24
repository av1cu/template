import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const TrainCard = ({ title, handleClick, ...props }) => {
  return (
    <div onClick={handleClick}>
      <Card>
        <CardContent>
          <Typography variant='h6'>{title}</Typography>
          <Typography>Количество: {}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainCard;
