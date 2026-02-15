import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/authService";

function AgentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to store tasks
  const [tasks, setTasks] = useState([]);

  // State for loading status
  const [loading, setLoading] = useState(true);

  // Fetch tasks when page loads
  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetchWithAuth(
          `http://localhost:4000/api/agents/${id}/tasks`,
        );

        if (response) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error("Error loading tasks:", error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, [id]);

  function handleBack() {
    navigate("/agents");
  }

  return (
    <div>
      <h1>Agent Details</h1>

      <p>Agent ID: {id}</p>

      <button onClick={handleBack}>Back to Agents</button>

      <hr />

      <h2>Assigned Tasks</h2>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              {task.firstName} - {task.phone} - {task.notes}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AgentDetails;
