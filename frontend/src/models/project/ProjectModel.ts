export interface IProjectModel {
  id: string;
  name: string;
  description: string;
  image: string[];
  start_date: Date;
  end_date: Date;
  cost: number;
  manager: string;
}
