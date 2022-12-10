import React, { ReactFragment, ReactNode, useEffect, useState } from 'react';

import Callendar from './callendar/Callendar';

import './App.css';

function App() {
  let date = new Date();

  const monthNames:string[] = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

interface DaysStateData {
  dateValue:number 
  dayNum:number
}
const [dayInfo, setDays] = useState<DaysStateData[] | []>([])
// const [month, setMonth] = useState<number>(0);
// const [year, setYear] = useState<number>(0);

// useEffect(() => {
//   setMonth(date.getMonth())
//   setYear(date.getFullYear())
// }, [month,year])

  return (
    <div className="App">
          <Callendar />
    </div>
  );
}

export default App;
