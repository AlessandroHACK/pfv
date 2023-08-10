import express from 'express';
import { createPool } from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());

const pool = createPool({
  host: 'mysqldb', 
  port: 3306,
  user: 'team',
  password: '123456789',
  database: 'sakila' 
});

app.get('/', (req, res) => {
  res.json("back-end corriendo");
});

app.get("/staff", async (request, response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM staff_list");
    response.json(rows);
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server on port 3000!");
});
