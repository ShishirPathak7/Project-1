// ✅ AppointmentsPage.js – Updated UI/UX Design with Modern Look and Branding Harmony

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/system';
import { useSearchParams } from 'react-router-dom';
import PatientSidebar from '../../components/PatientSidebar';

const Content = styled('div')({
  marginLeft: '250px',
  padding: '30px',
  backgroundColor: '#f0f4f8',
  minHeight: '100vh',
  fontFamily: 'Segoe UI, sans-serif',
});

const AppointmentsPage = () => {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [description, setDescription] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState('');
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [availableTimeSlots] = useState(getAvailableTimeSlots());
  const [doctors] = useState([
    { id: 1, firstName: 'Dr. Rachel Patel' },
    { id: 2, firstName: 'Dr. Javier Hernandez' },
    { id: 3, firstName: 'Dr. Fatima Khan' },
    { id: 4, firstName: 'Dr. Andrej Petrov' },
    { id: 5, firstName: 'Dr. Mei Chen' },
  ]);

  useEffect(() => {
    const UserID = sessionStorage.getItem('UserID');
    if (UserID) {
      setUserId(UserID);
      fetchAppointments(UserID);

      if (editId) {
        fetch(`http://localhost/backend/api/scheduleAppointment.php?AppointmentID=${editId}`)
          .then((res) => res.json())
          .then((data) => {
            const appt = data[0];
            setDate(appt.AppointmentDate);
            setTimeSlot(appt.TimeSlot);
            setDoctorId(doctors.find((d) => d.firstName === appt.DoctorName)?.id || '');
            setDescription(appt.Description);
          })
          .catch((err) => console.error('Error loading appointment:', err));
      }
    } else {
      alert('UserID is not available.');
      sessionStorage.clear();
    }
  }, [editId]);

  const fetchAppointments = async (userID) => {
    try {
      const response = await fetch(`http://localhost/backend/api/scheduleAppointment.php?PatientID=${userID}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('Error fetching appointments');
    }
  };

  const isWeekend = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isPastDateTime = (dateStr, timeStr) => {
    const now = new Date();
    const appointmentDateTime = new Date(`${dateStr} ${convertTo24Hour(timeStr)}`);
    return appointmentDateTime < now;
  };

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    return `${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isWeekend(date)) {
      alert('Appointments cannot be booked on Saturday or Sunday.');
      return;
    }

    if (isPastDateTime(date, timeSlot)) {
      alert('Cannot book appointments in the past.');
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/api/scheduleAppointment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          patientId: userId,
          doctorName: doctors.find((doc) => doc.id === parseInt(doctorId))?.firstName,
          appointmentDate: date,
          timeSlot: timeSlot,
          description: description,
        }),
      });
      if (!response.ok) throw new Error('Failed to book the appointment');
      alert('Appointment booked successfully');
      clearForm();
      fetchAppointments(userId);
    } catch (error) {
      console.error('Error handling appointment:', error);
      alert('Error handling appointment');
    }
  };

  const clearForm = () => {
    setDate('');
    setTimeSlot('');
    setDoctorId('');
    setDescription('');
  };

  function getAvailableTimeSlots() {
    const times = [];
    for (let hour = 10; hour <= 16; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const hour12 = hour > 12 ? hour - 12 : hour;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const minuteStr = minutes.toString().padStart(2, '0');
        times.push(`${hour12}:${minuteStr} ${ampm}`);
      }
    }
    return times;
  }

  return (
    <>
      <PatientSidebar />
      <Content>
        <Container maxWidth="md">
          <Typography variant="h4" style={{ color: '#263238', fontWeight: '700', marginBottom: '20px' }}>
            🗓️ Book an Appointment
          </Typography>

          <Card variant="outlined" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <Typography variant="subtitle1" fontWeight="600">
                    🩺 Doctor
                  </Typography>
                  <Select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    required
                    fullWidth
                  >
                    {doctors.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <Typography variant="subtitle1" fontWeight="600">
                    🕒 Time Slot
                  </Typography>
                  <Select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    required
                    fullWidth
                  >
                    {availableTimeSlots.map((slot) => (
                      <MenuItem key={slot} value={slot}>
                        {slot}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <Typography variant="subtitle1" fontWeight="600">
                    📅 Date
                  </Typography>
                  <TextField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ min: new Date().toISOString().split('T')[0] }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <Typography variant="subtitle1" fontWeight="600">
                    📝 Reason for Visit
                  </Typography>
                  <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    required
                    placeholder="Briefly describe your symptoms or reason for visit"
                  />
                </div>

                <Button type="submit" variant="contained" style={{ backgroundColor: '#1976d2', color: 'white', fontWeight: '600' }}>
                  {editId ? 'Update Appointment' : 'Book Appointment'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Content>
    </>
  );
};

export default AppointmentsPage;
