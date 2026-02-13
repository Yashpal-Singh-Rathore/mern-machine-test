import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchWithAuth } from "../services/authService";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAgents() {
      try {
        const response = await fetchWithAuth(
          "http://localhost:4000/api/agents",
        );

        if (response) {
          const data = await response.json();
          console.log("Agents:", data);
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
    </div>
  );
}

export default Dashboard;
