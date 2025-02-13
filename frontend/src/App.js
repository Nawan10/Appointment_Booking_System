import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Services from './components/Services/Services';
import Adminlogin from './Adminlogin';
import Login from './Login';
import Register from './Register';

import Dashboard from './dashboard/userdashboard/Dashboard';
import Booking from './dashboard/userdashboard/Booking';
import UserSidebar from './dashboard/userdashboard/UserSidebar';

import Admindashboard from './dashboard/admindashboard/Admindashboard';
import Appointment from './dashboard/admindashboard/Appointment';
import Header from './dashboard/Header';
import Sidebar from './dashboard/Sidebar';

// import DashHome from './dashboard/Home';

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/appointment', '/dashboard', '/booking', '/admindashboard', '/login', '/adminlogin', '/register']; // Add '/appointment' to hide Navbar

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Services />
              <Contact />
              <Footer />
            </>
          }
        />
        
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <UserSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
              <Dashboard />
            </div>
          }
        />
        <Route
          path="/booking"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <UserSidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
              <Booking />
            </div>
          }
        />
        <Route
          path="/appointment"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
              <Appointment />
            </div>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <div className="grid-container">
              <Header OpenSidebar={OpenSidebar} />
              <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
              <Admindashboard />
            </div>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;