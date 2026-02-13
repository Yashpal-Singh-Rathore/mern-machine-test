import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/authService";

function Dashboard() {
  const navigate = useNavigate();

  // State to store agents
  const [agents, setAgents] = useState([]);

  // Load agents when component mounts
  useEffect(() => {
    async function loadAgents() {
      try {
        const response = await fetchWithAuth(
          "http://localhost:4000/api/agents",
        );

        if (response) {
          const data = await response.json();

          // Store agents in state
          setAgents(data);
        }
      } catch (error) {
        console.error("Error loading agents:", error.message);
      }
    }

    loadAgents();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
      <h1>Dashborad</h1>
      <p>Welcome to the dashboad page.</p>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h2>Agents List</h2>

      {agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <ul>
          {agents.map((agent) => (
            <li key={agent._id}>
              {agent.name} - {agent.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
