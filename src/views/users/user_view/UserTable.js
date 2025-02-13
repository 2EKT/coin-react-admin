import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CLink,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput
} from '@coreui/react';

const UserTable = () => {
  const [users_api, setUsersApi] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({ FirstName: '', LastName: '', Email: '', Phone: '', Country: '' });

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://coinselection.fun/admin_api/fetch_users.php");
      const data = await response.json();
      setUsersApi(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateStatus = async (id, status) => {
    status = status == 1 ? 0 : 1 ;
    console.log(status , id);
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('status',status);
      const data = await fetch('https://coinselection.fun/admin_api/update_user_status.php', {
        method: 'POST',
        body: formData,
      });
      console.log(data );
      
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
 const tongle = (id,status)=>{
  setUsersApi(users_api.map(user => (user.Id === id ? { ...user, active: !user.active } : user)));
  updateStatus(id,status)
 }
  const addUser = async () => {
    try {
      const formData = new FormData();
      Object.keys(newUser).forEach(key => formData.append(key, newUser[key]));
      await fetch('https://coinselection.fun/admin_api/add_user.php', {
        method: 'POST',
        body: formData,
      });
      fetchUsers();
      setModalVisible(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <CCard className="shadow-lg">
      <CCardHeader className="bg-primary text-white d-flex justify-content-between">
        <h4>User Table</h4>
        <CButton color="success" onClick={() => setModalVisible(true)}>Add User</CButton>
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
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users_api.map((user, index) => (
              <CTableRow key={user.Id}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{user.FirstName || 'No data'}</CTableDataCell>
                <CTableDataCell>{user.LastName || 'No data'}</CTableDataCell>
                <CTableDataCell>{user.Email || 'No data'}</CTableDataCell>
                <CTableDataCell>{user.Phone || 'No data'}</CTableDataCell>
                <CTableDataCell>{user.Country || 'No data'}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    className={user.active == 0 ? 'btn btn-danger' : 'btn btn-success'}
                    size="sm"
                    onClick={() => tongle(user.Id, user.active)}
                  >
                    {user.active != 0 ? 'Active' : 'De-Active'}
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <CLink className='btn btn-primary' href={`#/view-user/${user.Id}`}>View</CLink>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Add User Modal */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add New User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput label="First Name" value={newUser.FirstName} onChange={(e) => setNewUser({ ...newUser, FirstName: e.target.value })} />
            <CFormInput label="Last Name" value={newUser.LastName} onChange={(e) => setNewUser({ ...newUser, LastName: e.target.value })} />
            <CFormInput label="Email" type="email" value={newUser.Email} onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })} />
            <CFormInput label="Phone" value={newUser.Phone} onChange={(e) => setNewUser({ ...newUser, Phone: e.target.value })} />
            <CFormInput label="Country" value={newUser.Country} onChange={(e) => setNewUser({ ...newUser, Country: e.target.value })} />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>Cancel</CButton>
          <CButton color="primary" onClick={addUser}>Add User</CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  );
};

export default UserTable;
