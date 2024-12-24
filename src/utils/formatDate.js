const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export default formatDate;
