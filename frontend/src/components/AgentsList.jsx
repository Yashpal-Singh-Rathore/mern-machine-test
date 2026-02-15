import { useNavigate } from "react-router-dom";

function AgentList({ agents }) {
  const navigate = useNavigate();

  function handleAgentClick(id) {
    navigate(`/agents/${id}`);
  }

  return (
    <div>
      <h2>Agents List</h2>

      {agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <ul>
          {agents.map((agent) => (
            <li
              key={agent._id}
              onClick={() => handleAgentClick(agent._id)}
              style={{ cursor: "pointer", marginBottom: "8px" }}
            >
              {agent.name} - {agent.email} - {agent.mobile}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AgentList;
