// api/recommend.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      const response = await fetch("https://api.cohere.ai/v1/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command-r-plus", // modelo atualizado de chat
          message: prompt,
        }),
      });

      const result = await response.json();
      console.log("Resposta Cohere:", result); // aparece nos logs do Vercel

      let output = "Não consegui gerar sugestão.";

      // A API de chat retorna o texto em `text`
      if (result.text) {
        output = result.text.trim();
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
