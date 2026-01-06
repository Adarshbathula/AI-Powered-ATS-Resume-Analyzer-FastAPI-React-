import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = async () => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const res = await axios.post("http://127.0.0.1:8000/login", formData);

    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("userEmail", res.data.email); // ✅ STORE EMAIL

    navigate("/");
  } catch {
    alert("Login failed");
  }
};

  return (
    <div className="container">
      <h2>Sign In</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
