import React, { useState, useEffect,useRef } from "react";
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
import {useReactToPrint} from 'react-to-print'

function Allusers() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [visibleColumns, setVisibleColumns] = useState({
        firstname: true,
        lastname: true,
        mobilenumber: true,
        email: true
    });
    const printing = useRef();

    useEffect(() => {
        fetch(`${baseUrl}/allusers`)
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

    const filteredData = data.filter(user =>
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobilenumber.toString().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handledownload = () => {
        const headers = ["First Name", "Last Name", "Mobile Number", "Mail ID"];
        const usersData = data.map(user => [
            user.firstname,
            user.lastname,
            user.mobilenumber,
            user.email,
        ]);
    
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.aoa_to_sheet([headers, ...usersData]);
    
        xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
        const blob = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
        const fileBlob = new Blob([blob], { type: 'application/octet-stream' });
        saveAs(fileBlob, 'users.xlsx');
    };

    const handlePDFDownload = () => {
        const doc = new jsPDF();
        const tableColumn = Object.keys(visibleColumns).filter(key => visibleColumns[key]);
        const tableRows = [];

        data.forEach(user => {
            const userData = tableColumn.map(column => user[column]);
            tableRows.push(userData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows
        });

        doc.save('users.pdf');
    };

    const handlePrint = useReactToPrint({
        content:()=>printing.current,
        documentTitle:"Users Data"
    });
       
    

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
        <div className="overflow-hidden">
        <div className="container  content-wrapper mt-4">
            <h1 className="text-center mb-4 ">All Users</h1>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Users"
                    value={searchTerm}
                    style={{width:'20%'}}
                    onChange={handleSearch}
                />
            </div>
            <div className="table-responsive">
                <div className="d-flex gap-3">
                <button onClick={handledownload} className="btn btn-primary mb-4">CSV</button>
                <button onClick={handlePDFDownload} className="btn btn-primary mb-4">PDF</button>
                <button onClick={handlePrint} className="btn btn-primary mb-4">Print</button>
                </div>
                {/* <button className="btn btn-primary mb-4" onClick={() => handleColumnVisibility('firstname')}>Toggle First Name</button>
                <button className="btn btn-primary mb-4" onClick={() => handleColumnVisibility('lastname')}>Toggle Last Name</button>
                <button className="btn btn-primary mb-4" onClick={() => handleColumnVisibility('mobilenumber')}>Toggle Mobile Number</button>
                <button className="btn btn-primary mb-4" onClick={() => handleColumnVisibility('email')}>Toggle Email</button> */}
                <div ref={printing} style={{width:'100%'}}>
                <table className="table bg-dark table-striped table-bordered" id="printable-table-users">
                    <thead className="">
                        <tr>
                            {visibleColumns.firstname && <th onClick={() => sortData('firstname')}>First Name <FontAwesomeIcon icon={getSortIcon('firstname')} /></th>}
                            {visibleColumns.lastname && <th onClick={() => sortData('lastname')}>Last Name <FontAwesomeIcon icon={getSortIcon('lastname')} /></th>}
                            {visibleColumns.mobilenumber && <th onClick={() => sortData('mobilenumber')}>Mobile Number <FontAwesomeIcon icon={getSortIcon('mobilenumber')} /></th>}
                            {visibleColumns.email && <th onClick={() => sortData('email')}>Email ID <FontAwesomeIcon icon={getSortIcon('email')} /></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((value, index) => (
                            <tr key={index}>
                                {visibleColumns.firstname && <td>{value.firstname}</td>}
                                {visibleColumns.lastname && <td>{value.lastname}</td>}
                                {visibleColumns.mobilenumber && <td>{value.mobilenumber}</td>}
                                {visibleColumns.email && <td>{value.email}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}

export default Allusers;
