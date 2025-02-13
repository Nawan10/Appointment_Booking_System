import React, { useEffect, useState } from 'react';
import { FaCalendarCheck } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import "./Dashboard.css";

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [userPhone, setUserPhone] = useState('');
  const [showAppointments, setShowAppointments] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Get logged-in user's phone from localStorage
    const loggedInUserPhone = localStorage.getItem("userPhone");
    console.log("Logged in user phone:", loggedInUserPhone); // Debugging log

    if (loggedInUserPhone) {
      setUserPhone(loggedInUserPhone);

      // Fetch only the bookings for the logged-in user
      axios.get(`http://localhost:8081/api/bookings?phone=${loggedInUserPhone}`)
        .then((response) => {
          console.log("Fetched bookings:", response.data); // Debugging log
          // Extract only the date part and format it
          const formattedBookings = response.data.map(booking => ({
            ...booking,
            date: new Date(booking.date).toLocaleDateString() // Localized date format
          }));
          setBookings(formattedBookings);
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, []);

  return (
    <main className='main-container'>
      <div className='dashboard-header'>
        <h3> Welcome Back To YoungVé Salon </h3>
      </div>

      {/* Dashboard Card - Show Number of Bookings */}
      <div className="dashboard-card">
        <div className="flex items-center space-x-4">
          <FaCalendarCheck className="icon" />
          <div>
            <h3>Appointments</h3>
            <p>Your appointments history</p>
          </div>
        </div>
        <h1>{bookings.length}</h1> {/* Display the number of bookings */}
      </div>

      {/* New Button to Navigate to Booking Page */}
      <button 
        className="dashboard-button" 
        onClick={() => navigate('/booking')} // Navigate to /booking
      >
        View All Appointments
      </button>

      {/* Table View of Appointments */}
      {showAppointments && (
        <div className="appointments-table-container">
          <h2 className="text-xl font-semibold my-4">Your Appointments</h2>
          {bookings.length > 0 ? (
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{booking.service}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No appointments yet.</p>
          )}
        </div>
      )}
    </main>
  );
}

export default Dashboard;