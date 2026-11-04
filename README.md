# Pavan K - Portfolio

Plain HTML, CSS and JavaScript frontend (no build step) plus a small Express + MongoDB backend for the contact form.

## Folder structure
```
index.html        page layout and text (About, Education, Contact...)
css/style.css     all styling and animations
js/data.js        EDIT HERE: skills, projects, certificates
js/main.js        builds the cards, skills grid, lightbox, nav highlight
js/cursor.js      comet cursor trail
js/effects.js     scroll bar, reveal-on-scroll, click ripple
assets/           photo, certificate images, resume
backend/          Express + MongoDB API for the contact form
```

## Run locally
Frontend only: run `npx serve` in this folder. For the working contact form, also start the backend (see Contact form below).

## Add a certificate
1. Put the image in `assets/` (for example `assets/cert-python.jpg`).
2. Add a block to `CERTS` in `js/data.js`:
```js
{title:"Python Course",issuer:"Coursera",date:"Dec 2026",image:"assets/cert-python.jpg",link:""},
```
`link` can be a verify URL. If it is empty, the image opens in a popup.

## Add a project
Put the screenshot in `assets/`, then add a block to `PROJECTS` in `js/data.js`:
```js
{title:"My New App",description:"What it does.",tags:["React JS","Node JS"],
 image:"assets/my-app.jpg",github:"https://github.com/Pavan-2005-K/my-app"},
```
- The whole card opens the `github` link when clicked. Leave `github:""` for a card that is not clickable.
- `image` can be a list, e.g. `image:["assets/a.jpg","assets/b.jpg"]`, and the pictures fade through automatically.
- Optional: `fit:"contain"` shows the full image uncropped, `pos:"center"` changes the crop position.

## Edit other text
- About text, education, contact details: `index.html`
- Hero role line: the `.roles` block in `index.html`
- Typed heading text: the `t='Hi, I am Pavan K'` value in `js/main.js`
- Resume: replace `assets/resume.pdf` with your latest PDF (keep the same file name). The "View Resume" button opens it in a new tab.

## Push to GitHub
```bash
cd pavan-portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/Pavan-2005-K/portfolio.git
git push -u origin main
```
Create an empty repo called `portfolio` on github.com first (no README, no .gitignore).

## Deploy on Vercel
1. Sign in at vercel.com with your GitHub account.
2. Click Add New > Project and import the `portfolio` repo.
3. If this portfolio is inside a subfolder in the repository, set Root Directory to that folder (the one containing `index.html` and `vercel.json`).
4. Framework Preset: **Other**. Leave Build Command and Output Directory empty. The `vercel.json` install command installs the backend dependencies.
5. Add the environment variables listed below before deploying. Click Deploy.
6. Every later `git push` redeploys automatically.

## Update later
Edit files, then: `git add . && git commit -m "Update" && git push`

## Contact form (Express + MongoDB backend)
The form posts to an Express backend (`backend/`), which validates the message and stores it in MongoDB Atlas (database `portfolio`, collection `contacts`). Each record has name, email, subject, message and `createdAt`. There is no public endpoint that reads messages; view them in the Atlas dashboard (Browse Collections).

```
Visitor -> Portfolio and Express API (Vercel) -> MongoDB Atlas
```

### Backend structure
```
backend/
  src/server.js          connects to MongoDB, starts the server
  src/app.js             Express app: helmet, CORS, JSON parsing, /api/health, error handler
  src/routes/contact.js  POST /api/contact (rate limited, honeypot, validation)
  src/models/Contact.js  Mongoose schema
  src/validate.js        server-side validation
  test/                  unit tests (npm test)
  .env.example           copy to .env
```

The root `api/[...route].js` entry point adapts the Express app to Vercel Functions and reuses a MongoDB connection between warm invocations. Vercel's file-based routing sends `/api/*` requests to this handler; the HTML, CSS, JavaScript, and assets continue to be served as static files.

### API
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Backend and database status |
| POST | `/api/contact` | Validate and store a message. Body: `name`, `email`, `subject`, `message` (JSON) |

Protections: validation on the server, 10 KB body limit, 5 messages per IP per 15 minutes, hidden `botcheck` honeypot, helmet headers, CORS limited to `ALLOWED_ORIGINS`, and no read endpoint for messages.

### 1. Create the MongoDB Atlas database
1. Create a free cluster at https://cloud.mongodb.com.
2. Database Access: create a user with a password.
3. Network Access: allow access from Vercel's serverless functions. Since their outbound IPs can vary, Atlas access from anywhere (`0.0.0.0/0`) is the simplest option; use a private network or static egress IP setup if your plan supports it.
4. Connect > Drivers: copy the connection string. The `portfolio` database is created automatically on the first message.

### 2. Run locally
```bash
cd backend
npm install
cp .env.example .env      # then edit .env and paste your MONGODB_URI
npm start                 # http://localhost:5000/api/health
```
In a second terminal serve the site from the project root:
```bash
npx serve -l 3000 .
```
Open http://localhost:3000. On `localhost` the form automatically uses `API_BASE_URL_LOCAL` (`http://localhost:5000`). In development, loopback frontends (`localhost` or `127.0.0.1`) are allowed on any port; production frontends must be listed in `ALLOWED_ORIGINS`. (Opening `index.html` directly as a file will be blocked by CORS; use a local server.)

### 3. Configure the Vercel deployment
In Project Settings > Build and Deployment, use:

- Framework Preset: **Other**
- Root Directory: the project directory containing `index.html`, `api/`, `backend/`, and `vercel.json`
- Build Command: leave empty
- Output Directory: leave empty
- Install Command: use the value configured in `vercel.json` (`npm --prefix backend ci`)
- Node.js Version: **22.x**

Add these in Project Settings > Environment Variables for **Production** (and Preview if you want to test preview deployments):

| Name | Value |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string (keep it secret) |
| `ALLOWED_ORIGINS` | Your Vercel site origin, e.g. `https://pavan-portfolio-tan-eta.vercel.app` (no trailing slash); add any custom domain origins comma-separated |
| `NODE_ENV` | `production` |

`PORT` is only used by the local Express server and is not needed in Vercel. The frontend defaults to the same-origin `/api` endpoints on Vercel; leave `API_BASE_URL_PROD` empty in `js/data.js`.

### 4. Deploy and verify
Push the project to GitHub and deploy it from Vercel. After deployment, check `https://<your-vercel-domain>/api/health`; it should return JSON with `"status":"ok"` and `"database":"connected"`. Then submit the contact form on the deployed site and confirm the new document appears in Atlas under `portfolio.contacts`.

## About-section animation
The illustration animates by itself (typing code, check mark, sparkles). To use your own animated GIF instead:
save it as `assets/about.gif` and set `var ABOUT_GIF="assets/about.gif";` in `js/data.js`.
