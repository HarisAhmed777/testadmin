import React, { useState } from "react";
import axios from "axios";
import Header from "../header";
import Menu from "../Menu";
import styles from './blogpage.module.css'
import {baseUrl} from '../../baseUrl'
function BlogPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [firstpara, setFirstpara] = useState("");
  const [secondpara, setSecondpara] = useState("");
  const [uploadedAt, setUploadedAt] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", blogTitle);
    formData.append("firstpara", firstpara);
    formData.append("secondpara", secondpara);
    try {
      const response = await axios.post(`${baseUrl}/blogpage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadedAt(response.data.uploadedAt);
      alert("Blog uploaded Succesfully");
      setBlogTitle("");
      setFirstpara("");
      setSecondpara("");
      setSelectedImage(null);

      console.log("Blog posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  return (
    <>
      <Header />
      <Menu />
      <div className={`container mt-4  content-wrapper ${styles.overflow}`}>
        <h2 className="text-center mb-4">Adding Blogs</h2>
        <div className="table-responsive overflow-hidden">
          <table className="table">
            <tbody>
              <tr>
                <td>Blog Title</td>
                <td>
                  <input
                    type="text"
                    className={`form-control ${styles.input}`}
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>First Paragraph</td>
                <td>
                  <textarea
                    className={`form-control ${styles.input}`}
                    rows="10"
                    value={firstpara}
                    onChange={(e) => setFirstpara(e.target.value)}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>Second Paragraph</td>
                <td>
                  <textarea
                    className={`form-control ${styles.input}`}
                    rows="10"
                    value={secondpara}
                    onChange={(e) => setSecondpara(e.target.value)}
                  ></textarea>
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

export default BlogPage;
