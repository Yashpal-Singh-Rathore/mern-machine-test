import { useState } from "react";
import { fetchWithAuth } from "../services/authService";

function AgentForm({ onAgentCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const response = await fetchWithAuth("http://localhost:4000/api/agents", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          mobile,
          password,
        }),
      });

      if (response) {
        const data = await response.json();

        // Clear form fields after success
        setName("");
        setEmail("");
        setMobile("");
        setPassword("");

        // Notify parent to refresh agents list
        if (onAgentCreated) {
          onAgentCreated();
        }
      }
    } catch (err) {
      setError("Failed to create agent");
    }
  }

  return (
    <div>
      <h2>Create New Agent</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Mobile:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create Agent</button>
      </form>

      <hr />
    </div>
  );
}

export default AgentForm;
