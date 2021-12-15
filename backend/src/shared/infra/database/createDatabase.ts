import { hashSync } from 'bcryptjs';
import { v4 } from 'uuid';
import { cursor } from '../../../utils/cursor';
import AppError from '../../errors/AppError';

async function createDatabase() {
  try {
    await cursor.query(`
  CREATE TABLE IF NOT EXISTS employee (
      id uuid PRIMARY KEY,
      Fname varchar(255) NOT NULL,
      Lname varchar(255) NOT NULL,
      isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
      role varchar(255) NOT NULL,
      email varchar(255) NOT NULL UNIQUE,
      password varchar(64) NOT NULL, 
      created_at DATE DEFAULT CURRENT_DATE,
      updated_at DATE DEFAULT CURRENT_DATE
  );
`);
  } catch (error) {
    throw new AppError('Error during create table employee');
  }

  try {
    await cursor.query(`
        CREATE TABLE IF NOT EXISTS project (
            project_id uuid PRIMARY KEY,
            name varchar(255) NOT NULL UNIQUE,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            cost FLOAT NOT NULL,
            description varchar(500) NOT NULL,
            manager uuid NOT NULL,
            created_at DATE DEFAULT CURRENT_DATE,
            updated_at DATE DEFAULT CURRENT_DATE,
            FOREIGN KEY (manager) REFERENCES employee(id) 
        )
    `);
  } catch (error) {
    throw new AppError('Error during create table project');
  }

  try {
    await cursor.query(`
        CREATE TABLE IF NOT EXISTS works_on (
            employee_id uuid NOT NULL,
            project_id uuid NOT NULL,
            FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
            FOREIGN KEY (project_id) REFERENCES project(project_id) ON DELETE CASCADE
        )
    `);
  } catch (error) {
    throw new AppError('Error during create table works_on');
  }

  try {
    await cursor.query(`
        CREATE TABLE IF NOT EXISTS token (
            employee_id uuid NOT NULL,
            token VARCHAR(300),
            FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE
        )
  `);
  } catch (error) {
    throw new AppError('Error during create table token');
  }

  try {
    // insere um usuario e admin e ignora se ja existe
    await cursor.query(`
  INSERT INTO employee (
      id,
      Fname,
      Lname,
      isAdmin,
      role,
      email,
      password        
  ) VALUES (
      '${v4()}',
      'Admin',
      'Admin',
      true,
      'manager',
      'admin@email.com',
      '${hashSync('admin_password', 10)}'
  ) ON CONFLICT DO NOTHING; 
`);
  } catch (error) {
    throw new AppError('Error during create admin user');
  }
}

createDatabase();
