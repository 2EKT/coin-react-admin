import React, { useState } from 'react';
import {
  CCard, CCardBody, CCardHeader, CRow, CCol, CTable, CTableHead,
  CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton,
  CForm, CFormInput, CModal, CModalHeader, CModalTitle, CModalBody,
  CModalFooter
} from '@coreui/react';


function Signalcomp() {
    const [signals, setSignals] = useState([
        { id: 1, title: 'Gold Buy', dateTime: '2025-02-03 14:00', takeProfit: '2000', stopLoss: '1950' },
        { id: 2, title: 'EUR/USD Sell', dateTime: '2025-02-04 10:30', takeProfit: '1.0850', stopLoss: '1.0920' }
      ]);
    
      const [modal, setModal] = useState(false);
      const [editData, setEditData] = useState(null);
      const [formData, setFormData] = useState({ title: '', dateTime: '', takeProfit: '', stopLoss: '' });
    
      // Handle Form Input Change
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      // Add or Edit Signal
      const handleSave = () => {
        if (editData) {
          setSignals(signals.map(signal => (signal.id === editData.id ? { ...signal, ...formData } : signal)));
        } else {
          setSignals([...signals, { id: signals.length + 1, ...formData }]);
        }
        setModal(false);
        setEditData(null);
        setFormData({ title: '', dateTime: '', takeProfit: '', stopLoss: '' });
      };
    
      // Delete Signal
      const handleDelete = (id) => {
        setSignals(signals.filter(signal => signal.id !== id));
      };
    
      return (
        <div className="container mt-4">
          <CRow>
            <CCol md={12}>
              <CCard className="shadow-lg">
                <CCardHeader className="bg-primary text-white d-flex justify-content-between">
                  <h5>Trading Signals</h5>
                  <CButton color="success" onClick={() => setModal(true)}>Add New Signal</CButton>
                </CCardHeader>
                <CCardBody>
                  <CTable striped hover responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>ID</CTableHeaderCell>
                        <CTableHeaderCell>Title</CTableHeaderCell>
                        <CTableHeaderCell>Date/Time</CTableHeaderCell>
                        <CTableHeaderCell>Take Profit</CTableHeaderCell>
                        <CTableHeaderCell>Stop Loss</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {signals.map(signal => (
                        <CTableRow key={signal.id}>
                          <CTableDataCell>{signal.id}</CTableDataCell>
                          <CTableDataCell>{signal.title}</CTableDataCell>
                          <CTableDataCell>{signal.dateTime}</CTableDataCell>
                          <CTableDataCell>{signal.takeProfit}</CTableDataCell>
                          <CTableDataCell>{signal.stopLoss}</CTableDataCell>
                          <CTableDataCell>
                            <CButton color="warning" size="sm" className="me-2" onClick={() => { setModal(true); setEditData(signal); setFormData(signal); }}>
                              Edit
                            </CButton>
                            <CButton color="danger" size="sm" onClick={() => handleDelete(signal.id)}>
                              Delete
                            </CButton>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
    
          {/* Add/Edit Modal */}
          <CModal visible={modal} onClose={() => setModal(false)}>
            <CModalHeader>
              <CModalTitle>{editData ? 'Edit Signal' : 'Add Signal'}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm>
                <CFormInput className="mb-2" name="title" value={formData.title} onChange={handleChange} placeholder="Signal Title" />
                <CFormInput className="mb-2" name="dateTime" value={formData.dateTime} onChange={handleChange} type="datetime-local" placeholder="Date/Time" />
                <CFormInput className="mb-2" name="takeProfit" value={formData.takeProfit} onChange={handleChange} placeholder="Take Profit" />
                <CFormInput className="mb-2" name="stopLoss" value={formData.stopLoss} onChange={handleChange} placeholder="Stop Loss" />
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setModal(false)}>Cancel</CButton>
              <CButton color="primary" onClick={handleSave}>Save</CButton>
            </CModalFooter>
          </CModal>
        </div>
      );
}

export default Signalcomp