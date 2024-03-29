export interface IProjectEmployeeModel {
  name: string;
  ocuppation: string;
  employee_cpf: string;
}
export interface IProjectModel {
  project_id: string;
  project_name: string;
  description: string;
  images: string[];
  start_date: string;
  end_date: string;
  cost: number;
  manager: string;
  employees: IProjectEmployeeModel[];
}
