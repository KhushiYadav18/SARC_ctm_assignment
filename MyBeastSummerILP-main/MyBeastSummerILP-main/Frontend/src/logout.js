import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Logout() {

    localStorage.clear();

    return (
      <Navigate to="/" />
    )


}

export default Logout