import React from 'react';
import { Button } from '@mui/material';

// Кнопка для загрузки файла
const ButtonFile = ({ label, handleChange, variant = 'contained', color = 'primary', sx, ...props }) => {
  // Обработчик клика на кнопку, который активирует input[type="file"]
  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div>
      <Button
        variant={variant}
        color={color}
        onClick={handleButtonClick}
        sx={sx}
        {...props}
      >
        {label}
      </Button>
      
      {/* Скрытый input для выбора файла */}
      <input
        id="fileInput"
        type="file"
        hidden
        onChange={handleChange} // Обработчик загрузки файла
      />
    </div>
  );
};

export default ButtonFile; // Экспортируем компонент как default
