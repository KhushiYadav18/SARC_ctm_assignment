import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function UserRestrictedRoute() {
    const accessToken = localStorage.getItem('accessToken');
    return (
        accessToken ? <Outlet /> : <Navigate to="/register" />
    );
}

export default UserRestrictedRoute;