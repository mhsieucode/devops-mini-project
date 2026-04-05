require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ENV
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const APP_NAME = process.env.APP_NAME || "Ứng dụng DevOps";

// Kết nối MongoDB
mongoose
  .connect(DB_URL)
  .then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch((err) => console.log("❌ Lỗi DB:", err));

// Model
const User = mongoose.model("User", {
  name: String,
});

// ===== API =====

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Lấy danh sách user
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Thêm user
app.post("/users", async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
});

// About
app.get("/about", (req, res) => {
  res.json({
    hoTen: "Minh Hòa",
    maSinhVien: "2251220193",
    lop: "22CT1",
    ungDung: APP_NAME,
  });
});

// Run server
app.listen(PORT, () => {
  console.log(`🚀 ${APP_NAME} chạy tại cổng ${PORT}`);
});
