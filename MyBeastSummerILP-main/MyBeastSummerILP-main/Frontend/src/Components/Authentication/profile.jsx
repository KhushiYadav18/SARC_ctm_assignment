import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                setMessage('You are not logged in. Please log in first.');
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/auth/profile/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data) {
                    setProfileData(response.data);
                } else {
                    setMessage('Failed to fetch profile data.');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setMessage('An error occurred while fetching profile data.');
            }
        };

        fetchProfile();
    }, []);

    if (message) {
        return <div>{message}</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            {profileData ? (
                <div>
                    <p>Name: {profileData.name}</p>
                    <p>Roll Number: {profileData.roll_number}</p>
                    <p>Email: {profileData.personal_email}</p>
                    <p>LinkedIn: {profileData.linkedin}</p>
                    <p>Resume Link: {profileData.resume_link}</p>
                    <p>ASC SS Link: {profileData.asc_ss_link}</p>
                    <p>Projects: {profileData.projects}</p>
                    <p>Internships: {profileData.internships}</p>
                    <p>Positions of Responsibility: {profileData.pors}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
