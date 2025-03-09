

import React, { useEffect, useState } from 'react';
import '../AlumCard/Card.css';
import UseEditProfile from '../../hooks/useEditProfile';
import UseFetchProfile from '../../hooks/useFetchProfile';

function PersonalInfo() {
  const [profile, setProfile] = useState({
    linkedin: '',
    personal_email: '',
    asc_ss_link: '',
    projects: '',
    internships: '',
    pors: '',
    resume_link: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };


  const { editProfile, loading, error, success } = UseEditProfile();
  const { fetchProfile, fetchedProfile } = UseFetchProfile();

 


  const handleSubmit = (event) => {

    const accessToken = localStorage.getItem('accessToken');
    profile.accessToken = accessToken;

    editProfile(profile);
  };

  const [check, setCheck] = useState(false);
  const [error1, setError1] = useState(null);


  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };


  useEffect(() => {
    setError1(validateEmail(profile.personal_email) ? null : "Please enter a valid email address");
    if(!error1){
      setCheck(true);
    }else{
      setCheck(false);
    }
  }, [profile])


  useEffect(() => {
    fetchProfile();
  }, [])

  useEffect(() => {
    if (fetchedProfile) {
      const newProfile = {
        linkedin: fetchedProfile?.linkedin,
        personal_email: fetchedProfile?.personal_email,
        sop: fetchedProfile?.sop,
        resume_link: fetchedProfile?.resume_link,
        asc_ss_link: fetchedProfile?.asc_ss_link,
        projects: fetchedProfile?.projects,
        internships: fetchedProfile?.internships,
        pors: fetchedProfile?.pors,
      }
      setProfile(newProfile);
      console.log(fetchedProfile);
    }
  }, [fetchedProfile])


  const styles = {

    '@media (max-width: 600px)': {
      formContainer: {
        width: '90%', // Adjust width for smaller screens
        padding: '10px', // Decrease padding for smaller screens
      },
      profilelabel: {
        flexBasis: '100%', // Full width for labels on mobile
        marginBottom: '5px', // Reduce spacing between label and input
        fontSize: '10px !important'
      },
      profileinput: {
        width: '100%', // Full width for input fields on mobile
      },
      textarea: {
        width: '100%', // Full width for textareas on mobile
      },
      submitButton: {
        width: '100%', // Full width for submit button on mobile
      },
      headingContainer: {
        margin: '10vh 20vw !important',
      }
    },

    profileformArea: {
      color: 'white',
      fontFamily: "'Source Sans Pro', 'Roboto', sans-serif",
      textAlign: 'center', // Align the content to the center
      padding: '20px',
    },
    formContainer: {
      margin: '0 auto',
      padding: '20px',
      width: '80%',
      backgroundColor: '#000',
      borderRadius: '20px',
    },
    headingContainer: {
      textAlign: 'center',
      marginBottom: '20px', // Add space below the heading
      backgroundColor: '#3D52D5',
      boxShadow: '0px 0px 3px 7px #FFF',
      borderRadius: '10vw',
      margin: '10vh 37vw',
      fontSize: '32px',
      padding: '10px',
    },
    profHead: {
      textDecoration: 'none', // Remove underline from the text itself
    },
    constituents: {
      display: 'flex', // Use flex to place label and input on the same line
      alignItems: 'center', // Vertically center the content
      margin: '10px 0', // Add space between label and input field
    },
    profilelabel: {
      flexBasis: '30%', // Adjust the label width as needed
      marginRight: '10px',
      color: "#fff",
      fontSize: '20px'
    },
    input: {
      flexBasis: '70%', // Adjust the input width as needed
      border: 'none',
      borderBottom: '1px solid #ccc',
      padding: '5px',
      borderRadius: '1rem',
      outline: 'none',
      backgroundColor: "#BDD4E7",
      color: "#000",
      fontSize: '20px'
    },
    textarea: {
      width: '100%',
      border: 'none',
      borderBottom: '1px solid #ccc',
      padding: '10px',
      borderRadius: '2rem',
      outline: 'none',

      backgroundColor: "#BDD4E7",
      height: '150px'
    },
    textCenter: {
      textAlign: 'center',
      marginBottom: '20px',
      marginTop: '40px',
    },
    submitButton: {
      margin: '10px',
      width: '150px',
      padding: '12px',
      backgroundColor: '#3D52D5',
      border: 'none',
      borderRadius: '10px',
      color: '#FFF',
      fontSize: '16px',
    },
  };

  return (
    <div className="profileform-area" style={styles.profileformArea}>
      <div className="heading-container" style={styles.headingContainer}>
        Personal Information
      </div>
      <div className="profileformmain">
        <div className="profileform-container" style={styles.formContainer}>
          <div className="pinfo align-items-center">
            <div className="pinfo-constituents" style={styles.constituents}>
              <label htmlFor="Field9" style={styles.profilelabel}>LinkedIn Profile Link*:</label>
              <input
                id="Field9"
                name="linkedin"
                type="text"
                className="field text fn"
                value={profile.linkedin}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div className="pinfo-constituents" style={styles.constituents}>
              <label htmlFor="Field10" style={styles.profilelabel}>Personal Email*:</label>
              <input
                id="Field10"
                name="personal_email"
                type="email"
                className="field text fn"
                value={profile.personal_email}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>
          </div>


          <div style={styles.textCenter}>
            <label htmlFor="Field6" style={styles.profilelabel}>
             Projects Done (Mention in brief)*:
            </label>
          </div>


          <div>
            <textarea
              id="Field6"
              name="projects"
              spellCheck="true"
              rows="5"
              cols="30"
              value={profile.projects}
              onChange={handleInputChange}
              style={styles.textarea}
              required
            />
          </div>

          <div style={styles.textCenter}>
            <label htmlFor="Field7" style={styles.profilelabel}>
             Internship Experience (Mention in brief)*:
            </label>
          </div>

          <div>
            <textarea
              id="Field7"
              name="internships"
              spellCheck="true"
              rows="5"
              cols="30"
              value={profile.internships}
              onChange={handleInputChange}
              style={styles.textarea}
              required
            />
          </div>

          <div style={styles.textCenter}>
            <label htmlFor="Field8" style={styles.profilelabel}>
              PORs (Mention in brief)*:
            </label>
          </div>

          <div>
            <textarea
              id="Field8"
              name="pors"
              spellCheck="true"
              rows="5"
              cols="30"
              value={profile.pors}
              onChange={handleInputChange}
              style={styles.textarea}
              required
            />
          </div>


          <div className="pinfo-constituents" style={styles.constituents}>
              <label htmlFor="Field11" style={styles.profilelabel}>ASC Screenshot link*:</label>
              <input
                id="Field11"
                name="asc_ss_link"
                type="url"
                className="field text fn"
                value={profile.asc_ss_link}
                onChange={handleInputChange}
                style={{...styles.input, color:"blue", textDecoration:"underline"}}
                required
              />
            </div>

          <div className="pinfo-constituents" style={styles.constituents}>
              <label htmlFor="Field12" style={styles.profilelabel}>Resume Drive Link*:</label>
              <input
                id="Field12"
                name="resume_link"
                type="url"
                className="field text fn"
                value={profile.resume_link}
                onChange={handleInputChange}
                style={{...styles.input, color:"blue", textDecoration:"underline"}}
                required
              />
            </div>


          {error1 && <div style={{ color: "red" }}>{error1}</div>}




          <div style={styles.textCenter}>
            <button disabled={!check} onClick={handleSubmit} className="submit-button" style={styles.submitButton}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;


