import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  generateFareData,
  handleCalendarNavigation,
  renderFareCalendar,
} from "./farecalender";

const gradients = [
    "linear-gradient(55deg,rgb(234, 169, 244),rgb(251, 146, 60))",
    "linear-gradient(55deg,rgb(251, 113, 133),rgb(251, 146, 60))",
    "linear-gradient(55deg,rgb(248, 113, 113),rgb(251, 146, 60))",
    "linear-gradient(55deg,rgba(255, 205, 4, 0.97),rgb(96, 165, 250))",
    "linear-gradient(55deg,rgb(192, 132, 252),rgb(251, 146, 60))",
  ];

const FlightSearch = () => {
  const [gradient, setGradient] = useState("");
  const [tripType, setTripType] = useState("One Way");
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, infants: 0 });
  const [travelClass, setTravelClass] = useState("Economy/Premium Economy");
  const [showDropdown, setShowDropdown] = useState(false);
  const [multiCityFields, setMultiCityFields] = useState([{ from: "", to: "", departDate: "", departTime: "" }]);
  const [airlinePreference, setAirlinePreference] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedReturnDate, setSelectedReturnDate] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarReturnVisible, setCalendarReturnVisible] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const inputRef = useRef(null);
  const inputReturnRef = useRef(null);
  const calendarReturnRef = useRef(null);
  const fareCalres = generateFareData(today, 364);

  useEffect(() => {
    const changeBackground = () => {
      const index = new Date().getMinutes() % gradients.length;
      setGradient(gradients[index]);
    };

    changeBackground();
    const interval = setInterval(changeBackground, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleTravellersChange = (type, value) => {
    setTravellers((prev) => ({ ...prev, [type]: value }));
  };

  const toggleDropdown = (event) => {
    event.preventDefault();
    setShowDropdown((prev) => !prev);
  };

  const handleNavigation = (e) => {
    e.preventDefault();
    const formData = {
      tripType,
      from: document.getElementById("from").value,
      to: document.getElementById("to").value,
      departDate: document.getElementById("depart-date").value,
      departTime: document.getElementById("depart-time").value,
      returnDate: document.getElementById("return-date").value,
      returnTime: document.getElementById("return-time").value,
      airlinePreference: document.querySelector("select").value,
      travellers,
      travelClass,
      checkboxes: getCheckboxValues(),
    };

    sessionStorage.setItem("formData", JSON.stringify(formData));
    navigate("/flightsfilteration", { state: formData });
  };

  const getCheckboxValues = () => {
    return [
      "Direct Flight Only",
      "Refundable Only",
      "International Return Oneway",
    ].reduce((acc, option) => {
      acc[option] = document.getElementById(`checkbox-${option}`).checked;
      return acc;
    }, {});
  };

  const addMultiCityField = () => {
    setMultiCityFields((prev) => [...prev, { from: "", to: "", departDate: "", departTime: "" }]);
  };

  const deleteMultiCityField = (index) => {
    setMultiCityFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMultiCityChange = (index, field, value) => {
    setMultiCityFields((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedReturnDate(date);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target) && inputRef.current && !inputRef.current.contains(event.target)) {
      setCalendarVisible(false);
    }
    if (calendarReturnRef.current && !calendarReturnRef.current.contains(event.target) && inputReturnRef.current && !inputReturnRef.current.contains(event.target)) {
      setCalendarReturnVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const { handleNextMonth, handlePrevMonth } = handleCalendarNavigation(currentMonth, setCurrentMonth, today);

  return (
    <div className="flex items-center justify-center relative paragraphFonts" style={{ background: gradient, transition: "background 10s ease-in-out" }}>
      <div className="relative z-10">
        <div className="px-16 py-8 w-full">
          <div className="flex mb-4 space-x-4">
            {["One Way", "Round Trip", "Multicity"].map((type) => (
              <button
                key={type}
                className={`cursor-pointer py-1 px-4 rounded-lg text-center font-semibold block mb-1 transition-all duration-200 ${tripType === type ? "bg-[rgba(0,0,0,0.1)] text-white" : "text-black hover:bg-[rgba(0,0,0,0.05)]"}`}
                onClick={() => setTripType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {(tripType === "One Way" || tripType === "Round Trip") && (
            <form onSubmit={handleNavigation}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {["from", "to", "depart-date", "depart-time", "return-date", "return-time"].map((field, index) => (
                  <div key={field}>
                    <label htmlFor={field} className="block mb-1 text-sm text-black">{field.replace("-", " ").replace(/\b\w/g, char => char.toUpperCase())}</label>
                    <input
                      id={field}
                      type={field.includes("date") ? "date" : field.includes("time") ? "time" : "text"}
                      placeholder={field.includes("from") ? "Enter departure city" : field.includes("to") ? "Enter destination city" : ""}
                      className="p-2 border border-customPurple rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none w-full"
                      readOnly={field.includes("date") && (tripType === "Round Trip" && field === "return-date")}
                      ref={field === "depart-date" ? inputRef : field === "return-date" ? inputReturnRef : null}
                      onClick={field === "depart-date" ? () => setCalendarVisible(true) : field === "return-date" ? () => setCalendarReturnVisible(true) : null}
                    />
                  </div>
                ))}
                <div>
                  <label className="block mb-1 text-sm text-black">Airline Preference</label>
                  <select className="p-2 border border-customPurple rounded shadow-sm text-gray-500 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none w-full">
                    <option value="" disabled>-- Select --</option>
                    <option value="Any">Any</option>
                    <option value="Lufthansa">Lufthansa</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block mb-1 text-sm text-black">Travellers & Class</label>
                  <button onClick={toggleDropdown} type="button" className="p-2 border text-sm border-customPurple rounded text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:outline-none w-full text-left transition">
                    {`${travellers.adults} Adults, ${travellers.children} Children, ${travellers.infants} Infants`} - {travelClass}
                  </button>
                  {showDropdown && (
                    <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg p-4 w-full">
                      <div className="mb-4">
                        <label className="block mb-1 text-sm text-black">Travellers</label>
                        < div className="grid grid-cols-3 gap-4">
                          {["adults", "children", "infants"].map((type) => (
                            <div key={type}>
                              <label className="block mb-1 text-sm text-black">{type.charAt(0).toUpperCase() + type.slice(1)} ({type === "infants" ? "below 2y" : type === "children" ? "2y-12y" : "12y+"})</label>
                              <input
                                type="number"
                                min="0"
                                value={travellers[type]}
                                onChange={(e) => handleTravellersChange(type, parseInt(e.target.value) || 0)}
                                className="p-2 border border-gray-300 rounded w-full"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block mb-1 text-sm text-black">Travel Class</label>
                        <select value={travelClass} onChange={(e) => setTravelClass(e.target.value)} className="p-2 border border-gray-300 rounded w-full">
                          <option value="Economy/Premium Economy">Economy/Premium Economy</option>
                          <option value="Business">Business</option>
                          <option value="First Class">First Class</option>
                        </select>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button onClick={toggleDropdown} className="bg-customPurple text-white px-4 py-2 rounded-md">Apply</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-4 flex flex-wrap gap-4">
                  {["Direct Flight Only", "Refundable Only", "International Return Oneway"].map((option) => (
                    <div key={option} className="flex items-center text-xs">
                      <input type="checkbox" className="form-check-input mr-2" id={`checkbox-${option}`} />
                      <label className="text-black text-sm" htmlFor={`checkbox-${option}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button type="submit" className="bg-gradient-to-r from-blue-300 to-blue-400 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 text-white px-6 py-2 rounded-lg transition duration-300 paragraphFonts">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF" className="inline-block">
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                  Search Flights
                </button>
              </div>
            </form>
          )}
          {tripType === "Multicity" && (
            <form onSubmit={handleNavigation}>
              {multiCityFields.map((field, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full">
                  <div>
                    <label htmlFor={`from-${index}`} className="block mb-1 text-sm text-black">From</label>
                    <input
                      id={`from-${index}`}
                      type="text"
                      placeholder="Enter departure city"
                      className="p-2 border border-customPurple rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none w-full"
                      value={field.from}
                      onChange={(e) => handleMultiCityChange(index, "from", e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`to-${index}`} className="block mb-1 text-sm text-black">To</label>
                    <input
                      id={`to-${index}`}
                      type="text"
                      placeholder="Enter destination city"
                      className="p-2 border border-customPurple rounded shadow-sm focus .border-blue-500 focus:ring-blue-500 focus:outline-none w-full"
                      value={field.to}
                      onChange={(e) => handleMultiCityChange(index, "to", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm text-black">Depart Date</label>
                    <input
                      id={`departureDate-${index}`}
                      type="text"
                      value={field.departDate}
                      onClick={() => setIsCalendarOpen(index)}
                      readOnly
                      className="p-2 border border-customPurple text-gray-500 text-sm rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor={`depart-time-${index}`} className="block mb-1 text-sm text-black">Departure Time</label>
                    <input
                      id={`depart-time-${index}`}
                      type="time"
                      value={field.departTime}
                      onChange={(e) => handleMultiCityChange(index, "departTime", e.target.value)}
                      className="p-2 border border-customPurple text-gray-500 text-sm rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none w-full"
                    />
                  </div>
                  {index >= 2 && (
                    <div className="col-span-full flex justify-end">
                      <button
                        type="button"
                        onClick={() => deleteMultiCityField(index)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex justify-center col-span-12 my-2">
                <button
                  type="button"
                  onClick={addMultiCityField}
                  className="text-black hover:underline"
                >
                  + Add Another City
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 col-span-12 gap-6 my-2">
                <div>
                  <label className="block mb-1 text-sm text-black">Airline Preference</label>
                  <select
                    value={airlinePreference}
                    onChange={(e) => setAirlinePreference(e.target.value)}
                    className="p-2 border border-customPurple text-gray-500 text-sm rounded shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none w-full"
                  >
                    <option value="" disabled>-- Select --</option>
                    <option value="Any">Any</option>
                    <option value="Lufthansa">Lufthansa</option>
                  </select>
                </div>
                <div className="relative">
                  <label className="block mb-1 text-sm text-black">Travellers & Class</label>
                  <button
                    onClick={toggleDropdown}
                    className="p-2 border paragraphFonts text-gray-800 text-sm border-customPurple rounded w-full text-left focus:outline-none transition"
                  >
                    {`${travellers.adults} Adults, ${travellers.children} Children, ${travellers.infants} Infants`} - {travelClass}
                  </button>
                  {showDropdown && (
                    <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg p-4 w-full">
                      <div className="mb-4">
                        <label className="block mb-1 text-sm text-black">Travellers</label>
                        <div className="grid grid-cols-3 gap-4">
                          {["adults", "children", "infants"].map((type) => (
                            <div key={type}>
                              <label className="block mb-1 text-sm text-black">{type.charAt(0).toUpperCase() + type.slice(1)} ({type === "infants" ? "below 2y" : type === "children" ? "2y-12y" : "12y+"})</label>
                              <input
                                type="number"
                                min="0"
                                value={travellers[type]}
                                onChange={(e) => handleTravellersChange(type, parseInt(e.target.value) || 0)}
                                className="p-2 border border-gray-300 rounded w-full"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block mb-1 text-sm text-black">Travel Class</label>
                        <select
                          value={travelClass}
                          onChange={(e) => setTravelClass(e.target.value)}
                          className="p-2 border border-gray-300 rounded w-full"
                        >
                          <option value="Economy/Premium Economy">Economy/Premium Economy</option>
                          <option value="Business">Business</option>
                          <option value=" First Class">First Class</option>
                        </select>
                      </div>
                      <div className="flex justify-end mt-4">
                        <button onClick={toggleDropdown} className="bg-customPurple text-white px-4 py-2 rounded-md">Apply</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-6 col-span-12 gap-6 my-2">
                {["Direct Flight Only", "Refundable Only", "International Return Oneway"].map((option) => (
                  <div key={option} className="flex items-center text-xs">
                    <input type="checkbox" className="form-check-input mr-2" id={`checkbox-${option}`} />
                    <label className="text-black text-sm" htmlFor={`checkbox-${option}`}>{option.replace(/([A-Z])/g, " $1")}</label>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button type="submit" className="flex items-center bg-gradient-to-r from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white px-6 py-2 rounded-lg transition duration-300 paragraphFonts">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 -960 960 960" fill="currentColor" className="mr-2" aria-hidden="true">
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                  Search Flights
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {calendarVisible && (
        <div ref={calendarRef} className="absolute bg-white p-4 rounded-lg shadow-lg z-10" style={{ top: "40%", left: "50%", transform: "translateX(-25%)" }}>
          <div className="flex justify-between items-center mb-4">
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={handlePrevMonth}>&lt;</button>
            <h2 className="text-lg font-bold">{currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={handleNextMonth}>&gt;</button>
          </div>
          <div className="grid grid-cols-7 border-t border-gray-300">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
              <div key={index} className="text-center text-xs font-bold p-4">{day}</div>
            ))}
            {renderFareCalendar(currentMonth, fareCalres, selectedDate, (date) => {
              setSelectedDate(date);
              handleDateChange(date);
              setCalendarVisible(false);
            })}
          </div>
        </div>
      )}

      {calendarReturnVisible && (
        <div ref={calendarReturnRef} className="absolute bg-white p-4 rounded-lg shadow-lg z-10" style={{ top: "60%", left: "10%", transform: "translateX(-25%)" }}>
          <div className="flex justify-between items-center mb-4">
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={handlePrevMonth}>&lt;</button>
            <h2 className="text-lg font-bold">{currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={handleNextMonth}>&gt;</button>
          </div>
          <div className="grid grid-cols-7 border-t border-gray-300 ">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
              <div key={index} className="text-center text-xs font-bold p-4">{day}</div>
            ))}
            {renderFareCalendar(currentMonth, fareCalres, selectedReturnDate, (date) => {
              setSelectedReturnDate(date);
              setCalendarReturnVisible(false);
            })}
          </div>
        </div>
      )}

      {isCalendarOpen !== false && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <div className="flex justify-between items-center mb-4">
              <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={handlePrevMonth}>&lt;</button>
              <h2 className="text-lg font-bold">{currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</h2>
              <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300" onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="grid grid-cols-7 border-t border-gray-300">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
                <div key={index} className="text-center text-xs font-bold p-4">{day}</div>
              ))}
              {renderFareCalendar(currentMonth, fareCalres, selectedDate, (date) => {
                handleDateSelection(date, isCalendarOpen);
                setIsCalendarOpen(false);
              })}
            </div>
            <button onClick={() => setIsCalendarOpen(false)} className="absolute m-2 bottom-2 right-2 text-red-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;