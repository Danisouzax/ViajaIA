export default function recommend(req, res) {
  const { clima, interesses, data } = req.body;

  // exemplo de resposta mockada (depois podemos integrar com IA/HuggingFace)
  const resposta = {
    destino: "Gramado - RS",
    motivo: `Ótimo para clima ${clima}, com foco em ${interesses}, data ideal em ${data}`
  };

  res.json(resposta);
}
