import { Pool } from "pg";

const pool = new Pool();

export const db = {
  query: (text: string, params?: any) => pool.query(text, params),
};
