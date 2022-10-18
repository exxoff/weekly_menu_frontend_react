import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { TodayMenu } from "./components/TodayMenu";
import { Search } from "./components/Search";

function App() {
  // const [isLoading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <div className="App">
        <Header />

        {/* <div className="bg-gray-100 max-h-screen"> */}
        {/* <div className="p-5 flex flex-col justify-center sm:flex-row"> */}
        {/* TODO: Calendar grows on y axis when today's menu has many items */}
        {/* <Calendar
              className="text-xs m-2 shadow-lg"
              showWeekNumbers
              onChange={setSelectedDate}
              value={selectedDate}
            />
            <TodayMenu date={selectedDate} /> */}
        <Search />
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default App;
