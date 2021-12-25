import { hashSync } from "bcryptjs";
import { v4 } from "uuid";
import { cursor } from "../../../utils/cursor";
import AppError from "../../errors/AppError";

async function createDatabase() {
  try {
    await cursor.query(`
  CREATE TABLE IF NOT EXISTS employee (
      id uuid PRIMARY KEY,
      Fname varchar(255) NOT NULL,
      Lname varchar(255) NOT NULL,
      cpf varchar(11) NOT NULL UNIQUE,
      role varchar(20) NOT NULL,
      email varchar(255) NOT NULL UNIQUE,
      password varchar(64) NOT NULL, 
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
  );
`);
  } catch (error) {
    throw new AppError("Error during create table employee");
  }

  try {
    await cursor.query(`
        CREATE TABLE IF NOT EXISTS project (
            project_id uuid PRIMARY KEY,
            project_name varchar(50) NOT NULL UNIQUE,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            cost FLOAT NOT NULL,
            description varchar(500) NOT NULL,
            manager varchar(11) NOT NULL,
            images TEXT ARRAY[3],
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `);
  } catch (error) {
    throw new AppError("Error during create table project");
  }

  try {
    await cursor.query(`
        CREATE TABLE IF NOT EXISTS works_on (
            employee_cpf varchar(11) NOT NULL,
            project_id uuid NOT NULL,
            ocuppation varchar(10) NOT NULL,
            FOREIGN KEY (employee_cpf) REFERENCES employee(cpf) ON DELETE CASCADE,
            FOREIGN KEY (project_id) REFERENCES project(project_id) ON DELETE CASCADE
        )
    `);
  } catch (error) {
    throw new AppError("Error during create table works_on");
  }

  try {
    await cursor.query(`
        CREATE TABLE IF NOT EXISTS token (
            employee_id uuid NOT NULL,
            token varchar(300),
            FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE
        )
  `);
  } catch (error) {
    throw new AppError("Error during create table token");
  }

  try {
    // insere um usuario e admin e ignora se ja existe
    await cursor.query(`
  INSERT INTO employee (
      id,
      Fname,
      Lname,
      cpf,
      role,
      email,
      password        
  ) VALUES (
      '${v4()}',
      'Admin',
      'Admin',
      '12345678912',
      'admin',
      'admin@admin.com',
      '${hashSync("admin_password", 10)}'
  ) ON CONFLICT DO NOTHING; 
`);
  } catch (error) {
    throw new AppError("Error during create admin user");
  }
}

createDatabase();
