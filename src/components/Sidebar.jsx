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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import logo from './../assets/img/569D8225-32BC-45D1-BD44-F1FA1C7A9309-removebg-preview.png';
import CalculateIcon from '@mui/icons-material/Calculate';
import LogoutIcon from '@mui/icons-material/Logout';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemIcon>
              <img src={logo} alt='logo' className='logo' />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Главная' />
          </ListItemButton>
        </ListItem>
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
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/schedule')}>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary='Расписание' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/calculation')}>
            <ListItemIcon>
              <CalculateIcon />
            </ListItemIcon>
            <ListItemText primary='Калькуляция' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/history')}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary='История' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/auth/login')}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Выйти' />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
