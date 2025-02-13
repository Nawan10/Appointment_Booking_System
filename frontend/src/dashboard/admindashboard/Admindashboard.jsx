import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import './Admindashboard.css';

const localizer = momentLocalizer(moment);

function Admindashboard() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchAppointments();
  }, [currentDate]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/bookings");
      setAppointments(
        response.data.map((appointment) => {
          const startDateTime = moment(`${appointment.date} ${appointment.time}`, "YYYY-MM-DD HH:mm:ss").toDate();
          const endDateTime = moment(startDateTime).add(1, "hours").toDate();

          return {
            id: appointment.id,
            title: `${appointment.name} - ${appointment.service}`,
            name: appointment.name,
            phone: appointment.phone,
            service: appointment.service,
            date: appointment.date,
            time: appointment.time,
            start: startDateTime,
            end: endDateTime,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const currentMonthYear = moment(currentDate).format("MMMM YYYY");

  return (
    <main className="main-container-dashboard">
      <h1 className="font-bold text-lg mb-4">Appointment Calendar</h1>
      <span className="current-month-year">{currentMonthYear}</span>

      <div style={{ height: 600 }} className="mb-6">
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          selectable
          defaultView={Views.WEEK}
          onSelectEvent={(event) => setSelectedAppointment(event)}
          step={30}
          timeslots={2}
          min={new Date(0, 0, 0, 8, 0, 0)}
          max={new Date(0, 0, 0, 21, 0, 0)}
          style={{ height: 600 }}
          date={currentDate}
          onNavigate={handleDateChange}
          components={{
            event: ({ event }) => {
              return (
                <div className="rbc-event event-no-bg">
                  <div className="event-name">{event.name}</div>
                  <div className="event-service">{event.service}</div>
                </div>
              );
            }
          }}
        />
      </div>
    </main>
  );
}

export default Admindashboard;
