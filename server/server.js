import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    return res.json("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});