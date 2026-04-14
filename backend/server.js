const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// GET reasons
app.get('/reasons', async (req, res) => {
  const result = await pool.query('SELECT * FROM reasons ORDER BY id DESC');
  res.json(result.rows);
});

// POST reason
app.post('/reasons', async (req, res) => {
  const { text } = req.body;

  const result = await pool.query(
    'INSERT INTO reasons(text) VALUES($1) RETURNING *',
    [text]
  );

  res.json(result.rows[0]);
});

// ✅ ВАЖНО: оборачиваем в async функцию
async function start() {
  try {
    // создаём таблицу если нет
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reasons (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL
      )
    `);

    // запускаем сервер
    app.listen(3001, () => {
      console.log('Backend running on port 3001');
    });

  } catch (err) {
    console.error('Error starting server:', err);
  }
}

start();