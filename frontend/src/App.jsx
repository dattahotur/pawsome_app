import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ToastContainer from './components/Toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Pets from './pages/Pets';
import PetDetails from './pages/PetDetails';
import Dashboard from './pages/Dashboard';
import AddPet from './pages/AddPet';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <ToastContainer />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pets/:id" element={<PetDetails />} />
            <Route path="/add-pet" element={<AddPet />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
