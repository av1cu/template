import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TrainCard = ({ title, item, handleEdit, ...props }) => {
  return (
    <div>
      <Card sx={{ minHeight: 290 }}>
        <CardActions sx={{ pb: 0, justifyContent: 'end' }}>
          <IconButton size='small' onClick={() => handleEdit(item)}>
            <EditIcon />
          </IconButton>
          <IconButton size='small'>
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography variant='h6'>{title}</Typography>
          {item.data.map((d) => (
            <Stack direction='row' sx={{ justifyContent: 'space-between' }}>
              <Typography sx={{ mr: 1 }}>
                <b>{d.label}</b>
              </Typography>
              <Typography align='right'>{d.value}</Typography>
            </Stack>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainCard;
