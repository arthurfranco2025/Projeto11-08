import express from "express";
import { routerTeste } from "./rotas/teste_route";

const app = express();
app.use(express.json());

// Conectar a rota
app.use(routerTeste);

app.listen(9000, () => {
  console.log("🚀 Server rodando em http://localhost:9000");
});