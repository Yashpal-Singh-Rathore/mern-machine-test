import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/authService";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

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
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Agent Details
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Agent ID: {id}
      </Typography>

      <Button variant="outlined" sx={{ mt: 2, mb: 4 }} onClick={handleBack}>
        Back to Agents
      </Button>

      <Typography variant="h6" gutterBottom>
        Assigned Tasks
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : tasks.length === 0 ? (
        <Typography variant="body1">No tasks assigned.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {tasks.map((task) => (
            <Card key={task._id} elevation={2}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {task.firstName}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {task.phone}
                </Typography>

                {task.notes && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {task.notes}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default AgentDetails;
