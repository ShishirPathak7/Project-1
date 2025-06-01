import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientSidebar from "../../components/PatientSidebar";
import faceImage from "../../adminImages/faces/face8.jpg";

export default function PatientProfile() {
  const [patientDetails, setPatientDetails] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    ID: "",
    ContactNumber: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const UserID = sessionStorage.getItem("UserID");
    const UserType = sessionStorage.getItem("UserType");

    if (!UserID || UserType !== "Patient") {
      navigate("/Login");
      return;
    }

    const fetchPatientDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost/backend/api/patientprofile.php?userId=${UserID}`
        );
        const data = await res.json();

        if (data.status === 1 && data.user) {
          setPatientDetails(data.user);
        } else {
          console.error("User not found or invalid response.");
          navigate("/Login");
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        navigate("/Login");
      }
    };

    fetchPatientDetails();
  }, [navigate]);

  return (
    <div className="container-scroller">
      <PatientSidebar />
      <div
        className="container-fluid page-body-wrapper"
        style={{
          marginLeft: "250px",
          padding: "30px",
          backgroundColor: "#f4f6f9",
          minHeight: "100vh",
        }}
      >
        <div className="main-panel">
          <div className="content-wrapper">
            <div
              style={{
                background: "#1976d2",
                color: "#fff",
                padding: "30px 20px",
                borderRadius: "12px",
                marginBottom: "30px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <img
                src={faceImage}
                alt="Profile"
                style={{
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  border: "3px solid #fff",
                }}
              />
              <div>
                <h3 style={{ marginBottom: "5px" }}>
                  {patientDetails.FirstName} {patientDetails.LastName}
                </h3>
                <p style={{ margin: 0 }}>{patientDetails.Email}</p>
              </div>
            </div>

            <div
              className="card"
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div className="card-body">
                <h4 className="mb-4 text-primary">Patient Information</h4>
                <div className="row">
                  <InfoField label="First Name" value={patientDetails.FirstName} />
                  <InfoField label="Last Name" value={patientDetails.LastName} />
                  <InfoField label="Email Address" value={patientDetails.Email} />
                  <InfoField label="User ID" value={patientDetails.ID} />
                  <InfoField
                    label="Contact Number"
                    value={patientDetails.ContactNumber}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="col-md-6 mb-4">
      <div
        style={{
          backgroundColor: "#fafafa",
          padding: "15px 20px",
          borderRadius: "8px",
          borderLeft: "4px solid #1976d2",
        }}
      >
        <small style={{ color: "#888", fontWeight: "bold" }}>{label}</small>
        <h5 style={{ margin: "5px 0 0 0", fontWeight: "normal" }}>
          {value || "Loading..."}
        </h5>
      </div>
    </div>
  );
}
