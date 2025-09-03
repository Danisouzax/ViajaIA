import express from "express";
import bodyParser from "body-parser";
import recommend from "./api/recommend.js";

const app = express();
app.use(bodyParser.json());

// rota da API
app.post("/api/recommend", (req, res) => {
  recommend(req, res);
});

// Se estiver rodando local, usa porta 3000
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}

export default app;
