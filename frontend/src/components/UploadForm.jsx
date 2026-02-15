import { useState } from "react";
import { fetchWithAuth } from "../services/authService";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Alert,
} from "@mui/material";

function UploadForm() {
  // Store selected file
  const [file, setFile] = useState(null);

  // Store message for UI feedback
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const allowedExtensions = [".csv", ".xlsx", ".xls"];
    const fileName = selectedFile.name.toLowerCase();

    const isValid = allowedExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      setMessage("Only csv, xlsx and xls files are allowed.");
      setError(true);
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage("");
    setError(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setMessage("Please select a file.");
      setError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file); // Must match backend key

      const response = await fetchWithAuth("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response) {
        const data = await response.json();
        setMessage(data.message);
        setError(false);
        setFile(null);
      }
    } catch (error) {
      setMessage("Upload failed.");
      setError(true);
    }
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Typography variant="h6">Upload CSV / Excel File</Typography>

            {/* Hidden file input */}
            <Button variant="contained" component="label">
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
              color="primary"
              disabled={!file}
            >
              Upload
            </Button>

            {message && (
              <Alert severity={error ? "error" : "success"}>{message}</Alert>
            )}
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

export default UploadForm;
