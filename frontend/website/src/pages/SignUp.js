import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import appLogo from "../images/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const linkStyle = { listStyleType: "none" };
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    emailid: "",
    userId: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "Patient",
  });

  const [formErrors, setFormErrors] = useState({
    firstname: false,
    lastname: false,
    emailid: false,
    userId: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const [formLoading, setFormLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "userId" || name === "phone") {
      let errors = {};
      if (!/^\d+$/.test(value) || value.includes("+") || value.length > 10) {
        errors = { ...errors, [name]: true };
      } else {
        errors = { ...errors, [name]: false };
        setFormData({ ...formData, [name]: value });
      }
      setFormErrors({ ...formErrors, ...errors });
    } else {
      setFormData({ ...formData, [name]: value });
      setFormErrors({ ...formErrors, [name]: false });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormDisabled(true);

    let errors = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(formData.emailid.trim())) errors.emailid = true;
    if (!phoneRegex.test(formData.phone.trim())) errors.phone = true;
    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      errors.password = true;
      errors.confirmPassword = true;
    }
    if (!formData.emailid.trim()) errors.emailid = true;
    if (!formData.password.trim()) errors.password = true;
    if (!formData.userId.trim()) errors.userId = true;

    if (Object.keys(errors).length > 0 || !agreed) {
      setFormErrors(errors);
      setFormLoading(false);
      setFormDisabled(false);
      return;
    }

    try {
      const response = await fetch("http://localhost/backend/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.status === 1) {
        navigate("/login");
      } else if (data.status === 0 && data.message === "Email or ID already exists") {
        alert("Sign up failed: Email or ID already exists");
      } else {
        console.error("Sign up failed");
      }
    } catch (error) {
      console.error("Error occurred during sign up:", error);
    } finally {
      setFormLoading(false);
      setFormDisabled(false);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-center p-5">
                  <img
                    src={appLogo}
                    alt="Medicare Logo"
                    style={{ width: "150px", marginBottom: "20px" }}
                  />
                  <h4>Hello! Let's get started</h4>
                  <h6 className="font-weight-light">Sign up to continue.</h6>
                  <form className="pt-3" onSubmit={handleSignUp}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your Firstname"
                        name="firstname"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your Lastname"
                        name="lastname"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your E-mail ID"
                        name="emailid"
                        onChange={handleInputChange}
                        required
                      />
                      {formErrors.emailid && (
                        <div className="text-danger">Email ID is required</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Enter Numeric User ID"
                        name="userId"
                        onChange={handleInputChange}
                        required
                      />
                      {formErrors.userId && (
                        <div className="text-danger">User ID is required</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your Phone"
                        name="phone"
                        onChange={handleInputChange}
                        required
                      />
                      {formErrors.phone && (
                        <div className="text-danger">
                          Phone must be a 10-digit number
                        </div>
                      )}
                    </div>
                    <div className="form-group position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                        name="password"
                        onChange={handleInputChange}
                        required
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: 10,
                          top: 15,
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                      {formErrors.password && (
                        <div className="text-danger">Password is required</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Confirm your password"
                        name="confirmPassword"
                        onChange={handleInputChange}
                        required
                      />
                      {formErrors.confirmPassword && (
                        <div className="text-danger">
                          Passwords must match
                        </div>
                      )}
                    </div>
                    <div className="form-check text-left mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreeCheck"
                        checked={agreed}
                        onChange={() => setAgreed(!agreed)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="agreeCheck"
                      >
                        I agree to the terms and conditions.
                      </label>
                    </div>
                    <div className="mt-3">
                      <button
                        className="btn btn-success btn-block loginbtn"
                        type="submit"
                        disabled={formDisabled || !agreed}
                      >
                        {formLoading ? "Signing Up..." : "Signup"}
                      </button>
                    </div>
                  </form>
                  <div className="mt-4 mb-2" style={linkStyle}>
                    <Link
                      to="/"
                      className="btn btn-block btn-facebook auth-form-btn"
                    >
                      Back Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
