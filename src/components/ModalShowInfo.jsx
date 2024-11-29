import ModalItem from './ModalItem';
import TextFieldItem from './TextField';

const ModalShowInfo = ({ open, handleClose, data = [] }) => {
  return (
    <div>
      <ModalItem open={open} handleClose={handleClose} title='Информация'>
        {data.map((row) => (
          <TextFieldItem
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
    </div>
  );
};

export default ModalShowInfo;
