import { useState } from "react";
import { fetchWithAuth } from "../services/authService";

function UploadForm() {
  // Store selected file
  const [file, setFile] = useState(null);

  // Store message for UI feedback
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const allowedExtensions = [".csv", ".xlsx", ".xls"];
    const fileName = selectedFile.name.toLowerCase();

    const isValid = allowedExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      setMessage("Only csv, xlsx and xls files are allowed.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setMessage("Please select a file.");
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
        setFile(null);
      }
    } catch (error) {
      setMessage("Upload failed.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />

        <button type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadForm;
