import { cursor } from "./utils/cursor";

async function createDatabase() {
  await cursor.query(`
        CREATE TABLE IF NOT EXISTS employee (
            id uuid PRIMARY KEY,
            Fname varchar(255) NOT NULL,
            Lname varchar(255) NOT NULL,
            role varchar(255) NOT NULL,
            email varchar(255) NOT NULL UNIQUE,
            password varchar(64) NOT NULL, 
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `);

  await cursor.query(`
        CREATE TABLE IF NOT EXISTS project (
            project_id uuid PRIMARY KEY,
            name varchar(255) NOT NULL UNIQUE,
            start_date TIMESTAMP NOT NULL,
            end_date TIMESTAMP NOT NULL,
            cost FLOAT NOT NULL,
            description varchar(500) NOT NULL,
            manager uuid NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            FOREIGN KEY (manager) REFERENCES employee(id)
        )
    `);

  await cursor.query(`
        CREATE TABLE IF NOT EXISTS works_on (
            employee_id uuid NOT NULL,
            project_id uuid NOT NULL,
            FOREIGN KEY (employee_id) REFERENCES employee(id),
            FOREIGN KEY (project_id) REFERENCES project(project_id)
        )
    `);
}

export { createDatabase };
