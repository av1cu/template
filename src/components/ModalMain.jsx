import { useNavigate } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import ButtonItem from './Button';
import ModalItem from './ModalItem';
import TextFieldItem from './TextField';

const ModalMain = ({ open, handleClose, id, deleteTrain, data = [] }) => {
  const navigate = useNavigate();  // Хук для навигации

  // Проверка, имеет ли вагон статус "Готово"
  const isReady = data.some((row) => row.label === 'Статус' && row.value === 'Готово');

  const handleCalculationClick = () => {
    // Передаем данные вагона в state при навигации
    navigate('/calculation', { state: { data } });
  };

  return (
    <ModalItem open={open} handleClose={handleClose} title='Информация'>
      {data.map((row, index) => {
        const value = Array.isArray(row.value)
          ? row.value.join(', ')
          : row.value; // Если массив, объединяем через запятую
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
            handleChange={handleCalculationClick}  // Используем нашу функцию для перехода на страницу калькуляции
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
