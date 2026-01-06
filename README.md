🧠 AI-Powered ATS Resume Analyzer
This project is a full-stack AI-based Resume Analyzer that calculates an ATS (Applicant Tracking System) score for resumes.
The system supports two types of ATS checking:
->Resume-only ATS score
->Job Description–based ATS score (AI/NLP based)
The frontend is built using React, and the backend is built using FastAPI (Python).

🎯 What This Project Does (Simple Words)
->User signs up and logs in
->User uploads a resume (PDF)
->System calculates ATS score in two ways:
->General ATS score (resume quality)
->Job-specific ATS score (resume vs job description)

AI (TF-IDF) is used to calculate similarity

ATS score is shown visually using a progress bar

🏗️ Technologies Used :--
Frontend :-----
React (Vite)
JavaScript
CSS
Backend:-----
FastAPI
Python
PyPDF2 (for reading PDF resumes)
Scikit-learn (TF-IDF & cosine similarity)

📁 Project Folder Structure
ResumeAnalyzer/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Welcome.jsx
│   │   │   ├── ATSScoreOnly.jsx
│   │   │   └── ATSWithJobDesc.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Result.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   │
│   └── package.json
│
└── backend/
    ├── main.py
    ├── auth.py
    └── requirements.txt

⚙️ Step-by-Step Setup Guide
✅ Step 1: Clone the Repository
git clone https://github.com/your-username/your-repo-name.git
cd ResumeAnalyzer

🖥️ Backend Setup (FastAPI)
✅ Step 2: Go to Backend Folder
cd backend

✅ Step 3: Create Virtual Environment
python -m venv venv
Activate it:
Windows
venv\Scripts\activate

Mac/Linux
source venv/bin/activate

✅ Step 4: Install Backend Dependencies
pip install fastapi uvicorn python-multipart PyPDF2 scikit-learn passlib python-jose

✅ Step 5: Run FastAPI Server
uvicorn main:app --reload

You should see:
Running on http://127.0.0.1:8000

👉 Open browser and test backend:
http://127.0.0.1:8000/docs

🌐 Frontend Setup (React)
✅ Step 6: Open New Terminal & Go to Frontend
cd frontend

✅ Step 7: Install Frontend Dependencies
npm install

✅ Step 8: Start React App
npm run dev

You should see:
http://localhost:5173

🔐 How Authentication Works
User registers (Sign Up)
User logs in (Sign In)
JWT token is stored in browser
Logged-in user sees dashboard
Logout clears token

📊 ATS Score Logic Explained (Easy)
🔹 ATS Score (Resume Only)
Checks presence of important technical keywords
Gives a general ATS score
Useful for basic resume quality checking
🔹 ATS Score (With Job Description)
Uses TF-IDF (NLP technique)
Measures similarity between resume and job description
Uses Cosine Similarity
Gives more realistic ATS score

🧠 AI Techniques Used
TF-IDF (Term Frequency – Inverse Document Frequency)
Cosine Similarity
