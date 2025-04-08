const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// 用户注册接口
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [result] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    res.status(201).json({ id: result.insertId, message: '注册成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 用户登录接口
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (rows.length > 0) {
      res.status(200).json({ message: '登录成功' });
    } else {
      res.status(401).json({ message: '用户名或密码错误' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 添加酒店接口
app.post('/addHotel', async (req, res) => {
  const { hotelName, location, description } = req.body;
  try {
    const [result] = await db.execute('INSERT INTO hotels (hotel_name, location, description) VALUES (?, ?, ?)', [hotelName, location, description]);
    res.status(201).json({ id: result.insertId, message: '酒店添加成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`后端服务器运行在 http://localhost:${PORT}`);
});