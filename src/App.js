import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import City from './pages/auth/City';
import Login from './pages/auth/Login';
import Inventory from './pages/Inventory';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Trains from './pages/Trains';
import Schedule from './pages/Schedule';
import History from './pages/History';
import Calculation from './pages/Calculation';
import Main from './pages/Main';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Light blue
    },
    secondary: {
      main: '#f48fb1', // Pinkish shade
    },
    background: {
      default: '#121212', // Dark background
      paper: 'rgba(30,30,30,0.75)', // Slightly lighter background for surfaces
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#bdbdbd', // Grey text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none', // Prevents uppercase text transformation
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners for buttons
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded corners for paper components
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path='auth'>
          <Route path='city' element={<City />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='/' element={<Main />} />
        <Route path='inventory' element={<Inventory />} />
        <Route path='trains' element={<Trains />} />
        <Route path='schedule' element={<Schedule />} />
        <Route path='history' element={<History />} />
        <Route path='calculation' element={<Calculation />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
