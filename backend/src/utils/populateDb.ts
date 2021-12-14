import axios from "axios";
import { hash } from "bcryptjs";
import { v4 } from "uuid";
import { cursor } from "./cursor";

function randomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function populateDb() {
  const roles = ["developer", "manager"];

  axios
    .get("https://randomuser.me/api/?results=1")
    .then((response) => {
      const user = JSON.parse(JSON.stringify(response.data.results));

      user.forEach(async (key: any) => {
        const password = randomNumber(10000000, 99999999).toString();

        const newUser = {
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
      console.log(error);
    });
}
