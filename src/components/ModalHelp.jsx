// src/components/ModalHelp.js
import React from 'react';
import { Modal, Box, Typography, IconButton, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Цвета групп работ
const colors = [
    { value: 'Ходовые части', color: 'rgba(255, 99, 71, 0.7)', processColor: 'rgba(255, 69, 0, 0.7)' }, // Красный и оранжевый
    { value: 'Рессорное подвешивание', color: 'rgba(255, 215, 0, 0.7)', processColor: 'rgba(255, 105, 180, 0.7)' }, // Желтый и розовый
    { value: 'Буксы и подшипники', color: 'rgba(70, 130, 180, 0.7)', processColor: 'rgba(255, 182, 193, 0.7)' }, // Синий и светлый розовый
    { value: 'Автосцепное устройство', color: 'rgba(50, 205, 50, 0.7)', processColor: 'rgba(34, 139, 34, 0.7)' }, // Зелёный
    { value: 'Переходные устройства и буферные приборы', color: 'rgba(138, 43, 226, 0.7)', processColor: 'rgba(255, 0, 255, 0.7)' }, // Фиолетовый и пурпурный
    { value: 'Тормозное оборудование', color: 'rgba(220, 20, 60, 0.7)', processColor: 'rgba(255, 69, 0, 0.7)' }, // Бордовый и оранжевый
    { value: 'Наружная фурнитура и замочные работы', color: 'rgba(210, 105, 30, 0.7)', processColor: 'rgba(128, 0, 128, 0.7)' }, // Коричневый и фиолетовый
    { value: 'Отопление и водоснабжение', color: 'rgba(165, 42, 42, 0.7)', processColor: 'rgba(0, 191, 255, 0.7)' }, // Коралл и ярко-голубой
    { value: 'Столярные работы', color: 'rgba(139, 69, 19, 0.7)', processColor: 'rgba(255, 165, 0, 0.7)' }, // Темно-коричневый и оранжевый
    { value: 'Электро оборудование', color: 'rgba(0, 255, 255, 0.7)', processColor: 'rgba(255, 140, 0, 0.7)' }, // Голубой и оранжевый
    { value: 'Сварочные работы', color: 'rgba(255, 69, 0, 0.7)', processColor: 'rgba(178, 34, 34, 0.7)' }, // Оранжевый и бордовый
    { value: 'Наружная и внутренняя окраска', color: 'rgba(30, 144, 255, 0.7)', processColor: 'rgba(70, 130, 180, 0.7)' }, // Голубой и синий
    { value: 'Уборка вагона внутри', color: 'rgba(0, 250, 154, 0.7)', processColor: 'rgba(0, 128, 0, 0.7)' }, // Мятный и зелёный
  ];
  
  

const ModalHelp = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-help-title"
      aria-describedby="modal-help-description"
    >
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'black',
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <Typography id="modal-help-title" variant="h5" component="h2" align="center" sx={{ fontWeight: 'bold' }}>
          Добро пожаловать в гайд по вагонам 🚂
        </Typography>

        <Typography id="modal-help-description" sx={{ mt: 2 }}>
          Мы рады, что ты здесь! Сейчас расскажем, как работать с вагонами и группами работ. 😎
        </Typography>
        
        <Divider sx={{ mt: 3, mb: 3 }} />
        
        <Typography sx={{ fontWeight: 'bold' }}>1. Карточка вагона:</Typography>
        <Typography sx={{ mt: 1 }}>
          Каждый вагон отображается на главной странице в виде карточки. При клике на карточку открывается окно с подробной информацией о вагоне, включая:
        </Typography>
        <ul>
          <li><strong>Номер вагона</strong> — уникальный номер вагона (например, 123).</li>
          <li><strong>Дата</strong> — дата, когда вагон был принят в ремонт.</li>
          <li><strong>Тип вагона</strong> — например, грузовой или пассажирский.</li>
          <li><strong>Заказчик</strong> — организация, которая заказала ремонт.</li>
          <li><strong>Начало и конец ремонта</strong> — когда ремонт начался и когда планируется его завершение.</li>
          <li><strong>Тип ремонта</strong> — например, капитальный или текущий ремонт.</li>
        </ul>

        <Divider sx={{ mt: 3, mb: 3 }} />

        <Typography sx={{ fontWeight: 'bold' }}>2. Прогресс работы:</Typography>
        <Typography sx={{ mt: 1 }}>
          В карточке вагона будет показана линия прогресса с цветами, отражающими статус групп работ.
        </Typography>
        <Typography sx={{ mt: 1 }}>
          В зависимости от состояния, группы работ могут быть:
        </Typography>
        <ul>
          <li><strong>Готово:</strong> зелёный цвет. Эти работы завершены и готовы к использованию.</li>
          <li><strong>В процессе:</strong> уникальный цвет для каждой группы, например, <strong>Оранжевый для рессорного подвешивания</strong> или <strong>Синий для сварочных работ</strong>.</li>
          <li><strong>Не начато:</strong> серый цвет. Эти работы ещё не начаты.</li>
        </ul>
        
        <Divider sx={{ mt: 3, mb: 3 }} />

        <Typography sx={{ fontWeight: 'bold' }}>3. Как редактировать статус групп работ:</Typography>
        <Typography sx={{ mt: 1 }}>
          Чтобы изменить статус группы работ, просто нажмите на соответствующую группу и выберите новый статус. Убедитесь, что все изменения сохранены!
        </Typography>
        
        <Divider sx={{ mt: 3, mb: 3 }} />
        
        <Typography sx={{ fontWeight: 'bold' }}>4. Действия с вагоном:</Typography>
        <Typography sx={{ mt: 1 }}>
          Если вагон полностью готов, можно перейти к калькуляции, нажав кнопку "Перейти к калькуляции". Но если вдруг вагон нужно удалить — не переживайте, для этого тоже есть кнопка! ⚠️
        </Typography>
        
        <Divider sx={{ mt: 3, mb: 3 }} />

        <Typography sx={{ fontWeight: 'bold' }}>Цвета групп работ:</Typography>
        {colors.map((group, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Box
              sx={{
                width: 15,
                height: 15,
                borderRadius: '50%',
                backgroundColor: group.color,
                marginRight: 2,
              }}
            />
            <Typography>{group.value}</Typography>
          </Box>
        ))}
        
        <Divider sx={{ mt: 3, mb: 3 }} />
        
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleClose}>
          Закрыть гайд
        </Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: '450px',
  maxHeight: '80vh',
  overflowY: 'auto',
};

export default ModalHelp;
