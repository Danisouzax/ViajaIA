export default function recommend(req, res) {
  const { clima, interesses, data } = req.body;

  // Exemplo de resposta mockada (simulação de IA)
  const resposta = {
    destino: "Gramado - RS",
    motivo: `Ótimo para clima ${clima || "não informado"}, 
             com foco em ${interesses || "interesses variados"}, 
             data ideal em ${data || "qualquer época do ano"}.`
  };

  res.json(resposta);
}
