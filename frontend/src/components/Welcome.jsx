function Welcome() {
  const email = localStorage.getItem("userEmail");

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <h2>Welcome 👋</h2>
      <p>
        Logged in as <b>{email}</b>
      </p>
    </div>
  );
}

export default Welcome;