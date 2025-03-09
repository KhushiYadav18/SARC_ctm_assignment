
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import './Card.css';
import { ShoesDetails } from "./shoesDetails";
import UseFetchProjects from "../../hooks/useFetchProjects";
import UseAddToWishlist from "../../hooks/useAddToWishlist";
import UseDeleteFromWishlist from "../../hooks/useDeleteFromWishlist";
import Swal from "sweetalert2";
import UseFetchWishlist from "../../hooks/useFetchWishlist";
import UseRegisterProjects from "../../hooks/useRegisterProjects";

const cardData = [
    {
        name: 'Mohit Yadav',
        company: 'Amazon',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    // Add more objects for other cards
];

const CardWrapper = styled.div`
  margin: 20px auto;
`;

const CardContainer = styled(motion.div)`
  width: 285px ;
  height: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
  background-color: #1d1f21;
  color: #fff;
  position: relative;
  cursor: grab;
  left: -20px; /* Add margin for spacing */
`;

const CircleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 50%;
  overflow: hidden;
  border-top-right-radius: 25px;
`;

const Circle = styled.div`
  position: absolute;
  width: 490px;
  height: 250px;
  z-index: 5;
  background-color: aqua;
  border-radius: 50%;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  height: 200px;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  padding: 1em 15px;
`;

const BottomContainer = styled.div`
  display: flex;
  height: 100px !important;
`;

const NikeText = styled.h1`
  color: #fff;
  text-transform: uppercase;
  margin: 0;
  z-index: 10;
  font-size: 76px;
  font-weight: 900;
`;

const ShoesWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Shoes = styled(motion.div)`
  width: auto;
  height: 190px;
  z-index: 99;
  user-select: none;
  margin-right: 3em;
  margin-top: 2em;

  img {
    // width: auto;
    height: 25%;
    user-select: none;
    position: absolute; /* Set the position type to absolute */
    top: 10px; /* Adjust the top distance according to your needs */
    left:-90px;
  }
`;

export default function WishList(props) {


    const [profile, setProfile] = useState({
        pref1: "",
        pref2: "",
        pref3: "",
        pref4: "",
        pref5: "",
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const [check, setCheck] = useState(false);
    const [showError, setShowError] = useState(null);
    const [same, setSame] = useState(null);

    useEffect(() => {
        if (profile.pref1 === '' && profile.pref2 === '' && profile.pref3 === '' && profile.pref4 === '' && profile.pref5 === '') {
            setCheck(false)
        }
        else {
            if (profile.pref1 !== '' && (profile.pref1 === profile.pref2 || profile.pref1 === profile.pref3 || profile.pref1 === profile.pref4 || profile.pref1 === profile.pref5)
                || profile.pref2 !== '' && (profile.pref2 === profile.pref3 || profile.pref2 === profile.pref4 || profile.pref2 === profile.pref5)
                || profile.pref3 !== '' && (profile.pref3 === profile.pref4 || profile.pref3 === profile.pref5)
                || profile.pref4 !== '' && (profile.pref4 === profile.pref5)) {
                setSame("Please enter different preferences")
                setCheck(false)
            } else {
                setSame(null)
                setCheck(true)
            }
        }
    }, [profile.pref1, profile.pref2, profile.pref3, profile.pref4, profile.pref5, profile])


    const FIELDS = [
        ['analytics', 'Analytics'],
        ['civil_services', 'Civil Services/Govt. of India'],
        ['core_engineering', 'Core engineering'],
        ['design', 'Design'],
        ['finance', 'Finance'],
        ['it', 'IT'],
        ['management', 'Management'],
        ['management_consulting', 'Management consulting'],
        ['marketing', 'Marketing'],
        ['product_management', 'Product Management'],
        ['research', 'Research'],
        ['strategy_consulting', 'Strategy consulting'],
        ['entrepreneurship', 'Entrepreneurship'],
        ['other', 'Other'],
    ]


    const { fetchProjects, setError, loading, error, projects, setProjects } = UseFetchWishlist();
    const { deleteProject } = UseDeleteFromWishlist();
    const { registerProjects, error: registerError, success } = UseRegisterProjects(props);

    const styles = {

        '@media (max-width: 768px)': {
            formContainer: {
                width: '90%', // Adjust width for smaller screens
                padding: '10px', // Decrease padding for smaller screens
            },
            profilelabel: {
                flexBasis: '100%', // Full width for labels on mobile
                marginBottom: '5px', // Reduce spacing between label and input
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
        },

        profileformArea: {
            backgroundColor: '#000',
            color: 'white',
            fontFamily: "'Source Sans Pro', 'Roboto', sans-serif",
            textAlign: 'center', // Align the content to the center
            padding: '20px',
            width: "100vw"
        },
        formContainer: {
            margin: '0 7%',
            marginleft: '10px !important',
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
            width: "300px"
        },
        profHead: {
            textDecoration: 'none', // Remove underline from the text itself
        },
        constituents: {
            display: 'flex', // Use flex to place label and input on the same line
            alignItems: 'center', // Vertically center the content
            margin: '5px 0', // Add space between label and input field
            width: "100%"
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
        },
        submitButton: {
            margin: '10px',
            width: '200px',
            padding: '15px',
            backgroundColor: '#3D52D5',
            border: 'none',
            borderRadius: '10px',
            color: '#FFF',
            fontSize: '20px',
        },
    };


    useEffect(() => {
        fetchProjects();
    }, [])





    async function handleSubmit() {
        try {
            const accessToken = localStorage.getItem('accessToken');
            profile.accessToken = accessToken;

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You can register only once",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes register!',
                cancelButtonText: 'No, cancel!',
            }).then((result) => {
                if (result.isConfirmed) {


                    registerProjects(profile);
                    if (success) {
                        Swal.fire(
                            'Registered!',
                            'You have successfully registered your preferences.',
                            'success'
                        )
                    }

                }
            })

        } catch (err) {
            console.log(err);
        }
    }



    async function deleteFromWishlist(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to remove this mentor from wishlist",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteProject(id);
                const newProjects = [...projects];
                let something = newProjects.filter((mentor) => mentor.id == id)[0];
                newProjects.splice(newProjects.indexOf(something), 1);
                setProjects(newProjects);
                Swal.fire(
                    'Removed!',
                    'Mentor has been removed from wishlist.',
                    'success'
                )
            }
        })
    }



    if (loading) {
        return <>
            <div className="loader-container">
                <div className="loader"></div>
            </div></>
    }



    if (!projects || projects.length == 0) {
        return <div className="loader-container">
            <h2 style={{ color: "white" }}>No Projects in the wishlist</h2>
        </div>
    }





    return (


        <div>



            <div style={{ justifyContent: "center", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "5%" }}>
                <p className="noteHeading" style={{ color: "black", fontSize: '24px', marginLeft: "20px", marginRight: "20px", textDecoration:"underline" }}>
                    Adding projects to the wishlist won't register you for the projects; you need to register for 5 projects on this page.
                </p>
                <button disabled={true} style={{ padding: "10px", margin: "30px", marginTop: "50px", width: "200px", cursor: "pointer" }}>
                    Deadline Gone!</button>
                </div>
            <div className="projectsContainer">

                {projects && projects.map((project, index) => {

                    console.log(project)
                    return (<>
                        {
                            index % 2 === 0 ? (<div className="project-card-container">
                                <div className="project-card-left">

                                    <p style={{ color: "pink", fontSize: "20px", fontWeight: "bolder" }}>Project ID: {project.id}</p>



                                    {project.prerequisites !== '' && <p><strong style={{ fontWeight: "bolder" }}>Prerequisites:</strong> {project.prerequisites}</p>}


                                    {project.city_of_posting !== '' && <p><strong style={{ fontWeight: "bolder" }}>City of Posting:</strong> {project.city_of_posting}</p>}

                                    {project.stipend_per_month !== '' && <p><strong style={{ fontWeight: "bolder" }}>Stipend (Per month):</strong> {project.stipend_per_month}</p>}


                                    {project.duration_weeks !== '' && <p><strong style={{ fontWeight: "bolder" }}>Duration (in weeks):</strong> {project.duration_weeks}</p>}



                                    {project.accommodation_provided !== '' && <p><strong style={{ fontWeight: "bolder" }}>Accommodation:</strong>{project.accommodation_provided}</p>}


                                    {project.travel_expenses_covered !== '' && <p><strong style={{ fontWeight: "bolder" }}>Travelling Expenses:</strong> {project.travel_expenses_covered}</p>}

                                    {project.project_deliverables !== '' && <p><strong style={{ fontWeight: "bolder" }}>Project Deliverables:</strong> {project.project_deliverables}</p>}

                                    {project.major_takeaways !== '' && <p><strong style={{ fontWeight: "bolder" }}>Major Takeaways:</strong> {project.major_takeaways}</p>}

                                    {project.company_name_use_permission !== '' && <p><strong style={{ fontWeight: "bolder" }}>Company Name:</strong> {project.company_name_use_permission}</p>}

                                    {project.certificates_and_lors_provided !== '' && <p><strong style={{ fontWeight: "bolder" }}>Certificates and LORs:</strong> {project.certificates_and_lors_provided}</p>}


                                </div>
                                <div className="project-card-right">
                                    <div className="project-top">
                                        <h5 style={{ color: "white", margin: 0, textAlign: "center" }}>{project.project_title}</h5>
                                        {project.company_name_designation && <p style={{ color: "white", margin: 0, textAlign: "center" }}>{project.company_name_designation}</p>}
                                        {project.type_of_project && <p style={{ color: "white", margin: 0, textAlign: "center" }}>{project.type_of_project}</p>}


                                        {project.departments_eligible !== '' && <p style={{textAlign:"center", color:"white"}}><strong style={{ fontWeight: "bolder" }}>Preferred Department:</strong> {project.departments_eligible}</p>}
                                    <p style={{textAlign:"center", color:"white"}}><strong style={{ fontWeight: "bolder" }}>Preferred Program:</strong> {project.program_and_year}</p>


                                    </div>
                                    <p className="problem-statement">{project.problem_statement}</p>

                                    <button onClick={() => deleteFromWishlist(project.id)}> Remove from Wishlist
                                    </button>

                                </div>
                            </div>) : (
                                <div className="project-card-container">
                                    <div className="project-card-right">
                                        <div className="project-top">
                                            <h5 style={{ color: "white", margin: 0, textAlign: "center" }}>{project.project_title}</h5>
                                            {project.company_name && <p style={{ color: "white", margin: 0, textAlign: "center" }}>{project.company_name}</p>}
                                            {project.type_of_project && <p style={{ color: "white", margin: 0, textAlign: "center" }}>{project.type_of_project}</p>}


                                            {project.departments_eligible !== '' && <p style={{textAlign:"center", color:"white"}}><strong style={{ fontWeight: "bolder" }}>Preferred Department:</strong> {project.departments_eligible}</p>}
                                    <p style={{textAlign:"center", color:"white"}}><strong style={{ fontWeight: "bolder" }}>Preferred Program:</strong> {project.program_and_year}</p>


                                        </div>
                                        <p className="problem-statement">{project.problem_statement}</p>


                                        <button onClick={() => deleteFromWishlist(project.id)}> Remove from Wishlist
                                        </button>




                                    </div>
                                    <div className="project-card-left">

                                        <p style={{ color: "pink", fontSize: "15px", fontWeight: "bolder" }}>Project ID: {project.id}</p>



                                        {project.prerequisites !== '' && <p><strong style={{ fontWeight: "bolder" }}>Prerequisites:</strong> {project.prerequisites}</p>}


                                        {project.city_of_posting !== '' && <p><strong style={{ fontWeight: "bolder" }}>City of Posting:</strong> {project.city_of_posting}</p>}

                                        {project.stipend_per_month !== '' && <p><strong style={{ fontWeight: "bolder" }}>Stipend (Per month):</strong> {project.stipend_per_month}</p>}


                                        {project.duration_weeks !== '' && <p><strong style={{ fontWeight: "bolder" }}>Duration (in weeks):</strong> {project.duration_weeks}</p>}



                                        {project.accommodation_provided !== '' && <p><strong style={{ fontWeight: "bolder" }}>Accommodation:</strong> {project.accommodation_provided}</p>}


                                        {project.travel_expenses_covered !== '' && <p><strong style={{ fontWeight: "bolder" }}>Travelling Expenses:</strong> {project.travel_expenses_covered}</p>}

                                        {project.project_deliverables !== '' && <p><strong style={{ fontWeight: "bolder" }}>Project Deliverables:</strong> {project.project_deliverables}</p>}

                                        {project.major_takeaways !== '' && <p><strong style={{ fontWeight: "bolder" }}>Major Takeaways:</strong> {project.major_takeaways}</p>}

                                        {project.company_name_use_permission !== '' && <p><strong style={{ fontWeight: "bolder" }}>Company Name:</strong> {project.company_name_use_permission}</p>}

                                        {project.certificates_and_lors_provided !== '' && <p><strong style={{ fontWeight: "bolder" }}>Certificates and LORs:</strong> {project.certificates_and_lors_provided}</p>}


                                    </div>

                                </div>
                            )
                        }
                    </>)
                })}


            </div>



{/* 

            <div id="register" style={{ paddingBottom: "20vh" }}>
                <div className="profileform-area" style={styles.profileformArea}>

                    <div className="profileformmain">
                        <div className="profileform-container" style={styles.formContainer}>
                            <form>
                                <div style={{ display: "flex", flexDirection: 'column', alignItems: "center" }} className="pinfo align-items-center">
                                    <div className="pinfo-constituents" style={styles.constituents}>
                                        <label htmlFor="Field10" style={styles.profilelabel}>Preference 1:</label>
                                        <input
                                            id="Field10"
                                            name="pref1"
                                            type="text"
                                            className="field text fn"
                                            value={profile.pref1}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            placeholder="First Preference Project ID"
                                        />
                                    </div>
                                    <div className="pinfo-constituents" style={styles.constituents}>
                                        <label htmlFor="Field10" style={styles.profilelabel}>Preference 2:</label>
                                        <input
                                            id="Field10"
                                            name="pref2"
                                            type="text"
                                            className="field text fn"
                                            value={profile.pref2}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            placeholder="Second Preference Project ID"
                                        />
                                    </div>
                                    <div className="pinfo-constituents" style={styles.constituents}>
                                        <label htmlFor="Field10" style={styles.profilelabel}>Preference 3:</label>
                                        <input
                                            id="Field10"
                                            name="pref3"
                                            type="text"
                                            className="field text fn"
                                            value={profile.pref3}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            placeholder="Third Preference Project ID"
                                        />
                                    </div>
                                    <div className="pinfo-constituents" style={styles.constituents}>
                                        <label htmlFor="Field10" style={styles.profilelabel}>Preference 4:</label>
                                        <input
                                            id="Field10"
                                            name="pref4"
                                            type="text"
                                            className="field text fn"
                                            value={profile.pref4}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            placeholder="Fourth Preference Project ID"
                                        />
                                    </div>
                                    <div className="pinfo-constituents" style={styles.constituents}>
                                        <label htmlFor="Field10" style={styles.profilelabel}>Preference 5:</label>
                                        <input
                                            id="Field10"
                                            name="pref5"
                                            type="text"
                                            className="field text fn"
                                            value={profile.pref5}
                                            onChange={handleInputChange}
                                            style={styles.input}
                                            placeholder="Fifth Preference Project ID"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div style={styles.textCenter}>
                    {showError && <p style={{ color: "red" }}>{showError}</p>}
                    {registerError && <p style={{ color: "red" }}>{registerError}</p>}
                    {same && <p style={{ color: "red" }}>{same}</p>}
                    <button disabled={!check} onClick={handleSubmit} className="submit-button" style={styles.submitButton}>
                        Register Now !
                    </button>
                </div>
            </div>*/}

        </div> 
























    );
}
