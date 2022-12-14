import React, { useState } from 'react'

const AddBlogForm = ({ createNewBlog }) => {
   const [newTitle, setTitle] = useState('')
   const [newAuthor, setAuthor] = useState('')
   const [newUrl, setUrl] = useState('')

   const handleTitleChange = (e) => {
      setTitle(e.target.value)
   }

   const handleAuthorChange = (e) => {
      setAuthor(e.target.value)
   }

   const handleUrlChange = (e) => {
      setUrl(e.target.value)
   }

   const addBlog = (e) => {
      e.preventDefault()

      createNewBlog({
         title: newTitle,
         author: newAuthor,
         url: newUrl
      })

      setTitle('')
      setAuthor('')
      setUrl('')
   }

   return (
      <div className="addBlogForm">
         <h2>Add a new blog:</h2>
         <form onSubmit={addBlog}>
            <div>
               Title:
               <input
                  id='Title'
                  value={newTitle}
                  onChange={handleTitleChange}
               />
            </div>
            <div>
               Author:
               <input
                  id='Author'
                  value={newAuthor}
                  onChange={handleAuthorChange}
               />
            </div>
            <div>
               URL:
               <input
                  id='URL'
                  value={newUrl}
                  onChange={handleUrlChange}
               />
            </div>
            <button type="submit" id='createBlogBttn'>Create</button>
         </form>
      </div>
   )
}

export default AddBlogForm