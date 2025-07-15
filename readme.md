
# 📝 Markdown Note-Taking App

A simple yet powerful note-taking web application that allows users to:

- Upload Markdown files
- View and render notes as HTML
- Automatically check for grammar issues
- Display markdown content with neat formatting
- Built using Node.js, Express, Prisma, EJS, and Bootstrap 5

![App Screenshot](./public/image.png)

---

## 🚀 Features

- 🗂 Upload `.md` (Markdown) files
- 📄 View parsed HTML content from the uploaded markdown
- ✅ Grammar check powered by TextGears API
- 🧠 Markdown is stored in the database as a buffer (raw content)
- 🎨 Styled UI using Bootstrap 5
---

## 📦 Technologies Used

- **Node.js**
- **Express**
- **Prisma (PostgreSQL)**
- **EJS (for server-side rendering)**
- **Multer (for file uploads)**
- **TextGears API (for grammar checking)**
- **Bootstrap 5 (for styling)**

---

## 📌 Routes

| Method | Route              | Description                                      |
|--------|-------------------|--------------------------------------------------|
| `GET`  | `/`                | Homepage with note upload and list view         |
| `POST` | `/upload`          | Upload markdown file and store in database      |
| `GET`  | `/notes/:id`       | Render markdown note as HTML                    |
| `GET`  | `/grammar/:id`     | Analyze grammar errors in the uploaded markdown |

---

## ⚠️ Prerequisites

- Node.js `v18+`
- PostgreSQL running
- `.env` file with valid `DATABASE_URL` and `API_KEY`

---

## 🧪 Local Development

1. Clone the repo  
2. Install dependencies  
   ```bash
   npm install
   ```

3. Create `.env`

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   TEXTGEAR_API_KEY=your_textgear_api_key
   ```
4. Run migrations

   ```bash
   npx prisma migrate dev
   ```
5. Start the app

   ```bash
   npm start
   ```

---

## 🙋 **Author & Contact**

**Author:** Magesh Balram

📧 **Email:** [mageshbalram4@gmail.com](mailto:mageshbalram4@gmail.com)

[Project link](https://roadmap.sh/projects/url-shortening-service)](https://roadmap.sh/projects/markdown-note-taking-app)
---
