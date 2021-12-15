function diffBetweenDates(startDate: Date, endDate: Date) {
  const diff = endDate.getTime() - startDate.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
}

function convert(date: string) {
  const [day, month, year] = date.split("-");
  return new Date(`${year}-${month}-${day}`);
}

function validateData(data: string) {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  return regex.test(data);
}

export { diffBetweenDates, convert, validateData };
