import { useNavigate } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";

function AgentList({ agents }) {
  const navigate = useNavigate();

  function handleAgentClick(id) {
    navigate(`/agents/${id}`);
  }

  return (
    <Box>
      {agents.length === 0 ? (
        <Typography variant="body1">No agents found.</Typography>
      ) : (
        <List>
          {agents.map((agent) => (
            <ListItem key={agent._id} disablePadding>
              <ListItemButton onClick={() => handleAgentClick(agent._id)}>
                <ListItemText
                  primary={agent.name}
                  secondary={`${agent.email} • ${agent.mobile}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default AgentList;
