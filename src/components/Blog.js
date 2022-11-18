import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, handleLikes, handleRemove }) => {
   const [visible, setVisible] = useState(false)
   const showWhenVisible = { display: visible ? '' : 'none' }

   const toggleVisibility = () => {
      setVisible(!visible)
   }

   return (
      <div className='Blog'>
         <div onClick={toggleVisibility} className='toggleArea'>
            <p>{blog.title} / By: <b>{blog.author}</b></p> <span>Click to expand/shrink</span>
         </div>
         <div style={showWhenVisible} className='togglableInfo'>
            <div>
               <p>Link: <a href='#'>{blog.url}</a></p>
            </div>
            <div>
               <p id='likesCount'>{blog.likes}</p> Likes <button className='likeBttn' value={blog.id} onClick={handleLikes}>Like</button>
            </div>
            <div>
               <p>{blog.user.name} aded this blog</p>
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

Blog.propTypes = {
   user: PropTypes.string.isRequired,
   blog: PropTypes.string.isRequired,
   handleLikes: PropTypes.func.isRequired,
   handleRemove: PropTypes.func.isRequired
}

export default Blog