import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import Header from './header';
import Menu from './Menu';

function AdminOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/offers`)
      .then(response => {
        setOffers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching offers');
        setLoading(false);
      });
  }, []);

  const handleInputChange = (index, field, value) => {
    const newOffers = [...offers];
    newOffers[index][field] = value;
    setOffers(newOffers);
  };

  const handleUpdate = (index) => {
    const offer = offers[index];
    axios.put(`${baseUrl}/offers/${offer._id}`, offer)
      .then(response => {
        alert('Offer updated successfully');
        setOffers(prevOffers => prevOffers.map(o => (o._id === offer._id ? response.data : o)));
      })
      .catch(error => {
        console.error('Error updating offer', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <Menu />
      <div className="container  mt-4 overflow-auto content-wrapper">
        <h1 className="text-center mb-4 ">Manage Offers</h1>
        <div className="table-responsive overflow-hidden">
          <table className="table bg-dark table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr key={offer._id}>
                  <td>
                    <input
                      type="text"
                      value={offer.code}
                      onChange={(e) => handleInputChange(index, 'code', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={offer.discount}
                      onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
                    />
                  </td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleUpdate(index)}>
                      Update
                    </button>
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

export default AdminOffers;
