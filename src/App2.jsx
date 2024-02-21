import React, { useState, useEffect } from 'react';
import '../src/loader.css';
import axios from "axios";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayDate, setTodayDate] = useState(new Date());
  const empId = "15";

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getTodayDateString = (date) => {
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })}`;
  };

  const todayDateString = getTodayDateString(todayDate);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const formatDate = `${currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
    }`;

  const getMonthDays = () => {
    const daysInMonth = getLastDayOfMonth(year, month);
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const monthDays = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      monthDays.push("");
    }

    for (let i = 1; i <= daysInMonth; i++) {
      monthDays.push(i);
    }

    return monthDays;
  };

  const renderCalendarGrid = () => {
    const monthDays = getMonthDays();

    const rows = [];
    while (monthDays.length > 0) {
      rows.push(monthDays.splice(0, 7));
    }

    return rows.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((day, index) => (

          <td
            key={index}
            className={`dates ${day === currentDate.getDate() ? "today" : ""} ${rowIndex % 2 === 0 ? "oddRow" : "evenRow"
              }`}
          >
            {day !== "" && day}
          </td>

        ))}
      </tr>
    ));
  };


  const markAttendance = async (value) => {
    const res = await axios.post("http://localhost:3000/attendance", {
      empId: empId,
      flag: value,
    });
    console.log(res);
  };

  const handleClick = async (value) => {
    console.log(value);
    if (value === "checkIn") {
      const currentDateCell = document.querySelector(
        `.dates.today`
      );
      if (currentDateCell) {
        currentDateCell.style.backgroundColor = "rgb(60, 255, 60)";
        currentDateCell.style.border = "2px solid black";
      }
    }
    markAttendance(value);
  };

  const handlePrevMonth = () => {
    const currentDateCell = document.querySelector(
      `.dates.today`
    );
    if (currentDateCell) {
      currentDateCell.style.backgroundColor = "";
      currentDateCell.style.border = "";
    }

    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {

    const currentDateCell = document.querySelector(
      `.dates.today`
    );
    if (currentDateCell) {
      currentDateCell.style.backgroundColor = "";
      currentDateCell.style.border = "";
    }

    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  useEffect(() => {
    setTodayDate(new Date());
  }, [currentDate]);

  return (
    <div className="outerContainer">
      <div className="calendarContainer">
        <h1 className="attendanceHeader">Leave & Attendance</h1>
        <div className="attendanceInstructionContainer">
          <span className="attendanceInstruction">
            <h2 className="attendanceInst1">
              Mark attendance for today ({todayDateString})
            </h2>
            <p className="attendanceInst2">
              You can mark your attendance for today. For any other day, please
              use the edit option below.
            </p>
          </span>
          <button className="checkInBtn" onClick={() => { handleClick("checkIn") }}>
            CHECK IN
          </button>
          <button className="checkOutBtn" onClick={() => { handleClick("checkOut") }}>
            CHECK OUT
          </button>
        </div>

        <div className="calendarTable">
          <div className="calendarNavigation">
            <span className="prev" onClick={handlePrevMonth}>
              PREV{" "}
            </span>
            <span className="today">TODAY </span>
            <span className="next" onClick={handleNextMonth}>
              NEXT{" "}
            </span>
          </div>
          <p className="calendarCurrentDate">{formatDate}</p>
          <table className="calendarBody">
            <thead className="calendarWeekdays">
              <tr>
                {daysOfWeek.map((day) => (
                  <th className="weekdays" key={day}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{renderCalendarGrid()}</tbody>
          </table>
        </div>
      </div>
    </div >
  );
};

export default Calendar;