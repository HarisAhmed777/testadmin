import React, { useEffect, useState } from "react";
import Header from "../header";
import Menu from "../Menu";
import { baseUrl } from "../../baseUrl";

function AllBlogs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/allblogs`)
      .then(res => res.json())
      .then(view => {
        setData(view);
        console.log(view);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error occurred", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <h1>All Blogs</h1>
        {data.map((blog, index) => (
          <div key={index} className="blog">
            <h2 className="text-center"><span className="clr">Title:</span>{blog.title}</h2>
            <div className="text-center">
            {blog.image && (
              <img
                src={`${baseUrl}/${blog.image.replace(/\\/g, '/')}`}
                alt={blog.title}
                style={{width:'500px',height:'350px'}}
              />
            )}
            </div>
            <p className="container">{blog.firstpara}</p>
            <p className="container">{blog.secondpara}</p>
            <h2 className="text-center">End of a blog</h2>
            <hr />
           
          </div>
        ))}
      </div>
    </>
  );
}

export default AllBlogs;




