document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const clima = document.querySelector("#clima").value;
  const interesses = document.querySelector("#interesses").value;
  const data = document.querySelector("#data").value;

  const respostaDiv = document.querySelector("#resposta");
  respostaDiv.innerText = "🔄 Buscando recomendação...";

  try {
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clima, interesses, data })
    });

    const dataResposta = await res.json();
    respostaDiv.innerText = `🌍 Destino: ${dataResposta.destino}\n💡 Motivo: ${dataResposta.motivo}`;
  } catch (error) {
    respostaDiv.innerText = "❌ Erro ao buscar recomendação.";
    console.error(error);
  }
});
