document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("travel-form");
  const resultadoDiv = document.getElementById("resultado");

  // HTML do loading (injetado sempre que começar a requisição)
  const loadingHTML = `
    <div class="loading" role="status" aria-live="polite" aria-busy="true">
      <span class="spinner" aria-hidden="true"></span>
      <span>Gerando sugestão…</span>
    </div>
  `;

  // Helper: timeout para não ficar preso se a API demorar demais
  function fetchWithTimeout(resource, options = {}) {
    const { timeout = 45000 } = options; // 45s
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    return fetch(resource, { ...options, signal: controller.signal })
      .finally(() => clearTimeout(id));
  }

  // Renderiza o resultado num cartão branco
  function renderResultado(texto) {
    resultadoDiv.innerHTML = `
      <div class="resultado-card">
        <h3>✨ Sugestão de Destino</h3>
        <p>${texto}</p>
      </div>
    `;
  }

  // Renderiza mensagem de erro simples
  function renderErro(msg = "❌ Erro ao buscar recomendação.") {
    resultadoDiv.innerHTML = `
      <div class="resultado-card erro">
        <p>${msg}</p>
      </div>
    `;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const climate = document.getElementById("climate").value || "indefinido";
    const interests = document.getElementById("interests").value || "livre";
    const date = document.getElementById("date").value || "sem data";

    const prompt = `Sugira um destino de viagem com clima ${climate}, interesse em ${interests} e data da viagem em ${date}.`;

    // Mostra o "carregando"
    resultadoDiv.innerHTML = loadingHTML;

    try {
      const response = await fetchWithTimeout("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        timeout: 45000,
      });

      if (!response.ok) {
        throw new Error(`Resposta da API: ${response.status}`);
      }

      const data = await response.json();
      const texto = data?.resultado?.toString().trim();

      if (!texto) {
        renderErro("❌ Não consegui gerar sugestão.");
        return;
      }

      renderResultado(texto);
    } catch (err) {
      console.error("Erro ao buscar recomendação:", err);
      const msg = err.name === "AbortError"
        ? "⏳ A solicitação demorou demais. Tente novamente."
        : "❌ Erro ao buscar recomendação.";
      renderErro(msg);
    }
  });
});
