import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'


const App = () => {
   const [blogs, setBlogs] = useState([])
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [user, setUser] = useState(null)
   const [notification, setNotification] = useState(null);

   const [newTitle, setTitle] = useState('')
   const [newAuthor, setAuthor] = useState('')
   const [newUrl, setUrl] = useState('')

   useEffect(() => {
      const getBlogsList = async () => {
         const initialBlogs = await blogService.getAll()
         setBlogs(initialBlogs)
      }
      getBlogsList()
   }, []);

   useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

      if (loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON)
         setUser(user)

         blogService.setToken(user.token)
      }
   }, [])

   const handleLogin = async (e) => {
      e.preventDefault()

      try {
         const user = await loginService.login({
            username, password,
         })
         setUser(user)
         blogService.setToken(user.token)

         window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
         )

         setUsername('')
         setPassword('')
      } catch (exception) {
         setNotification({
            "type": "error",
            "info": `wrong username or password`
         })
         setTimeout(() => {
            setNotification(null)
         }, 3000)
      }
   }

   const handleLogOut = () => {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
   }

   const loginForm = () => (
      <form onSubmit={handleLogin}>
         <div>
            username
            <input
               type='text'
               value={username}
               name='Username'
               onChange={({ target }) => setUsername(target.value)}
            />
         </div>
         <div>
            password
            <input
               type='password'
               value={password}
               name='Password'
               onChange={({ target }) => setPassword(target.value)}
            />
         </div>
         <button type='submit'>login</button>
      </form>
   )

   const addBlog = async (e) => {
      e.preventDefault()

      const blog = {
         title: newTitle,
         author: newAuthor,
         url: newUrl
      }

      try {
         const result = await blogService.create(blog)
         setBlogs(blogs.concat(result))

         setTitle('')
         setAuthor('')
         setUrl('')

         setNotification({
            "type": "success",
            "info": `The blog '${blog.title}' has been correctly added`
         })
         setTimeout(() => {
            setNotification(null)
         }, 4000)

      } catch (error) {
         console.log(error)
         setNotification({
            "type": "error",
            "info": 'Failed to create a blog'
         })
         setTimeout(() => {
            setNotification(null)
         }, 3000)
      }
   }

   return (
      <div>
         <h1>Blogs App</h1>

         <Notification message={notification !== null ? notification : null} />

         {user === null ?
            loginForm() :
            <div>
               <div className='userInfo'>
                  <p><b>{user.name}</b> logged-in</p><button onClick={handleLogOut}>log-out</button>
               </div>

               <BlogList 
                  blogs={ blogs }
               />

               <BlogForm
                  handleTitle={({ target }) => setTitle(target.value) }
                  handleAuthor={({ target }) => setAuthor(target.value) }
                  handleUrl={({ target }) => setUrl(target.value) }
                  handleAddBlog={ addBlog }
               />
            </div>
         }
      </div>
   )
}

export default App
