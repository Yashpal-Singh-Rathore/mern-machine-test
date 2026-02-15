import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
} from "@mui/material";

function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleManageAgents() {
    navigate("/agents");
  }

  function handleUploadTasks() {
    navigate("/upload");
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        Welcome to the admin dashboard.
      </Typography>

      <Stack spacing={4} mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Agent Management
            </Typography>

            <Button variant="contained" onClick={handleManageAgents}>
              Manage Agents
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Task Distribution
            </Typography>

            <Button variant="contained" onClick={handleUploadTasks}>
              Upload Tasks
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Button variant="outlined" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

export default Dashboard;
