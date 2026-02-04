## Usage
To run this project use the following commands
```console
# examples
<your-cli> git clone https://github.com/<your-fork>/btb-project
<your-cli> cd btb-project
<your-cli> npm run dev
```

---

## Contributing
We welcome contributions of all kinds! Please adhere to the community guidelines to make your PRs count.

---

## Submitting a Pull Request

1. Fork the repository (top‑right on GitHub)
2. Clone your fork locally:
   ```bash
   git clone <HTTPS-ADDRESS>
   cd <NAME-OF-REPO>
   ```
3. Create a new branch:
   ```bash
   git checkout -b <your-branch-name>
   ```
4. Make your changes and stage them:
   ```bash
   git add .
   ```
5. Commit your changes:
   ```bash
   git commit -m "feat: your message"
   ```
6. Push to your fork:
   ```bash
   git push origin <your-branch-name>
   ```
7. Open a Pull Request and clearly describe what you changed and why. Link related issues (e.g., “Fixes #123”).

# 🚀 Career Skill Analyzer

**Active Assessment Platform** - Analyze real skills through micro-tasks, not self-reporting.

## 🎯 Problem We Solve

- Traditional career platforms ask users to rate themselves (unreliable)
- We give **actual mini-challenges** and analyze their real work
- AI generates personalized learning roadmaps based on objective performance

## ✨ Key Features

### 🔍 Active Assessment
- Code challenges (analyze logic, efficiency, best practices)
- Design tasks (evaluate visual hierarchy, UX principles)
- Data analysis (test analytical thinking, interpretation)

### 🤖 AI-Powered Analysis
- Detailed skill breakdown (4+ metrics per domain)
- Identify specific strengths and weaknesses
- Personalized recommendations

### 🗺️ Smart Roadmap
- 10-12 skills from beginner to advanced
- Track progress: locked → in-progress → completed
- Real-time readiness score

### 📊 Dashboard
- All assessments history
- Progress tracking
- Performance trends

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Firebase Firestore
- **AI:** OpenAI GPT-4
- **Deployment:** Vercel

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- Firebase account
- OpenAI API key

### Installation

1. **Clone the repo**
```bash
git clone https://github.com/yourusername/btb-project.git
cd btb-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create `.env.local` in root directory:
```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI API Key
OPENAI_API_KEY=sk-proj-your_openai_key
```

**How to get these keys:**

**Firebase:**
1. Go to https://console.firebase.google.com
2. Create new project or select existing
3. Click ⚙️ Settings → Project Settings
4. Scroll to "Your apps" → Web app → Copy config values

**OpenAI:**
1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Copy the key (starts with `sk-proj-...`)

4. **Setup Firebase Firestore**

In Firebase Console:
- Go to Firestore Database
- Click "Create database"
- Start in **test mode** (change later)
- Choose your region

5. **Run development server**
```bash
npm run dev
```

Open http://localhost:3000

## 📡 API Endpoints

### `POST /api/assessment/submit`
Submit a task for AI analysis

**Request:**
```json
{
  "userId": "user123",
  "skillDomain": "code|design|data",
  "taskType": "Task description",
  "submission": {
    "code": "function example() {...}",
    "designDescription": "...",
    "dataAnalysis": "..."
  }
}
```

**Response:**
```json
{
  "success": true,
  "assessmentId": "abc123",
  "analysis": {
    "overallScore": 75,
    "breakdown": {...},
    "strengths": [...],
    "weaknesses": [...],
    "recommendations": {...}
  }
}
```

### `POST /api/roadmap/generate`
Generate personalized learning roadmap

### `GET /api/dashboard/[userId]`
Get user's complete dashboard data

### `PATCH /api/progress/update`
Update skill progress status

## 🧪 Testing
```bash
# Test Firebase connection
curl http://localhost:3000/api/test

# Expected response:
# {"success": true, "message": "Firebase connected successfully!"}
```

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Add environment variables in Vercel**
- Go to Vercel Dashboard → Your Project
- Settings → Environment Variables
- Add all variables from `.env.local`

## 🎨 Customization

### Change AI Model
In `app/api/assessment/submit/route.ts`:
```typescript
model: "gpt-4-turbo-preview" // or "gpt-3.5-turbo" for faster/cheaper
```

### Add New Skill Domains
1. Update `app/types/index.ts` - add to `skillDomain` type
2. Update `getAnalysisPrompt()` in assessment route
3. Add UI option in `SkillSelector.tsx`

## 📈 Roadmap

- [ ] User authentication
- [ ] Leaderboard/peer comparison
- [ ] More skill domains
- [ ] Export reports as PDF
- [ ] Team/organization features

## 🤝 Contributing

Pull requests welcome! For major changes, open an issue first.

## 📝 License

MIT

## 👥 Team

Built for [Your Hackathon Name]

---

**⭐ If this helps you, star the repo!**