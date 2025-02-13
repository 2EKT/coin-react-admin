import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormSelect,
  CFormInput
} from '@coreui/react';

const WithdrawalTable = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [editingDescription, setEditingDescription] = useState(null);
  const [newDescription, setNewDescription] = useState("");

  const fetchWithdrawals = async () => {
    try {
      const response = await fetch("https://coinselection.fun/admin_api/fetch_withdrwal_all.php");
      const data = await response.json();
      setWithdrawals(data);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch('https://coinselection.fun/admin_api/update_withdrawal_status.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      setWithdrawals(withdrawals.map(w => (w.id === id ? { ...w, status } : w)));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const updateDescription = async (id, description) => {
    try {
      await fetch('https://coinselection.fun/admin_api/update_withdrawal_description.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, description })
      });
      setWithdrawals(withdrawals.map(w => (w.id === id ? { ...w, description } : w)));
      setEditingDescription(null);
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <CCard className="shadow-lg">
      <CCardHeader className="bg-primary text-white">
        <h4>Withdrawal Requests</h4>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>User Email</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              {/* <CTableHeaderCell>Actions</CTableHeaderCell> */}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {withdrawals.map((withdrawal) => (
              <CTableRow key={withdrawal.id}>
                <CTableDataCell>{withdrawal.id}</CTableDataCell>
                <CTableDataCell>{withdrawal.user_email}</CTableDataCell>
                <CTableDataCell>{withdrawal.name}</CTableDataCell>
                <CTableDataCell>{withdrawal.date}</CTableDataCell>
                <CTableDataCell>
                  <CFormSelect
                    value={withdrawal.status}
                    onChange={(e) => updateStatus(withdrawal.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </CFormSelect>
                </CTableDataCell>
                <CTableDataCell>
                  {editingDescription === withdrawal.id ? (
                    <CFormInput
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      onBlur={() => updateDescription(withdrawal.id, newDescription)}
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => { setEditingDescription(withdrawal.id); setNewDescription(withdrawal.description); }}>
                      {withdrawal.description || 'No description'}
                    </span>
                  )}
                </CTableDataCell>
                <CTableDataCell>{withdrawal.amount}</CTableDataCell>
                {/* <CTableDataCell>
                  <CButton color="danger" size="sm" onClick={() => updateStatus(withdrawal.id, 'Rejected')}>Reject</CButton>
                </CTableDataCell> */}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default WithdrawalTable;
