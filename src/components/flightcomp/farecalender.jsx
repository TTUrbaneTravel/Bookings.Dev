import React, { useState } from "react";

// Utility function to generate fare data
function generateFareData(startDate, numberOfDays) {
  console.log(startDate);
  const fareData = [];
  for (let i = 0; i < numberOfDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    fareData.push({
      DepDate: currentDate.toISOString().split("T")[0],
      TtlFre: Math.floor(Math.random() * (10000 - 3000) + 3000),
      IsCheapest: Math.random() > 0.9,
    });
  }
  return fareData;
}

// Utility function to generate fare data and set the default departure date
function generateFareDatas(setDepartDate, days) {
  const fares = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    fares.push({
      date: date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
      price: Math.floor(Math.random() * 500) + 100, // Example price
    });
  }

  // Optionally set the default departure date
  if (fares.length > 0) {
    setDepartDate(fares[0].date);
  }

  return fares;
}

// Utility function to render fare calendar
function renderFareCalendar(currentMonth, fareCalres, selectedDate, onSelectDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize time to compare only dates

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  const totalDays = endOfMonth.getDate();

  const calendarDays = [];

  // Add empty slots for the first week
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }

  // Add actual dates
  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    calendarDays.push(date.toISOString().split("T")[0]);
  }

  // Add empty slots to complete the last week
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  return calendarDays.map((date, index) => {
    if (!date) {
      return <div key={index} className="p-2 text-center border bg-gray-100"></div>;
    }

    const fare = fareCalres.find((fc) => fc.DepDate === date)?.TtlFre;
    const isPastDate = new Date(date) < today;

    return (
      <div
        key={index}
        className={`p-2 text-center border 
          ${selectedDate === date ? "bg-blue-200 text-black" : "bg-white"} 
          ${
            isPastDate
              ? "text-gray-400 cursor-not-allowed"
              : "cursor-pointer hover:bg-gray-100"
          }`}
        onClick={() => {
          if (!isPastDate) {
            onSelectDate(date); // ✅ Set selected date and close calendar
          }
        }}
      >
        <div className="text-xs">{new Date(date).getDate()}</div>
        <div className="text-xs text-green-600">
          {fare ? `₹${fare.toLocaleString()}` : "-"}
        </div>
      </div>
    );
  });
}

// Utility function to handle calendar navigation
function handleCalendarNavigation(currentMonth, setCurrentMonth, today) {
  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    const twelveMonthsFromToday = new Date(today);
    twelveMonthsFromToday.setMonth(today.getMonth() + 12);

    if (nextMonth <= twelveMonthsFromToday) {
      setCurrentMonth(nextMonth);
    }
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (prevMonth >= today) {
      setCurrentMonth(prevMonth);
    } else {
      setCurrentMonth(today);
    }
  };

  return { handleNextMonth, handlePrevMonth };
}

// Calendar component
function CalendarComponent({
  currentMonth,
  fareCalres,
  selectedDate,
  setSelectedDate,
  handlePrevMonth,
  handleNextMonth,
  position,
  calendarRef,
}) {
  const [calendarVisible, setCalendarVisible] = useState(false);
  return (
    <div
      ref={calendarRef}
      className="absolute bg-white p-4 rounded-lg shadow-lg z-10"
      style={{
        top: position.top,
        left: position.left,
        transform: "translateX(-25%)",
      }}
    >
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={handlePrevMonth}
        >
          &lt;
        </button>
        <h2 className="text-lg font-bold">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={handleNextMonth}
        >
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 border-t border-gray-300">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
          <div key={index} className="text-center text-xs font-bold p-4">
            {day}
          </div>
        ))}
        {renderFareCalendar &&
          renderFareCalendar(currentMonth, fareCalres, selectedDate, (date) => {
            setSelectedDate(date);
          })}
      </div>
    </div>
  );
}

// Utility function to render fare calendars
function renderFareCalendars(currentMonth, fareCalres, selectedDate, setSelectedDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today’s date

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  let days = [];

  // Fill empty slots before the first day
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-4"></div>);
  }

  // Generate days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isPast = date < today;

    days.push(
      <div
        key={day}
        className={`text-center p-4 border ${
          isPast
            ? "text-gray-400 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-200"
        } ${
          selectedDate && selectedDate.toDateString() === date.toDateString()
            ? "bg-blue-500 text-white"
            : ""
        }`}
        onClick={() => !isPast && setSelectedDate(date)} // Prevent selection of past dates
      >
        {day}
      </div>
    );
  }

  return days;
}

// Export all functions at once
export {
  generateFareData,
  generateFareDatas,
  renderFareCalendar,
  handleCalendarNavigation,
  CalendarComponent,
  renderFareCalendars,
};