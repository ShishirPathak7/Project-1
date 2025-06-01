// AdminDashboard.js – Enhanced UI/UX with Icons and Responsive Cards

import React, { Fragment, useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { FaUserInjured, FaCalendarCheck, FaUserMd } from 'react-icons/fa';

const AdminDashboard = () => {
  const [response, setResponse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost/backend/api/admindash.php', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Network response was not ok.');

        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const cardStyle = {
    padding: '2rem',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  };

  const iconStyle = {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  };

  return (
    <Fragment>
      <div className="d-flex">
        <div style={{ width: '250px' }}>
          <AdminSidebar />
        </div>
        <div className="flex-grow-1 bg-light p-5 min-vh-100">
          <h2 className="text-info fw-bold mb-4">Admin Dashboard Overview</h2>
          <div className="row g-4">
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div style={cardStyle} className="border-start border-4 border-primary">
                <FaUserInjured className="text-primary" style={iconStyle} />
                <h6 className="text-muted">Total Patients</h6>
                <h3>{response.TotalPatientCount || 'Loading...'}</h3>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div style={cardStyle} className="border-start border-4 border-success">
                <FaCalendarCheck className="text-success" style={iconStyle} />
                <h6 className="text-muted">Total Appointments</h6>
                <h3>{response.TotalAppointmentCount || 'Loading...'}</h3>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div style={cardStyle} className="border-start border-4 border-warning">
                <FaUserMd className="text-warning" style={iconStyle} />
                <h6 className="text-muted">Total Pharmacists</h6>
                <h3>{response.TotalPharmacistCount || 'Loading...'}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminDashboard;