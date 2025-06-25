import React from "react";
import dayjs from "dayjs";
import "./Calendar.css";

export default function Calendar({ month, events, onDateClick }) {
  const startOfMonth = month.startOf("month");
  const endOfMonth = month.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const days = [];
  let day = startDate;

  while (day.isBefore(endDate, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  return (
    <div className="calendar-grid">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
        <div key={d} className="calendar-header">{d}</div>
      ))}
      {days.map((d, idx) => {
  const isCurrentMonth = d.month() === month.month();
  const dayEvents = events.filter(e => e.date === d.format("YYYY-MM-DD"));
  const hasEvent = dayEvents.length > 0;
  const isToday = d.isSame(dayjs(), "day");
  const maxVisible = 2;
  return (
    <div
      key={idx}
      className={
        `calendar-cell` +
        (isCurrentMonth ? "" : " calendar-cell--disabled") +
        (hasEvent ? " calendar-cell--event" : "") +
        (isToday ? " calendar-cell--today" : "")
      }
      onClick={() => isCurrentMonth && onDateClick(d)}
    >
      <span className="calendar-date">{d.date()}</span>
          {hasEvent && (
            <div className="calendar-events">
              {dayEvents.slice(0, maxVisible).map((e, i) => (
                <div
                  key={i}
                  className={
                    "calendar-event-title" +
                    (e.completed ? " calendar-event-title--completed" : "")
                  }
                >
                  {e.title}
                </div>
              ))}
              {dayEvents.length > maxVisible && (
                <div className="calendar-event-more">
                  +{dayEvents.length - maxVisible} more
                </div>
              )}
            </div>
          )}
        </div>
      );
    })}
    </div>
  );
}