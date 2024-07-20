import React from "react";
import Header from "./header";
import Menu from "./Menu";


function CalenderPage(){
    return(
        <>
        <Header/>
        <Menu/>
        <div className="content-wrapper">
  <section className="content-header text-dark">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Calendar</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">Calendar</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="sticky-top mb-3">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Draggable Events</h4>
              </div>
              <div className="card-body text-dark">
                <div id="external-events">
                  <div className="external-event bg-success">Lunch</div>
                  <div className="external-event bg-warning">Go home</div>
                  <div className="external-event bg-info">Do homework</div>
                  <div className="external-event bg-primary">Work on UI design</div>
                  <div className="external-event bg-danger">Sleep tight</div>
                  <div className="checkbox">
                    <label htmlFor="drop-remove">
                      <input type="checkbox" id="drop-remove" />
                      remove after drop
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Create Event</h3>
              </div>
              <div className="card-body">
                <div className="btn-group" style={{width: '100%', marginBottom: 10}}>
                  <ul className="fc-color-picker" id="color-chooser">
                    <li><a className="text-primary" href="#"><i className="fas fa-square" /></a></li>
                    <li><a className="text-warning" href="#"><i className="fas fa-square" /></a></li>
                    <li><a className="text-success" href="#"><i className="fas fa-square" /></a></li>
                    <li><a className="text-danger" href="#"><i className="fas fa-square" /></a></li>
                    <li><a className="text-muted" href="#"><i className="fas fa-square" /></a></li>
                  </ul>
                </div>
                <div className="input-group">
                  <input id="new-event" type="text" className="form-control" placeholder="Event Title" />
                  <div className="input-group-append">
                    <button id="add-new-event" type="button" className="btn btn-primary">Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card card-primary">
            <div className="card-body p-0">
              <div id="calendar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

        </>
    )
}

export default CalenderPage;