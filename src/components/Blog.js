import React, { useState } from 'react'

const Blog = ({ blog, handleLikes, handleRemove }) => {
   const [visible, setVisible] = useState(false)
   const showWhenVisible = { display: visible ? '' : 'none' }

   const toggleVisibility = () => {
      setVisible(!visible)
   }

   return (
      <div className='Blog'>
         <div onClick={toggleVisibility}>
            {blog.title} / By: <b>{blog.author}</b>
         </div>
         <div style={showWhenVisible}>
            <div>
               Link: <a href='#'>{blog.url}</a>
            </div>
            <div>
               {blog.likes} Likes <button className='likeBttn' value={blog.id} onClick={handleLikes}>Like</button>
            </div>
            <div>
               {blog.user.name} aded this blog
            </div>
            <div>
               <button className='removeBttn' value={blog.id} onClick={handleRemove}>Remove blog</button>
            </div>
         </div>
      </div>
   )
}

export default Blog