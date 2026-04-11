import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./db/db.js";

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
