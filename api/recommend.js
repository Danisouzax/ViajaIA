export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt obrigatório" });
  }

  // Exemplo de resposta mockada (pode integrar Hugging Face aqui)
  return res.status(200).json({
    destino: "Gramado - RS",
    clima: "Frio",
    interesse: "Natureza"
  });
}
