import { useNavigate } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import ButtonItem from './Button';
import ModalItem from './ModalItem';
import TextFieldItem from './TextField';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { SERVER } from '../const';

const ModalMain = ({ open, handleClose, id, deleteTrain, data = [] }) => {
  const navigate = useNavigate(); // Хук для навигации
  const [currentWorkGroup, setCurrentWorkGroup] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  // Проверка, имеет ли вагон статус "Готово"
  const isReady = data.some(
    (row) => row.label === 'Статус' && row.value === 'Готово'
  );

  const handleCalculationClick = () => {
    // Передаем данные вагона в state при навигации
    navigate('/calculation', { state: { data } });
  };

  const handleSelectWorkgroup = (group) => {
    setCurrentWorkGroup(group);
    setShowOptions(true);
  };

  const handleWorkGroupStatusChange = async (status) => {
    const workGroups = data.find((row) => row.label === 'Группа работ');
    if (Array.isArray(workGroups)) {
      const sorted = [
        currentWorkGroup,
        ...workGroups.filter((item) => item !== currentWorkGroup),
      ];
      const dataToSend = data.filter((row) => row.label !== 'Группа работ');
      dataToSend.forEach((row) => {
        if (row.label === 'Статус') {
          row.value = status;
        }
      });

      const response = await fetch(SERVER + '/trains/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...dataToSend, ...sorted }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert('Статус обновлен');
      } else {
        const error = await response.text();
        alert(`Ошибка: ${error}`);
      }
    } else {
      const dataToSend = data;
      dataToSend.forEach((row) => {
        if (row.label === 'Статус') {
          row.value = status;
        }
      });

      const response = await fetch(SERVER + '/trains/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert('Статус обновлен');
      } else {
        const error = await response.text();
        alert(`Ошибка: ${error}`);
      }
    }
  };

  return (
    <ModalItem open={open} handleClose={handleClose} title='Информация'>
      {data.map((row, index) => {
        if (Array.isArray(row.value)) {
          return (
            <div>
              <Stack direction='row' spacing={1}>
                {row.value.map((val) => (
                  <ButtonItem
                    variant='small'
                    handleChange={() => handleSelectWorkgroup(val)}
                  >
                    {val}
                  </ButtonItem>
                ))}
              </Stack>
              {showOptions && (
                <Stack direction='row' spacing={1}>
                  <ButtonItem
                    variant='small'
                    handleChange={() =>
                      handleWorkGroupStatusChange('В процессе')
                    }
                  >
                    В активе
                  </ButtonItem>
                  <ButtonItem
                    variant='small'
                    handleChange={() => handleWorkGroupStatusChange('В')}
                  >
                    Готово
                  </ButtonItem>
                </Stack>
              )}
            </div>
          );
        }
        const value = row.value; // Если массив, объединяем через запятую
        return (
          <TextFieldItem
            key={index}
            label={row.label}
            value={
              row.label === 'Начало ремонта' ||
              row.label === 'Конец ремонта' ||
              row.label === 'Дата'
                ? formatDate(value)
                : value
            }
            handleChange={() => {}}
            fullWidth
            size='small'
            sx={{ mb: 2 }}
            disabled
          />
        );
      })}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 'auto',
        }}
      >
        {/* Кнопка "Удалить" */}
        <ButtonItem
          label='Удалить'
          variant='contained'
          color='error'
          handleChange={() => deleteTrain(id)}
          sx={{
            mt: 2,
            backgroundColor: '#ff2441',
            color: 'white',
            '&:hover': { backgroundColor: 'darkred' },
          }}
        />
        {/* Кнопка "Калькуляция", отображается только при статусе "Готово" */}
        {isReady && (
          <ButtonItem
            label='Калькуляция'
            variant='contained'
            color='success'
            handleChange={handleCalculationClick} // Используем нашу функцию для перехода на страницу калькуляции
            sx={{
              mt: 2,
              backgroundColor: 'green',
              color: 'white',
              '&:hover': { backgroundColor: 'darkgreen' },
            }}
          />
        )}
      </div>
    </ModalItem>
  );
};

export default ModalMain;
