import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login() {
  const navigate = useNavigate();

  function handleLoginSuccess() {
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
