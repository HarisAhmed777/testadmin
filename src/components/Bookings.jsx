import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { baseUrl } from "../baseUrl";
import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from "./header";
import Menu from "./Menu";

function Bookings() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        age: true,
        persons: true,
        email: true,
        city: true,
        mobile: true,
        startdate: true,
        enddate: true
    });

    useEffect(() => {
        fetch(`${baseUrl}/allbookings`)
            .then(res => res.json())
            .then(view => {
                setData(view);
            })
            .catch(error => {
                console.error("Error occurred", error);
            });
    }, []);

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData);
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
        }
        return null;
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(booking =>
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.age.toString().includes(searchTerm.toLowerCase()) ||
        booking.persons.toString().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.startdate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.enddate.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handledownload = () => {
        const headers = ["Name", "Age", "Persons", "Mail ID", "City", "Mobile Number", "Start Date", "End Date"];
        const bookingData = data.map(booking => [
            booking.name,
            booking.age,
            booking.persons,
            booking.email,
            booking.city,
            booking.mobile,
            new Date(booking.startdate).toLocaleDateString(),
            new Date(booking.enddate).toLocaleDateString()
        ]);
    
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.aoa_to_sheet([headers, ...bookingData]);
    
        xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
        const blob = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
        const fileBlob = new Blob([blob], { type: 'application/octet-stream' });
        saveAs(fileBlob, 'bookings.xlsx');
    };

    const handlePDFDownload = () => {
        const doc = new jsPDF();
        const tableColumn = Object.keys(visibleColumns).filter(key => visibleColumns[key]);
        const tableRows = [];

        data.forEach(booking => {
            const bookingData = tableColumn.map(column => {
                if (column === 'startdate' || column === 'enddate') {
                    return new Date(booking[column]).toLocaleDateString();
                }
                return booking[column];
            });
            tableRows.push(bookingData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows
        });

        doc.save('bookings.pdf');
    };

    const handlePrint = () => {
        const printContent = document.getElementById('printable-table').innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };

    const handleColumnVisibility = (column) => {
        setVisibleColumns(prevState => ({
            ...prevState,
            [column]: !prevState[column]
        }));
    };

    return (
      <>
      <Header/>
      <Menu/>
        <div className="container content-wrapper mt-4">
      
            <h1 className="text-center mb-4 ">Bookings</h1>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Bookings"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="table-responsive">
                <button onClick={handledownload} className="btn btn-primary mb-4">CSV</button>
                <button onClick={handlePDFDownload} className="btn btn-primary mb-4">PDF</button>
                <button onClick={handlePrint} className="btn btn-primary mb-4">Print</button>
                <table className="table bg-dark table-striped table-bordered" id="printable-table">
                    <thead className="thead-dark">
                        <tr>
                            {visibleColumns.name && <th onClick={() => sortData('name')}>Name <FontAwesomeIcon icon={getSortIcon('name')} /></th>}
                            {visibleColumns.age && <th onClick={() => sortData('age')}>Age <FontAwesomeIcon icon={getSortIcon('age')} /></th>}
                            {visibleColumns.persons && <th onClick={() => sortData('persons')}>Persons <FontAwesomeIcon icon={getSortIcon('persons')} /></th>}
                            {visibleColumns.email && <th onClick={() => sortData('email')}>Mail ID <FontAwesomeIcon icon={getSortIcon('email')} /></th>}
                            {visibleColumns.city && <th onClick={() => sortData('city')}>City <FontAwesomeIcon icon={getSortIcon('city')} /></th>}
                            {visibleColumns.mobile && <th onClick={() => sortData('mobile')}>Mobile Number <FontAwesomeIcon icon={getSortIcon('mobile')} /></th>}
                            {visibleColumns.startdate && <th onClick={() => sortData('startdate')}>Start Date <FontAwesomeIcon icon={getSortIcon('startdate')} /></th>}
                            {visibleColumns.enddate && <th onClick={() => sortData('enddate')}>End Date <FontAwesomeIcon icon={getSortIcon('enddate')} /></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((value, index) => (
                            <tr key={index}>
                                {visibleColumns.name && <td>{value.name}</td>}
                                {visibleColumns.age && <td>{value.age}</td>}
                                {visibleColumns.persons && <td>{value.persons}</td>}
                                {visibleColumns.email && <td>{value.email}</td>}
                                {visibleColumns.city && <td>{value.city}</td>}
                                {visibleColumns.mobile && <td>{value.mobile}</td>}
                                {visibleColumns.startdate && <td>{new Date(value.startdate).toLocaleDateString()}</td>}
                                {visibleColumns.enddate && <td>{new Date(value.enddate).toLocaleDateString()}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
                        }
export default Bookings;