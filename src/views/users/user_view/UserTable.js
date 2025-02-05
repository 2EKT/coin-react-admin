import React from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CLink } from '@coreui/react';

const UserTable = () => {
  // Sample test data
  const users = [
    {
      Id: 1, FirstName: 'John', LastName: 'Doe', Email: 'john@example.com', Phone: '1234567890',
      password: '******', Country: 'USA', Address: '123 Street', ImageUrl: '', WalletAmount: 500,
      TotalEarning: 1500, TotalWithdrawal: 1000, SubsType: 'Premium', SubsName: 'Gold',
      SubsStart: '2024-01-01', SubsEnd: '2024-12-31', DateEnroll: '2023-06-15', UserType: 'Member',
      Reff_ID: 'REF123', usdt_id: 'USDT001', Blank1: '', Blank2: '', Blank3: '', Blank4: ''
    },
    {
      Id: 2, FirstName: 'Jane', LastName: 'Smith', Email: 'jane@example.com', Phone: '9876543210',
      password: '******', Country: 'UK', Address: '456 Avenue', ImageUrl: '', WalletAmount: 700,
      TotalEarning: 2000, TotalWithdrawal: 1300, SubsType: 'Standard', SubsName: 'Silver',
      SubsStart: '2024-02-01', SubsEnd: '2024-12-31', DateEnroll: '2023-07-20', UserType: 'Member',
      Reff_ID: 'REF456', usdt_id: 'USDT002', Blank1: '', Blank2: '', Blank3: '', Blank4: ''
    }
  ];

  return (
    <CCard className="shadow-lg">
      <CCardHeader className="bg-primary text-white">
        <h4>User Table</h4>
      </CCardHeader>
      <CCardBody>
        <CTable striped hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>First Name</CTableHeaderCell>
              <CTableHeaderCell>Last Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Country</CTableHeaderCell>
              <CTableHeaderCell>Subscription</CTableHeaderCell>
              <CTableHeaderCell>Subs Start</CTableHeaderCell>
              <CTableHeaderCell>Subs End</CTableHeaderCell>
              <CTableHeaderCell>User Type</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map(user => (
              <CTableRow key={user.Id}>
                <CTableDataCell>{user.Id}</CTableDataCell>
                <CTableDataCell>{user.FirstName}</CTableDataCell>
                <CTableDataCell>{user.LastName}</CTableDataCell>
                <CTableDataCell>{user.Email}</CTableDataCell>
                <CTableDataCell>{user.Phone}</CTableDataCell>
                <CTableDataCell>{user.Country}</CTableDataCell>
                <CTableDataCell>{user.SubsType} ({user.SubsName})</CTableDataCell>
                <CTableDataCell>{user.SubsStart}</CTableDataCell>
                <CTableDataCell>{user.SubsEnd}</CTableDataCell>
                <CTableDataCell>{user.UserType}</CTableDataCell>
                <CTableDataCell><CLink className='btn btn-success' href='#/view-user' >View</CLink></CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default UserTable;
