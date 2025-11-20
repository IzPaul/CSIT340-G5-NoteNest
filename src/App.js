import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import Login from './Pages/Login';
import Register from './Pages/Register';  
import Upload from './Pages/Upload';
import Dashboard from './Pages/Dashboard';
import BrowseNotes from './Pages/BrowseNotes';
import ViewNotes from './Pages/ViewNotes'; // new import
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/browse" element={<BrowseNotes />} />
        <Route path="/viewnotes/:id" element={<ViewNotes />} /> {/* new route */}
      </Routes>
    </div>
  );
}

export default App;
