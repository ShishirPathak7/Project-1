import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import faceImage from "../adminImages/faces/face8.jpg";

export default function HealthcareProviderSidebar() {
  const [adminDetails, setAdminDetails] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    ID: "",
  });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        // Get UserID from session storage or wherever it's stored
        const UserID = sessionStorage.getItem("UserID");

        if (!UserID) {
          // Handle the case where UserID is not available
          console.error("UserID is not available.");
          return;
        }

        const response = await fetch(
          `http://localhost/backend/api/adminprofile.php/${UserID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        setAdminDetails(data[0]);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };
    fetchAdminDetails();
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Redirect to login page
    navigate("/Login");
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const sidebarStyle = {
    width: "250px",
    background: "#333", // Adjust the background color
    color: "white", // Adjust the text color
    position: "fixed",
    top: 0,
    paddingTop: 40,
    left: showSidebar ? 0 : "-250px",
    height: "100%",
    zIndex: 1000,
    transition: "left 0.3s",
  };

  const sidebarOverlayStyle = {
    display: showSidebar ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  };

  const hamburgerMenuStyle = {
    display: "block",
    float: "right",
    padding: "10px",
    cursor: "pointer",
    color: "red",
    fontSize: "24px",
    zIndex: 1001,
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          className="hamburger-menu"
          onClick={toggleSidebar}
          style={hamburgerMenuStyle}
        >
          {showSidebar ? <IoMdClose /> : <GiHamburgerMenu />}
        </div>
        <nav
          className="sidebar sidebar-offcanvas"
          id="sidebar"
          style={sidebarStyle}
        >
          <ul className="nav">
            <li className="nav-item nav-profile">
              <CustomLink to="/HealthcareProviderProfile" className="nav-link">
                <div className="profile-image">
                  <img
                    className="img-xs rounded-circle"
                    src={faceImage}
                    alt="profile"
                  />
                  <div className="dot-indicator bg-success"></div>
                </div>
                <div className="text-wrapper">
                  <p className="profile-name">
                    {adminDetails.FirstName || "Loading..."}
                  </p>
                  <p className="designation">
                    {adminDetails.Email || "Loading..."}
                  </p>
                </div>
              </CustomLink>
            </li>
            <li>
              <li className="nav-item">
                <CustomLink to="/PrescriptionForm" className="nav-link">
                  Add Prescriptions
                </CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink to="/ManageAppointments" className="nav-link">
                  Manage Appointments
                </CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink to="/PersonalRecords" className="nav-link">
                  Patient Health Records
                </CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink
                  to="/HealthcareProviderCommunity"
                  className="nav-link"
                >
                  Community
                </CustomLink>
              </li>
              <li className="nav-item">
                <CustomLink
                  to="/HealthcareProviderDashboard"
                  className="nav-link"
                >
                  Analytics
                </CustomLink>
              </li>
            </li>
            <li className="nav-item nav-category">
              <span className="nav-link">Chat</span>
            </li>
            <li className="nav-item">
              <CustomLink to="/Chat" className="nav-link">
                <span className="menu-title">Chat</span>
                <i className="icon-screen-desktop menu-icon"></i>
              </CustomLink>
            </li>
            <br />
            <li className="nav-item">
              <button
                type="button"
                onClick={logout}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  width: "100%",
                  height: "36px",
                  padding: "0",
                  margin: "0",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <FiLogOut style={{ marginRight: "8px" }} /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div style={sidebarOverlayStyle} onClick={toggleSidebar}></div>
    </div>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
