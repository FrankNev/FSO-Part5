import React, { useState } from 'react'

const Blog = ({ user, blog, handleLikes, handleRemove }) => {
   const [visible, setVisible] = useState(false)
   const showWhenVisible = { display: visible ? '' : 'none' }

   const toggleVisibility = () => {
      setVisible(!visible)
   }

   return (
      <div className='Blog'>
         <div onClick={toggleVisibility} className='toggleArea'>
            {blog.title} / By: <b>{blog.author}</b> <span>Click to expand/shrink</span>
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
               {user.name === blog.user.name
                  ? <button className='removeBttn' value={blog.id} onClick={handleRemove}>Remove blog</button>
                  : null}
            </div>
         </div>
      </div>
   )
}

export default Blog