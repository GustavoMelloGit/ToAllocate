import { v4 } from "uuid";
import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";
import { deleteFile } from "../../../utils/deleteFromS3";
import {
  convert,
  getFiles,
  validateCpf,
  validateDate,
} from "../../../utils/utils";

interface IProjectRequest {
  project_name: string;
  start_date: string;
  end_date: string;
  cost: Number;
  description: string;
  manager: string;
  employees: string[];
  images: any | undefined;
}

class CreateProjectService {
  private verifyFields(obj: any) {
    for (const key in obj) {
      if (
        key !== "images" &&
        key !== "employees" &&
        typeof obj[key] !== "string"
      ) {
        if (obj[key] === undefined)
          throw new Error(`O atributo ${key} é obrigatório`);
        throw new Error(`Só é permitido 1 valor para o atributo ${key}`);
      }
    }
  }

  async execute({
    project_name,
    start_date,
    end_date,
    cost,
    description,
    manager,
    employees,
    images,
  }: IProjectRequest) {
    const obj = Object.assign({}, arguments[0]);

    this.verifyFields(obj);
    const imgs = getFiles(images);

    // verify if exists a project with the same name
    const { rows: project } = await cursor.query(
      `SELECT project_name, manager FROM project WHERE project_name = '${project_name}'`
    );

    if (project.length > 0) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }
      throw new AppError(`Já existe um projeto com o nome '${project_name}'`);
    }

    // check the dates

    if (!validateDate(start_date)) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }
      throw new AppError(
        "A data de início é inválida. Digite no formato correto: dd-mm-yyyy"
      );
    }

    if (!validateDate(end_date)) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }
      throw new AppError(
        "A data de fim é inválida. Digite no formato correto: dd-mm-yyyy"
      );
    }

    if (convert(start_date) >= convert(end_date)) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }
      throw new AppError("A data de início deve ser menor que a data de fim");
    }

    // check the cost
    if (cost <= 0) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }
      throw new AppError("O custo do projeto deve ser maior que 0");
    }

    // check the description
    if (description.length > 500) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }
      throw new AppError("A descrição não pode ter mais de 500 caracteres");
    }

    // check the manager
    if (!validateCpf(manager)) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }
      throw new AppError("O CPF do gerente é inválido");
    }

    const { rows: _manager } = await cursor.query(
      `SELECT cpf FROM employee WHERE cpf = '${manager}'`
    );

    if (_manager.length == 0) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }
      throw new AppError(`Funcionário com o CPF ${manager} não foi encontrado`);
    }

    let values = ``;

    if (imgs) {
      imgs.forEach((img) => {
        values += `'${img.url}', `;
      });
    }
    values =
      values.length > 0
        ? values.slice(0, -2)
        : `'` + (process.env.DEFAULT_PROJECT_IMAGE_URL as string) + `'`;

    const project_id = v4();

    // check if the employees exists
    let insert_employees_query = ``;
    if (employees) {
      for (let i = 0; i < employees.length; i++) {
        let employee_cpf = employees[i].replace(/[!.-]/g, "");
        if (!validateCpf(employee_cpf)) {
          if (imgs) {
            imgs.forEach(async (img) => {
              await deleteFile(img.key);
            });
          }
          throw new AppError(`O CPF do funcionário ${employees[i]} é inválido`);
        }

        if (employee_cpf !== manager) {
          const { rows: _employee } = await cursor.query(
            `SELECT cpf FROM employee WHERE cpf = '${employee_cpf}'`
          );
          if (_employee.length == 0) {
            if (imgs) {
              imgs.forEach(async (img) => {
                await deleteFile(img.key);
              });
            }
            throw new AppError(
              `No campo employees, o CPF '${employee_cpf}' não foi encontrado`
            );
          }

          insert_employees_query += `INSERT INTO works_on (employee_cpf, project_id, ocuppation) VALUES ('${employee_cpf}', '${project_id}', 'developer');`;
        }
      }
    }

    //create the project
    let new_project: any;
    try {
      const {
        rows: [proj],
      } = await cursor.query(`
        INSERT INTO project (
          project_id,
          project_name,
          start_date,
          end_date,
          cost,
          description,
          manager,
          images
        ) VALUES (
          '${project_id}',
          '${project_name}',
          '${start_date}',
          '${end_date}',
          ${cost},
          '${description}',
          '${manager}',
          ARRAY[${values}]
        ) RETURNING *;
      `);

      new_project = proj;
    } catch (error) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }
      throw new AppError("Ocorreu um erro durante a criação do projeto");
    }

    try {
      await cursor.query(`
        INSERT INTO works_on (
          employee_cpf,
          project_id,
          ocuppation
        ) VALUES (
          '${manager}',
          '${project_id}',
          'manager'
        );
      `);
    } catch (error) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }

      await cursor.query(
        `DELETE FROM project WHERE project_id = '${project_id}'`
      );

      throw new AppError(
        "Ocorreu um erro ao cadastrar o gerente. Não foi possível criar o projeto. Tente novamente."
      );
    }

    // insert employees in works_on
    try {
      await cursor.query(insert_employees_query);
    } catch (error) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }

      await cursor.query(
        `DELETE FROM project WHERE project_id = '${project_id}'`
      );
      throw new AppError(
        "Ocorreu um erro ao cadastrar os funcionários. Não foi possível criar o projeto. Tente novamente"
      );
    }

    try {
      const {
        rows: [project],
      } = await cursor.query(`
        SELECT 
          p.project_id,
          p.project_name,
          p.description,
          p.start_date,
          p.end_date,
          p.manager,
          cast(COUNT(*) as integer) as total_employees,
          p.cost,
          p.images,
          p.created_at,
          p.updated_at
        FROM 
          project p,
          works_on
        WHERE
          p.project_id = works_on.project_id AND
          p.project_id = '${project_id}'
        GROUP BY
          p.project_id;
      `);

      return project;
    } catch (error) {
      return new_project;
    }
  }
}

export default CreateProjectService;
