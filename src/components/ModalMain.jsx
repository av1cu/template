import { useNavigate } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import ButtonItem from './Button';
import ModalItem from './ModalItem';
import TextFieldItem from './TextField';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { SERVER } from '../const';

const ModalMain = ({
  open,
  handleClose,
  id,
  deleteTrain,
  handleWorkGroupStatusChange,
  data = [],
}) => {
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

  return (
    <ModalItem open={open} handleClose={handleClose} title='Информация'>
      {data.map((row, index) => {
        if (row.label === 'Группа работ') {
          if (Array.isArray(row.value)) {
            return (
              <div>
                <Stack direction='row' spacing={1} mb={2}>
                  {row.value.map((val) => (
                    <div>
                      <ButtonItem
                        size='small'
                        handleChange={() => handleSelectWorkgroup(val)}
                        label={val}
                        variant='contained'
                        sx={{ mb: 1 }}
                      />
                      {showOptions && currentWorkGroup === val && (
                        <Stack direction='row' spacing={1}>
                          <ButtonItem
                            size='small'
                            variant='outlined'
                            handleChange={() =>
                              handleWorkGroupStatusChange(
                                'В процессе',
                                currentWorkGroup
                              )
                            }
                            label='В активе'
                          />
                          <ButtonItem
                            size='small'
                            variant='outlined'
                            handleChange={() =>
                              handleWorkGroupStatusChange(
                                'В ожидании',
                                currentWorkGroup
                              )
                            }
                            label='Готово'
                          />
                        </Stack>
                      )}
                    </div>
                  ))}
                </Stack>
              </div>
            );
          } else {
            return (
              <div>
                <Stack direction='row' spacing={1} mb={1}>
                  <ButtonItem
                    size='small'
                    variant='contained'
                    handleChange={() => handleSelectWorkgroup(row.value)}
                    label={row.value}
                  />
                </Stack>
                {showOptions && (
                  <Stack direction='row' spacing={1} mb={2}>
                    <ButtonItem
                      size='small'
                      variant='outlined'
                      handleChange={() =>
                        handleWorkGroupStatusChange('В процессе')
                      }
                      label='В активе'
                    />
                    <ButtonItem
                      size='small'
                      variant='outlined'
                      handleChange={() =>
                        handleWorkGroupStatusChange('В ожидании')
                      }
                      label='Готово'
                    />
                  </Stack>
                )}
              </div>
            );
          }
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
