// api/recommend.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY não configurada no Vercel" });
  }

  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt inválido" });
    }

    // Chamada à OpenAI (Chat Completions)
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",           // pode usar "gpt-3.5-turbo" se preferir
        temperature: 0.7,
        max_tokens: 220,
        messages: [
          {
            role: "system",
            content:
              "Você é um especialista em viagens. Responda em português de forma clara e objetiva."
          },
          {
            role: "user",
            content: `Com base no pedido abaixo, sugira 1 destino com uma breve justificativa,
destaque a melhor época para visitar e uma dica prática.
Pedido: ${prompt}`
          }
        ]
      }),
    });

    if (!completion.ok) {
      const errText = await completion.text();
      return res.status(completion.status).json({ error: errText || "Falha na OpenAI" });
    }

    const data = await completion.json();
    const text = data?.choices?.[0]?.message?.content?.trim();

    if (!text) {
      return res.status(500).json({ error: "Resposta vazia da OpenAI" });
    }

    return res.status(200).json({ resultado: text });
  } catch (err) {
    console.error("Erro recommend:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
}
