import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/authService";
import AgentList from "../components/AgentsList";
import AgentForm from "../components/AgentForm";

import { Container, Typography, Button, Box, Paper } from "@mui/material";

function Agents() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);

  // Reusable function to fetch agents
  async function loadAgents() {
    try {
      const response = await fetchWithAuth("http://localhost:4000/api/agents");

      if (response) {
        const data = await response.json();
        setAgents(data);
      }
    } catch (error) {
      console.error("Error loading agents:", error.message);
    }
  }

  // Run once on page load
  useEffect(() => {
    loadAgents();
  }, []);

  function handleBack() {
    navigate("/dashboard");
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Agent Management
      </Typography>

      {/* Back Button */}
      <Box sx={{ mb: 3 }}>
        <Button variant="outlined" onClick={handleBack}>
          Back to Dashboard
        </Button>
      </Box>

      {/* Agent Creation Section */}
      <AgentForm onAgentCreated={loadAgents} />

      {/* Agent List Section */}
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Agents List
        </Typography>
        <AgentList agents={agents} />
      </Paper>
    </Container>
  );
}

export default Agents;
