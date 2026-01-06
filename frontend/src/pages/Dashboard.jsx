import Welcome from "../components/Welcome";
import ATSScoreOnly from "../components/ATSScoreOnly";
import ATSWithJobDesc from "../components/ATSWithJobDesc";

function Dashboard() {
  return (
    <div className="container">
      <Welcome />

      <div className="grid">
        <ATSScoreOnly />
        <ATSWithJobDesc />
      </div>
    </div>
  );
}

export default Dashboard;
