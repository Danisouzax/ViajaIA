export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { prompt } = req.body;

      // Chamada para a API da OpenAI (ou outro modelo que você tiver configurado)
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Defina no Vercel → Settings → Environment Variables
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
        }),
      });

      const data = await response.json();

      const text = data.choices?.[0]?.message?.content || "Não consegui gerar uma sugestão.";

      res.status(200).json({ resultado: text });
    } catch (error) {
      console.error("Erro na API:", error);
      res.status(500).json({ error: "Erro ao processar a sugestão" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
