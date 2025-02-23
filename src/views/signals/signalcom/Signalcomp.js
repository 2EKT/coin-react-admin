import React, { useState, useEffect } from 'react';
import {
  CCard, CCardBody, CCardHeader, CRow, CCol, CTable, CTableHead,
  CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton,
  CForm, CFormInput, CModal, CModalHeader, CModalTitle, CModalBody,
  CModalFooter, CBadge, CFormSelect
} from '@coreui/react';

function SignalComp() {
    const [signals, setSignals] = useState([]);
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({ Title: '', Date: '', Coin: '', Entry: '', TakeProfit: '', Time: '', StopLoss: '', Active: '' ,Blank1:null });
    const [editData, setEditData] = useState(null);

    const fetchSignals = async () => {
        try {
            const response = await fetch("https://coinselection.fun/admin_api/fetch_signal.php");
            const data = await response.json();
            setSignals(data);
        } catch (error) {
            console.error("Error fetching signals:", error);
        }
    };
    const handleChange_file = (e) => {
      const { name, value, files } = e.target;
      if (files) {
          setFormData({ ...formData, Blank1: files[0] });
      } else {
          setFormData({ ...formData, [name]: value });
      }
  };
    useEffect(() => {
        fetchSignals();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        console.log("Form Data:", formData); // Debugging line
        try {
            const method = editData ? 'POST' : 'POST';
            const url = editData ? `https://coinselection.fun/admin_api/update_signal.php?id=${editData.Id}` : "https://coinselection.fun/admin_api/insertsignal.php";
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            const response = await fetch(url, {
                method: 'POST',
                body: formDataToSend,
            }); 
            // const response = await fetch(url, {
            //     method,
            //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //     body: new URLSearchParams(formData).toString(),
            // });

            const data = await response.json();
            console.log(data);
            
            if (response.ok) {
                alert(editData ? 'Signal updated successfully!' : 'Signal added successfully!');
                fetchSignals(); // Refresh the signal list
                setModal(false);
                setEditData(null);
                setFormData({ Title: '', Date: '', Coin: '', Entry: '', TakeProfit: '', Time: '', StopLoss: '', Active: '' ,Blank1:null});
            } else {
                const errorData = await response.json();
                alert(`Error saving signal1: ${errorData.error || 'Please try again.'}`);
            }
        } catch (error) {
            console.error("Error saving signal:", error);
            alert('Error saving signal. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this signal?")) {
            try {
                const response = await fetch(`https://coinselection.fun/admin_api/delete_signal.php?id=${id}`, { method: 'POST' });

                if (response.ok) {
                    alert('Signal deleted successfully!');
                    fetchSignals(); // Refresh the signal list
                } else {
                    alert('Error deleting signal. Please try again.');
                }
            } catch (error) {
                console.error("Error deleting signal:", error);
                alert('Error deleting signal. Please try again.');
            }
        }
    };

    return (
        <div className="container mt-4">
          <CRow>
            <CCol md={12}>
              <CCard className="shadow-lg">
                <CCardHeader className="bg-primary text-white d-flex justify-content-between">
                  <h5>Trading Signals</h5>
                  <CButton color="success" onClick={() => { setModal(true); setFormData({ Title: '', Date: '', Coin: '', Entry: '', TakeProfit: '', Time: '', StopLoss: '', Active: '' }); setEditData(null); }}>Add New Signal</CButton>
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
                        <CTableHeaderCell>Image</CTableHeaderCell>
                        <CTableHeaderCell>Active</CTableHeaderCell>
                        <CTableHeaderCell>Actions</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {signals.map((signal, index) => (
                        <CTableRow key={signal.Id}>
                          <CTableDataCell>{index + 1}</CTableDataCell>
                          <CTableDataCell>{signal.Title}</CTableDataCell>
                          <CTableDataCell>{signal.Coin}</CTableDataCell>
                          <CTableDataCell>{signal.Entry}</CTableDataCell>
                          <CTableDataCell>{signal.Date} / {signal.Time}</CTableDataCell>
                          <CTableDataCell>{signal.TakeProfit}</CTableDataCell>
                          <CTableDataCell>{signal.StopLoss}</CTableDataCell>
                          <CTableDataCell><CTableDataCell><img src={"https://coinselection.fun/admin_api/"+signal.Blank1} alt="Signal" width="50" /></CTableDataCell></CTableDataCell>
                          <CTableDataCell><CBadge color={signal.Active == 1 ? 'success' : 'danger'}>{signal.Active == 1 ? 'Active' : 'Inactive'}</CBadge></CTableDataCell>
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
                <CFormInput className="mb-2" name="Blank1" type="file" onChange={handleChange_file} />
                <CFormSelect 
                 aria-label="Default select example"
                 name="Active"
                 value={formData.Active}
                 onChange={handleChange}
                 options={[
                  { label: 'Select Active or not Active', value: '' },
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

export default SignalComp;
