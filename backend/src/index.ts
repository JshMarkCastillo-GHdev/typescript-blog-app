import express from "express";
import dotenv from "dotenv";

dotenv.config();

const portServer = process.env.PORT || 4004;
const app = express();

app.get("/blogs", (req, res) => {
  res.status(200).json({ status: "success" });
});

app.listen(portServer, () => {
  console.log(`ServerRunning at port ${portServer}.`);
});
