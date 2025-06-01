import "./css/adminStyle.css";
import "./css/chat.css";
import "./css/component.css";
import "./css/default.css";
import "./css/style.css";

import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/Footer";

//MainPages
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Services from "./pages/Services";

//User Authentication
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import MfaVerification from "./pages/MfaVerification";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import VerifyResetOTP from "./pages/VerifyResetOTP";

import Chat from "./pages/chat";

import AdminBilling from "./pages/admin/AdminBilling";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProfileAdmin from "./pages/admin/AdminProfile";
import DataOversight from "./pages/admin/DataOversight";
import ManageHealthAdmins from "./pages/admin/ManageHealthAdmins";
import ManageHealthcareProviders from "./pages/admin/ManageHealthcareProviders";
import ManagePatientAdmin from "./pages/admin/ManagePatientAdmin";
import ManagePharmacistAdmin from "./pages/admin/ManagePharmacistAdmin";

import PharmacistPersonalRecords from "./pages/Pharmacist/PharmacistPersonalRecords";
import PharmacistPrescriptionForm from "./pages/Pharmacist/PharmacistPrescriptionForm";
import PharmacistProfile from "./pages/Pharmacist/PharmacistProfile";

import FacilitiesPage from "./pages/HealthAdministrator/FacilitiesPage";
import HAdminDataOversight from "./pages/HealthAdministrator/HAdminDataOversight";
import HAdminManageHealthcareProviders from "./pages/HealthAdministrator/HAdminManageHealthcareProviders";
import HAdminManagePharmacistAdmin from "./pages/HealthAdministrator/HAdminManagePharmacistAdmin";
import ProfileHealthAdministrator from "./pages/HealthAdministrator/ProfileHealthAdministrator";

import HealthcareProviderAddBlog from "./pages/HealthcareProvider/HealthcareProviderAddBlog";
import HealthcareProviderCommunity from "./pages/HealthcareProvider/HealthcareProviderCommunity";
import HealthcareProviderDashboard from "./pages/HealthcareProvider/HealthcareProviderDashboard";
import HealthcareProviderMyBlogs from "./pages/HealthcareProvider/HealthcareProviderMyBlogs";
import HealthcareProviderProfile from "./pages/HealthcareProvider/HealthcareProviderProfile";
import HealthcareProviderSingleBlogPage from "./pages/HealthcareProvider/HealthcareProviderSingleBlogPage";
import ManageAppointments from "./pages/HealthcareProvider/ManageAppointments";
import PersonalRecords from "./pages/HealthcareProvider/PersonalRecords";
import PrescriptionForm from "./pages/HealthcareProvider/PrescriptionForm";

//PatientPages
import AppointmentsPage from "./pages/user/AppointmentsPage";
import HealthRecordPage from "./pages/user/HealthRecordPage";
import MedicationReminder from "./pages/user/MedicationReminder";
import PatientProfile from "./pages/user/patient-profile";
import PatientAddBlog from "./pages/user/PatientAddBlog";
import PatientCommunity from "./pages/user/PatientCommunity";
import PatientMyBlogs from "./pages/user/PatientMyBlogs";
import PatientPrescription from "./pages/user/PatientPrescription";
import PatientSingleBlogPage from "./pages/user/PatientSingleBlogPage";
import SymptomChecker from "./pages/user/SymptomChecker";
// import Billing from './pages/admin/AdminBilling';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Services" element={<Services />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/VerifyOTP" element={<VerifyOTP />} />
        <Route path="/VerifyResetOTP" element={<VerifyResetOTP />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/MfaVerification" element={<MfaVerification />} />

        <Route path="/Chat" element={<Chat />} />

        <Route path="/ManagePatientAdmin" element={<ManagePatientAdmin />} />
        <Route
          path="/ManagePharmacistAdmin"
          element={<ManagePharmacistAdmin />}
        />
        <Route
          path="/ManageHealthcareProviders"
          element={<ManageHealthcareProviders />}
        />
        <Route path="/ManageHealthAdmins" element={<ManageHealthAdmins />} />
        <Route path="/ProfileAdmin" element={<ProfileAdmin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminBilling" element={<AdminBilling />} />
        <Route path="/DataOversight" element={<DataOversight />} />

        <Route path="/PharmacistProfile" element={<PharmacistProfile />} />
        <Route
          path="/PharmacistPrescriptionForm"
          element={<PharmacistPrescriptionForm />}
        />
        <Route
          path="/PharmacistPersonalRecords"
          element={<PharmacistPersonalRecords />}
        />

        <Route
          path="/ProfileHealthAdministrator"
          element={<ProfileHealthAdministrator />}
        />
        <Route path="/FacilitiesPage" element={<FacilitiesPage />} />
        <Route path="/HAdminDataOversight" element={<HAdminDataOversight />} />
        <Route
          path="/HAdminManageHealthcareProviders"
          element={<HAdminManageHealthcareProviders />}
        />
        <Route
          path="/HAdminManagePharmacistAdmin"
          element={<HAdminManagePharmacistAdmin />}
        />

        <Route
          path="/HealthcareProviderProfile"
          element={<HealthcareProviderProfile />}
        />
        <Route path="/PrescriptionForm" element={<PrescriptionForm />} />
        <Route path="/ManageAppointments" element={<ManageAppointments />} />
        <Route path="/PersonalRecords" element={<PersonalRecords />} />
        <Route
          path="/HealthcareProviderCommunity"
          element={<HealthcareProviderCommunity />}
        />
        <Route
          path="/HealthcareProviderSingleBlogPage/:id"
          element={<HealthcareProviderSingleBlogPage />}
        />
        <Route
          path="/HealthcareProviderMyBlogs"
          element={<HealthcareProviderMyBlogs />}
        />
        <Route
          path="/HealthcareProviderAddBlog"
          element={<HealthcareProviderAddBlog />}
        />
        <Route
          path="/HealthcareProviderDashboard"
          element={<HealthcareProviderDashboard />}
        />

        <Route path="/PatientProfile" element={<PatientProfile />} />
        <Route path="/HealthRecordPage" element={<HealthRecordPage />} />
        <Route path="/SymptomChecker" element={<SymptomChecker />} />
        <Route path="/MedicationReminder" element={<MedicationReminder />} />
        <Route path="/AppointmentsPage" element={<AppointmentsPage />} />
        <Route path="/PatientCommunity" element={<PatientCommunity />} />
        <Route
          path="/PatientSingleBlogPage/:id"
          element={<PatientSingleBlogPage />}
        />
        <Route path="/PatientMyBlogs" element={<PatientMyBlogs />} />
        <Route path="/PatientAddBlog" element={<PatientAddBlog />} />
        <Route path="/PatientPrescription" element={<PatientPrescription />} />
      </Routes>
      <Fab
        component={Link}
        to="/MedicationReminder"
        color="primary"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <NotificationsIcon />
      </Fab>
      <Footer />
    </Router>
  );
}

export default App;
