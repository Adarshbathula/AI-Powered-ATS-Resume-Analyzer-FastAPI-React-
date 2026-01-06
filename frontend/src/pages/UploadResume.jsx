import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!file || !jobDesc) {
      alert("Upload resume and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_desc", jobDesc);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Backend response:", response.data);

      navigate("/result", { state: response.data });
      <button onClick={() => {
  localStorage.removeItem("token");
  window.location.href = "/login";
}}>
  Logout
</button>

    } catch (error) {
      console.error("Frontend error:", error);
      alert("Error analyzing resume");
    }
  };
 return (
  
  <div className="container">
    <h2>AI Resume Analyzer</h2>

    <label>Upload Resume (PDF)</label>
    <input
      type="file"
      accept=".pdf"
      onChange={(e) => setFile(e.target.files[0])}
    />

    <label>Job Description</label>
    <textarea
      rows="6"
      placeholder="Paste job description here..."
      value={jobDesc}
      onChange={(e) => setJobDesc(e.target.value)}
    />

    <button onClick={handleSubmit}>Analyze Resume</button>
  </div>
);
 
}

export default UploadResume;
