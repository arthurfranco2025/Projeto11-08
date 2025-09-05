import express from "express";
import 'express-async-errors';
import 'dotenv/config'
import { routerTeste } from "./teste_route";

const app = express();
app.use(express.json());

// Conectar a rota
app.use(routerTeste);

app.listen(9000, () => {
  console.log("Server rodando em http://localhost:9000");
});