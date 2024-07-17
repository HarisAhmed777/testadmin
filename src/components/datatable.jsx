import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import "datatables.net-bs4";
import "datatables.net-responsive-bs4";
import "datatables.net-buttons-bs4";
import "jszip";
import "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons/js/buttons.colVis";
import Header from "./header";
import Menu from "./Menu";

function DataTable() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8888/allbookings")
      .then(response => {
        setBookings(response.data);
        initializeDataTable(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the bookings!", error);
      });

    const initializeDataTable = (data) => {
      const tableElement = $("#example1");
      
      // Check if DataTable is already initialized
      if ($.fn.DataTable.isDataTable(tableElement)) {
        tableElement.DataTable().clear().rows.add(data).draw();
      } else {
        const table = tableElement.DataTable({
          responsive: true,
          lengthChange: false,
          autoWidth: false,
          buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
          data: data,
          columns: [
            { data: 'name', title: 'Name' },
            { data: 'age', title: 'Age' },
            { data: 'mobile', title: 'Mobile Number' },
            { data: 'email', title: 'Email ID' },
            { data: 'persons', title: 'Persons' },
            { data: 'startdate', title: 'Start Date' },
            { data: 'enddate', title: 'End Date' }
          ]
        });

        table.buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
      }
    };
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>DataTables</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">DataTables</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">DataTable with default features</h3>
                  </div>
                  <div className="card-body">
                    <table id="example1" className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Age</th>
                          <th>Mobile Number</th>
                          <th>Email ID</th>
                          <th>Persons</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking, index) => (
                          <tr key={index}>
                            <td>{booking.name}</td>
                            <td>{booking.age}</td>
                            <td>{booking.mobile}</td>
                            <td>{booking.email}</td>
                            <td>{booking.persons}</td>
                            <td>{booking.startdate}</td>
                            <td>{booking.enddate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default DataTable;
