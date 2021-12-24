import dotenv from 'dotenv';

dotenv.config();

const client = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

export { client };
