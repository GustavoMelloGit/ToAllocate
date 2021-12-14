import { IEmployeeModel } from './employee';

export interface IDeveloperModel {
  employee: IEmployeeModel;
  role: string;
  supervisor: number;
}
