async function getRecommendation() {
  const clima = document.getElementById("clima").value;
  const interesses = document.getElementById("interesses").value;
  const data = document.getElementById("data").value;

  const prompt = `Sugira um destino de viagem com clima ${clima}, focado em ${interesses}, para a data ${data}.`;

  try {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();
    document.getElementById("resultado").innerText = result.result;
  } catch (error) {
    document.getElementById("resultado").innerText = "Erro ao buscar recomendação.";
  }
}
