import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MaintenanceForm from "./components/MaintenanceForm";  // FIXED IMPORT
import "./App.css";
import HomePage from "./components/Homepage";
import Navbar from "./components/Navbar";
import MaintenanceList from "./components/MaintenanceList";

function App() {
  return (
    <Router>
      <div className="App">

      <Navbar/>

        <Routes>
          <Route path="/" element={<HomePage />} />  {/* FIXED */}
          <Route path="/maintenance-form" element={<MaintenanceForm />} />  {/* FIXED */}
           <Route path="/maintenance-list" element={<MaintenanceList />} />  {/* FIXED */}
        </Routes>

      </div> 
    </Router>
  );
}

export default App;
