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
