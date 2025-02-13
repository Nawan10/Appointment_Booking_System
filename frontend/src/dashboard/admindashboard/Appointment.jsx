import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import "./Appointment.css";

const localizer = momentLocalizer(moment);

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [services, setServices] = useState([
    "HairCut and Styling",
    "Hair Coloring",
    "Hair Chemical Treatment",
    "Hair Extensions Treatment",
  ]);
  const [doneAppointments, setDoneAppointments] = useState(new Set()); // Track "Done" appointments

  // Fetch all bookings from the database
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/bookings");
      setAppointments(
        response.data.map((appointment) => ({
          id: appointment.id,
          title: `${appointment.service} - ${appointment.name}`,
          name: appointment.name,
          phone: appointment.phone,
          service: appointment.service,
          // Fix date formatting to show correct date
          date: moment(appointment.date).format("YYYY-MM-DD"), // Correct date format
          time: moment(appointment.time, "HH:mm").format("hh:mm A"), // Fix time format
          start: moment(`${appointment.date} ${appointment.time}`).toDate(),
          end: moment(`${appointment.date} ${appointment.time}`).toDate(),
        }))
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  

  // Add a new appointment
  const addAppointment = async () => {
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/booking", formData);
      fetchAppointments();
      setShowForm(false);
      alert("Appointment added!");
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  // Edit an appointment
  const editAppointment = async (appointment) => {
    const newService = prompt("Enter new Service Name:", appointment.service);
    const newDate = prompt("Enter new Date (YYYY-MM-DD):", appointment.date);
    const newTime = prompt("Enter new Time (HH:MM):", appointment.time);

    if (newService && newDate && newTime) {
      try {
        await axios.put(`http://localhost:8081/booking/${appointment.id}`, {
          service: newService,
          date: newDate,
          time: newTime,
        });
        fetchAppointments();
        alert("Appointment updated!");
      } catch (error) {
        console.error("Error updating appointment:", error);
      }
    }
  };

  // Delete an appointment
  const deleteAppointment = async (appointment) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(`http://localhost:8081/booking/${appointment.id}`);
        fetchAppointments();
        alert("Appointment deleted!");
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  // Mark appointment as "Done" (disable or change color)
  const markDone = (appointmentId) => {
    setDoneAppointments((prev) => {
      const updated = new Set(prev);
      if (updated.has(appointmentId)) {
        updated.delete(appointmentId); // Unmark "Done"
      } else {
        updated.add(appointmentId); // Mark as "Done"
      }
      return updated;
    });
  };

  return (
    <main className="main-container">
      <h1 className="font-bold text-xl mb-4">Appointment Booking</h1>

      {/* CRUD Buttons */}
      <div className="mb-4">
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-green-500 rounded mr-2">
          {showForm ? "Close Form" : "Add Appointment"}
        </button>
      </div>

      {/* Booking Form */}
      {showForm && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">New Appointment</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="button"
              onClick={addAppointment}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Book Appointment
            </button>
          </form>
        </div>
      )}

      {/* Booking Table */}
      <h4 className="font-bold text-lg mb-2">All Appointments</h4>
      <table className="w-full border-collapse border border-gray-400 mb-4">
        <thead className="table-th">
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Phone</th>
            <th className="border border-gray-400 px-4 py-2">Service</th>
            <th className="border border-gray-400 px-4 py-2">Date</th>
            <th className="border border-gray-400 px-4 py-2">Time</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="border border-gray-400 px-4 py-2">{appointment.name}</td>
              <td className="border border-gray-400 px-4 py-2">{appointment.phone}</td>
              <td className="border border-gray-400 px-4 py-2">{appointment.service}</td>
              <td className="border border-gray-400 px-4 py-2">{appointment.date}</td>
              <td className="border border-gray-400 px-4 py-2">{appointment.time}</td>
              <td className="border border-gray-400 px-4 py-2">
                {/* Edit Button */}
                <button
                  onClick={() => editAppointment(appointment)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => deleteAppointment(appointment)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Appointment;
