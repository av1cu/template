import formatDate from '../utils/formatDate';
import ButtonItem from './Button';
import ModalItem from './ModalItem';
import TextFieldItem from './TextField';

const ModalMain = ({ open, handleClose, id, deleteTrain, data = [] }) => {
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
      <ButtonItem
        label='Удалить'
        variant='contained'
        handleChange={() => deleteTrain(id)} // Добавляем обработчик удаления
      />
    </ModalItem>
  );
};

export default ModalMain;
