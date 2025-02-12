import React, { useEffect, useState } from 'react';
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
} from '@coreui/react';

const SubscriptionPlan = () => {
  const [plans, setPlans] = useState([]);
  const [modal, setModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ id: '', title: '', package: '', amount: '', days: '', date: '' });

  useEffect(() => {
    fetchPlans();
  }, []);

  // Fetch plans from API
  const fetchPlans = async () => {
    const response = await fetch('https://coinselection.fun/admin_api/select_plan.php');
    const data = await response.json();
    console.log(data);

    setPlans(data);
  };

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open Add/Edit Modal
  const openModal = (plan = null) => {
    if (plan) {
      setForm({
        id: plan.Id, 
        title: plan.Title, 
        package: plan.Packege,  // Fixed incorrect spelling
        amount: plan.Amount, 
        days: plan.Days, 
        date: plan.Date
      });
      setEditMode(true);
    } else {
      setForm({ id: '', title: '', package: '', amount: '', days: '', date: '' });
      setEditMode(false);
    }
    setModal(true);
  };

  // Save or Update Subscription Plan
  const handleSave = async () => {
    const url = editMode
      ? `https://coinselection.fun/admin_api/update_plan.php?id=${form.id}`
      : 'https://coinselection.fun/admin_api/save_plan.php';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (result[0].result === "1") {
        fetchPlans();
        setModal(false);
      } else {
        alert("Failed to save subscription.");
      }
    } catch (e) {
      console.error("Error saving plan:", e);
      alert("Something went wrong.");
    }
  };

  // Delete Plan
  const handleDelete = async (id) => {
    const response = await fetch(`https://coinselection.fun/admin_api/delete_plan.php?id=${id}`, {
      method: 'GET'
    });

    const result = await response.json();

    if (result[0].result === "1") {
      fetchPlans();
    }
  };

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
              <CTableRow key={plan.Id}>
                <CTableDataCell>{plan.Id}</CTableDataCell>
                <CTableDataCell>{plan.Title}</CTableDataCell>
                <CTableDataCell>{plan.Packege}</CTableDataCell> {/* Fixed spelling */}
                <CTableDataCell>{plan.Amount}</CTableDataCell>
                <CTableDataCell>{plan.Days}</CTableDataCell>
                <CTableDataCell>{plan.Date}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="warning" size="sm" onClick={() => openModal(plan)}>Edit</CButton>{' '}
                  <CButton color="danger" size="sm" onClick={() => handleDelete(plan.Id)}>Delete</CButton> {/* Fixed ID reference */}
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
  );
};

export default SubscriptionPlan;
