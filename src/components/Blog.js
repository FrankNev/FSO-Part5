const Blog = ({ blog }) => (
   <div>
      <li>{blog.title} / By: <b>{blog.author}</b></li>
   </div>
)

export default Blog