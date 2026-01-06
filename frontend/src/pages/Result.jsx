import { useLocation } from "react-router-dom";

function Result() {
  const { state } = useLocation();

  if (!state || state.error) {
    return <h2>No analysis result found</h2>;
  }

  const { score, matched_skills } = state;

  return (
  <div className="container">
    <h2>Resume Analysis Result</h2>

    <div className="score">ATS Score: {score}%</div>

    <h4>Matched Skills</h4>
    <ul>
      {matched_skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </div>
);

}

export default Result;
