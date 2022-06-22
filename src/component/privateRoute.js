import React from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import LayoutStructure from './Layout';

function PrivateRoute() {
  const auth = localStorage.getItem('token'); 
  return auth ? (
    <LayoutStructure>
    <Outlet />
  </LayoutStructure>
  ) : (
    <Navigate to='/login' />
  );
}

export default PrivateRoute;
