import React, { useState, useEffect } from 'react'
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCard, CCardBody, CCardHeader, CBadge } from '@coreui/react';



const DataTable = () => {
  
  const fetch_referrals = async () => {
    try {
        const response = await fetch("https://coinselection.fun/admin_api/fetch_withreferrals.php");
        const data = await response.json();
        setusers_api(data);
        console.log(data);
    } catch (error) {
        console.error("Error fetching signals:", error);
    } finally {
        // setLoading(false);
    }
  };
  let i = 1 ;
  const [users_api, setusers_api] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch_referrals();
    setLoading(false);
    }, []);

  return (
    <CCard>
      <CCardHeader>
        <h5>User Affiliate</h5>
      </CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Active</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users_api.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{i++}</CTableDataCell>
                <CTableDataCell>{item.email}</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.date}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={item.active == 1  ? 'success' : 'danger'}>
                    {item.active  == 1  ? 'Active' : 'Inactive'}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>{item.amount}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default DataTable;
