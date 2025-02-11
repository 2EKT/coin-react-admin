import React from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCard, CCardBody, CCardHeader, CBadge } from '@coreui/react';

const dummyData = [
  { id: 1, email: 'john@example.com', name: 'John Doe', date: '2024-02-09', active: true, amount: '$100' },
  { id: 2, email: 'jane@example.com', name: 'Jane Smith', date: '2024-02-08', active: false, amount: '$150' },
  { id: 3, email: 'alice@example.com', name: 'Alice Johnson', date: '2024-02-07', active: true, amount: '$200' },
  { id: 4, email: 'bob@example.com', name: 'Bob Williams', date: '2024-02-06', active: false, amount: '$50' },
];

const DataTable = () => {
  return (
    <CCard>
      <CCardHeader>
        <h5>User Referral</h5>
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
            {dummyData.map((item) => (
              <CTableRow key={item.id}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>{item.email}</CTableDataCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.date}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={item.active ? 'success' : 'danger'}>
                    {item.active ? 'Active' : 'Inactive'}
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
