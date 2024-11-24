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

const InventoryItemCard = ({
  item,
  handleTakeItem,
  handleEditItem,
  handleDeleteItem,
}) => {
  // const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant='body1'>{item.title}</Typography>
        </CardContent>
        <CardActions>
          <ButtonItem
            label='Взять'
            size='small'
            handleChange={handleTakeItem}
          />
          {/* <IconButton size="small" onClick={() => setEditModalOpen(true)}>
            <EditIcon />
          </IconButton> */}
          <IconButton size='small' onClick={handleDeleteItem}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      {/* Edit Modal */}
      {/* <ModalEditDataItem
        open={editModalOpen}
        handleClose={() => setEditModalOpen(false)}
        handleSave={handleEditItem}
        initialData={item}
      /> */}
    </div>
  );
};

export default InventoryItemCard;
