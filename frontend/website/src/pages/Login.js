import { Fragment, useState } from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import Header from "../components/Header";
import appLogo from "../images/logo.png";
export default function Login() {
  const linkStyle = {
    listStyleType: "none",
  };

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(username)) {
      try {
        const response = await fetch("http://localhost/backend/api/Login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          if (data.status === 1) {
            // Clear any existing session data
            sessionStorage.clear();

            // Redirect to MFA verification instead of directly to profile
            navigate("/MfaVerification", {
              state: {
                email: username,
                userId: data.ID,
                userType: data.UserType,
              },
            });
          } else {
            throw new Error("Login failed");
          }
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        setError("Login failed");
        console.error("Error:", error);
      }
    } else if (!isNaN(username)) {
      try {
        const response = await fetch(
          "http://localhost/backend/api/Loginid.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          if (data.status === 1) {
            // Clear any existing session data
            sessionStorage.clear();

            // Redirect to MFA verification instead of directly to profile
            navigate("/MfaVerification", {
              state: {
                email: username,
                userId: data.ID,
                userType: data.UserType,
              },
            });
          } else {
            throw new Error("Login failed");
          }
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        setError("Login failed");
        console.error("Error:", error);
      }
      console.log("Logging in with a numeric ID:", username);
    } else {
      // Invalid input, neither email nor numeric
      setError("Invalid username");
      console.log("Invalid username");
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
                    style={{
                      width: "150px",
                      marginBottom: "20px",
                    }}
                  />
                  <h4>Hello! Let's get started</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  <form
                    className="pt-3"
                    id="login"
                    method="post"
                    name="login"
                    onSubmit={handleLogin}
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter your User ID or Email"
                        required={true}
                        name="username"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                        name="password"
                        required={true}
                        onChange={handleInputChange}
                      />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}{" "}
                    {/* Display error message */}
                    <div className="mt-3" style={linkStyle}>
                      <button
                        type="submit"
                        className="btn btn-success btn-block loginbtn"
                      >
                        Login
                      </button>
                    </div>
                    <br />
                    <div className="mb-2" style={linkStyle}>
                      <CustomLink
                        to="/"
                        className="btn btn-block btn-facebook auth-form-btn"
                      >
                        Back Home
                      </CustomLink>
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                      <CustomLink
                        to="/ForgotPassword"
                        className="auth-link text-black"
                      >
                        Forgot password?
                      </CustomLink>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
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
