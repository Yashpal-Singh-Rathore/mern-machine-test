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
} from "@mui/material";

function AgentForm({ onAgentCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetchWithAuth("http://localhost:4000/api/agents", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          mobile,
          password,
        }),
      });

      if (response) {
        const data = await response.json();

        // Clear form fields after success
        setName("");
        setEmail("");
        setMobile("");
        setPassword("");

        // Notify parent to refresh agents list
        if (onAgentCreated) {
          onAgentCreated();
        }
      }
    } catch (err) {
      setError("Failed to create agent");
    }
  }

  return (
    <Card sx={{ mb: 4 }} elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create New Agent
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />

          <Button type="submit" variant="contained" size="large">
            Create Agent
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AgentForm;
