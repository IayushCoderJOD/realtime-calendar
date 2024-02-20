import React, { useState, useEffect } from "react";
// import axios from "axios";
import "../src/loader.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todayDate, setTodayDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const empId = 12;

  const getTodayDateString = (date) => {
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })}`;
  };

  const todayDateString = getTodayDateString(todayDate);

  const getMonthDays = () => {
    const daysInMonth = getLastDayOfMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const firstDayOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
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
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    const rows = [];
    while (monthDays.length > 0) {
      rows.push(monthDays.splice(0, 7));
    }

    return rows.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {row.map((day, index) => {
          const isCurrentMonth = day !== "";
          const isCurrentDate = isCurrentMonth && day === todayDate.getDate();
          const isSelectedDate =
            isCurrentMonth && day === selectedDate.getDate();

          // Update the class dynamically based on whether it's the previous or next month
          const isPrevMonth =
            currentDate.getMonth() === 0 && row[6] !== "" && index < 7;
          const isNextMonth =
            currentDate.getMonth() === 11 && row[0] !== "" && index >= 7;

          const cellClasses = `dates ${
            isCurrentDate && rowIndex % 2 === 0
              ? "currentMonthToday"
              : isCurrentDate
              ? "currentMonthToday"
              : rowIndex % 2 === 0
              ? isPrevMonth
                ? "lightgreen prevMonthRow"
                : "lightgreen"
              : isNextMonth
              ? "lightblue nextMonthRow"
              : "lightblue"
          } ${
            isCurrentDate && (isPrevMonth || isNextMonth) ? "noBorder" : ""
          } ${isCurrentDate ? "currentDate" : ""} ${
            isCurrentMonth ? "" : "otherMonth"
          }`;

          return (
            <td
              key={index}
              className={cellClasses}
              onClick={() => isCurrentMonth && handleDateClick(day)}
            >
              {day !== "" && day}
            </td>
          );
        })}
      </tr>
    ));
  };

  // const renderCalendarGrid = () => {
  //   const monthDays = getMonthDays();

  //   const rows = [];
  //   while (monthDays.length > 0) {
  //     rows.push(monthDays.splice(0, 7));
  //   }

  //   return rows.map((row, rowIndex) => (
  //     <tr key={rowIndex}>
  //       {row.map((day, index) => {
  //         const isCurrentMonth = day !== "";
  //         const isCurrentDate = isCurrentMonth && day === todayDate.getDate();
  //         const isSelectedDate =
  //           isCurrentMonth && day === selectedDate.getDate();
  //         // Create a new class name dynamically to apply borders conditionally
  //         const cellClasses = `dates ${
  //           isCurrentDate && rowIndex % 2 === 0
  //             ? "currentMonthToday"
  //             : isCurrentDate
  //             ? "currentMonthToday"
  //             : rowIndex % 2 === 0
  //             ? "lightgreen"
  //             : "lightblue"
  //         } ${isCurrentDate ? "currentDate" : ""} ${
  //           isCurrentMonth ? "" : "otherMonth"
  //         }`;

  //         return (
  //           <td
  //             key={index}
  //             className={cellClasses}
  //             onClick={() => isCurrentMonth && handleDateClick(day)}
  //           >
  //             {day !== "" && day}
  //           </td>
  //         );
  //       })}
  //     </tr>
  //   ));
  // };

  const handleDateClick = (day) => {
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  useEffect(() => {
    setTodayDate(new Date()); // Update the today's date whenever currentDate changes
    setSelectedDate(currentDate); // Reset the selectedDate when the currentDate changes
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
          <button className="checkInBtn">Check In</button>
          <button className="checkOutBtn">Check Out</button>
        </div>

        <div className="calendarTable">
          <div className="calendarNavigation">
            <span
              style={{ cursor: "pointer" }}
              className="prev"
              onClick={handlePrevMonth}
            >
              PREV{" "}
            </span>
            <span className="today">TODAY </span>
            <span
              style={{ cursor: "pointer" }}
              className="next"
              onClick={handleNextMonth}
            >
              NEXT{" "}
            </span>
          </div>
          <p className="calendarCurrentDate">
            {`${currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}`}
          </p>
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
    </div>
  );
};

export default Calendar;
