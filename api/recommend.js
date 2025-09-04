export default function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    // Simulação: só retorna o prompt recebido
    res.status(200).json({
      resultado: `Você pediu uma sugestão com: ${prompt}`,
    });
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
