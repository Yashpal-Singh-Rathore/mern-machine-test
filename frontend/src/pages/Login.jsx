import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

import { Container, Typography, Box } from "@mui/material";

function Login() {
  const navigate = useNavigate();

  function handleLoginSuccess(data) {
    const token = data.token;

    // Store token in local storage
    localStorage.setItem("token", token);

    navigate("/dashboard");
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
      </Box>

      <LoginForm onSuccess={handleLoginSuccess} />
    </Container>
  );
}

export default Login;
