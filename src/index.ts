import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import routesConfig from "./routes";

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
routesConfig(app);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(PORT, 'port');
    console.log(`Servidor iniciou na porta ${PORT}`);
});