import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import faceImage from "../adminImages/faces/face8.jpg";

export default function PatientSidebar() {
  const [patientDetails, setPatientDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const UserID = sessionStorage.getItem("UserID");
    const UserType = sessionStorage.getItem("UserType");

    // ✅ Role-based redirect
    if (!UserID || UserType !== "Patient") {
      navigate("/Login");
      return;
    }

    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost/backend/api/patientprofile.php?userId=${UserID}`);
        const data = await response.json();

        if (data.status === 1 && data.user && data.user.UserType === "Patient") {
          setPatientDetails(data.user);
        } else {
          navigate("/Login");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
        navigate("/Login");
      }
    };

    fetchDetails();
  }, [navigate]);

  const logout = () => {
    sessionStorage.clear();
    navigate("/Login");
  };

  return (
    <nav
      className="sidebar sidebar-offcanvas"
      style={{
        width: "250px",
        background: "#1976d2",
        color: "white",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        paddingTop: "20px",
        zIndex: 1000,
      }}
    >
      <ul className="nav" style={{ padding: 0 }}>
        <li className="nav-item nav-profile">
          <CustomLink to="/PatientProfile" isProfile>
            <div className="profile-image" style={{ display: "flex", alignItems: "center" }}>
              <img
                className="img-xs rounded-circle"
                src={faceImage}
                alt="profile"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              />
              <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  {patientDetails?.FirstName || "Loading..."}
                </p>
                <p style={{ margin: 0, fontSize: "12px" }}>
                  {patientDetails?.Email || ""}
                </p>
              </div>
            </div>
          </CustomLink>
        </li>

        <li className="nav-item nav-category">
          <span className="nav-link">DASHBOARD</span>
        </li>
        <CustomLink to="/AppointmentsPage">Book Appointment</CustomLink>
        <CustomLink to="/HealthRecordPage">Appointment History</CustomLink>
        <CustomLink to="/PatientPrescription">Prescription</CustomLink>

        <li className="nav-item">
          <button
            type="button"
            onClick={logout}
            style={{
              background: "none",
              border: "none",
              color: "white",
              width: "100%",
              padding: "12px 16px",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            <FiLogOut style={{ marginRight: "8px" }} /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, isProfile = false }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  const [hover, setHover] = useState(false);

  const style = {
    color: isActive ? "#1976d2" : "white",
    backgroundColor: isActive ? "white" : hover ? "#1565c0" : "transparent",
    padding: isProfile ? "10px 16px" : "12px 16px",
    display: "block",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    transition: "all 0.3s ease",
  };

  return (
    <li className="nav-item">
      <Link
        to={to}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={style}
      >
        {children}
      </Link>
    </li>
  );
}
