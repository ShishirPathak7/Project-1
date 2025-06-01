import React, { useState, useEffect } from 'react';
import PatientSidebar from '../../components/PatientSidebar';

const PrescriptionPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const getCurrentUserId = () => {
    const storedUserId = sessionStorage.getItem('UserID');
    return storedUserId ? parseInt(storedUserId) : null;
  };

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const userId = getCurrentUserId();
        if (!userId) return;

        const response = await fetch(
          `http://localhost/backend/api/fetchPrescriptions.php?userID=${userId}`
        );
        if (!response.ok) throw new Error('Failed to fetch prescriptions');

        const data = await response.json();
        const prescriptionsWithParsedMedicines = data.map((p) => ({
          ...p,
          medicines: JSON.parse(p.medicines),
        }));
        setPrescriptions(prescriptionsWithParsedMedicines);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <>
      <PatientSidebar />
      <div
        style={{
          display: 'flex',
          marginLeft: '250px',
          minHeight: '100vh',
          backgroundColor: '#ecf1f7', // main bg
          fontFamily: 'Segoe UI, sans-serif',
        }}
      >
        {/* Sidebar Column */}
        <div
          style={{
            width: '30%',
            padding: '30px 20px',
            backgroundColor: '#d6e5f3',
            borderRight: '1px solid #bcd4e9',
          }}
        >
          <h2 style={{ color: '#3b5998', marginBottom: '25px', fontWeight: 600 }}>
            💊 My Prescriptions
          </h2>
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <div
                key={prescription.prescription_id}
                onClick={() => setSelectedPrescription(prescription)}
                style={{
                  backgroundColor:
                    selectedPrescription?.prescription_id === prescription.prescription_id
                      ? '#cfe0f1'
                      : '#ecf1f7',
                  padding: '12px 16px',
                  marginBottom: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border:
                    selectedPrescription?.prescription_id === prescription.prescription_id
                      ? '2px solid #3b5998'
                      : '1px solid #bcd4e9',
                  fontWeight: 500,
                  color: '#2c3e50',
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {prescription.name}
              </div>
            ))
          ) : (
            <p style={{ color: '#666' }}>No prescriptions available</p>
          )}
        </div>

        {/* Content Column */}
        <div style={{ flex: 1, padding: '40px' }}>
          {selectedPrescription ? (
            <div
              style={{
                backgroundColor: '#d6e5f3',
                borderRadius: '10px',
                padding: '30px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                border: '1px solid #bcd4e9',
              }}
            >
              <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>
                {selectedPrescription.name}
              </h2>

              <h4 style={{ color: '#3b5998', marginBottom: '10px' }}>Medicines</h4>
              <ul style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                {Array.isArray(selectedPrescription.medicines) &&
                  selectedPrescription.medicines.map((med, i) => (
                    <li key={i} style={{ marginBottom: '6px', color: '#333' }}>
                      {med}
                    </li>
                  ))}
              </ul>

              <div style={{ color: '#444', lineHeight: '1.6' }}>
                <p>
                  <strong>Prescribed By:</strong> {selectedPrescription.prescribedBy}
                </p>
                <p>
                  <strong>Pharmacist:</strong> {selectedPrescription.pharmacist}
                </p>
              </div>
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                marginTop: '100px',
                color: '#777',
                fontStyle: 'italic',
                fontSize: '17px',
              }}
            >
              Select a prescription to view its details.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PrescriptionPage;
