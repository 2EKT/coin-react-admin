import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';

const Logout = () => {
  const [visible, setVisible] = useState(true); // Show modal by default
  const navigate = useNavigate();

  // ✅ Handle logout
  const handleLogout = async () => {
   const token =  localStorage.getItem('token');
    const formData = new FormData();
    formData.append('token', token);
    const data = await fetch('https://coinselection.fun/admin_api/logout.php', {
      method: 'POST',
      body: formData,
    });
    const response = await data.json();
    
    localStorage.removeItem('usernamees');
    localStorage.removeItem('passwordes');
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  return (
    <CModal visible={visible} onClose={() => navigate(-1)}> 
      <CModalHeader>
        <CModalTitle>Confirm Logout</CModalTitle>
      </CModalHeader>
      <CModalBody>Are you sure you want to log out?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => navigate(-1)}>Cancel</CButton> {/* Go Back */}
        <CButton color="danger" onClick={handleLogout}>Logout</CButton> {/* Confirm Logout */}
      </CModalFooter>
    </CModal>
  );
};

export default Logout;
