import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Logo from '../../public/Logo.png';

function Menu() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <aside className={`main-sidebar sidebar-dark-primary  custom-sidebar ${isSidebarOpen ? 'active' : ''}`}>
        <Link to="/" className="brand-link">
          <img src={Logo} alt="Star Holidays Logo" className="brand-image" style={{ opacity: '0.8', height: '50px', width: '50px' }} />
          <span className="brand-text font-weight-light">Star Holidays</span>
        </Link>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <Link to="/" className="d-block">Admin</Link>
            </div>
          </div>
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link to="/" className="nav-link active lii">
                  <i className="fas fa-tachometer-alt" />
                  <p className="ms-2">Dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <i className="nav-icon fas fa-table" />
                  <p className="ms-2">
                    DataTables
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/allbookings" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>BookingsTable</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/allusers" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>UsersTable</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/allforms" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Form Request Table</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/calendarpage" className="nav-link">
                  <i className="fas fa-calendar-alt" />
                  <p className="ms-2">Calendar</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/offers" className="nav-link">
                  <i className="fas fa-tags" />
                  <p className="ms-2">Offers</p>
                </Link>
              </li>
            </ul>
            <button className="btn btn-sidebar-toggle" onClick={toggleSidebar}>
              <i className="fas fa-times" />
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Menu;
