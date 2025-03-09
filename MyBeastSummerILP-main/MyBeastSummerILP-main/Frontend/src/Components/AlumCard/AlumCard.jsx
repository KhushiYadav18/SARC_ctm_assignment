
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import './Card.css';
import { ShoesDetails } from "./shoesDetails";
import UseFetchProjects from "../../hooks/useFetchProjects";
import UseAddToWishlist from "../../hooks/useAddToWishlist";
import UseDeleteFromWishlist from "../../hooks/useDeleteFromWishlist";
import Swal from "sweetalert2";
import './ProjectCard.css';

export default function AlumCard(props) {

  const { fetchProjects, setError, loading, error, projects, setProjects } = UseFetchProjects();
  const { addProject, success } = UseAddToWishlist();
  const { deleteProject } = UseDeleteFromWishlist();


  useEffect(() => {
    fetchProjects();
  }, [])

  const [isWishlist, setIsWishlist] = useState(false);


  function addToWishlist(id) {
    console.log(id);
    addProject(id);
    const newProjects = [...projects];
    let something = newProjects.filter((project) => project.id == id)[0];
    something.wishlisted = true;
    setProjects(newProjects);
  }

  async function deleteFromWishlist(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to remove this project from wishlist",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProject(id);
        const newProjects = [...projects];
        let something = newProjects.filter((project) => project.id == id)[0];
        something.wishlisted = false;
        setProjects(newProjects);
        Swal.fire(
          'Removed!',
          'Project has been removed from wishlist.',
          'success'
        )
      }
    })
  }



  if (loading || !projects) {
    return <>
      <div className="loader-container">
        <div className="loader"></div>
      </div></>
  }


  function toggleWishlist() {

  }



  return (


    <div>

      <div style={{ paddingTop: "5%" }} className="projectsContainer">

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

                  {project.company_name_use_permission !== '' && <p><strong style={{ fontWeight: "bolder" }}>Company Name:</strong> {project.company_name_designation}</p>}

                  {project.certificates_and_lors_provided !== '' && <p><strong style={{ fontWeight: "bolder" }}>Certificates and LORs:</strong> {project.certificates_and_lors_provided}</p>}


                </div>
                <div className="project-card-right">
                  <div className="project-top">



                    <h5 style={{ color: "white", margin: 0, textAlign: "center" }}>{project.project_title}</h5>
                    {project.company_name_designation && <p style={{ color: "white", margin: 0, textAlign: "center" }}>{project.company_name_designation}</p>}
                    {project.type_of_project && <p style={{ color: "white", margin: 0, textAlign: "center" }}>{project.type_of_project}</p>}


                    {project.departments_eligible !== '' && <p style={{textAlign:"center", color:"white"}} ><strong style={{ fontWeight: "bolder" }}>Preferred Department:</strong> {project.departments_eligible}</p>}
                    <p style={{textAlign:"center", color:"white"}}><strong style={{ fontWeight: "bolder" }}>Preferred Program:</strong> {project.program_and_year}</p>


                  </div>
                  <p className="problem-statement">{project.problem_statement}</p>

                  {
                    project.wishlisted ? (
                      <button onClick={() => deleteFromWishlist(project.id)}> Remove from Wishlist
                      </button>
                    ) :
                      (<button onClick={() => addToWishlist(project.id)}> Add to Wishlist
                      </button>)
                  }

                </div>
              </div>) : (
                <div className="project-card-container">
                  <div className="project-card-right">
                    <div className="project-top">
                      <h5 style={{ color: "white", margin: 0, textAlign: "center" }}>{project.project_title}</h5>
                      {project.company_name && <p style={{ color: "white", margin: 0, textAlign: "center" }}>{project.company_name}</p>}
                      {project.type_of_project && <p style={{ color: "white", margin: 0, textAlign: "center" }}>{project.type_of_project}</p>}


                      {project.departments_eligible !== '' && <p style={{textAlign:"center", color:"white"}} ><strong style={{ fontWeight: "bolder" }}>Preferred Department:</strong> {project.departments_eligible}</p>}
                    <p style={{textAlign:"center", color:"white"}}><strong style={{ fontWeight: "bolder" }}>Preferred Program:</strong> {project.program_and_year}</p>


                    </div>
                    <p className="problem-statement">{project.problem_statement}</p>

                    {
                      project.wishlisted ? (
                        <button onClick={() => deleteFromWishlist(project.id)}> Remove from Wishlist
                        </button>
                      ) :
                        (<button onClick={() => addToWishlist(project.id)}> Add to Wishlist
                        </button>)
                    }




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

                    {project.company_name_use_permission !== '' && <p><strong style={{ fontWeight: "bolder" }}>Company Name:</strong> {project.company_name_designation}</p>}

                    {project.certificates_and_lors_provided !== '' && <p><strong style={{ fontWeight: "bolder" }}>Certificates and LORs:</strong> {project.certificates_and_lors_provided}</p>}


                  </div>

                </div>
              )
            }
          </>)
        })}


      </div>
    </div>


  );
}
