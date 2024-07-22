import React from "react";
import { Link } from 'react-router-dom';
import Logo from '../../public/Logo.png';

function Menu() {
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4 custom-sidebar">
        <a href="" className="brand-link">
          <img src={Logo} alt="Star Holidays Logo" className="brand-image" style={{ opacity: '8', height: '50px', width: '50px' }} />
          <span className="brand-text font-weight-light">Star Holidays</span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <a href="" className="d-block">Admin</a>
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
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" data-accordion="false">
              <li className="">
                <a href="/" className="nav-link active lii">
                  <i className="fas fa-tachometer-alt" />
                  <p className="ms-2">
                    Dashboard
                  </p>
                </a>
              </li>
              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-chart-pie" />
                  <p className="ms-2">
                    Charts
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>ChartJS</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Flot</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Inline</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>uPlot</p>
                    </a>
                  </li>
                </ul>
              </li> */}
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon fas fa-table" />
                  <p className="ms-2">
                    DataTables
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <Link to ='/allbookings'>
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>BookingsTable</p>
                    </a>
                  </li>
                  </Link>
                  <Link to='/allusers'>
                    <li className="nav-item">
                      <a href="" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>UsersTable</p>
                      </a>
                    </li>
                  </Link>
                  <Link to = '/allforms'>
                  <li className="nav-item">
                    <a href="" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Form request Table</p>
                    </a>
                  </li>
                  </Link>
                </ul>
              </li>
              <Link to='/calenderpage'>
                <li className="">
                  <a href="" className="nav-link active lii">
                    <i className="fas fa-tachometer-alt" />
                    <p className="ms-2">
                      Calendar
                    </p>
                  </a>
                </li>
              </Link>
              <Link to='/offers'>
                <li className="">
                  <a href="/offers" className="nav-link active lii">
                    <i className="fas fa-tachometer-alt" />
                    <p className="ms-2">
                      Offers
                    </p>
                  </a>
                </li>
              </Link>
            </ul>
            <button className="btn btn-sidebar-toggle" data-widget="pushmenu">
              <i className="fas fa-times" />
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Menu;
