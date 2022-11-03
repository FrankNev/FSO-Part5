const AddBlogForm = ({ handleTitle, handleAuthor, handleUrl, handleAddBlog }) => {
   return (
      <div className="addBlogForm">
         <h2>Add a new blog:</h2>
         <form onSubmit={handleAddBlog}>
            <div>
               Title:
               <input
                  type='text'
                  onChange={handleTitle}
               />
            </div>
            <div>
               Author:
               <input
                  type='text'
                  onChange={handleAuthor}
               />
            </div>
            <div>
               URL:
               <input
                  type='text'
                  onChange={handleUrl}
               />
            </div>
            <button type="submit">Create</button>
         </form>
      </div>
   )
}

export default AddBlogForm