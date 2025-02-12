import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CRow, CCol, CWidgetStatsA,CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';

const WidgetsDropdown = (props) => {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Replace this with your actual API call
    const fetchData = async () => {
      const response = {
        "result": 1,
        "total_free_users": "5",
        "total_paid_users": "1",
        "new_users": [
          { "Id": "4", "FirstName": "", "LastName": "", "Email": "b@b.com", "Phone": "" },
          { "Id": "5", "FirstName": "", "LastName": "", "Email": "v@v.com", "Phone": "" },
          { "Id": "6", "FirstName": "", "LastName": "", "Email": "f@f.com", "Phone": "" },
          { "Id": "7", "FirstName": "", "LastName": "", "Email": "", "Phone": "" },
          { "Id": "1", "FirstName": "John", "LastName": "Doe", "Email": "j@j.com", "Phone": "+1234567890" },
          { "Id": "2", "FirstName": "Jane", "LastName": "Smith", "Email": "jane.smith@example.com", "Phone": "9876543210" }
        ],
        "weekly_users": [{ "enroll_date": "2025-02-11", "user_count": "4" },{ "enroll_date": "2025-02-12", "user_count": "6" }],
        "total_announcements": "8",
        "total_todays_signals": "0"
      };

      setData(response);

      // Process weekly users data for the chart
      const labels = response.weekly_users.map(item => item.enroll_date);
      const dataPoints = response.weekly_users.map(item => parseInt(item.user_count, 10));

      setChartData({
        labels,
        datasets: [{
          label: 'Users Registered (Last 7 Days)',
          backgroundColor: '#4e73df',
          borderColor: '#4e73df',
          data: dataPoints,
        }],
      });
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CRow className={props.className} xs={{ gutter: 4 }}>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA className="pb-4" color="primary" value={data.total_free_users} title="Free Users" />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA className="pb-4" color="info" value={data.total_paid_users} title="Paid Users" />
        </CCol>
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsA className="pb-4" color="warning" value={data.total_todays_signals} title="Today's Signals" />
        </CCol>
        <CCol sm={12} xl={4} xxl={3}>
          <CWidgetStatsA className="pb-4" color="danger" value={data.total_announcements} title="Announcements" />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={6} className='p-2 border'>
          <CWidgetStatsA className='pb-2' color="danger" title="User Registration (Last 7 Days)" />
          <CChartBar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Number of Users' }, beginAtZero: true },
              },
            }}
          />
        </CCol>
        <CCol sm={6} className="p-2 border">
      <CWidgetStatsA className="pb-2" color="dark" title="New Users" />
      <CTable bordered hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.new_users.map((user, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
              <CTableDataCell>
                <strong>
                  {user.FirstName || user.LastName
                    ? `${user.FirstName} ${user.LastName}`
                    : "Anonymous User"}
                </strong>
              </CTableDataCell>
              <CTableDataCell>{user.Email}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CCol>
      </CRow>
    </>
  );
};

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
};

export default WidgetsDropdown;
