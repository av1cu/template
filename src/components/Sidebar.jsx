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

const Sidebar = () => {
  const theme = useTheme();

  return (
    <div className={styles.sidebar}>
      <List sx={{ background: theme.palette.background.paper, height: '100%' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary='Склад' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
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
