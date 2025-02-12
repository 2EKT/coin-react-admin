import React, { useState, useEffect } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormLabel,
  CForm
} from '@coreui/react'

const SubscriptionPlan = () => {
  // Dummy data

  const fetchUsers = async () => {
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
  const initialPlans = [
    { id: 1, title: 'Basic Plan', package: 'Silver', amount: '$10', days: 30, date: '2025-02-01' },
    { id: 2, title: 'Premium Plan', package: 'Gold', amount: '$25', days: 60, date: '2025-02-05' },
    { id: 3, title: 'Elite Plan', package: 'Platinum', amount: '$50', days: 90, date: '2025-02-10' },
  ]

  const [plans, setPlans] = useState(initialPlans)
  const [modal, setModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ id: '', title: '', package: '', amount: '', days: '', date: '' })

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Open Add/Edit Modal
  const openModal = (plan = null) => {
    if (plan) {
      setForm(plan)
      setEditMode(true)
    } else {
      setForm({ id: '', title: '', package: '', amount: '', days: '', date: '' })
      setEditMode(false)
    }
    setModal(true)
  }

  // Save New or Updated Plan
  const handleSave = () => {
    if (editMode) {
      setPlans(plans.map((p) => (p.id === form.id ? form : p)))
    } else {
      setPlans([...plans, { ...form, id: plans.length + 1 }])
    }
    setModal(false)
  }

  // Delete Plan
  const handleDelete = (id) => {
    setPlans(plans.filter((p) => p.id !== id))
  }

  return (
    <CCard>
      <CCardHeader>
        <h5>Subscription Plans</h5>
        <CButton color="primary" onClick={() => openModal()}>Add Plan</CButton>
      </CCardHeader>
      <CCardBody>
        <CTable bordered striped responsive>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>Package</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Days</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {plans.map((plan) => (
              <CTableRow key={plan.id}>
                <CTableDataCell>{plan.id}</CTableDataCell>
                <CTableDataCell>{plan.title}</CTableDataCell>
                <CTableDataCell>{plan.package}</CTableDataCell>
                <CTableDataCell>{plan.amount}</CTableDataCell>
                <CTableDataCell>{plan.days}</CTableDataCell>
                <CTableDataCell>{plan.date}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="warning" size="sm" onClick={() => openModal(plan)}>Edit</CButton>{' '}
                  <CButton color="danger" size="sm" onClick={() => handleDelete(plan.id)}>Delete</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Add/Edit Modal */}
      <CModal visible={modal} onClose={() => setModal(false)}>
        <CModalHeader>
          <CModalTitle>{editMode ? 'Edit' : 'Add'} Subscription Plan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel>Title</CFormLabel>
              <CFormInput type="text" name="title" value={form.title} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Package</CFormLabel>
              <CFormInput type="text" name="package" value={form.package} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Amount</CFormLabel>
              <CFormInput type="text" name="amount" value={form.amount} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Days</CFormLabel>
              <CFormInput type="number" name="days" value={form.days} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <CFormLabel>Date</CFormLabel>
              <CFormInput type="date" name="date" value={form.date} onChange={handleChange} />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModal(false)}>Cancel</CButton>
          <CButton color="primary" onClick={handleSave}>{editMode ? 'Update' : 'Add'}</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  )
}

export default SubscriptionPlan
