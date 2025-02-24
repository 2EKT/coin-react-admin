import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CImage,
  CBadge,
} from '@coreui/react'

function Card() {
  const { id } = useParams() // Get user ID from URL
  const [user, setUser] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [withdrawals, setWithdrawals] = useState([])
  const [referrals, seteferrals] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUserById = async () => {
    try {
      const formData = new FormData()
      formData.append('id', id)

      const response = await fetch('https://coinselection.fun/admin_api/fetch_users_with_id.php', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      console.log(data[0])
      if (data[0].result != 0) {
        setUser(data[0])
      }
      // setTransactions(data.transactions || []);
      // setWithdrawals(data.withdrawals || []);
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }
  const fetchTransactionById = async () => {
    try {
      const formData = new FormData()
      formData.append('id', id)

      const response = await fetch(
        'https://coinselection.fun/admin_api/fetch_withdrawal_with_id.php',
        {
          method: 'POST',
          body: formData,
        },
      )

      const data = await response.json()
      if (data[0].result != 0) {
        setTransactions(data || [])
        setWithdrawals(data || [])
      }

      // setUser(data[0]);
      console.log('fetchdrawalById', data)
    } catch (error) {
      console.error('Error fetching With Drawal amount:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchdrawalById = async () => {
    try {
      const formData = new FormData()
      formData.append('id', id)

      const response = await fetch('https://coinselection.fun/admin_api/fetch_Payments_by_id.php', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      // console.log(data);
      
      if (data[0].result != 0) {
        // setTransactions(data || [])
        setWithdrawals(data || [])
      }

      // setUser(data[0]);
      console.log('fetchdrawalById', data)
    } catch (error) {
      console.error('Error fetching With Drawal amount:', error)
    } finally {
      setLoading(false)
    }
  }
  const fetchreferralsById = async () => {
    try {
      const formData = new FormData()
      formData.append('id', id)

      const response = await fetch(
        'https://coinselection.fun/admin_api/fetch_withreferrals_with_id.php',
        {
          method: 'POST',
          body: formData,
        },
      )

      const data = await response.json()
      if (data[0].result != 0) {
        seteferrals(data)
      }
      // console.log(data[0]);
      // setUser(data[0]);
      // setTransactions(data || []);
      // setWithdrawals(data || []);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching referrals:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchUserById()
    fetchdrawalById()
    fetchTransactionById()
    fetchreferralsById()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!user) return <p>User not found</p>

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
              <CImage
                src={'https://coinselection.fun/appApi/' + user.ImageUrl || '/default-avatar.jpg'}
                width="100"
                height="100"
                className="rounded-circle mb-3"
              />
              <h5>
                {user.FirstName} {user.LastName}
              </h5>
              <p>Email: {user.Email}</p>
              <p>Phone: {user.Phone}</p>
              <p>Address: {user.Address}</p>
              <p>Country: {user.Country}</p>
              <p>USDT ID: {user.usdt_id}</p>
              <p>Sub Type: {user.SubsType || 'No data'}</p>
              <p>Sub Name: {user.SubsName || 'No data'}</p>
              <p>Subs Start: {user.SubsStart || 'No data'}</p>
              <p>Subs End: {user.SubsEnd || 'No data'}</p>
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
              <p>
                <strong>Wallet Amount:</strong> ${user.WalletAmount}
              </p>
              <p>
                <strong>Total Earnings:</strong> ${user.TotalEarning}
              </p>
              <p>
                <strong>Total Withdrawals:</strong> ${user.TotalWithdrawal}
              </p>
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
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Amount</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {transactions.length > 0 ? (
                    transactions.map((txn) => (
                      <CTableRow key={txn.id}>
                        <CTableDataCell>{txn.date}</CTableDataCell>
                        <CTableDataCell>{txn.user_email}</CTableDataCell>
                        <CTableDataCell>${txn.amount}</CTableDataCell>
                        <CTableDataCell>{txn.status}</CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="3" className="text-center text-muted">
                        <strong>No transactions found</strong>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Withdrawals Table */}
        <CCol md={6}>
          <CCard className="shadow-lg">
            <CCardHeader className="bg-danger text-white">
              <h5>With Drawal History</h5>
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
                  {withdrawals.length > 0 ? (
                    withdrawals.map((wd) => (
                      <CTableRow key={wd.Id}>
                        <CTableDataCell>{wd.Date}</CTableDataCell>
                        <CTableDataCell>${wd.Amount}</CTableDataCell>
                        <CTableDataCell>
                          {' '}
                          <CBadge color={wd.Payment_Success == 1 ? 'success' : 'danger'}>
                            {wd.Payment_Success == 1 ? 'Success' : 'Fail'}
                          </CBadge>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="3" className="text-center text-muted">
                        <strong>No withdrawals found</strong>
                      </CTableDataCell>
                    </CTableRow>
                  )}
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
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {referrals.length > 0 ? (
                    referrals.map((rf) => (
                      <CTableRow key={rf.id}>
                        <CTableDataCell>{rf.name}</CTableDataCell>
                        <CTableDataCell>{rf.user_email}</CTableDataCell>
                        <CTableDataCell>{rf.date}</CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="3" className="text-center text-muted">
                        <strong>No referrals found</strong>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  {/* {user.referrals.length > 0 ? user.referrals.map((ref, index) => (
                  <li key={index}>{ref}</li>
                )) : <p>No referrals found</p>} */}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Card
