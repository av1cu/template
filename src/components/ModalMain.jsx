import ModalItem from './ModalItem';
import TextFieldItem from './TextField';

const ModalMain = ({ open, handleClose, data = [] }) => {
  return (
    <ModalItem open={open} handleClose={handleClose} title='Информация'>
      {data.map((row, index) => (
        <TextFieldItem
          key={index}
          label={row.label}
          value={row.value}
          handleChange={() => {}}
          fullWidth
          size='small'
          sx={{ mb: 2 }}
          disabled
        />
      ))}
    </ModalItem>
  );
};

export default ModalMain;
