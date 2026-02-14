import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleManageAgents() {
    navigate("/agents");
  }

  return (
    <div>
      <h1>Dashborad</h1>
      <p>Welcome to the dashboad page.</p>

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <h2>Agent Management</h2>

      <button onClick={handleManageAgents}>Manage Agents</button>
    </div>
  );
}

export default Dashboard;
