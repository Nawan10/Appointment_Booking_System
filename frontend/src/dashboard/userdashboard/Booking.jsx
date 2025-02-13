import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  // Import the CSS for the date picker
import "./Booking.css";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null, // Add id for editing
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userPhone = localStorage.getItem("userPhone");

    if (!userPhone) {
      navigate("/login");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      name: userName,
      phone: userPhone,
    }));

    // Fetch all bookings
    fetchBookings();
  }, [navigate]);

  const fetchBookings = () => {
    const userPhone = localStorage.getItem("userPhone");
    axios
      .get(`http://localhost:8081/api/bookings?phone=${userPhone}`)
      .then((response) => {
        const allBookings = response.data;
        setBookings(allBookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  // Update available dates based on selected service
  useEffect(() => {
    if (formData.service) {
      const bookedDates = bookings
        .filter((booking) => booking.service === formData.service)
        .map((booking) => booking.date);

      const today = new Date();
      const nextTwoWeeks = Array.from({ length: 14 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
      });

      const available = nextTwoWeeks.filter((date) => !bookedDates.includes(date));
      setAvailableDates(available);
    }
  }, [formData.service, bookings]);

  // Update available times based on selected date and service
  useEffect(() => {
    if (selectedDate && formData.service) {
      const bookedTimes = bookings
        .filter(
          (booking) => booking.date === selectedDate && booking.service === formData.service
        )
        .map((booking) => booking.time);

      const allTimes = [
        "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00", "21:00"
      ];

      const available = allTimes.filter((time) => !bookedTimes.includes(time));
      setAvailableTimes(available);
    }
  }, [selectedDate, formData.service, bookings]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = () => {
    if (!formData.service || !formData.date || !formData.time) {
      alert("Please select a service, date, and time.");
      return;
    }

    const duplicateBooking = bookings.some(
      (booking) => booking.date === formData.date && booking.time === formData.time
    );

    if (duplicateBooking) {
      alert("This date and time is already booked by someone else.");
      return;
    }

    if (formData.id) {
      // Edit existing booking
      axios
        .put(`http://localhost:8081/booking/${formData.id}`, formData)
        .then(() => {
          alert("Booking updated successfully!");
          fetchBookings();
          setShowForm(false);
          setFormData({
            id: null,
            name: "",
            phone: "",
            service: "",
            date: "",
            time: "",
          });
        })
        .catch(() => alert("Failed to update booking."));
    } else {
      // Add new booking
      axios
        .post("http://localhost:8081/booking", formData)
        .then(() => {
          alert("Booking successful!");
          fetchBookings();
          setShowForm(false);
          setFormData({
            id: null,
            name: "",
            phone: "",
            service: "",
            date: "",
            time: "",
          });
        })
        .catch(() => alert("Failed to book appointment."));
    }
  };

  const editBooking = (booking) => {
    setFormData({
      id: booking.id,
      name: booking.name,
      phone: booking.phone,
      service: booking.service,
      date: booking.date,
      time: booking.time,
    });
    setSelectedDate(booking.date);
    setShowForm(true);
  };

  const deleteBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      axios
        .delete(`http://localhost:8081/booking/${bookingId}`)
        .then(() => {
          alert("Booking deleted successfully!");
          fetchBookings();
        })
        .catch(() => alert("Failed to delete booking."));
    }
  };

  return (
    <main className="main-container">
      <h1>Your Appointments</h1>
      <p>You have {bookings.length} appointment(s) booked.</p>

      <button
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-blue-600"
        onClick={() => {
          setShowForm((prev) => !prev);
          setFormData({
            id: null,
            name: localStorage.getItem("userName"),
            phone: localStorage.getItem("userPhone"),
            service: "",
            date: "",
            time: "",
          });
          setSelectedDate(null);
        }}
      >
        {showForm ? "Close Form" : "New Appointment"}
      </button>

      {showForm && (
        <form>
          <input type="text" value={formData.name} disabled />
          <input type="text" value={formData.phone} disabled />

          <select name="service" onChange={handleInputChange} required>
            <option value="">Select a service</option>
            <option>HairCut and Styling</option>
            <option>Hair Coloring</option>
            <option>Hair Chemical Treatment</option>
            <option>Hair Extensions Treatment</option>
          </select>

          {formData.service && (
            <>
              <h4 className="select-date">Select Available Date</h4>
              <DatePicker
                selected={selectedDate ? new Date(selectedDate) : null}
                onChange={(date) => {
                  setSelectedDate(date.toISOString().split("T")[0]);
                  setFormData((prev) => ({ ...prev, date: date.toISOString().split("T")[0] }));
                }}
                minDate={new Date()}
                filterDate={(date) => availableDates.includes(date.toISOString().split("T")[0])}
                placeholderText="Select a date"
                dateFormat="yyyy-MM-dd"
              />
            </>
          )}

          {selectedDate && formData.service && (
            <>
              <h4 className="select-date">Select Available Time</h4>
              <select name="time" onChange={handleInputChange} required>
                <option value="">Select a time</option>
                {availableTimes.length > 0 ? (
                  availableTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))
                ) : (
                  <option disabled>No available times</option>
                )}
              </select>
            </>
          )}

          <button type="button" onClick={handleBooking}>
            {formData.id ? "Update Booking" : "Book Your Appointment"}
          </button>
        </form>
      )}

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{booking.service}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.time}</td>
                  <td>
                    <button
                      onClick={() => editBooking(booking)}
                      className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments yet.</p>
        )}
      </div>
    </main>
  );
}

export default Booking;