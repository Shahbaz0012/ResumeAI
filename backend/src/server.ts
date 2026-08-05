import app from "./app";
import dotenv from "dotenv";
import express from "express";
import path from "path";

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});