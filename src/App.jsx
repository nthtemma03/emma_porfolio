import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEvent from "./pages/CreateEvent.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
