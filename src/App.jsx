import React, { useState } from "react";
import Calendar from "./components/Calendar";
import MonthNavigator from "./components/MonthNavigator";
import EventSidebar from "./components/EventSidebar";
import dayjs from "dayjs";
import "./App.css";

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [events, setEvents] = useState([
    // Static events for demonstration
    {
      title: "Team Meeting",
      time: "10:00 AM - 11:00 AM",
      duration: "60 mins",
      date: dayjs().date(5).format("YYYY-MM-DD"),
    },
    {
      title: "Doctor Appointment",
      time: "03:00 PM - 03:30 PM",
      duration: "30 mins",
      date: dayjs().date(12).format("YYYY-MM-DD"),
    },
    {
      title: "Project Deadline",
      time: "11:59 PM - 11:59 PM",
      duration: "0 mins",
      date: dayjs().date(20).format("YYYY-MM-DD"),
    },
    {
      title: "Lunch with Customers",
      time: "01:00 PM - 02:00 PM",
      duration: "60 mins",
      date: dayjs().date(22).format("YYYY-MM-DD"),
      completed: true,
    },
    {
      title: "Yoga Class",
      time: "07:00 AM - 08:00 AM",
      duration: "60 mins",
      date: dayjs().date(28).format("YYYY-MM-DD"),
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const deleteEvent = (idx) => {
    setEvents(events =>
      events.filter((e, i) => !(e.date === selectedDate.format("YYYY-MM-DD") && i === idx))
    );
  };

  const openSidebar = (date) => {
    setSelectedDate(date);
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
    setSelectedDate(null);
  };

  const updateEvent = (idx, updatedEvent) => {
    setEvents(events =>
      events.map((e, i) =>
        i === events.findIndex(ev => ev.date === selectedDate.format("YYYY-MM-DD")) + idx
          ? { ...e, ...updatedEvent }
          : e
      )
    );
  };

  const filteredEvents = selectedDate
    ? events.filter(e => e.date === selectedDate.format("YYYY-MM-DD"))
    : [];

  return (
    <div className={`app-container ${sidebarVisible ? "shrink" : ""}`}>
      <div className="main-layout">
        <div className="calendar-wrapper">
          <h1 className="calendar-title"> Sparrow's Smart Calendar</h1>
          <MonthNavigator month={currentMonth} setMonth={setCurrentMonth} />
          <Calendar
            events={events}
            month={currentMonth}
            onDateClick={openSidebar}
          />
        </div>
        <EventSidebar
          visible={sidebarVisible}
          close={closeSidebar}
          date={selectedDate}
          addEvent={addEvent}
          events={filteredEvents}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
        />
      </div>
    </div>
  );
}