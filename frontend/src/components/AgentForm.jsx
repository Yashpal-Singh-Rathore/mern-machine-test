import { useState } from "react";
import { fetchWithAuth } from "../services/authService";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";

function AgentForm({ onAgentCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false,
  });

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function validateField(name, value) {
    const trimmedValue = value.trim();

    if (name === "name") {
      if (!trimmedValue) return "Name is required";
      if (trimmedValue.length < 2) return "Name must be at least 2 characters";
    }

    if (name === "email") {
      if (!trimmedValue) return "Email is required";

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(trimmedValue))
        return "Enter a valid email address";
    }

    if (name === "mobile") {
      if (!trimmedValue) return "Mobile number is required";

      const mobilePattern = /^[0-9]{10,15}$/;

      if (!mobilePattern.test(trimmedValue))
        return "Enter a valid mobile number (10-15 digits)";
    }

    if (name === "password") {
      if (!trimmedValue) return "Password is required";
      if (trimmedValue.length < 6)
        return "Password must be at least 6 characters";
    }

    return "";
  }

  function validateForm() {
    const newErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      mobile: validateField("mobile", mobile),
      password: validateField("password", password),
    };

    setErrors(newErrors);

    return (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.mobile &&
      !newErrors.password
    );
  }

  function handleBlur(event) {
    const { name, value } = event.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const fieldError = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setServerError("");

    setTouched({
      name: true,
      email: true,
      mobile: true,
      password: true,
    });

    const isValid = validateForm();

    if (!isValid) return;

    setLoading(true);

    try {
      const data = await fetchWithAuth("/api/agents", {
        method: "POST",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          password: password.trim(),
        }),
      });

      setName("");
      setEmail("");
      setMobile("");
      setPassword("");

      if (onAgentCreated) {
        onAgentCreated();
      }
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card sx={{ mb: 4 }} elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create New Agent
        </Typography>

        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
            fullWidth
          />

          <TextField
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            fullWidth
          />

          <TextField
            name="mobile"
            label="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            onBlur={handleBlur}
            error={touched.mobile && Boolean(errors.mobile)}
            helperText={touched.mobile && errors.mobile}
            fullWidth
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Agent"
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AgentForm;
