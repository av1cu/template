import { useNavigate } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import ButtonItem from './Button'; // Импортируем именованные экспорты
import ButtonFile from './ButtonFile';
import ModalItem from './ModalItem';
import TextFieldItem from './TextField';
import { Stack } from '@mui/material';
import { useState,useEffect } from 'react';
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
  const [fileExists, setFileExists] = useState(false); // Добавим состояние для проверки существования файла
  const [fileName, setFileName] = useState(''); // Состояние для хранения имени файла


  // Проверка, имеет ли вагон статус "Готово"
  const isReady = data.some(
    (row) => row.label === 'Статус' && row.value === 'Готово'
  );

   // Проверка наличия файла
useEffect(() => {
  const wagonNumber = data.find(row => row.label === 'Номер вагона')?.value;
  if (wagonNumber) {
    const token = localStorage.getItem('authToken');
    
    fetch(`${SERVER}/files/${wagonNumber}/exist`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 401) {
          // Если токен просрочен или отсутствует
          console.error('Unauthorized, redirecting to login');
          window.location.href = '/template/#/auth/login'; // Перенаправление на страницу логина
          return; // Прерываем выполнение запроса
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          console.log(data.exists);
          setFileExists(data.exists); // Обновляем состояние, если файл существует
          if (data.exists) {
            setFileName(data.message); // Сохраняем имя файла
          }
        }
      })
      .catch(console.error);
  }
}, [data]);

  


  const handleCalculationClick = () => {
    // Передаем данные вагона в state при навигации
    navigate('/calculation', { state: { data } });
  };

  const handleSelectWorkgroup = (group) => {
    setCurrentWorkGroup(group);
    setShowOptions(true);
  };

  const calcVariant = (val) => {
    const statuses = data.find(
      (row) => row.label === 'Статус группы работ'
    ).value;
    if (statuses !== 'Нет статусов') {
      const status = statuses.find((row) => row.value === val);
      if (status && status.status === 'Готово') {
        return 'success';
      }
      return 'primary';
    }
  };
   // Функция для загрузки файла
   const handleFileUpload = (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]); // Добавляем файл
    const wagonNumber = data.find(row => row.label === 'Номер вагона')?.value;
    formData.append('wagonNumber', wagonNumber);
  
    const token = localStorage.getItem('authToken');
  
    fetch(`${SERVER}/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
      .then(res => {
        if (res.status === 401) {
          // Если токен просрочен или отсутствует
          console.error('Unauthorized, redirecting to login');
          window.location.href = '/template/#/auth/login'; // Перенаправление на страницу логина
          return; // Прерываем выполнение запроса
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          alert('Файл успешно загружен');
          setFileExists(true);
          setFileName(data.file.filename); // Обновляем имя файла после загрузки
        }
      })
      .catch(console.error);
  };
  

  // Функция для скачивания файла
const handleDownloadFile = () => {
  const wagonNumber = data.find(row => row.label === 'Номер вагона')?.value;
  const token = localStorage.getItem('authToken');

  fetch(`${SERVER}/files/${wagonNumber}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => {
      if (response.status === 401) {
        // Если токен просрочен или отсутствует
        console.error('Unauthorized, redirecting to login');
        window.location.href = '/template/#/auth/login'; // Перенаправление на страницу логина
        return; // Прерываем выполнение запроса
      }
      if (!response.ok) throw new Error("Файл не найден");
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName; // Используем имя файла для скачивания
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch(console.error);
};


  // Функция для удаления файла
const handleDeleteFile = () => {
  const wagonNumber = data.find(row => row.label === 'Номер вагона')?.value;
  const token = localStorage.getItem('authToken');

  fetch(`${SERVER}/files/${wagonNumber}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => {
      if (res.status === 401) {
        // Если токен просрочен или отсутствует
        console.error('Unauthorized, redirecting to login');
        window.location.href = '/template/#/auth/login'; // Перенаправление на страницу логина
        return; // Прерываем выполнение запроса
      }
      return res.json();
    })
    .then(data => {
      if (data) {
        alert('Файл успешно удалён');
        setFileExists(false); // Обновляем состояние после удаления
        setFileName(''); // Очищаем имя файла
      }
    })
    .catch(console.error);
};


  return (
    <ModalItem open={open} handleClose={handleClose} title='Информация'>
      {data.map((row, index) => {
        if (row.label !== 'Статус группы работ') {
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
                          color={calcVariant(val)}
                          variant='outlined'
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
                                  'Готово',
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
                      variant='outlined'
                      handleChange={() => handleSelectWorkgroup(row.value)}
                      label={row.value}
                      color={calcVariant(row.value)}
                    />
                  </Stack>
                  {showOptions && (
                    <Stack direction='row' spacing={1} mb={2}>
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
                            'Готово',
                            currentWorkGroup
                          )
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
        }
      })}
      <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 'auto',
  }}
>
  {/* Левые кнопки */}
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {/* Кнопка "Удалить" (красная) */}
    <ButtonItem
      label="Удалить"
      variant="contained"
      color="error"
      handleChange={() => deleteTrain(id)}
      sx={{
        mt: 2,
        backgroundColor: '#ff2441',
        color: 'white',
        '&:hover': { backgroundColor: 'darkred' },
      }}
    />
    {/* Кнопка "Калькуляция" (зеленая), отображается только при статусе "Готово" */}
    {isReady && (
      <ButtonItem
        label="Калькуляция"
        variant="contained"
        color="success"
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

  {/* Правые кнопки */}
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {/* Кнопка для загрузки файла (синяя), отображается только когда файла нет */}
    {!fileExists && (
      <ButtonFile
        label="Загрузить файл"
        handleChange={handleFileUpload} // Обработчик загрузки файла
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          backgroundColor: '#2196f3',
          color: 'white',
          '&:hover': { backgroundColor: '#1976d2' },
        }}
      />
    )}

    {/* Кнопка "Скачать файл" (синяя), отображается если файл существует */}
    {fileExists && (
      <ButtonItem
        label="Скачать файл"
        variant="contained"
        color="primary"
        handleChange={handleDownloadFile} // Обработчик скачивания
        sx={{
          mt: 2,
          backgroundColor: '#2196f3',
          color: 'white',
          '&:hover': { backgroundColor: '#1976d2' },
        }}
      />
    )}

    {/* Кнопка "Удалить файл" (синяя), отображается если файл существует */}
    {fileExists && (
      <ButtonItem
        label="Удалить файл"
        variant="contained"
        color="primary"
        handleChange={handleDeleteFile} // Обработчик удаления
        sx={{
          mt: 2,
          backgroundColor: '#2196f3',
          color: 'white',
          '&:hover': { backgroundColor: '#1976d2' },
        }}
      />
    )}
  </div>
</div>

    </ModalItem>
  );
};

export default ModalMain;