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

      console.log("Resposta HF:", result); // 👈 log para debug

      // Tenta vários formatos possíveis
      let output = "Não consegui gerar sugestão.";

      if (Array.isArray(result)) {
        if (result[0]?.generated_text) {
          output = result[0].generated_text;
        } else if (result[0]?.summary_text) {
          output = result[0].summary_text;
        } else if (typeof result[0] === "string") {
          output = result[0];
        }
      } else if (typeof result === "string") {
        output = result;
      }

      res.status(200).json({ resultado: output });
    } catch (error) {
      console.error("Erro Hugging Face:", error);
      res.status(500).json({ error: "Erro ao acessar Hugging Face" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
