// DataOversight.js – View Patient Billing Records with Date Search

import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const DataOversight = () => {
  const [records, setRecords] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await fetch("http://localhost/backend/api/adminbillings.php");
      const data = await res.json();
      const list = data.patients || [];
      setRecords(list);
    } catch (err) {
      console.error("Failed to load records:", err);
    }
  };

  const filtered = records.filter(r => (r.date || '').includes(searchDate));

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div style={{ width: '250px', backgroundColor: '#f8f9fa' }}>
        <AdminSidebar />
      </div>
      <div className="flex-grow-1 bg-light p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-primary">Patient Billing Records</h2>
          <input
            type="date"
            className="form-control w-25"
            placeholder="Search by Date"
            value={searchDate}
            onChange={e => setSearchDate(e.target.value)}
          />
        </div>

        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Purpose</th>
              <th>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.date}</td>
                <td>{r.purpose}</td>
                <td>{r.amount}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan="4" className="text-center text-muted">No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataOversight;