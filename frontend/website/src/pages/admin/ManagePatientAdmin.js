import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const ManagePatientAdmin = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost/backend/api/allappointments.php');
      if (response.ok) {
        const data = await response.json();

        // ✅ Sort appointments by date descending
        data.sort((a, b) => new Date(b.AppointmentDate) - new Date(a.AppointmentDate));

        setAppointments(data);
        setError(null);
      } else {
        setError('Error fetching appointments.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch appointments.');
    }
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment.AppointmentID);
    setUpdatedData({ ...appointment });
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
    setUpdatedData({});
  };

  const handleChange = (field, value) => {
    setUpdatedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const today = new Date().toISOString().split('T')[0];
    if (updatedData.AppointmentDate < today) {
      alert('Cannot select a past date.');
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/api/allappointments.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'edit',
          ...updatedData,
          appointmentId: editingAppointment,
        }),
      });

      if (response.ok) {
        fetchAppointments();
        handleCancelEdit();
      } else {
        alert('Failed to update appointment.');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error updating appointment.');
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const response = await fetch('http://localhost/backend/api/allappointments.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateStatus', appointmentId, newStatus }),
      });
      if (response.ok) {
        fetchAppointments();
      } else {
        alert('Failed to update status.');
      }
    } catch (error) {
      console.error('Status update error:', error);
      alert('Error updating status.');
    }
  };

  const filteredAppointments = appointments.filter((appt) =>
    (appt?.PatientID?.toString() || '').includes(searchId.trim())
  );

  return (
    <div className="d-flex">
      <div style={{ width: '250px' }}>
        <AdminSidebar />
      </div>
      <div className="flex-grow-1 p-4 bg-light" style={{ minHeight: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-primary">Manage Appointments</h3>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by Patient ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="table-responsive shadow-sm rounded bg-white p-3">
          <table className="table table-hover align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Appt ID</th>
                <th>Patient ID</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment, index) => (
                  <tr key={appointment.AppointmentID}>
                    <td>{index + 1}</td>
                    <td>{appointment.AppointmentID}</td>
                    <td>{appointment.PatientID}</td>
                    <td>
                      {editingAppointment === appointment.AppointmentID ? (
                        <input
                          className="form-control"
                          value={updatedData.DoctorName || ''}
                          onChange={(e) => handleChange('DoctorName', e.target.value)}
                        />
                      ) : (
                        appointment.DoctorName
                      )}
                    </td>
                    <td>
                      {editingAppointment === appointment.AppointmentID ? (
                        <input
                          className="form-control"
                          type="date"
                          value={updatedData.AppointmentDate || ''}
                          onChange={(e) => handleChange('AppointmentDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      ) : (
                        appointment.AppointmentDate
                      )}
                    </td>
                    <td>
                      {editingAppointment === appointment.AppointmentID ? (
                        <input
                          className="form-control"
                          value={updatedData.TimeSlot || ''}
                          onChange={(e) => handleChange('TimeSlot', e.target.value)}
                        />
                      ) : (
                        appointment.TimeSlot
                      )}
                    </td>
                    <td>
                      <select
                        className={`form-select text-center fw-bold ${
                          appointment.Status === 'Cancelled'
                            ? 'text-danger'
                            : appointment.Status === 'Completed'
                            ? 'text-success'
                            : 'text-primary'
                        }`}
                        value={appointment.Status}
                        onChange={(e) =>
                          handleStatusUpdate(appointment.AppointmentID, e.target.value)
                        }
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      {editingAppointment === appointment.AppointmentID ? (
                        <>
                          <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Save</button>
                          <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <button
                          className="btn btn-outline-dark btn-sm"
                          style={{
                            backgroundColor: '#e6f0ff',
                            borderColor: '#b3d1ff',
                            color: '#004080',
                          }}
                          onClick={() => handleEditClick(appointment)}
                        >
                          ✏️ Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-muted">No appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagePatientAdmin;
