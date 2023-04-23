import React from 'react';
import axios from 'axios';
import XML from '../blog_posts.xml';
import { useEffect, useState } from 'react';
import XMLParser from 'react-xml-parser';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
const { title } = useParams();
const [blogPost, setBlogPost] = useState(null);

useEffect(() => {
const getXmlData = async () => {
const response = await axios.get(XML, {
'Content-Type': 'application/xml; charset=utf-8',
});
var xml = new XMLParser().parseFromString(response.data);
const blog = xml.children.filter((post) => {
return post.children.find((obj) => obj.name === 'Title' && obj.value === title);
});
setBlogPost(blog[0]);
};
getXmlData();
}, [title]);
return (
<div className='main'>
      {blogPost &&
        blogPost.children.map((child) => {
          let y = child.name.toUpperCase();
          if (y === 'SUMMARY') {
            const childData = child.children.map((c) => {return c.value});
            return (
              <div key={y}>
                <div className='posts'>
                  <p>
                    <img src={childData[0]} alt='Blog post summary' />
                  </p>
                </div>
                <h4>{y}:</h4>
                <p>{childData[1]}</p>
              </div>
            );
          } else {
            return (
              <div key={y} className='posts'>
                <h4>{child.name}:</h4>
                <p>{child.value}</p>
              </div>
            );
          }
        })}
    </div>
  );
};

export default BlogPost;