import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import { TaskManager } from "./components/TaskManager";

function App() {
  return (
    <div>
       <Navbar />
       <Container maxWidth="lg">
        <TaskManager />
      </Container>
    </div>
  );
}

export default App;
