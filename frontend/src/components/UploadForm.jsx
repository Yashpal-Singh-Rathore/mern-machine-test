import { useState } from "react";
import { fetchWithAuth } from "../services/authService";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const allowedExtensions = [".csv", ".xlsx", ".xls"];
    const fileName = selectedFile.name.toLowerCase();

    const isValid = allowedExtensions.some((ext) => fileName.endsWith(ext));

    // Clear previous messages whenever new file selected
    setErrorMessage("");
    setSuccessMessage("");

    if (!isValid) {
      setErrorMessage("Only csv, xlsx and xls files are allowed.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file || loading) return;

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file); // Must match backend key

      const data = await fetchWithAuth("/api/upload", {
        method: "POST",
        body: formData,
      });

      setSuccessMessage(data.message);
      setFile(null);
    } catch (err) {
      setErrorMessage(err.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Typography variant="h6">Upload CSV / Excel File</Typography>

            <Button variant="contained" component="label" disabled={loading}>
              Select File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>

            {file && (
              <Typography variant="body2" color="text.secondary">
                Selected: {file.name}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              disabled={!file || loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Upload"
              )}
            </Button>

            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default UploadForm;
