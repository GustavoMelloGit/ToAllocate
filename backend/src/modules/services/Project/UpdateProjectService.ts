import AppError from "../../../shared/errors/AppError";
import { cursor } from "../../../utils/cursor";
import { deleteFile } from "../../../utils/deleteFromS3";
import {
  convert,
  getFiles,
  validateCpf,
  validateDate,
} from "../../../utils/utils";

export interface IUpdateProject {
  project_id: string;
  project_name?: string;
  end_date?: string;
  cost?: number;
  description?: string;
  manager?: string;
  employees?: string[];
  images: any | undefined;
}

class UpdateProjectService {
  private verifyFields(obj: any) {
    for (const key in obj) {
      if (key !== "images" && key !== "employees") {
        if (obj[key] === "project_id" && obj[key] === undefined)
          throw new Error(`É obrigatório o atributo ${key}`);
        if (obj[key] !== undefined && typeof obj[key] !== "string")
          throw new Error(`Só é permitido 1 valor para o atributo ${key}`);
      }
    }
  }

  async execute({
    project_id,
    project_name,
    end_date,
    cost,
    description,
    manager,
    employees,
    images,
  }: IUpdateProject) {
    const obj = Object.assign({}, arguments[0]);
    this.verifyFields(obj);
    const imgs = getFiles(images);

    // verifica se o projeto existe
    const {
      rows: [_project],
    } = await cursor.query(`
      SELECT *, cardinality(images) AS images_count FROM project WHERE project_id = '${project_id}'
    `);

    if (!_project) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }

      throw new AppError(`Nenhum projeto com o id '${project_id}'`);
    }

    // verifica se existe um projeto com o mesmo nome
    if (project_name) {
      const {
        rows: [_project_name],
      } = await cursor.query(`
        SELECT * FROM project WHERE project_name = '${project_name}'
      `);

      if (_project_name) {
        if (imgs) {
          imgs.forEach(async (img) => {
            await deleteFile(img.key);
          });
        }
        throw new AppError(`Já existe um projeto com o nome '${project_name}'`);
      }
    }

    // validacao da data
    if (end_date) {
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
      if (convert(end_date) < _project.start_date) {
        if (imgs) {
          imgs.forEach(async (img) => {
            await deleteFile(img.key);
          });
        }

        throw new AppError(
          "A data de fim do projeto não pode ser menor ou igual que a data de início"
        );
      }
    }

    // validacao do custo
    if (cost && cost <= 0) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }

      throw new AppError("O custo do projeto deve ser maior que 0");
    }

    // validacao da descricao
    if (description && description.length > 500) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }

      throw new AppError("A descrição não pode ter mais de 500 caracteres");
    }

    // validacao do gerente
    if (manager) {
      if (!validateCpf(manager)) {
        if (imgs) {
          imgs.forEach(async (img) => {
            await deleteFile(img.key);
          });
        }
        throw new AppError("O CPF do gerente é inválido");
      }

      const {
        rows: [_manager],
      } = await cursor.query(`
        SELECT cpf FROM employee WHERE cpf = '${manager}'
      `);

      if (!_manager) {
        if (imgs) {
          imgs.forEach(async (img) => {
            await deleteFile(img.key);
          });
        }

        throw new AppError(
          `O CPF do gerente ('${manager}') não existe no sistema`
        );
      }
    }

    // validacao dos funcionarios
    let insert_employees_query = ``;
    if (employees) {
      for (let i = 0; i < employees.length; i++) {
        const employee_cpf = employees[i].replace(/[!.-]/g, "");
        if (!validateCpf(employee_cpf)) {
          if (imgs) {
            imgs.forEach(async (img) => {
              await deleteFile(img.key);
            });
          }
          throw new AppError(
            `O CPF do funcionário '${employees[i]}' é inválido`
          );
        }

        const {
          rows: [_employee],
        } = await cursor.query(`
            SELECT cpf FROM employee WHERE cpf = '${employee_cpf}'
        `);

        if (!_employee) {
          if (imgs) {
            imgs.forEach(async (img) => {
              await deleteFile(img.key);
            });
          }

          throw new AppError(
            `O CPF do funcionário '${employees[i]}' não existe no sistema`
          );
        }

        const {
          rows: [_employees_project],
        } = await cursor.query(`
            SELECT employee_cpf FROM works_on WHERE project_id = '${project_id}' AND employee_cpf = '${employee_cpf}'
        `);

        if (!_employees_project)
          insert_employees_query += `INSERT INTO works_on (project_id, employee_cpf, ocuppation) VALUES ('${project_id}', '${employee_cpf}', 'developer');`;
      }
    }

    let query = `UPDATE project SET `;
    Object.keys(obj).forEach((key) => {
      if (
        key !== "project_id" &&
        key !== "images" &&
        key !== "employees" &&
        obj[key] !== undefined
      )
        query += `${key} = '${obj[key]}', `;
    });

    // verifica se tem alguma imagem para ser inserida
    if (imgs) {
      const images_in_request = imgs.length;
      if (_project.images_count >= 3 && images_in_request > 0) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
        throw new AppError(
          "Não é possível adicionar mais de 3 imagens em um mesmo projeto"
        );
      }

      if (
        _project.images_count < 3 &&
        images_in_request > 3 - _project.images_count
      ) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
        throw new AppError(
          `Impossível adicionar mais imagens. O projeto possui ${_project.images_count} imagens e a requisição possui ${images_in_request}`
        );
      }

      if (_project.images_count < 3 && images_in_request > 0) {
        let tmp = ``;
        imgs.forEach((img) => {
          tmp += `'${img.url}', `;
        });
        tmp = tmp.slice(0, -2);
        query += `images = array_cat(images, ARRAY[${tmp}])`;
      }
    }

    if (query.includes("images"))
      query += `, updated_at = NOW() WHERE project_id = '${project_id}' RETURNING *`;
    else
      query += `updated_at = NOW() WHERE project_id = '${project_id}' RETURNING *`;

    try {
      await cursor.query(query);
    } catch (error) {
      if (imgs) {
        imgs.forEach(async (img) => {
          await deleteFile(img.key);
        });
      }
      console.log(error);
      throw new AppError("Erro ao atualizar o projeto");
    }

    if (insert_employees_query) {
      try {
        await cursor.query(insert_employees_query);
      } catch (error) {
        throw new AppError("Erro ao atualizar os funcionários do projeto");
      }
    }

    await cursor.query(`
      DROP VIEW IF EXISTS project_view;
      CREATE VIEW project_view AS
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
        p.project_id = '${project_id}' AND
        p.project_id = works_on.project_id
      GROUP BY
        p.project_id
      ORDER BY
        p.cost;
    `);

    const {
      rows: [updateProject],
    } = await cursor.query(`SELECT * FROM project_view`);
    return updateProject;
  }
}

export default UpdateProjectService;
