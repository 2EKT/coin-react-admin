import React, { useState, useEffect } from 'react'
import {
  CCard, CCardBody, CCardHeader, CRow, CCol, CTable, CTableHead,
  CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton,
  CForm, CFormInput, CModal, CModalHeader, CModalTitle, CModalBody,
  CModalFooter ,CBadge,
  CFormSelect
} from '@coreui/react';


function Signalcomp() {
    const [signals, setSignals] = useState([]);
      const fetch_Signal = async () => {
        try {
            const response = await fetch("https://coinselection.fun/admin_api/fetch_signal.php");
            const data = await response.json();
            setSignals(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching signals:", error);
        } finally {
            // setLoading(false);
        }
      };

      const fetch_Signal_save = async () => {
        try {
           const formData = new FormData()
           formData.append(formData)
          const response = await fetch(
            'https://coinselection.fun/admin_api/fetch_withdrawal_with_id.php',
            {
              method: 'POST',
              body: formData,
            },
          )
          
            const data = await response.json();
            setSignals(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching signals:", error);
        } finally {
            // setLoading(false);
        }
      };
      let i = 1 ;
      useEffect(() => {
        fetch_Signal()
      }, [])
      const [modal, setModal] = useState(false);
      const [editData, setEditData] = useState(null);
      const [formData, setFormData] = useState({ Title : '' , Date : '' , Coin : ''  , Entry : '', TakeProfit : '' , Time : '' , StopLoss : '' , Active : '' });
    
      // Handle Form Input Change
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("hit edit");
        
      };
    
      // Add or Edit Signal
      const handleSave = () => {
        console.log(editData);
        if (editData) {
          
          setSignals(signals.map(signal => (signal.Id === editData.Id ? { ...signal, ...formData } : signal)));

        } else {
          console.log("Add new");
          // fetch_Signal_save(formData)
          setSignals([...signals, { Id: signals.length + 1, ...formData }]);
        }
        setModal(false);
        setEditData(null);
        setFormData({ Title : '' , Date : '' , Coin : ''  , Entry : '', TakeProfit : '' , Time : '' , StopLoss : '' , Active : '' });
      };
    
      // Delete Signal
      const handleDelete = (id) => {
        setSignals(signals.filter(signal => signal.Id !== id));
      };
    
      return (
        <div className="container mt-4">
          <CRow>
            <CCol md={12}>
              <CCard className="shadow-lg">
                <CCardHeader className="bg-primary text-white d-flex justify-content-between">
                  <h5>Trading Signals</h5>
                  <CButton color="success" onClick={() => { setModal(true) }}>Add New Signal</CButton>
                </CCardHeader>
                <CCardBody>
                  <CTable striped hover responsive>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell>ID</CTableHeaderCell>
                        <CTableHeaderCell>Title</CTableHeaderCell>
                        <CTableHeaderCell>Coin</CTableHeaderCell>
                        <CTableHeaderCell>Entry</CTableHeaderCell>
                        <CTableHeaderCell>Date/Time</CTableHeaderCell>
                        <CTableHeaderCell>Take Profit</CTableHeaderCell>
                        <CTableHeaderCell>Stop Loss</CTableHeaderCell>
                        <CTableHeaderCell>Active</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {signals.map(signal => (
                        <CTableRow key={signal.Id}>
                          <CTableDataCell>{i++}</CTableDataCell>
                          <CTableDataCell>{signal.Title}</CTableDataCell>
                          <CTableDataCell>{signal.Coin}</CTableDataCell>
                          <CTableDataCell>{signal.Entry}</CTableDataCell>
                          <CTableDataCell>{signal.Date} / {signal.Time} </CTableDataCell>
                          <CTableDataCell>{signal.TakeProfit}</CTableDataCell>
                          <CTableDataCell>{signal.StopLoss}</CTableDataCell>
                          <CTableDataCell> <CBadge color={signal.Active == 1  ? 'success' : 'danger'}>
                                              {signal.Active  == 1  ? 'Active' : 'Inactive'}
                                            </CBadge></CTableDataCell>
                          <CTableDataCell>
                            <CButton color="warning" size="sm" className="me-2" onClick={() => { setModal(true); setEditData(signal); setFormData(signal); }}>
                              Edit
                            </CButton>
                            <CButton color="danger" size="sm" onClick={() => handleDelete(signal.Id)}>
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
                <CFormInput className="mb-2" name="Title" value={formData.Title} onChange={handleChange} placeholder="Signal Title" />
                <CFormInput className="mb-2" name="Date" value={formData.Date} onChange={handleChange} type="date" placeholder="Date/Time" />
                <CFormInput className="mb-2" name="Coin" value={formData.Coin} onChange={handleChange} placeholder="Coin" />
                <CFormInput className="mb-2" name="Entry" value={formData.Entry} onChange={handleChange} placeholder="Entry" />
                <CFormInput className="mb-2" name="Time" value={formData.Time} onChange={handleChange} type="time" placeholder="Time" />
                <CFormInput className="mb-2" name="TakeProfit" value={formData.TakeProfit} onChange={handleChange} placeholder="Take Profit" />
                <CFormInput className="mb-2" name="StopLoss" value={formData.StopLoss} onChange={handleChange} placeholder="Stop Loss" />
                <CFormSelect 
                 aria-label="Default select example"
                 name = "Active"
                 value={formData.Active}
                 onChange={handleChange}
                 options={[
                  { label: 'Select Active or not Active' },
                  { label: 'Active', value: '1' },
                  { label: 'De-Active', value: '0' },
                ]}
                
                />
                
                
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