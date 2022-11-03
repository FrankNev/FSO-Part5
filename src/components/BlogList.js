import Blog from './Blog'

const BlogList = ({ blogs }) => {
   const list = blogs.map(b => {
      return (
         <Blog key={b.id} blog={b} />
      )
   })

   return (
      <div>
         <h2>Blogs:</h2>
         <ul>
            {list}
         </ul>
      </div>
   )
}

export default BlogList