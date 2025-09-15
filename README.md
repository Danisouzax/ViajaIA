# 🌍 ViajaAI  

**ViajaAI** é um projeto serverless que utiliza **Node.js** e **Vercel** para fornecer uma API inteligente de recomendação de destinos de viagem.  

## 🚀 Tecnologias utilizadas  
- **Node.js** (ES Modules)  
- **node-fetch** para requisições HTTP  
- **Vercel** (deploy serverless com `vercel.json` v2)  

---

## 📂 Estrutura do projeto  
```
viajaai/
 ├─ api/              # Funções serverless (ex: recommend.js)
 ├─ package.json      # Dependências e scripts
 ├─ package-lock.json # Lockfile do npm
 ├─ vercel.json       # Configuração de deploy na Vercel
```

---

## ⚙️ Instalação e execução local  

1. **Clonar o repositório**  
   ```bash
   git clone https://github.com/seu-usuario/viajaai.git
   cd viajaai
   ```

2. **Instalar dependências**  
   ```bash
   npm install
   ```

3. **Rodar localmente com Vercel**  
   ```bash
   npm start
   ```
   Isso executa o comando `vercel dev`, simulando o ambiente serverless local.  

---

## 🌐 Deploy na Vercel  

1. Instale a CLI da Vercel (se ainda não tiver):  
   ```bash
   npm i -g vercel
   ```

2. Faça login:  
   ```bash
   vercel login
   ```

3. Deploy:  
   ```bash
   vercel
   ```

4. Para atualizar o projeto:  
   ```bash
   vercel --prod
   ```

---

## 🛠️ Exemplo de uso  

Se existir uma função em `api/recommend.js`, a rota será:  

```bash
GET https://viajaai.vercel.app/api/recommend?city=Paris
```

Resposta esperada (exemplo):  
```json
{
  "destination": "Paris",
  "recommendation": "Explore the Eiffel Tower and enjoy the French cuisine!"
}
```

---

## 📜 Scripts disponíveis  

- `npm start` → roda o projeto em modo dev (`vercel dev`)  

---

## 📌 Observações  

- O projeto usa apenas **node-fetch** como dependência principal.  
- A configuração `vercel.json` está no **schema v2**, própria para funções serverless.  
