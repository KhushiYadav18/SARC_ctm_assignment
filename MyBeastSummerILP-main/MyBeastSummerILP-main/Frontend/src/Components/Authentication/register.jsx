import React, { useState } from 'react';
import '../styles/Register.css';
import Select from 'react-select';
import UseSignup from '../../hooks/useSignup';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

function Register() {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#bdd4e7",
      // match with the menu
      borderRadius: state.isFocused ? "5px 5px 5px 5px" : 5,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "black" : "black",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      width: 325,
      marginBottom: 6,
      marginTop: 0,
      padding: 0,
      paddingLeft: 15,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "black" : "black"
      }
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black',
      fontSize: 16,
      marginTop: 5,
    }),
    input: base => ({
      ...base,
      color: "black",
      height: 40,
    }),
    indicatorSeparator: base => ({
      ...base,
      display: 'none'
    }),
    dropdownIndicator: base => ({
      ...base,
      color: "black" // Custom colour
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  };

  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [program, setProgram] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleConfirmPasswordChange = (event) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);
    if (confirmPasswordValue === '') setPasswordMatch(true);
    else setPasswordMatch(password === confirmPasswordValue);
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    if (passwordValue === '') setPasswordMatch(true);
    else setPasswordMatch(passwordValue === confirmPassword);
  }

  const handleDepartmentChange = (event) => setDepartment(event.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleDegreeChange = (event) => setDegree(event.value);
  const handleProgramChange = (event) => setProgram(event.value);
  const handleContactNumberChange = (event) => setContactNumber(event.target.value);
  const handleRollNumberChange = (event) => setRollNumber(event.target.value);

  const allFieldsFilled = () => {
    return (
      department !== '' &&
      degree !== '' &&
      program !== '' &&
      name !== '' &&
      contactNumber !== '' &&
      password !== '' &&
      rollNumber !== '' &&
      confirmPassword !== '' &&
      passwordMatch
    );
  };


  const degreeOptions = [
    { value: '', label: 'Choose your Degree' },
    { value: 'FYBS', label: 'Four Year BS' },
    { value: 'BTECH', label: 'Bachelor of Technology' },
    { value: 'MTECH', label: 'Master of Technology' },
    { value: 'DD', label: 'B.Tech. + M.Tech. Dual Degree' },
    { value: 'MSC', label: 'Master of Science' },
    { value: 'PHD', label: 'Doctor of Philosophy' },
    { value: 'BDES', label: 'Bachelor of Design' },
    { value: 'MDES', label: 'Master of Design' },
    { value: 'MPHIL', label: 'Master of Philosophy' },
    { value: 'MMG', label: 'Master of Management' },
    { value: 'MSEx', label: 'M.S. (Exit Degree)' },
    { value: 'MtechEx', label: 'Master of Technology (Exit Degree)' },
    { value: 'MtechPhDDD', label: 'M.Tech. + Ph.D. Dual Degree' },
    { value: 'PC', label: 'Preparatory Course' },
    { value: 'VS', label: 'Visiting Student' },
    { value: 'MPhilEx', label: 'Master of Philosophy (Exit Degree)' },
    { value: 'MScEx', label: 'Master of Science (Exit Degree)' },
    { value: 'MScMTechDD', label: 'M.Sc. + M.Tech. Dual Degree' },
    { value: 'MScPhDDD', label: 'M.Sc. + Ph.D. Dual Degree' },
    { value: 'MPhilPhDDD', label: 'M.Phil. + Ph.D. Dual Degree' },
    { value: 'EMBA', label: 'Executive MBA' },
    { value: 'IMTECH', label: 'Integrated M.Tech.' },
    { value: 'MSCBR', label: 'Master of Science By Research' },
    { value: 'TYMSC', label: 'Two Year M.Sc.' },
    { value: 'FYIMSC', label: 'Five Year Integrated M.Sc.' },
    { value: 'DIIT', label: 'D.I.I.T.' },
    { value: 'DIITEx', label: 'D.I.T.T. (Exit Degree)' },
  ];
  
  const programOptions = [
    { value: '', label: 'Choose your program' },
    { value: 'ug', label: 'Undergraduate' },
    { value: 'dd', label: 'Dual Degree' },
    { value: 'pg', label: 'Postgraduate' },
    { value: 'idddp', label: 'Inter-Disciplinary Dual Degree' },
  ];
  
  const branchOptions = [
    { value: '', label: 'Choose your department' },
    { value: 'Aerospace Engineering', label: 'Aerospace Engineering' },
    { value: 'Animation', label: 'Animation' },
    {
      value: 'Application Software Centre',
      label: 'Application Software Centre',
    },
    { value: 'Applied Geophysics', label: 'Applied Geophysics' },
    {
      value: 'Applied Statistics and Informatics',
      label: 'Applied Statistics and Informatics',
    },
    { value: 'Biomedical Engineering', label: 'Biomedical Engineering' },
    {
      value: 'Biosciences and Bioengineering',
      label: 'Biosciences and Bioengineering',
    },
    { value: 'Biotechnology', label: 'Biotechnology' },
    {
      value: 'Centre for Aerospace Systems Design and Engineering',
      label: 'Centre for Aerospace Systems Design and Engineering',
    },
    {
      value: 'Centre for Distance Engineering Education Programme',
      label: 'Centre for Distance Engineering Education Programme',
    },
    {
      value: 'Centre for Environmental Science and Engineering',
      label: 'Centre for Environmental Science and Engineering',
    },
    {
      value: 'Centre for Formal Design and Verification of Software',
      label: 'Centre for Formal Design and Verification of Software',
    },
    {
      value: 'Centre for Research in Nanotechnology and Science',
      label: 'Centre for Research in Nanotechnology and Science',
    },
    {
      value: 'Centre for Technology Alternatives for Rural Areas',
      label: 'Centre for Technology Alternatives for Rural Areas',
    },
    {
      value: 'Centre for Urban Science and Engineering',
      label: 'Centre for Urban Science and Engineering',
    },
    {
      value: 'Centre of Studies in Resources Engineering',
      label: 'Centre of Studies in Resources Engineering',
    },
    { value: 'Chemical Engineering', label: 'Chemical Engineering' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Civil Engineering', label: 'Civil Engineering' },
    { value: 'Climate Studies', label: 'Climate Studies' },
    { value: 'Computer Centre', label: 'Computer Centre' },
    {
      value: 'Computer Science & Engineering',
      label: 'Computer Science & Engineering',
    },
    {
      value: 'Continuing Education Programme',
      label: 'Continuing Education Programme',
    },
    {
      value: 'Corrosion Science and Engineering',
      label: 'Corrosion Science and Engineering',
    },
    {
      value: 'Desai Sethi Centre for Entrepreneurship',
      label: 'Desai Sethi Centre for Entrepreneurship',
    },
    { value: 'Earth Sciences', label: 'Earth Sciences' },
    { value: 'Educational Technology', label: 'Educational Technology' },
    { value: 'Electrical Engineering', label: 'Electrical Engineering' },
    {
      value: 'Energy Science and Engineering',
      label: 'Energy Science and Engineering',
    },
    { value: 'Economics (HSS)', label: 'Economics (HSS)' },
    { value: 'Engineering Physics', label: 'Engineering Physics' },
    {
      value: 'Humanities & Social Science',
      label: 'Humanities & Social Science',
    },
    {
      value: 'IITB-Monash Research Academy',
      label: 'IITB-Monash Research Academy',
    },
    { value: 'Industrial Design Centre', label: 'Industrial Design Centre' },
    {
      value: 'Industrial Engineering and Operations Research',
      label: 'Industrial Engineering and Operations Research',
    },
    { value: 'Industrial Management', label: 'Industrial Management' },
    { value: 'Interaction Design', label: 'Interaction Design' },
    {
      value: 'Kanwal Rekhi School of Information Technology',
      label: 'Kanwal Rekhi School of Information Technology',
    },
    { value: 'Material Science', label: 'Material Science' },
    {
      value: 'Materials, Manufacturing and Modelling',
      label: 'Materials, Manufacturing and Modelling',
    },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
    {
      value: 'Metallurgical Engineering & Materials Science',
      label: 'Metallurgical Engineering & Materials Science',
    },
    {
      label: 'Mobility and Vehicle Design',
      value: 'Mobility and Vehicle Design',
    },
    {
      label: 'National Centre for Aerospace Innovation and Research',
      value: 'National Centre for Aerospace Innovation and Research',
    },
    {
      label: 'National Centre for Mathematics',
      value: 'National Centre for Mathematics',
    },
    { label: 'Physical Education', value: 'Physical Education' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Physics, Material Science', value: 'Physics, Material Science' },
    { label: 'Preparatory Course', value: 'Preparatory Course' },
    { label: 'Reliability Engineering', value: 'Reliability Engineering' },
    {
      label: 'Shailesh J. Mehta School of Management',
      value: 'Shailesh J. Mehta School of Management',
    },
    {
      label: 'Sophisticated Analytical Instrument Facility',
      value: 'Sophisticated Analytical Instrument Facility',
    },
    {
      label: 'Systems and Control Engineering',
      value: 'Systems and Control Engineering',
    },
    {
      label: 'Tata Center for Technology and Design',
      value: 'Tata Center for Technology and Design',
    },
    {
      label: 'Technology and Development',
      value: 'Technology and Development',
    },
    { label: 'Visual Communication', value: 'Visual Communication' },
    {
      label: 'Wadhwani Research Centre for Bioengineering',
      value: 'Wadhwani Research Centre for Bioengineering',
    },
    { label: 'Centre for Policy Studies', value: 'Centre for Policy Studies' },
  ];
  
  const { signup, loading, error, success } = UseSignup();

  const handleRegistration = async () => {

    const userData = {
      fullname: name,
      ldap: `${rollNumber}@iitb.ac.in`,
      dept: department,
      degree: degree,
      program: program,
      password: password,
      contact: contactNumber,
    };

    signup(userData)

  };

  const inputStyle = ['input'];
  const buttonStyle = ['button'];
  const disabledButtonStyle = ['button', 'button-disabled'];

  return (
    localStorage.getItem('accessToken') !== null ? <Navigate to="/mentorCards" /> :
      <div className='form-container'>
        <h1 className='heading'>REGISTER</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          className='input'
          required
        />
        <div className='email-input'>
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={handleRollNumberChange}
            className={inputStyle.join(' ')}
          />
          <span className='email-domain'>@iitb.ac.in</span>
        </div>
        <div className='email-input'>
          <span style={{width: '50px', marginRight: "8px", marginLeft: "-1px"}} className='email-domain'>+91</span>

          <input
            style={{ width: "100px !important" }}
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={handleContactNumberChange}
            className={inputStyle.join(' ')}
          />
        </div>
        <Select onChange={handleDepartmentChange} placeholder={<div style={{ color: "rgba(0,0,0,0.7)" }}>Department</div>} styles={customStyles} options={branchOptions} />
        <Select onChange={handleDegreeChange} placeholder={<div style={{ color: "rgba(0,0,0,0.7)" }}>Degree</div>} styles={customStyles} options={degreeOptions} />
        <Select onChange={handleProgramChange} placeholder={<div style={{ color: "rgba(0,0,0,0.7)" }}>Program</div>} styles={customStyles} options={programOptions} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className={inputStyle.join(' ')}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={inputStyle.join(' ')}
        />
        <div style={{ color: "white" }}>
          {!passwordMatch && 'Passwords do not match'}
        </div>
        <div style={{ color: "white" }}>
          {error}
        </div>
        <button
          onClick={handleRegistration}
          className={allFieldsFilled() ? buttonStyle.join(' ') : disabledButtonStyle.join(' ')}
          disabled={!allFieldsFilled()}
        >
          REGISTER
        </button>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "large" }}>
          Already Registered ? <a href="/login">Login</a>
        </div>
      </div>
  );
}

export default Register;
