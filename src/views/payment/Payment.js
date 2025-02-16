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
  CBadge
} from '@coreui/react';

const Payment = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch("https://coinselection.fun/admin_api/fetch_Payments.php");
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return (
    <CCard className="shadow-lg">
      <CCardHeader className="bg-primary text-white d-flex justify-content-between">
        <h4>Payments Table</h4>
        <CButton color="success" onClick={fetchPayments}>Refresh</CButton>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Payment ID</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Payment By</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Payment Success</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {payments.map((payment, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{payment.Id}</CTableDataCell>
                <CTableDataCell>{payment.Date}</CTableDataCell>
                <CTableDataCell>{payment.Payment_id}</CTableDataCell>
                <CTableDataCell>{payment.Email}</CTableDataCell>
                <CTableDataCell>{payment.Payment_by}</CTableDataCell>
                <CTableDataCell>${payment.Amount}</CTableDataCell>
                  <CTableDataCell>
                                  <CBadge color={payment.Payment_Success == 1  ? 'success' : 'danger'}>
                                    {payment.Payment_Success  == 1  ? 'Success' : 'Fail'}
                                  </CBadge>
                                </CTableDataCell>
                {/* <CTableDataCell>{payment.Payment_Success == 1 ? 'Yes' : 'No'}</CTableDataCell> */}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default Payment;
