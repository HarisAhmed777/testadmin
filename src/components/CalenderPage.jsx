import React, { useEffect, useState } from "react";
import {baseUrl} from '../baseUrl'
import {
  Day,
  Inject,
  Month,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week
} from '@syncfusion/ej2-react-schedule';
import Header from "./header";
import Menu from "./Menu";
import axios from 'axios';

function CalendarPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/allbookings`);
        const bookings = response.data.map(booking => ({
          Id: booking._id,
          Subject: `${booking.name} - ${booking.city}`,
          StartTime: new Date(booking.startdate),
          EndTime: new Date(booking.enddate)
        }));
        setData(bookings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <div className="content-wrapper d-flex justify-content-center mt-3">
        <ScheduleComponent
          width="800px"
          height="600px"
          eventSettings={{ dataSource: data }}>
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="Month" />
          </ViewsDirective>
          <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
      </div>
    </>
  );
}

export default CalendarPage;
