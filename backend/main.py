from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
from fastapi import HTTPException
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from auth import hash_password, verify_password, create_token, fake_users_db
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

# CORS (for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_desc: str = Form(...)
):
    try:
        reader = PyPDF2.PdfReader(resume.file)
        resume_text = ""

        for page in reader.pages:
            text = page.extract_text()
            if text:
                resume_text += text + " "

        resume_text = resume_text.lower()
        job_desc = job_desc.lower()

        # ✅ TF-IDF similarity ONLY
        documents = [resume_text, job_desc]
        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf = vectorizer.fit_transform(documents)

        similarity = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]
        ats_score = int(similarity * 100)

        return {
            "score": ats_score
        }

    except Exception as e:
        return {"error": str(e)}
    
@app.post("/register")
def register(email: str = Form(...), password: str = Form(...)):
    if email in fake_users_db:
        raise HTTPException(status_code=400, detail="User already exists")

    fake_users_db[email] = hash_password(password)
    return {"message": "User registered successfully"}


@app.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    if email not in fake_users_db:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(password, fake_users_db[email]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_token({"sub": email})
    return {
        "access_token": token,
        "email": email   # ✅ SEND EMAIL
    }
@app.post("/ats-only")
async def ats_score_only(resume: UploadFile = File(...)):
    try:
        reader = PyPDF2.PdfReader(resume.file)
        resume_text = ""

        for page in reader.pages:
            text = page.extract_text()
            if text:
                resume_text += text + " "

        resume_text = resume_text.lower()

        # Simple heuristic ATS score (resume quality)
        keywords = [
            "python", "java", "react", "sql", "api",
            "machine learning", "data", "project",
            "internship", "experience"
        ]

        score = sum(1 for k in keywords if k in resume_text)
        ats_score = min(score * 10, 100)  # cap at 100

        return {"score": ats_score}

    except Exception as e:
        return {"error": str(e)}
