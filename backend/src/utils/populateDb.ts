import axios from "axios";
import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { v4 } from "uuid";
import { cursor } from "./cursor";

interface IEmployee {
  id: string;
  Fname: string;
  Lname: string;
  role: string;
  email: string;
  password: string;
}

function randomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function populateDb(request: Request, response: Response) {
  const roles = ["developer", "manager"];
  const { num } = request.params;

  axios
    .get(`https://randomuser.me/api/?results=${num}`)
    .then((res) => {
      const users = JSON.parse(JSON.stringify(res.data.results));

      users.forEach(async (key: any) => {
        const password = randomNumber(10000000, 99999999).toString();

        const newUser: IEmployee = {
          id: v4(),
          Fname: key.name.first,
          Lname: key.name.last,
          role: roles[randomNumber(0, 1)],
          email: key.email,
          password: await hash(password, 10),
        };

        await cursor.query(`
          INSERT INTO employee (
            id,
            Fname,
            Lname,
            role,
            email,
            password
          ) VALUES (
            '${newUser.id}',
            '${newUser.Fname}',
            '${newUser.Lname}',
            '${newUser.role}',
            '${newUser.email}',
            '${newUser.password}'
          );
        `);
      });
    })
    .catch((error) => {
      throw new Error(error);
    });

  const { rows } = await cursor.query("SELECT * FROM employee");

  return response.status(201).json({ employees: rows });
}
