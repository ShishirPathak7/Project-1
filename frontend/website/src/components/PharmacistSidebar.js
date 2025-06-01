import React, { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import faceImage from '../adminImages/faces/face8.jpg';
import { FiLogOut } from 'react-icons/fi';

export default function PharmacistSidebar() {
  const [adminDetails, setAdminDetails] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    ID: '',
  });

  const navigate = useNavigate();

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
            headers: { 'Content-Type': 'application/json' },
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

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div
      style={{
        width: '250px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#007BFF',
        color: '#fff',
        paddingTop: '40px',
        zIndex: 1000,
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      }}
    >
      <ul className="nav flex-column px-3">
        <li className="nav-item nav-profile mb-4 text-center">
          <img
            className="img-xs rounded-circle mb-2"
            src={faceImage}
            alt="profile"
            style={{ width: '60px', height: '60px' }}
          />
          <p className="mb-1 fw-bold">
            {adminDetails.FirstName || 'Loading...'} {adminDetails.LastName}
          </p>
          <p className="small">{adminDetails.Email || 'Loading...'}</p>
        </li>

        <li className="nav-item mb-3">
          <CustomLink to="/PharmacistProfile">Profile</CustomLink>
        </li>

        <li className="nav-item mb-3">
          <CustomLink to="/PharmacistPrescriptionForm">Prescription Management</CustomLink>
        </li>

        <li className="nav-item mt-4">
          <button
            type="button"
            onClick={logout}
            style={{
              backgroundColor: '#0056b3',
              border: 'none',
              color: '#fff',
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <FiLogOut className="me-2" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={`nav-link px-2 py-2 ${isActive ? 'bg-light text-dark rounded' : ''}`}>
      <Link
        to={to}
        style={{
          color: isActive ? '#007BFF' : '#fff',
          fontWeight: isActive ? 'bold' : 'normal',
          textDecoration: 'none',
        }}
      >
        {children}
      </Link>
    </li>
  );
}
