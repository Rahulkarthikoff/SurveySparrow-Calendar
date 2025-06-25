import React from "react";
import "./MonthNavigator.css";

export default function MonthNavigator({ month, setMonth }) {
  const nextMonth = () => setMonth(month.add(1, "month"));
  const prevMonth = () => setMonth(month.subtract(1, "month"));
  const nextYear = () => setMonth(month.add(1, "year"));
  const prevYear = () => setMonth(month.subtract(1, "year"));

  return (
    <div className="navigator">
      <button onClick={prevYear} className="nav-button">« Year</button>
      <button onClick={prevMonth} className="nav-button">‹ Month</button>
      <h2 className="nav-title">{month.format("MMMM YYYY")}</h2>
      <button onClick={nextMonth} className="nav-button">Month ›</button>
      <button onClick={nextYear} className="nav-button">Year »</button>
    </div>
  );
}