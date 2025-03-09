// src/Blogs.js
import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import axios from 'axios';
import UseFetchBlog from '../../hooks/useFetchBlog';
import './blogs.css';

const Blogs = () => {

    const { fetchBlogs, setError, loading, error, success, blogs, setBlogs } = UseFetchBlog();

    useEffect(() => {
        fetchBlogs();
    },[]);

  return (
     <div style={{paddingBottom:"40px"}}> 
     <h1 style={{textAlign:"center", marginTop:"10vh"}}>ILP Blog</h1>
     <div className='blogs-container'>
       {blogs && blogs.map(blog => (
         <Blog key={blog.id} blog={blog} />
       ))}
     </div>
     </div>
  );
};

export default Blogs;
