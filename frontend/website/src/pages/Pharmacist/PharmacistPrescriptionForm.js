import React, { useState, useEffect } from 'react';
import PharmacistSidebar from '../../components/PharmacistSidebar';

export default function PrescriptionForm() {
  const [patients, setPatients] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedPharmacist, setSelectedPharmacist] = useState('');
  const [medicineList, setMedicineList] = useState(['']);
  const [prescriptionName, setPrescriptionName] = useState('');
  const [prescribedBy, setPrescribedBy] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPatients();
    fetchPharmacists();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost/backend/api/getpatients.php');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchPharmacists = async () => {
    try {
      const response = await fetch('http://localhost/backend/api/getpharmacists.php');
      const data = await response.json();
      setPharmacists(data);
    } catch (error) {
      console.error('Error fetching pharmacists:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPatient) {
      setErrorMessage('Patient is required.');
      return;
    }

    const userId = parseInt(selectedPatient, 10);
    const cleanedMedicines = medicineList.map((m) => m.trim().replace(/\r?\n|\r/g, ''));

    const pharmacistObj = pharmacists.find((p) => p.ID === selectedPharmacist);
    const pharmacistFullName = pharmacistObj
      ? `${pharmacistObj.FirstName} ${pharmacistObj.LastName}`
      : '';

    const data = {
      user_id: userId,
      pharmacist: pharmacistFullName,
      prescribedBy,
      medicines: cleanedMedicines,
      name: prescriptionName,
    };

    try {
      const response = await fetch('http://localhost/backend/api/createPrescription.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('✅ Prescription added successfully.');
        setErrorMessage('');
        setSelectedPatient('');
        setSelectedPharmacist('');
        setMedicineList(['']);
        setPrescriptionName('');
        setPrescribedBy('');
      } else {
        setErrorMessage(result);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('❌ Failed to add prescription.');
      setSuccessMessage('');
    }
  };

  const addMedicine = () => setMedicineList([...medicineList, '']);

  const handleMedicineChange = (index, value) => {
    const updated = [...medicineList];
    updated[index] = value;
    setMedicineList(updated);
  };

  return (
    <>
      <PharmacistSidebar />
      <div style={{ background: '#eaf4fc', minHeight: '100vh', padding: '2rem' }}>
        <div
          style={{
            maxWidth: '750px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
          }}
        >
          <h2 style={{ color: '#007bff', marginBottom: '20px', textAlign: 'center' }}>
            📝 Create Prescription
          </h2>

          {successMessage && <div style={successStyle}>{successMessage}</div>}
          {errorMessage && <div style={errorStyle}>{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <FormGroup label="Select Patient">
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                style={inputStyle}
              >
                <option value="">-- Select Patient --</option>
                {patients.map((p) => (
                  <option key={p.ID} value={p.ID}>
                    {p.FirstName} {p.LastName}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup label="Select Pharmacist">
              <select
                value={selectedPharmacist}
                onChange={(e) => setSelectedPharmacist(e.target.value)}
                style={inputStyle}
              >
                <option value="">-- Select Pharmacist --</option>
                {pharmacists.map((ph) => (
                  <option key={ph.ID} value={ph.ID}>
                    {ph.FirstName} {ph.LastName}
                  </option>
                ))}
              </select>
            </FormGroup>

            <FormGroup label="Prescribed By">
              <input
                type="text"
                value={prescribedBy}
                onChange={(e) => setPrescribedBy(e.target.value)}
                placeholder="Dr. John Doe"
                style={inputStyle}
              />
            </FormGroup>

            <FormGroup label="Prescription Name">
              <input
                type="text"
                value={prescriptionName}
                onChange={(e) => setPrescriptionName(e.target.value)}
                placeholder="e.g. BP Control, Flu Medication"
                style={inputStyle}
              />
            </FormGroup>

            <FormGroup label="Medicines">
              {medicineList.map((medicine, index) => (
                <input
                  key={index}
                  type="text"
                  value={medicine}
                  placeholder={`Medicine ${index + 1}`}
                  onChange={(e) => handleMedicineChange(index, e.target.value)}
                  style={{ ...inputStyle, marginBottom: '10px' }}
                />
              ))}
              <button
                type="button"
                onClick={addMedicine}
                style={{
                  ...btnStyle,
                  backgroundColor: '#28a745',
                  marginTop: '5px',
                  fontWeight: 'bold',
                }}
              >
                + Add More Medicine
              </button>
            </FormGroup>

            <button type="submit" style={submitBtnStyle}>
              💊 Submit Prescription
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const FormGroup = ({ label, children }) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>{label}</label>
    {children}
  </div>
);

// 💠 Styles
const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #ced4da',
  fontSize: '1rem',
};

const btnStyle = {
  padding: '8px 12px',
  borderRadius: '6px',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
};

const submitBtnStyle = {
  ...btnStyle,
  backgroundColor: '#007bff',
  padding: '12px',
  width: '100%',
  fontSize: '1.1rem',
  marginTop: '10px',
};

const successStyle = {
  color: '#155724',
  backgroundColor: '#d4edda',
  border: '1px solid #c3e6cb',
  padding: '10px',
  borderRadius: '6px',
  marginBottom: '15px',
};

const errorStyle = {
  color: '#721c24',
  backgroundColor: '#f8d7da',
  border: '1px solid #f5c6cb',
  padding: '10px',
  borderRadius: '6px',
  marginBottom: '15px',
};

