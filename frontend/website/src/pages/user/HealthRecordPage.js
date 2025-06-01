import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PatientSidebar from '../../components/PatientSidebar';

function HealthRecordPage() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const UserID = sessionStorage.getItem('UserID');
    if (UserID) {
      fetchAppointments(UserID);
    } else {
      alert('User ID not found.');
      sessionStorage.clear();
    }
  }, []);

  async function fetchAppointments(userID) {
    try {
      const response = await fetch(
        `http://localhost/backend/api/scheduleAppointment.php?PatientID=${userID}`
      );
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }

  async function handleDelete(appointmentId) {
    try {
      const response = await fetch(
        'http://localhost/backend/api/scheduleAppointment.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'delete',
            appointmentId: appointmentId,
          }),
        }
      );
      if (!response.ok) throw new Error('Failed to delete appointment');
      alert('Appointment cancelled');
      fetchAppointments(sessionStorage.getItem('UserID'));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  }

  return (
    <>
      <PatientSidebar />
      <div style={{ marginLeft: '250px', padding: '20px', minHeight: '100vh' }}>
        <Typography
          variant="h4"
          gutterBottom
          style={{ color: '#007bff', marginBottom: '20px', fontWeight: 'bold' }}
        >
          📝 Appointment History
        </Typography>

        {appointments.length === 0 ? (
          <Typography>No appointment history available.</Typography>
        ) : (
          appointments.map((appt) => (
            <Box
              key={appt.AppointmentID}
              border="1px solid #ccc"
              borderRadius={2}
              p={2}
              mb={2}
              bgcolor="#f9f9f9"
            >
              <Typography>
                📅 <strong>Date:</strong> {appt.AppointmentDate}
              </Typography>
              <Typography>
                ⌚ <strong>Time:</strong> {appt.TimeSlot}
              </Typography>
              <Typography>
                🩺 <strong>Doctor:</strong> {appt.DoctorName}
              </Typography>
              <Typography>
                📄 <strong>Description:</strong> {appt.Description}
              </Typography>
              <Typography>
                ✅ <strong>Status:</strong> {appt.Status}
              </Typography>

              <Box mt={2} display="flex" gap="10px">
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/AppointmentsPage?edit=${appt.AppointmentID}`)}
                >
                  Edit Appointment
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(appt.AppointmentID)}
                >
                  Cancel Appointment
                </Button>
              </Box>
            </Box>
          ))
        )}
      </div>
    </>
  );
}

export default HealthRecordPage;
