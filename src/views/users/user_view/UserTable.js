import React ,{useState,useEffect} from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CLink } from '@coreui/react';

const UserTable = () => {
  // Sample test data
const [users_api, setusers_api] = useState([]);
// const [disp,setdisp]=useState(false);

const fetchUsers = async () => {
  try {
      const response = await fetch("https://coinselection.fun/admin_api/fetch_users.php");
      const data = await response.json();
      setusers_api(data);
      console.log(data);
  } catch (error) {
      console.error("Error fetching signals:", error);
  } finally {
      // setLoading(false);
  }
};
useEffect(()  => {
  // console.log(disp);
//  console.log( );
fetchUsers();
  
}, []);
let i = 1 ;


  return (
    <CCard className="shadow-lg">
      <CCardHeader className="bg-primary text-white">
        <h4>User Table </h4>
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
              <CTableHeaderCell>Subscription</CTableHeaderCell>
              <CTableHeaderCell>Subs Start</CTableHeaderCell>
              <CTableHeaderCell>Subs End</CTableHeaderCell>
              <CTableHeaderCell>User Type</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users_api.map(user => (
              <CTableRow key={user.Id}>
                <CTableDataCell>{i++}</CTableDataCell>
                <CTableDataCell>{user.FirstName == '' ? 'no data' : user.FirstName }</CTableDataCell>
                <CTableDataCell>{user.LastName == '' ? 'no data' : user.LastName }</CTableDataCell>
                <CTableDataCell>{user.Email == '' ? 'no data' : user.Email}</CTableDataCell>
                <CTableDataCell>{user.Phone == '' ? 'no data' :user.Phone}</CTableDataCell>
                <CTableDataCell>{user.Country == '' ? 'no data' : user.Country}</CTableDataCell>
                <CTableDataCell>{user.SubsType} </CTableDataCell>
                <CTableDataCell>{user.SubsStart}</CTableDataCell>
                <CTableDataCell>{user.SubsEnd}</CTableDataCell>
                <CTableDataCell>{user.UserType}</CTableDataCell>
                <CTableDataCell><CLink className='btn btn-success' href={`#/view-user/${user.Id}`}  >View</CLink></CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default UserTable;
