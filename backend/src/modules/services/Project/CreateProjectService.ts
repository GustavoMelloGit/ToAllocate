import { v4 } from "uuid";
import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";
import { convert, validateCpf, validateDate } from "../../../utils/utils";

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

    // verify if exists a project with the same name
    const { rows: project } = await cursor.query(
      `SELECT project_name, manager FROM project WHERE project_name = '${project_name}'`
    );

    if (project.length > 0)
      throw new AppError(`Já existe um projeto com o nome '${project_name}'`);

    // check the dates

    if (!validateDate(start_date))
      throw new AppError(
        "A data de início é inválida. Digite no formato correto: dd-mm-yyyy"
      );

    if (!validateDate(end_date))
      throw new AppError(
        "A data de fim é inválida. Digite no formato correto: dd-mm-yyyy"
      );

    if (convert(start_date) >= convert(end_date)) {
      throw new AppError("A data de início deve ser menor que a data de fim");
    }

    // check the cost
    if (cost <= 0)
      throw new AppError("O custo do projeto deve ser maior que 0");

    // check the description
    if (description.length > 500)
      throw new AppError("A descrição não pode ter mais de 500 caracteres");

    // check the manager
    if (!validateCpf(manager))
      throw new AppError("O CPF do gerente é inválido");

    const { rows: _manager } = await cursor.query(
      `SELECT cpf FROM employee WHERE cpf = '${manager}'`
    );

    if (_manager.length == 0)
      throw new AppError(
        `Nenhum funcionário com o CPF ${manager} foi encontrado`
      );

    let values = ``;

    if (images) {
      const { file: files } = images;
      files.forEach((image: any) => {
        values += `'${
          process.env.STORAGE_TYPE == "s3" ? images.location : image.path
        }', `;
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
        if (!validateCpf(employee_cpf))
          throw new AppError(`O CPF do funcionário ${employees[i]} é inválido`);

        if (employee_cpf !== manager) {
          const { rows: _employee } = await cursor.query(
            `SELECT cpf FROM employee WHERE cpf = '${employee_cpf}'`
          );
          if (_employee.length == 0)
            throw new AppError(
              `No campo employees, o CPF '${employee_cpf}' não foi encontrado`
            );

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
      await cursor.query(
        `DELETE FROM project WHERE project_id = '${project_id}'`
      );

      throw new AppError(
        "Ocorreu um erro ao adicionar o gerente ao projeto. Não foi possível criar o projeto. Tentar novamente."
      );
    }

    // insert employees in works_on
    try {
      await cursor.query(insert_employees_query);
    } catch (error) {
      await cursor.query(
        `DELETE FROM project WHERE project_id = '${project_id}'`
      );
      throw new AppError(
        "Ocorreu ao inserir os funcionários no projeto, o projeto foi excluído, tente novamente"
      );
    }
    return new_project;
  }
}

export default CreateProjectService;
