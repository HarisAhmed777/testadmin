import React, { useState } from "react";
import axios from "axios";
import Header from "../header";
import Menu from "../Menu";
import styles from './package.module.css';
import { baseUrl } from "../../baseUrl";

function PackageAddPage() {
  const [formData, setFormData] = useState({
    img: '',
    title: '',
    duration: '',
    guest: '',
    price: '',
    mainpara: '',
    subpara: '',
    transportation: '',
    day1city: '',
    day1: '',
    day1plan: [],
    day2city: '',
    day2mainpara: '',
    day2plan: '',
    packagecostperstudent: '',
    foodplan: '',
    groupsize: '',
    perheadcost: '',
    costincludes: [],
    costexcludes: [],
  });

  const [day1Activity, setDay1Activity] = useState({
    NTR: '',
    Lumbni: '',
    DrAmbedkarStatue: '',
    TelenganaMartyrsMemorial: '',
    SalarjungMuseum: '',
    Charminar: '',
    MeccaMasjid: '',
  });

  const [costIncludeActivity, setCostIncludeActivity] = useState({
    accomodation: '',
    assistance: '',
    complimentary: '',
    sharingplan: '',
    meals: '',
  });

  const [excludeActivity, setExcludeActivity] = useState({
    fare: '',
    portage: '',
    laundry: '',
    cam: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedAt, setUploadedAt] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDay1ActivityChange = (e) => {
    const { name, value } = e.target;
    setDay1Activity({
      ...day1Activity,
      [name]: value,
    });
  };

  const handleIncludeActivityChange = (e) => {
    const { name, value } = e.target;
    setCostIncludeActivity({
      ...costIncludeActivity,
      [name]: value,
    });
  };

  const handleExcludeActivityChange = (e) => {
    const { name, value } = e.target;
    setExcludeActivity({
      ...excludeActivity,
      [name]: value,
    });
  };

  const handleAddDay1Activity = () => {
    setFormData({
      ...formData,
      day1plan: [...formData.day1plan, day1Activity],
    });
    setDay1Activity({
      NTR: '',
      Lumbni: '',
      DrAmbedkarStatue: '',
      TelenganaMartyrsMemorial: '',
      SalarjungMuseum: '',
      Charminar: '',
      MeccaMasjid: '',
    });
  };

  const handleAddCostInclude = () => {
    setFormData({
      ...formData,
      costincludes: [...formData.costincludes, costIncludeActivity],
    });
    setCostIncludeActivity({
      accomodation: '',
      assistance: '',
      complimentary: '',
      sharingplan: '',
      meals: '',
    });
  };

  const handleAddCostExclude = () => {
    setFormData({
      ...formData,
      costexcludes: [...formData.costexcludes, excludeActivity],
    });
    setExcludeActivity({
      fare: '',
      portage: '',
      laundry: '',
      cam: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });
      if (selectedImage) {
        formDataToSend.append('img', selectedImage);
      }

      const response = await axios.post(`${baseUrl}/packageaddpage`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedAt(response.data.uploadedAt);
      console.log("Package posted successfully:", response.data);
      alert("Package added successfully");
      resetForm();
    } catch (error) {
      console.error("Error posting package:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      img: '',
      title: '',
      duration: '',
      guest: '',
      price: '',
      mainpara: '',
      subpara: '',
      transportation: '',
      day1city: '',
      day1: '',
      day1plan: [],
      day2city: '',
      day2mainpara: '',
      day2plan: '',
      packagecostperstudent: '',
      foodplan: '',
      groupsize: '',
      perheadcost: '',
      costincludes: [],
      costexcludes: [],
    });
    setSelectedImage(null);
    setUploadedAt(null);
  };

  return (
    <>
      <Header />
      <Menu />
      <div className={`container mt-4 content-wrapper ${styles.overflow}`}>
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
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>
                  <input
                    type="text"
                    placeholder="example: 3 days and 2 nights"
                    className={`form-control ${styles.input}`}
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Location</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    name="guest"
                    value={formData.guest}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Cost</td>
                <td>
                  <input
                    type="text"
                    placeholder="only numbers e.g., 400"
                    className={`form-control ${styles.input}`}
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Main Paragraph</td>
                <td>
                  <textarea
                    className={`form-control ${styles.input}`}
                    name="mainpara"
                    value={formData.mainpara}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Sub Paragraph</td>
                <td>
                  <textarea
                    className={`form-control ${styles.input}`}
                    name="subpara"
                    value={formData.subpara}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Transportation</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    name="transportation"
                    value={formData.transportation}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Day 1 City</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    name="day1city"
                    value={formData.day1city}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Day 1 Description</td>
                <td>
                  <textarea
                    className={`form-control ${styles.input}`}
                    name="day1"
                    value={formData.day1}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Day 1 Plan</td>
                <td>
                  <textarea
                    className={`form-control ${styles.input}`}
                    name="day1plan"
                    value={formData.day1plan.join(', ')}
                    readOnly
                  />
                  <button className="btn btn-secondary mt-2" onClick={handleAddDay1Activity}>
                    Add Day 1 Activity
                  </button>
                  {/* Add inputs for day 1 activities */}
                  <div className="mt-2">
                    {Object.keys(day1Activity).map((key) => (
                      <div key={key} className="mb-2">
                        <input
                          type="text"
                          className={`form-control ${styles.input}`}
                          name={key}
                          placeholder={key}
                          value={day1Activity[key]}
                          onChange={handleDay1ActivityChange}
                        />
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td>Day 2 City</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    name="day2city"
                    value={formData.day2city}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Day 2 Main Paragraph</td>
                <td>
                  <textarea
                    className={`form-control ${styles.input}`}
                    name="day2mainpara"
                    value={formData.day2mainpara}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Day 2 Plan</td>
                <td>
                  <textarea
                    className={`form-control ${styles.input}`}
                    name="day2plan"
                    value={formData.day2plan}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Package Cost Per Student</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    name="packagecostperstudent"
                    value={formData.packagecostperstudent}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Food Plan</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    name="foodplan"
                    value={formData.foodplan}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Group Size</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    name="groupsize"
                    value={formData.groupsize}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Per Head Cost</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    name="perheadcost"
                    value={formData.perheadcost}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Cost Includes</td>
                <td>
                  <textarea
                    className={`form-control ${styles.input}`}
                    name="costincludes"
                    value={formData.costincludes.join(', ')}
                    readOnly
                  />
                  <button className="btn btn-secondary mt-2" onClick={handleAddCostInclude}>
                    Add Cost Include
                  </button>
                  {/* Add inputs for cost includes */}
                  <div className="mt-2">
                    {Object.keys(costIncludeActivity).map((key) => (
                      <div key={key} className="mb-2">
                        <input
                          type="text"
                          className={`form-control ${styles.input}`}
                          name={key}
                          placeholder={key}
                          value={costIncludeActivity[key]}
                          onChange={handleIncludeActivityChange}
                        />
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td>Cost Excludes</td>
                <td>
                  <textarea
                    className={`form-control ${styles.input}`}
                    name="costexcludes"
                    value={formData.costexcludes.join(', ')}
                    readOnly
                  />
                  <button className="btn btn-secondary mt-2" onClick={handleAddCostExclude}>
                    Add Cost Exclude
                  </button>
                  {/* Add inputs for cost excludes */}
                  <div className="mt-2">
                    {Object.keys(excludeActivity).map((key) => (
                      <div key={key} className="mb-2">
                        <input
                          type="text"
                          className={`form-control ${styles.input}`}
                          name={key}
                          placeholder={key}
                          value={excludeActivity[key]}
                          onChange={handleExcludeActivityChange}
                        />
                      </div>
                    ))}
                  </div>
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
