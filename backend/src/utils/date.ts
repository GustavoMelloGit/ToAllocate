import AppError from "../shared/errors/AppError";

function diffBetweenDates(startDate: Date, endDate: Date) {
  const diff = endDate.getTime() - startDate.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
}

function convert(date: string) {
  const [day, month, year] = date.split("-");
  return new Date(`${year}-${month}-${day}`);
}

function validateDateFormat(data: string) {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  return regex.test(data);
}

function validateDate(date: string) {
  if (!validateDateFormat(date)) return false;

  const [day, month, year] = date.split("-");

  if (Number(day) > 31 || Number(day) < 1)
    throw new AppError("A day must be between 1 and 31");
  if (Number(month) > 12 || Number(month) < 1)
    throw new AppError("A month must be between 1 and 12");
  if (Number(year) < 1900 || Number(year) > 2099)
    throw new AppError("A year must be between 1900 and 2099");

  return true;
}

export { diffBetweenDates, convert, validateDate };
