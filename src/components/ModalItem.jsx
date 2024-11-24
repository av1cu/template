import { Box, Modal, Stack, Typography } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxHeight: '70vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ModalItem = ({ children, open, handleClose, title, ...props }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby={title}>
        <Box sx={style}>
          <Stack
            sx={{
              justifyContent: 'space-between',
              mb: 2,
              flexDirection: 'row',
            }}
          >
            <Typography id='modal-modal-title' variant='h5' component='h2'>
              {title}
            </Typography>
            <div onClick={handleClose}>
              <CloseIcon />
            </div>
          </Stack>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalItem;
