import React, { useState, useEffect } from "react";
import Header from "../header";
import Menu from "../Menu";
import { baseUrl } from "../../baseUrl";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Allpackages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null); // Tracks the ID of the package being edited
  const [editData, setEditData] = useState({}); // Holds the data for editing

  useEffect(() => {
    fetch(`${baseUrl}/allpackages`)
      .then(res => res.json())
      .then(view => {
        console.log(view);
        setData(view);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error occurred", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.post(`${baseUrl}/packages/${id}`)
      .then(response => {
        console.log(response.data);
        setData(data.filter(packages => packages._id !== id));
      })
      .catch(error => console.error('Error deleting package:', error));
  };

  const handleEdit = (packageItem) => {
    setEditMode(packageItem._id);
    setEditData(packageItem);
  };

  const handleUpdate = (id) => {
    axios.put(`${baseUrl}/packages/${id}`, editData)
      .then(response => {
        console.log(response.data);
        setData(data.map(pkg => (pkg._id === id ? response.data : pkg)));
        setEditMode(null);
      })
      .catch(error => console.error('Error updating package:', error));
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Menu />
      <div className="">
      <div className="content-wrapper">
        <h1>All Packages</h1>
        <table className="table table-striped" style={{width:'90%'}}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Cost</th>
              <th>Category</th>
              <th>Max Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{width:'90%'}}>
            {data.map((packages, index) => (
              <tr key={index}>
                <td>
                  {editMode === packages._id ? (
                    <input
                      type="text"
                      name="packagename"
                      value={editData.packagename}
                      onChange={handleChange}
                    />
                  ) : (
                    packages.packagename
                  )}
                </td>
                <td>
                  {editMode === packages._id ? (
                    <input
                      type="text"
                      name="image"
                      value={editData.image}
                      onChange={handleChange}
                    />
                  ) : (
                    packages.image && (
                      <img
                        src={`${baseUrl}/${packages.image.replace(/\\/g, '/')}`}
                        alt={packages.packagename}
                        style={{ width: '150px', height: '100px' }}
                      />
                    )
                  )}
                </td>
                <td>
                  {editMode === packages._id ? (
                    <input
                      type="text"
                      name="duration"
                      value={editData.duration}
                      onChange={handleChange}
                    />
                  ) : (
                    packages.duration
                  )}
                </td>
                <td>
                  {editMode === packages._id ? (
                    <input
                      type="text"
                      name="location"
                      value={editData.location}
                      onChange={handleChange}
                    />
                  ) : (
                    packages.location
                  )}
                </td>
                <td>
                  {editMode === packages._id ? (
                    <input
                      type="text"
                      name="cost"
                      value={editData.cost}
                      onChange={handleChange}
                    />
                  ) : (
                    packages.cost
                  )}
                </td>
                <td>
                  {editMode === packages._id ? (
                    <select
                      name="catogory"
                      value={editData.catogory}
                      onChange={handleChange}
                    >
                      <option value="School Package">School Package</option>
                      <option value="College Package">College Package</option>
                      <option value="Industrial Visit Package">Industrial Visit Package</option>
                    </select>
                  ) : (
                    packages.catogory
                  )}
                </td>
                                <td>
                  {editMode === packages._id ? (
                    <input
                      type="text"
                      name="maxdays"
                      value={editData.maxdays}
                      onChange={handleChange}
                    />
                  ) : (
                    packages.maxdays
                  )}
                </td>
                <td>
                  {editMode === packages._id ? (
                    <>
                      <button className="btn btn-success mr-2" onClick={() => handleUpdate(packages._id)}>Update</button>
                      <button className="btn btn-secondary" onClick={() => setEditMode(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary mr-2" onClick={() => handleEdit(packages)}>Edit</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(packages._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default Allpackages;
