export function validateCpf(cpf: string) {
  if (cpf.length > 11) return false;

  const regex_cpf = /^[0-9]{11}$/g;

  if (!regex_cpf.test(cpf)) return false;
  return true;
}

export function validateEmail(email: string) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateUuid(uuid: string) {
  const regex_to_uuid =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return regex_to_uuid.test(uuid);
}

import AppError from "../shared/errors/AppError";

export function diffBetweenDates(startDate: Date, endDate: Date) {
  const diff = endDate.getTime() - startDate.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
}

export function convert(date: string) {
  const [day, month, year] = date.split("-");
  return new Date(`${year}-${month}-${day}`);
}

export function validateDateFormat(data: string) {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  return regex.test(data);
}

export function validateDate(date: string) {
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

export function getFiles(images: any) {
  const imgs: { key: string; url: string }[] = [];
  if (!images) return imgs;
  const { file: files } = images;

  files.forEach((file: any) => {
    imgs.push({
      key: file.key,
      url: process.env.STORAGE_TYPE == "s3" ? file.location : file.path,
    });
  });

  return imgs;
}

export const createProjectFields = [
  {
    name: "project_name",
    maxCount: 1,
  },
  {
    name: "start_date",
    maxCount: 1,
  },
  {
    name: "end_date",
    maxCount: 1,
  },
  {
    name: "cost",
    maxCount: 1,
  },
  {
    name: "description",
    maxCount: 1,
  },
  {
    name: "manager",
    maxCount: 1,
  },
  {
    name: "employees",
  },
  {
    name: "file",
    maxCount: 3,
  },
];

export const updateProjectFields = [
  {
    name: "project_name",
    maxCount: 1,
  },
  {
    name: "end_date",
    maxCount: 1,
  },
  {
    name: "cost",
    maxCount: 1,
  },
  {
    name: "description",
    maxCount: 1,
  },
  {
    name: "manager",
    maxCount: 1,
  },
  {
    name: "employees",
  },
  {
    name: "file",
    maxCount: 3,
  },
];
