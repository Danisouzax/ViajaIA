export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    console.log("📩 Prompt recebido:", prompt);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-small?wait_for_model=true",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.hf_api_key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      const result = await response.json();

      console.log("📩 Resposta HF bruta:", JSON.stringify(result, null, 2));

      let output = "Não consegui gerar sugestão.";

      // Trata diferentes formatos possíveis
      if (Array.isArray(result)) {
        if (typeof result[0] === "string") {
          output = result[0]; // Caso venha como ["texto..."]
        } else if (result[0]?.generated_text) {
          output = result[0].generated_text; // Caso venha { generated_text: "..."}
        }
      } else if (result?.generated_text) {
        output = result.generated_text;
      } else if (result?.error) {
        output = `⚠️ Erro do modelo: ${result.error}`;
      }

      res.status(200).json({ resultado: output });
    } catch (error) {
      console.error("❌ Erro Hugging Face:", error);
      res.status(500).json({ error: "Erro ao acessar Hugging Face" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
