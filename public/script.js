document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("travel-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const climate = document.getElementById("climate").value;
    const interests = document.getElementById("interests").value;
    const date = document.getElementById("date").value;

    const prompt = `Sugira um destino de viagem com clima ${climate}, interesse em ${interests} e data da viagem em ${date}.`;

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Erro na resposta da API");
      }

      const dataResult = await response.json();

      // Exibir resultado estilizado
      const resultadoDiv = document.getElementById("resultado");
      resultadoDiv.innerHTML = `
        <div class="resultado-card">
          <h3>✨ Sugestão de Destino</h3>
          <p>${dataResult.resultado}</p>
        </div>
      `;
    } catch (error) {
      console.error("Erro ao buscar recomendação:", error);

      document.getElementById("resultado").innerHTML = `
        <p style="color: red;">❌ Erro ao buscar recomendação.</p>
      `;
    }
  });
});
