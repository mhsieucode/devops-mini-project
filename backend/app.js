require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Kết nối DB
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "root",
  database: "testdb",
});

db.connect((err) => {
  if (err) console.log("DB Error:", err);
  else console.log("Connected MySQL");
});

// 👉 Health
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 👉 About
app.get("/about", (req, res) => {
  res.json({
    name: "Minh Hoa",
    mssv: "2251220193",
    lop: "22CT1",
  });
});

// 👉 Get users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// 👉 Add user
app.post("/users", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO users(name) VALUES(?)", [name], (err) => {
    if (err) return res.send(err);
    res.json({ message: "Added" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
