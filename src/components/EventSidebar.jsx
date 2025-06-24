import React, { useState } from "react";
import "./EventSidebar.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

export default function EventSidebar({ visible, close, date, addEvent, events, updateEvent }) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, 'hour'));
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Delete event handler
  const handleDelete = (idx) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const updatedEvents = events.filter((_, i) => i !== idx);
      if (typeof updateEvent === "function") {
        updateEvent("delete", updatedEvents);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !startTime || !endTime || !date) return;
    const eventData = {
      title,
      time: `${startTime.format("hh:mm A")} - ${endTime.format("hh:mm A")}`,
      duration: `${endTime.diff(startTime, 'minute')} mins`,
      date: date.format("YYYY-MM-DD")
    };
    if (editIndex !== null) {
      updateEvent(editIndex, eventData);
    } else {
      addEvent(eventData);
    }
    setTitle("");
    setStartTime(dayjs());
    setEndTime(dayjs().add(1, 'hour'));
    setShowForm(false);
    setEditIndex(null);
  };

  const handleEdit = (idx) => {
    const event = events[idx];
    setTitle(event.title);
    // Parse start and end time from event.time string
    const [start, end] = event.time.split(" - ");
    setStartTime(dayjs(date.format("YYYY-MM-DD") + " " + start));
    setEndTime(dayjs(date.format("YYYY-MM-DD") + " " + end));
    setShowForm(true);
    setEditIndex(idx);
  };

  return (
    <div className={`sidebar ${visible ? "show" : ""}`}>
      <button className="close-button" onClick={close}>×</button>
      <h2 className="sidebar-title">
        {date ? `Events for ${date.format("DD MMM YYYY")}` : "No date selected"}
      </h2>

      <ul className="event-list">
        {events.length === 0 && <li>No events for this date.</li>}
        {events.map((e, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <strong>{e.title}</strong> <br />
              {e.time} ({e.duration})
            </div>
            <div>
              <IconButton
                size="small"
                color="primary"
                onClick={() => handleEdit(i)}
                aria-label="edit"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(i)}
                aria-label="delete"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>

      {!showForm && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => {
            setShowForm(true);
            setEditIndex(null);
            setTitle("");
            setStartTime(dayjs());
            setEndTime(dayjs().add(1, 'hour'));
          }}
          sx={{ marginTop: 2 }}
        >
          + Add Event
        </Button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="event-form">
          <TextField
            label="Event Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ marginBottom: 2 }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticTimePicker
              label="Start Time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
            />
            <StaticTimePicker
              label="End Time"
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
            />
          </LocalizationProvider>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            {editIndex !== null ? "Update Event" : "Save Event"}
          </Button>
          <Button
            variant="text"
            color="secondary"
            fullWidth
            onClick={() => {
              setShowForm(false);
              setEditIndex(null);
              setTitle("");
              setStartTime(dayjs());
              setEndTime(dayjs().add(1, 'hour'));
            }}
            sx={{ marginTop: 1 }}
          >
            Cancel
          </Button>
        </form>
      )}
    </div>
  );
}