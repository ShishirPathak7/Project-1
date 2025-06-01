// AdminBilling.js – Refined UI/UX with Modern Color Scheme and Layout

import React, { useEffect, useState, Fragment } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const AdminBilling = () => {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({ name: '', patientId: '', address: '', date: today });
  const [services, setServices] = useState([{ purpose: '', amount: '' }]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const addServiceRow = () => {
    setServices([...services, { purpose: '', amount: '' }]);
  };

  const calculateTotal = () => {
    return services.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const service of services) {
      const res = await fetch("http://localhost/backend/api/adminbillings.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          patientId: form.patientId,
          address: form.address,
          date: form.date,
          purpose: service.purpose,
          amount: service.amount
        })
      });
      const result = await res.json();
      if (!res.ok || result.status !== 1) {
        alert("Error: " + result.message);
        return;
      }
    }
    alert("Billing submitted successfully");
    setForm({ name: '', patientId: '', address: '', date: today });
    setServices([{ purpose: '', amount: '' }]);
  };

  return (
    <Fragment>
      <div className="d-flex flex-column min-vh-100 bg-gradient" style={{ background: "linear-gradient(to right, #f0f4f8, #e6f0ff)" }}>
        <div className="d-flex flex-grow-1">
          <div style={{ width: '250px' }}><AdminSidebar /></div>
          <div className="flex-grow-1 p-5">
            <div className="p-4 bg-info text-white rounded shadow-sm mb-4">
              <h2 className="fw-bold mb-1">🧾 Patient Billing Form</h2>
              <p className="mb-0">Complete the billing information below.</p>
            </div>

            <div className="card shadow border-0 mb-4">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-4 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">👤 Patient Name</label>
                      <input type="text" name="name" className="form-control" value={form.name} onChange={handleFormChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">🆔 Patient ID</label>
                      <input type="text" name="patientId" className="form-control" value={form.patientId} onChange={handleFormChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">📍 Address</label>
                      <input type="text" name="address" className="form-control" value={form.address} onChange={handleFormChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">📅 Billing Date</label>
                      <input type="date" name="date" className="form-control" value={form.date} min={today} onChange={handleFormChange} required />
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="table-primary">
                        <tr><th>Service</th><th>Amount ($)</th></tr>
                      </thead>
                      <tbody>
                        {services.map((s, i) => (
                          <tr key={i}>
                            <td><input type="text" className="form-control" value={s.purpose} onChange={e => handleServiceChange(i, 'purpose', e.target.value)} required /></td>
                            <td><input type="number" className="form-control" value={s.amount} onChange={e => handleServiceChange(i, 'amount', e.target.value)} required /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button type="button" className="btn btn-outline-info" onClick={addServiceRow}>➕ Add Service</button>
                    <strong className="text-dark">Total: ${calculateTotal()}</strong>
                  </div>

                  <div className="mt-4 text-end">
                    <button type="submit" className="btn btn-primary px-4">💾 Submit Billing</button>
                  </div>
                </form>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminBilling;
