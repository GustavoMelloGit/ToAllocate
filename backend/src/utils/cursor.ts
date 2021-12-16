import { Pool } from 'pg';
import { client } from './client';

const cursor = new Pool(client);
export { cursor };
