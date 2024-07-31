import React, { useState } from "react";
import axios from "axios";
import Header from "../header";
import Menu from "../Menu";
import styles from './package.module.css';
import { baseUrl } from "../../baseUrl";

function PackageAddPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [packagename, setPackageName] = useState("");
  const [duration, setduration] = useState("");
  const [location, setlocation] = useState("");
  const [cost, setCost] = useState("");
  const [catogory, setCatogory] = useState("");
  const [maxdays,setMaxdays] = useState("");
  const [uploadedAt, setUploadedAt] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("packagename", packagename);
    formData.append("duration",duration);
    formData.append("location", location);
    formData.append("cost", cost);
    formData.append("catogory", catogory);
    formData.append("maxdays",maxdays);


    try {
      const response = await axios.post(`${baseUrl}/packageaddpage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedAt(response.data.uploadedAt);
      console.log("Package posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  return (
    <>
      <Header />
      <Menu />
      <div className={`container mt-4  content-wrapper ${styles.overflow}`}>
        <h2 className="text-center mb-4">Adding Packages</h2>
        <div className="table-responsive overflow-hidden">
          <table className="table">
            <tbody>
              <tr>
                <td>Package Name</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    value={packagename}
                    onChange={(e) => setPackageName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    value={duration}
                    onChange={(e) => setduration(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Location</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    value={location}
                    onChange={(e) => setlocation(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Cost</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Catogory</td>
                <td>
                  <select className={`form-control ${styles.input}`}
                  value={catogory}
                  onChange={(e)=>setCatogory(e.target.value)}
                  >
                    <option>School Package</option>
                    <option>College Package</option>
                    <option>Industrial Visit Package</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>Maximum days </td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    value={maxdays}
                    onChange={(e) => setMaxdays(e.target.value)}
                  />
                </td>
              </tr>
             
              <tr>
                <td>Upload Image</td>
                <td>
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={(event) => {
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                  {selectedImage && (
                    <div className="mt-3">
                      <img
                        alt="not found"
                        src={URL.createObjectURL(selectedImage)}
                        height="200px"
                      />
                      <br />
                      <button className="btn btn-danger mt-2" onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </td>
              </tr>
              {uploadedAt && (
                <tr>
                  <td>Uploaded on</td>
                  <td>{new Date(uploadedAt).toLocaleString()}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PackageAddPage;
