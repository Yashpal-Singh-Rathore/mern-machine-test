import UploadForm from "../components/UploadForm";
import { useNavigate } from "react-router-dom";

import { Container, Typography, Button, Box } from "@mui/material";

function Upload() {
  const navigate = useNavigate();

  function handleBack() {
    navigate("/dashboard");
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Upload Tasks
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Button variant="outlined" onClick={handleBack}>
          Back to Dashboard
        </Button>
      </Box>

      <UploadForm />
    </Container>
  );
}

export default Upload;
