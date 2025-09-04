// api/recommend.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      const response = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command-xlarge-nightly", // modelo gratuito da Cohere
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.7, // dá mais criatividade
        }),
      });

      const result = await response.json();
      console.log("Resposta Cohere:", result); // 👀 veja nos logs da Vercel

      let output = "Não consegui gerar sugestão.";

      if (result?.generations && result.generations.length > 0) {
        output = result.generations[0].text.trim();
      }

      res.status(200).json({ resultado: output });
    } catch (error) {
      console.error("Erro Cohere:", error);
      res.status(500).json({ error: "Erro ao acessar Cohere" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
