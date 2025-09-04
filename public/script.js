document.getElementById("travel-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const clima = document.getElementById("clima").value;
  const interesses = document.getElementById("interesses").value;
  const data = document.getElementById("data").value;

  const prompt = `Sugira um destino de viagem com clima ${clima}, interesse em ${interesses} e data da viagem em ${data}.`;

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
    document.getElementById("resultado").innerText = dataResult.resultado || "Nenhuma recomendação encontrada.";
  } catch (error) {
    console.error("Erro ao buscar recomendação:", error);
    document.getElementById("resultado").innerText = "Erro ao buscar recomendação.";
  }
});

