import { IEmployeeModel } from '../user/employee';

export interface userSignIn {
  user: IEmployeeModel;
  token: string;
}
