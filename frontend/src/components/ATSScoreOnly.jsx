import { useState } from "react";
import axios from "axios";

function ATSScoreOnly() {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);

 const handleCheck = async () => {
  if (!file) {
    alert("Upload resume");
    return;
  }

  const formData = new FormData();
  formData.append("resume", file);

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/ats-only",
      formData
    );
    setScore(res.data.score);
  } catch (err) {
    alert("Error checking ATS score");
  }
};

  return (
    <div className="card">
      <h3>ATS Score (Resume Only)</h3>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleCheck}>Check ATS</button>

      {score !== null && (
        <p className="score">ATS Score: {score}%</p>
      )}
    </div>
  );
}

export default ATSScoreOnly;