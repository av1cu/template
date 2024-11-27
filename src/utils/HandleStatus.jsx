import { useState } from 'react';
import SelectForm from '../components/Select';

const HandleStatus = ({ cell, ...props }) => {
  const [status, setStatus] = useState(cell);

  const handleChange = (event) => {
    setStatus(event);
  };

  const options = [
    { value: 'Готово', label: 'Готово' },
    { value: 'В процессе', label: 'В процессе' },
    { value: 'Не начато', label: 'Не начато' },
  ];

  return (
    <SelectForm
      value={status}
      handleChange={(newValue) => handleChange(newValue)}
      label='Статус'
      options={options}
    />
  );
};

export default HandleStatus;
