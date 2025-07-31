# 🚀 QueryCraft – Visual SQL Builder with AI

QueryCraft is a full-stack AI-powered SQL query builder that allows users to visually design complex SQL queries using an intuitive drag-and-drop interface. It supports natural language to SQL translation, visual debugging via reverse query parsing, and learning-guided query building — all from a beautifully responsive front end built with React Flow and OpenAI's API.

Version1 Hosted Link - https://querycraft.netlify.app/

---

## 🧠 Key Features

- ⚡ Visual Query Builder  
  Drag and drop tables, filters, joins, order conditions and more — all rendered live using React Flow.

- 🧬 Natural Language → SQL  
  Simply describe what you want in plain English. QueryCraft uses OpenAI to generate the corresponding SQL.

- 🔁 Reverse Mode (SQL → Flow)  
  Paste a complex SQL query and see it broken down visually as interactive flow blocks.

- ✅ Per-block SQL Validation  
  Real-time validation of individual query components for correctness.

- ✨ AI Suggestions  
  Get smart recommendations for what to add next in your flow (e.g., joins, filters, order by).

- 🧑‍🎓 Learning Mode  
  Step-by-step guided SQL query construction for beginners.

- 🔐 User Authentication  
  Secure login system with session saving to let users save and manage their custom queries.

---

## 🌐 Live Demo (Coming Soon)
Deployed version coming soon on Netlify/Vercel  
(Or you can run it locally using the instructions below)

---

## 💻 Tech Stack

Frontend: React, React Flow, Tailwind CSS, Vite  
Backend: Node.js, Express  
Others: OpenAI API, MongoDB, PostgreSQL (optional)

---

## 📁 Project Structure

QueryCraft/
├── backend/               → Node.js + Express backend  
├── client/                → React + Vite front end  
├── README.md              → This file  

---

## ⚙️ How to Run Locally

### 🔧 Prerequisites

- Node.js (v16+)
- npm or yarn
- OpenAI API key
- MongoDB URI (Atlas or local)

### 🛠 Setup Steps

1. Clone the repository:
   git clone https://github.com/MuskanJaiswal1/QueryCraft.git
   cd QueryCraft

2. Setup Backend:
   cd backend  
   npm install  
   (Create .env file with MONGO_URI, OPENAI_API_KEY, JWT_SECRET)  
   npm start  

3. Setup Frontend:
   cd ../client  
   npm install  
   npm run dev  

4. Visit: http://localhost:5173

---

## 🔒 Environment Variables (backend/.env)

MONGO_URI=your_mongodb_connection  
OPENAI_API_KEY=your_openai_api_key  
JWT_SECRET=your_jwt_secret  

---

## 📌 Status

- ✅ Visual Flow + SQL Generation Working  
- ✅ AI Prompt Support Integrated  
- 🔄 Reverse Parsing & Guided Learning Mode in progress  
- 🚀 Deployment coming soon

---

## 🙋‍♀️ Author

Made with 💙 by Muskan Jaiswal  
GitHub: https://github.com/MuskanJaiswal1  
LinkedIn: https://www.linkedin.com/in/muskan-jais  

---
