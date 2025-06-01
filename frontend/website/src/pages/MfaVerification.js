import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import appLogo from "../images/logo.png";

const MfaVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(900);
  const [otpSent, setOtpSent] = useState(false);
  const otpSentRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  useEffect(() => {
    if (!email) {
      navigate("/Login");
      return;
    }

    if (!otpSentRef.current) {
      otpSentRef.current = true;
      sendOtp();
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const sendOtp = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost/backend/api/send-otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
        mode: "cors",
      });

      const data = await response.json();
      if (data.status === 1) {
        setOtpSent(true);
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    setCountdown(900);
    sendOtp();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("Invalid OTP. Please enter a 6-digit numeric code.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost/backend/api/verify-mfa-otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
        mode: "cors",
      });

      const data = await response.json();
      if (data.status === 1) {
        // ✅ Save BOTH UserID and UserType
        sessionStorage.clear();
        sessionStorage.setItem("UserID", data.ID);
        sessionStorage.setItem("UserType", data.UserType); // <-- This was missing

        // ✅ Route based on role
        switch (data.UserType) {
          case "Admin":
            navigate("/ProfileAdmin");
            break;
          case "Patient":
            navigate("/PatientProfile");
            break;
          case "HealthAdminstrator":
            navigate("/ProfileHealthAdministrator");
            break;
          case "HealthcareProvider":
            navigate("/HealthcareProviderProfile");
            break;
          case "Pharmacist":
            navigate("/PharmacistProfile");
            break;
          default:
            navigate("/Login");
            break;
        }
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            <img src={appLogo} alt="Medicare Logo" style={{ width: "150px", marginBottom: "20px" }} />
            <Typography variant="h5" gutterBottom>Two-Factor Authentication</Typography>
            <Typography variant="body1" align="center" sx={{ mb: 2 }}>
              A verification code has been sent to your email: <strong>{email}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The code will expire in {formatTime(countdown)}
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {otpSent && <Alert severity="success" sx={{ mb: 3 }}>Verification code sent successfully!</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter 6-digit verification code"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.slice(0, 6));
                setError(null);
              }}
              inputProps={{ maxLength: 6, inputMode: "numeric", pattern: "[0-9]*" }}
              sx={{ mb: 3 }}
              disabled={loading}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading || countdown === 0}
              sx={{ mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Verify"}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="text" color="primary" disabled={loading || countdown > 870} onClick={handleResendOtp}>
                Resend Code
              </Button>
              <Button variant="text" color="secondary" onClick={() => navigate("/Login")}>
                Back to Login
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default MfaVerification;
