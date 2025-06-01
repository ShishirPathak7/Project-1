import React, { useState, useEffect } from 'react';
import PharmacistSidebar from '../../components/PharmacistSidebar';
import { FaUserMd, FaEnvelope, FaPhoneAlt, FaIdBadge, FaUserTag } from 'react-icons/fa';

export default function PharmacistProfile() {
  const [adminDetails, setAdminDetails] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    ID: '',
    ContactNumber: '',
  });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const UserID = sessionStorage.getItem('UserID');
        if (!UserID) {
          console.error('UserID is not available.');
          return;
        }

        const response = await fetch(
          `http://localhost/backend/api/adminprofile.php/${UserID}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        setAdminDetails(data[0]);
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminDetails();
  }, []);

  const getInitials = (first, last) => {
    return `${first?.charAt(0) || ''}${last?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div style={{ backgroundColor: '#f1f7fc', minHeight: '100vh' }}>
      <div className="container-fluid page-body-wrapper">
        <PharmacistSidebar />
        <div className="content-wrapper p-4">
          <div className="text-center mb-4">
            <h2 style={{ color: '#007BFF', fontWeight: 600 }}>Pharmacist Profile</h2>
            <p style={{ color: '#6c757d' }}>Your personal information</p>
          </div>

          <div
            className="mx-auto"
            style={{
              maxWidth: '900px',
              background: '#fff',
              padding: '2rem 2.5rem',
              borderRadius: '1rem',
              border: '1px solid #cce0f5',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="d-flex flex-wrap align-items-center mb-4">
              <div
                className="rounded-circle text-white d-flex justify-content-center align-items-center"
                style={{
                  width: 100,
                  height: 100,
                  fontSize: 34,
                  fontWeight: 'bold',
                  backgroundColor: '#17c1e8',
                  marginRight: 25,
                }}
              >
                {getInitials(adminDetails.FirstName, adminDetails.LastName) || 'PH'}
              </div>
              <div>
                <h4 className="mb-1 text-dark">
                  {adminDetails.FirstName} {adminDetails.LastName}
                </h4>
                <span
                  className="badge"
                  style={{
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    fontSize: '0.85rem',
                    padding: '6px 12px',
                    borderRadius: '20px',
                  }}
                >
                  Pharmacist
                </span>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-muted fw-semibold">
                  <FaUserMd className="me-2 text-primary" /> First Name
                </label>
                <div className="form-control bg-light border-0">
                  {adminDetails.FirstName || 'Loading...'}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted fw-semibold">
                  <FaUserTag className="me-2 text-primary" /> Last Name
                </label>
                <div className="form-control bg-light border-0">
                  {adminDetails.LastName || 'Loading...'}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted fw-semibold">
                  <FaEnvelope className="me-2 text-primary" /> Email
                </label>
                <div className="form-control bg-light border-0">
                  {adminDetails.Email || 'Loading...'}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted fw-semibold">
                  <FaIdBadge className="me-2 text-primary" /> User ID
                </label>
                <div className="form-control bg-light border-0">
                  {adminDetails.ID || 'Loading...'}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label text-muted fw-semibold">
                  <FaPhoneAlt className="me-2 text-primary" /> Contact Number
                </label>
                <div className="form-control bg-light border-0">
                  {adminDetails.ContactNumber || 'Loading...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
