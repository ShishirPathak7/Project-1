import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import faceImage from "../adminImages/faces/face8.jpg";

export default function AdminSidebar() {
  const [adminDetails, setAdminDetails] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    ID: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const UserID = sessionStorage.getItem("UserID");
        const UserType = sessionStorage.getItem("UserType");

        if (!UserID || UserType !== "Admin") {
          navigate("/Login");
          return;
        }

        const response = await fetch(
          `http://localhost/backend/api/adminprofile.php?userId=${UserID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.status === 1 && data.user.UserType === "Admin") {
          setAdminDetails(data.user);
        } else {
          navigate("/Login");
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
        navigate("/Login");
      }
    };

    fetchAdminDetails();
  }, [navigate]);

  const logout = () => {
    sessionStorage.clear();
    navigate("/Login");
  };

  const sidebarStyles = {
    container: {
      width: "250px",
      background: "#1976d2",
      color: "white",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      paddingTop: "20px",
      zIndex: 1000,
    },
    logoutButton: {
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
    },
  };

  return (
    <nav style={sidebarStyles.container}>
      <ul className="nav" style={{ padding: 0 }}>
        <li className="nav-item nav-profile">
          <CustomLink to="/ProfileAdmin" isProfile>
            <div className="profile-image" style={{ display: "flex", alignItems: "center" }}>
              <img
                className="img-xs rounded-circle"
                src={faceImage}
                alt="profile"
                style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 10 }}
              />
              <div>
                <p style={{ margin: 0, fontWeight: "bold" }}>{adminDetails.FirstName || "Loading..."}</p>
                <p style={{ margin: 0, fontSize: "12px" }}>{adminDetails.Email || "Loading..."}</p>
              </div>
            </div>
          </CustomLink>
        </li>

        <li className="nav-item nav-category"><span className="nav-link">DASHBOARD</span></li>
        <CustomLink to="/ManagePatientAdmin">Manage Appointments</CustomLink>
        <CustomLink to="/AdminBilling">Billings</CustomLink>
        <CustomLink to="/DataOversight">Billing Records</CustomLink>
        <CustomLink to="/AdminDashboard">Generate Report</CustomLink>
        

       

        <li className="nav-item">
          <button onClick={logout} style={sidebarStyles.logoutButton}>
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
