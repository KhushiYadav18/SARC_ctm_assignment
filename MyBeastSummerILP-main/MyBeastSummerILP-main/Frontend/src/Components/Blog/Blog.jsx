import React from 'react';
import './blog.css';
import ConvertDate from './ConvertData';
import { P } from 'react-html5video';

const Blog = ({ blog }) => {
    return (
        <div className="blog">
            <div style={{ width: "100%" }}>
                {(!blog.is_interview_schedule && !blog.is_interview_shortlist && !blog.is_final_selections) && (
                    <>
                        <h5 className='interview-schedule-title'>{blog.title}</h5>
                    </>
                )
                }
            </div>
            <div style={{ width: "100%" }}>
                {blog.is_interview_schedule && (
                    <>
                        <h5 className='interview-schedule-title'>{blog.interview_project.company_name_designation} | Project ID: {blog.interview_project.id} - [Interview Schedule]</h5>
                    </>
                )
                }
            </div>
            <div style={{ width: "100%" }}>
                {blog.is_final_selections && (
                    <>
                        <h5 className='interview-schedule-title'>{blog.interview_project.company_name_designation} | Project ID: {blog.interview_project.id} - [Final Selections]</h5>
                    </>
                )
                }
            </div>
            <div style={{ width: "100%" }}>
                {blog.is_interview_shortlist && (
                    <>
                        <h5 className='interview-schedule-title'>{blog.interview_project.company_name_designation} | Project ID: {blog.interview_project.id} - [Interview Shortlist]</h5>
                    </>
                )
                }
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: blog.is_interview_schedule && "space-around", paddingLeft: "5vw", paddingRight: "5vw", color: "white" }}>
                <p>{<ConvertDate dateString={blog.current_date_time} />}</p>
                {blog.is_interview_schedule &&
                    <>
                        <p>Interview Mode: {blog.interview_mode}</p>
                    </>}
                {(blog.is_interview_schedule || blog.is_interview_shortlist) &&
                    <>
                        <p>Interview Date: {blog.interview_date}</p>
                    </>}
            </div>
            {
                (blog.is_interview_schedule || blog.is_interview_shortlist || blog.is_final_selections) && (
                    <div style={{ width: '100%', display: "flex", flexDirection: "row", justifyContent: "space-around", paddingLeft: "5vw", paddingRight: "5vw", color: "white" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <h6 style={{ fontWeight: 500, fontSize: "1.4rem" }}>Name</h6>
                            {blog.interview_schedule_or_shortlisted_students_or_final_students && blog.interview_schedule_or_shortlisted_students_or_final_students.map((student) => (
                                <>
                                    <p style={{ margin: "0" }}>{student.fullname}</p>
                                </>
                            ))}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <h6 style={{ fontWeight: 500, fontSize: "1.4rem" }}>Roll No</h6>
                            {blog.interview_schedule_or_shortlisted_students_or_final_students && blog.interview_schedule_or_shortlisted_students_or_final_students.map((student) => (
                                <>
                                    <p style={{ margin: "0" }}>{student.ldap.split('@')[0]}</p>
                                </>
                            ))}
                        </div>
                        {
                            blog.is_interview_schedule && (
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                    <h6 style={{ fontWeight: 500, fontSize: "1.4rem" }}>Time</h6>
                                    {blog.interview_times && blog.interview_times.split(',').map((time) => (
                                        <>
                                            <p style={{ margin: "0" }}>{time}</p>
                                        </>

                                    ))}
                                </div>
                            )
                        }
                    </div>
                )
            }
            <div style={{ width: "100%" }}>
                <p style={{ color: "white", textAlign: "left", marginLeft: "5vw", marginRight: "5vw" }}>
                    {blog.content}
                </p>
            </div>
        </div>
    );
};

export default Blog;
