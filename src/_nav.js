import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilPeople,
  cilBullhorn,
  cilSignalCellular3,
  cilExternalLink,
  cilMoney,
  cilSettings,
  cilExitToApp,
  cilList,
  cilShare,  // Added icon for Referral
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Management',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Announcement',
    to: '/announcement',
    icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Signals',
    to: '/signals',
    icon: <CIcon icon={cilSignalCellular3} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'WithDrawal',
    to: '/with-drawal',
    icon: <CIcon icon={cilExternalLink} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: '/payment',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Subscription-Plan',
    to: '/subscription-plan',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Affiliate',  // Added Referral Section
    to: '/referral',
    icon: <CIcon icon={cilShare} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Settings',
  //   to: '/setting',
  //   icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: <CIcon icon={cilExitToApp} customClassName="nav-icon" />,
  },
]

export default _nav
