import React from "react";
import CalendarComponent from "./Calender";
import Displaycards from "./Displaycards";
import Charts from "./Charts";
import DoughnutChart from "./DognutChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

function Home(){
    return(
        <>
        <div className="content-wrapper overflow-hidden">

        <div className="mt-5 me-2 ms-2">
        <Displaycards/>
        <Charts/>
        <DoughnutChart/>
      
        {/* <PieChart/> */}
        <LineChart/>
        </div>
        </div>

     </>
    )
}

export default Home;