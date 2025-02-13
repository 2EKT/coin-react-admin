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
      console.log(data);
      
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      // { id, status }
      const formData = new FormData();
      formData.append('id', id);
      formData.append('status',status);
      await fetch('https://coinselection.fun/admin_api/update_withdrawal_status.php', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: formData
      });
      setWithdrawals(withdrawals.map(w => (w.id === id ? { ...w, status } : w)));
      alert("Status Update")
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const updateDescription = async (id, description) => {
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('description',description);
      await fetch('https://coinselection.fun/admin_api/update_withdrawal_description.php', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: formData
      });
      setWithdrawals(withdrawals.map(w => (w.id === id ? { ...w, description } : w)));
      setEditingDescription(null);
      alert("Description Update")
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
                    // value={withdrawal.status}
                    onChange={(e) => updateStatus(withdrawal.id, e.target.value)}
                    defaultValue={ withdrawal.status }
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
