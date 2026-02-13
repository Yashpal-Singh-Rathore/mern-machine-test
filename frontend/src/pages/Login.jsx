import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login() {
  const navigate = useNavigate();

  function handleLoginSuccess(data) {
    const token = data.token;

    // Store token in local storage
    localStorage.setItem("token", token);

    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  );
}

export default Login;
