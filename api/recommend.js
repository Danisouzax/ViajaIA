export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-base",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      const result = await response.json();

      // A resposta vem em um array com texto
      res.status(200).json({
        resultado: result[0]?.generated_text || "Não consegui gerar sugestão.",
      });
    } catch (error) {
      console.error("Erro Hugging Face:", error);
      res.status(500).json({ error: "Erro ao acessar Hugging Face" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
