function AgentList({ agents }) {
  return (
    <div>
      <h2>Agents List</h2>

      {agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <ul>
          {agents.map((agent) => (
            <li key={agent._id}>
              {agent.name} - {agent.email} - {agent.mobile}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AgentList;
