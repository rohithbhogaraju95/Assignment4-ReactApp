/* eslint-disable array-callback-return */
import React from 'react';
import axios from 'axios';
import './Main.css';
import XML from '../blog_posts.xml';
import { useEffect, useState } from 'react';
import XMLParser from 'react-xml-parser';
import { Link, useParams } from 'react-router-dom';

const Main = () => {
  const [blogs, setBlogs] = useState([]);
  const { blogTitle } = useParams();

  useEffect(() => {
    if (blogs.length <= 0) {
      getXmlData();
    }
  }, [blogs.length]);

  const getXmlData = async () => {
    const response = await axios.get(XML, {
      'Content-Type': 'application/xml; charset=utf-8',
    });
    var xml = new XMLParser().parseFromString(response.data);
    setBlogs(xml.children);
  };

  const renderBlogPosts = () => {
    return blogs.map((children) => {
      return children.children.map((a) => {
        let b = a.name.toUpperCase();
        if (b === 'SUMMARY') {
          const childData = a.children.map((c) => {
            return c.value;
          });
          return (
            <>
              <div className='posts'>
                <p>
                  <img
                    src={`${childData[0]}`}
                    alt={`${childData[0]}`}
                  ></img>
                </p>
              </div>
              <h5 style={{ marginLeft: '10px' }}>{b}:</h5>
              <p style={{ marginLeft: '10px', marginTop: '-10px' }}>
                {childData[1]}
              </p>
            </>
          );
        } else if (b !== 'BODY') {
          return (
            <div key={a.value} style={{ marginTop:'15px'}} >
              <div className='posts' style={{ marginTop:'-30px'}}>
                <h5>{b}:</h5>
                <p>
                  {b !== 'TITLE' ? (
                    a.value
                  ) : (
                    <Link to={`/blog/${a.value}`}>{a.value} </Link>
                  )}
                </p>
              </div>
            </div>
          );
        }
      });
    });
  };

  const renderSingleBlogPost = () => {
    let blogPost = null;
    blogs.forEach((children) => {
      children.children.forEach((a) => {
        let b = a.name.toUpperCase();
        if (b === 'BODY' && a.attributes.title === blogTitle) {
          blogPost = (
            <div className='single-post' key={a.attributes.title}>
              <h2>{a.attributes.title}</h2>
              <p className='post-content'>{a.children[0].value}</p>
            </div>
          );
        }
      });
    });
    return blogPost;
  };

  return (
    <main className='main'>
      {blogTitle ? (
        renderSingleBlogPost()
      ) : (
        <>
          {renderBlogPosts()}
        </>
      )}
    </main>
  );
};

export default Main;

