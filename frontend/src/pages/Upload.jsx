import UploadForm from "../components/UploadForm";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();

  function handleBack() {
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Upload Tasks</h1>

      <button onClick={handleBack}>Back to Dashboard</button>

      <hr />

      <UploadForm />
    </div>
  );
}

export default Upload;
