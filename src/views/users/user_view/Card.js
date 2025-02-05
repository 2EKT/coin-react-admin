import React from 'react'
import { 
    CCard, CCardBody, CCardHeader, CRow, CCol, CTable, CTableHead, 
    CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CImage 
  } from '@coreui/react';

function Card() {
//   return (
//     <div>Card</div>
//   )
    // Fake User Data
    const user = {
      image: '/src/assets/images/avatars/2.jpg', // Profile Image Placeholder
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      address: '123 Main Street, NY, USA',
      country: 'USA',
      walletAmount: 500,
      totalEarning: 2000,
      totalWithdrawal: 1500,
      referrals: ['Mike Ross', 'Rachel Zane', 'Harvey Specter']
    };
  
    // Fake Transactions Data
    const transactions = [
      { id: 1, date: '2025-02-01', type: 'Deposit', amount: 200 },
      { id: 2, date: '2025-01-28', type: 'Purchase', amount: -150 },
      { id: 3, date: '2025-01-20', type: 'Deposit', amount: 300 },
    ];
  
    // Fake Withdrawals Data
    const withdrawals = [
      { id: 1, date: '2025-01-15', amount: 500, status: 'Completed' },
      { id: 2, date: '2025-01-10', amount: 300, status: 'Pending' },
    ];
  
    return (
      <div className="container mt-4">
        <CRow>
          {/* Profile Card */}
          <CCol md={6}>
            <CCard className="shadow-lg">
              <CCardHeader className="bg-primary text-white">
                <h5>Profile</h5>
              </CCardHeader>
              <CCardBody className="text-center">
                <CImage src={user.image} width="100" height="100" className="rounded-circle mb-3" />
                <h5>{user.firstName} {user.lastName}</h5>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Address: {user.address}</p>
                <p>Country: {user.country}</p>
              </CCardBody>
            </CCard>
          </CCol>
  
          {/* Financial Summary Card */}
          <CCol md={6}>
            <CCard className="shadow-lg">
              <CCardHeader className="bg-success text-white">
                <h5>Financial Summary</h5>
              </CCardHeader>
              <CCardBody>
                <p><strong>Wallet Amount:</strong> ${user.walletAmount}</p>
                <p><strong>Total Earnings:</strong> ${user.totalEarning}</p>
                <p><strong>Total Withdrawals:</strong> ${user.totalWithdrawal}</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
  
        <CRow className="mt-4">
          {/* Transactions Table */}
          <CCol md={6}>
            <CCard className="shadow-lg">
              <CCardHeader className="bg-warning text-white">
                <h5>Transaction History</h5>
              </CCardHeader>
              <CCardBody>
                <CTable striped hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Date</CTableHeaderCell>
                      <CTableHeaderCell>Type</CTableHeaderCell>
                      <CTableHeaderCell>Amount</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {transactions.map(txn => (
                      <CTableRow key={txn.id}>
                        <CTableDataCell>{txn.date}</CTableDataCell>
                        <CTableDataCell>{txn.type}</CTableDataCell>
                        <CTableDataCell>${txn.amount}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
  
          {/* Withdrawals Table */}
          <CCol md={6}>
            <CCard className="shadow-lg">
              <CCardHeader className="bg-danger text-white">
                <h5>Withdrawal History</h5>
              </CCardHeader>
              <CCardBody>
                <CTable striped hover responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Date</CTableHeaderCell>
                      <CTableHeaderCell>Amount</CTableHeaderCell>
                      <CTableHeaderCell>Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {withdrawals.map(wd => (
                      <CTableRow key={wd.id}>
                        <CTableDataCell>{wd.date}</CTableDataCell>
                        <CTableDataCell>${wd.amount}</CTableDataCell>
                        <CTableDataCell>{wd.status}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
  
        <CRow className="mt-4">
          {/* Referral Card */}
          <CCol md={12}>
            <CCard className="shadow-lg">
              <CCardHeader className="bg-info text-white">
                <h5>Referrals</h5>
              </CCardHeader>
              <CCardBody>
                <ul>
                  {user.referrals.map((ref, index) => (
                    <li key={index}>{ref}</li>
                  ))}
                </ul>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    );

}

export default Card