import React , { useState } from 'react'
import { 
    CCard, CCardBody, CCardHeader, CRow, CCol, CTable, CTableHead, 
    CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, 
    CForm, CFormInput, CFormTextarea, CModal, CModalHeader, 
    CModalTitle, CModalBody, CModalFooter 
  } from '@coreui/react';
function Announcements_comp() {
    const [announcements, setAnnouncements] = useState([
        { id: 1, title: 'New Course Launch', description: 'Exciting new course available.', videoVisible: false, videoUrl: 'https://www.youtube.com/embed/YTxEI6nClFc' },
        { id: 2, title: 'System Update', description: 'Maintenance on 5th Feb.', videoVisible: true, videoUrl: 'https://www.youtube.com/embed/YTxEI6nClFc' }
      ]);
    
      const [modal, setModal] = useState(false);
      const [editData, setEditData] = useState(null);
      const [formData, setFormData] = useState({ title: '', description: '', videoUrl: '' });
    
      // Handle Form Input Change
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      // Add or Edit Announcement
      const handleSave = () => {
        if (editData) {
          setAnnouncements(announcements.map(a => (a.id === editData.id ? { ...a, ...formData } : a)));
        } else {
          setAnnouncements([...announcements, { id: announcements.length + 1, ...formData, videoVisible: false }]);
        }
        setModal(false);
        setEditData(null);
        setFormData({ title: '', description: '', videoUrl: '' });
      };
    
      // Delete Announcement
      const handleDelete = (id) => {
        setAnnouncements(announcements.filter(a => a.id !== id));
      };
    
      // Toggle Video Visibility
      const toggleVideo = (id) => {
        setAnnouncements(announcements.map(a => (a.id === id ? { ...a, videoVisible: !a.videoVisible } : a)));
      };
  return (
    <div className="container mt-4">
    <CRow>
      <CCol md={12}>
        <CCard className="shadow-lg">
          <CCardHeader className="bg-primary text-white d-flex justify-content-between">
            <h5>Announcements</h5>
            <CButton color="success" onClick={() => setModal(true)}>Add New</CButton>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>ID</CTableHeaderCell>
                  <CTableHeaderCell>Title</CTableHeaderCell>
                  <CTableHeaderCell>Description</CTableHeaderCell>
                  <CTableHeaderCell>Video</CTableHeaderCell>
                  <CTableHeaderCell>Video URl </CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {announcements.map(announcement => (
                  <CTableRow key={announcement.id}>
                    <CTableDataCell>{announcement.id}</CTableDataCell>
                    <CTableDataCell>{announcement.title}</CTableDataCell>
                    <CTableDataCell>{announcement.description}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color={announcement.videoVisible ? 'danger' : 'success'} size="sm" onClick={() => toggleVideo(announcement.id)}>
                        {announcement.videoVisible ? 'Hide' : 'Show'}
                      </CButton>
                      {/* {announcement.videoVisible && (
                        <iframe width="200" height="100" src={announcement.videoUrl} title="Announcement Video" className="mt-2"></iframe>
                      )} */}
                    </CTableDataCell>
                    <CTableDataCell>
                    {announcement.videoUrl}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" size="sm" className="me-2" onClick={() => { setModal(true); setEditData(announcement); setFormData(announcement); }}>
                        Edit
                      </CButton>
                      <CButton color="danger" size="sm" onClick={() => handleDelete(announcement.id)}>
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
        <CModalTitle>{editData ? 'Edit Announcement' : 'Add Announcement'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput className="mb-2" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <CFormTextarea className="mb-2" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <CFormInput className="mb-2" name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="Video URL" />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setModal(false)}>Cancel</CButton>
        <CButton color="primary" onClick={handleSave}>Save</CButton>
      </CModalFooter>
    </CModal>
  </div>
  )
}

export default Announcements_comp