import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function VerifyUser() {
    const { key } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [verificationError, setVerificationError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const csrfTokenMatch = document.cookie.match(/csrftoken=([^;]+)/);
        const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : 'DUMMY_CSRF_TOKEN';

        axios.post('http://127.0.0.1:8000/api/authentication/verify-user', {token: key}, {
            headers: {
                'Content-Type': 'application/json',
                // Include CSRF token in headers
                'X-CSRFToken': csrfToken,
              },
        })

        .then((response) =>{
          if(response){
            Swal.fire({
                title: 'Verification Successful',
                text: 'You can now login',
                width: 600,
                icon:'success',
                padding: '3em',
                background: '#fff',
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("https://media.tenor.com/-AyTtMgs2mMAAAAi/nyan-cat-nyan.gif")
                  left bottom 
                  no-repeat
                `
              }).then(result => {
                if(result.isConfirmed) {
                  window.location.href = "/login"
                }
              })
          }else{
            Swal.fire({
                title: 'Verification Failed',
                text: 'Please contact the team',
                icon: 'error',
                confirmButtonText: 'OK'
              }).then(result => {
                if (result.isConfirmed) {
                  window.location.href = '/#team'
                }
              });
          }
          setVerificationError(false);
        })

        
        .catch((error) => {
          Swal.fire({
            title: 'Verification Failed',
            text: 'Please contact the team',
            icon: 'error',
            confirmButtonText: 'OK'
          }).then(result => {
            if (result.isConfirmed) {
              window.location.href = '/#team'
            }
          });
            setVerificationError(true);
        })

       
    }, []);



    return (
      <Navigate to="/" />
    )


}

export default VerifyUser