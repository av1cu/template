import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import ButtonItem from './Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InventoryItemCard = ({ item, handleTakeItem, ...props }) => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant='p1'>{item.title}</Typography>
        </CardContent>
        <CardActions>
          <ButtonItem
            label='Взять'
            size='small'
            handleChange={() => handleTakeItem(item)}
          />
          <IconButton size='small'>
            <EditIcon />
          </IconButton>
          <IconButton size='small'>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default InventoryItemCard;
