import React from 'react';
import styles from './sidebar.module.css';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import TrainIcon from '@mui/icons-material/Train';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router';

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar}>
      <List sx={{ background: theme.palette.background.paper, height: '100%' }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/inventory')}>
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary='Склад' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/trains')}>
            <ListItemIcon>
              <TrainIcon />
            </ListItemIcon>
            <ListItemText primary='Вагоны' />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
