import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/users/Users'));
const Announcement = React.lazy(() => import('./views/announcement/Announcement'));
const Signals = React.lazy(() => import('./views/signals/Signals'));
const Affiliate = React.lazy(() => import('./views/affiliate/Affiliate'));
const Payment = React.lazy(() => import('./views/payment/Payment'));
const Setting = React.lazy(() => import('./views/setting/Setting'));
const User_view = React.lazy(() => import('./views/users/View_Users'));
const Logout = React.lazy(() => import('./views/logout/Logout'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: 'Users', element: Users },
  { path: '/announcement', name: 'Announcement', element: Announcement },
  { path: '/signals', name: 'Signals', element: Signals },
  { path: '/affiliate', name: 'Affiliate', element: Affiliate },
  { path: '/payment', name: 'Payment', element: Payment },
  { path: '/setting', name: 'Setting', element: Setting },
  { path: '/view-user', name: 'User-View', element: User_view },
  { path: '/logout', name: 'Logout', element: Logout },
];

export default routes;
