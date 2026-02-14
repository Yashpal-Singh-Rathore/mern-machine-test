import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/authService";
import AgentList from "../components/AgentsList";
import AgentForm from "../components/AgentForm";

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
    <div>
      <h1>Agent Management</h1>

      <button onClick={handleBack}>Back to Dashboard</button>

      <hr />

      {/* Agent Creation Form */}
      <AgentForm onAgentCreated={loadAgents} />

      {/* Agent List */}
      <AgentList agents={agents} />
    </div>
  );
}

export default Agents;
