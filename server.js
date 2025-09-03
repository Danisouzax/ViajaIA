import express from "express";
import bodyParser from "body-parser";
import recommend from "./api/recommend"; // ajusta o caminho se necessário

const app = express();
app.use(bodyParser.json());

app.post("./api/recommend", (req, res) => recommend(req, res));

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
