export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    console.log("📩 Prompt recebido:", prompt);

    try {
      // Timeout de 30 segundos para evitar travamento
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-small",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);

      console.log("📡 Status Hugging Face:", response.status);

      const result = await response.json();
      console.log("📦 Resposta Hugging Face:", result);

      let output = "Não consegui gerar sugestão.";

      // Trata diferentes formatos de resposta
      if (Array.isArray(result)) {
        if (typeof result[0] === "string") {
          output = result[0];
        } else if (result[0]?.generated_text) {
          output = result[0].generated_text;
        } else if (result[0]?.summary_text) {
          output = result[0].summary_text;
        }
      } else if (typeof result === "object") {
        if (result.generated_text) {
          output = result.generated_text;
        } else if (result.error) {
          output = `⚠️ Erro da API: ${result.error}`;
        }
      }

      return res.status(200).json({ resultado: output });
    } catch (error) {
      console.error("❌ Erro Hugging Face:", error);
      return res.status(500).json({ error: "Erro ao acessar Hugging Face" });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
