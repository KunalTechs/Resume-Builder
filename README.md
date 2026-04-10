# Resume Builder

A full-stack resume builder that does more than just let you fill out a form. Upload your existing resume and the app uses **Generative AI** to extract your data, then rebuilds it cleanly inside your chosen template. You can also start from scratch, pick a template, customize the accent color, let AI write your summary, and download a polished PDF — all while your resumes are saved to your account.

**Live Demo:** [resume-builder-3tp2.vercel.app](https://resume-builder-3tp2.vercel.app)

---

## Features

**AI-Powered Resume Parsing**
Upload your existing resume (PDF) and the app uses Gen AI to extract your work experience, education, skills, and other details automatically — no manual re-entry needed.

**AI Summary Generation**
Stuck on your professional summary? Hit the AI button and it generates one based on your profile data.

**Smart Profile Photo with ImageKit**
Upload your photo and the app automatically removes the background using the [ImageKit](https://imagekit.io/) API. The background is then replaced with the resume's current accent color, so your photo always blends perfectly with whatever template and color you've chosen.

**Multiple Resume Templates**
Choose from several professionally designed templates to present your experience in the style that suits you best.

**Accent Color Customization**
Each template supports accent color changes. The accent color doesn't just affect text and borders — it also syncs with your profile photo background for a fully cohesive look.

**PDF Download**
Once you're happy with your resume, export it as a ready-to-send PDF in one click.

**User Accounts & Saved Resumes**
Create an account to save your resumes and come back to edit them anytime. Authentication is handled with **JWT stored in HTTP-only cookies** for security.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT with HTTP-only cookie sessions |
| AI | Generative AI (resume parsing + summary generation) |
| Image Processing | ImageKit API (upload, background removal, accent color fill) |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

## Project Structure

```
Resume-Builder/
├── backend/          # Express REST API, MongoDB models, auth middleware, AI + ImageKit integration
├── frontend/         # React + Vite app (templates, form, PDF export, color picker, photo upload)
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (Atlas)
- A Generative GEMINI_API_KEY (for resume parsing and summary generation)
- An [ImageKit](https://imagekit.io/) account (free tier works fine)

---

### 1. Clone the Repository

```bash
git clone https://github.com/KunalTechs/Resume-Builder.git
cd Resume-Builder
```

---

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
AI_API_KEY=your_generative_ai_api_key
CLIENT_URL=http://localhost:5173

# ImageKit credentials (found in your ImageKit dashboard)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

Start the server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

---

### 3. Set Up the Frontend

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Deployment

The app is split across two platforms:

**Frontend → Vercel**
Connect the `frontend/` folder to a Vercel project. Set the `VITE_API_URL` environment variable in Vercel's dashboard to point to your live Render backend URL.

**Backend → Render**
Connect the `backend/` folder to a Render Web Service. Add all the backend environment variables in Render's environment settings — including the three ImageKit keys. Set `CLIENT_URL` to your live Vercel frontend URL so CORS works correctly.

> **Note:** Render's free tier spins down after inactivity, so the first request after idle may take 30–60 seconds to respond. This is normal behavior, not a bug.

---

## How to Use

**Starting fresh:**
1. Create an account or log in.
2. Click **New Resume** and fill in your details section by section.
3. Use the **AI Summarize** button to generate your professional summary.
4. Upload a profile photo — the background will be removed automatically and filled with your accent color.
5. Pick a template and adjust the accent color. Your photo background updates to match.
6. Download as PDF.

**Using an existing resume:**
1. Click **Upload Resume** and select your PDF.
2. The AI reads your resume and populates all the fields automatically.
3. Review and edit anything that needs fixing.
4. Upload a photo, pick a template, set your accent color, and export.

Your resumes are saved to your account so you can come back and update them anytime.

---

## Environment Variables Reference

| Variable | Where | Description |
|----------|-------|-------------|
| `MONGO_URI` | backend | MongoDB connection string |
| `JWT_SECRET` | backend | Secret key for signing JWT tokens |
| `AI_API_KEY` | backend | API key for Generative AI service |
| `PORT` | backend | Port for the Express server (default: 5000) |
| `CLIENT_URL` | backend | Frontend origin for CORS (your Vercel URL in production) |
| `IMAGEKIT_PUBLIC_KEY` | backend | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | backend | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | backend | ImageKit URL endpoint for your account |
| `VITE_API_URL` | frontend | Backend API base URL (your Render URL in production) |

---

## Contributing

Contributions are welcome — whether it's a new template, a UI improvement, or a bug fix.

```bash
git checkout -b feature/your-feature-name
git commit -m "Add: brief description"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## Author

**Kunal** — [@KunalTechs](https://github.com/KunalTechs)

If this saved you time on your job hunt, a ⭐ on GitHub would mean a lot.
