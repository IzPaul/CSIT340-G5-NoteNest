import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from './Pages/Login';
import Register from './Pages/Register';  
import Upload from './Pages/Upload';
import Dashboard from './Pages/Dashboard';
import BrowseNotes from './Pages/BrowseNotes';
import ViewNotes from './Pages/ViewNotes';
import './App.css';

function App() {
  return (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/browse" element={<BrowseNotes />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/viewnotes/:id" element={<ViewNotes />} />
              <Route path="/*" element={<BrowseNotes />} />
            </Route>
          </Routes>
  );
}

export default App;
