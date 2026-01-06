import { useState } from "react";
import axios from "axios";

function ATSWithJobDesc() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState(null); // ✅ ADD STATE

  const handleAnalyze = async () => {
    if (!file || !jobDesc) {
      alert("Upload resume and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_desc", jobDesc);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setScore(res.data.score); // ✅ SET SCORE
    } catch (err) {
      console.error(err);
      alert("Error analyzing resume");
    }
  };

  return (
    <div className="card">
      <h3>ATS Score (With Job Description)</h3>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <textarea
        rows="5"
        placeholder="Paste job description here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
      />

      <button onClick={handleAnalyze}>
        Analyze with Job Description
      </button>

      {/* ✅ SCORE DISPLAY */}
      {score !== null && (
        <div style={{ marginTop: "15px", width: "100%" }}>
          <p className="score">ATS Score: {score}%</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${score}%` }}
            ></div>
          </div>

          <p style={{ textAlign: "center", marginTop: "8px" }}>
            {score >= 70
              ? "Excellent Match ✅"
              : score >= 40
              ? "Average Match ⚠️"
              : "Poor Match ❌"}
          </p>
        </div>
      )}
    </div>
  );
}

export default ATSWithJobDesc;
