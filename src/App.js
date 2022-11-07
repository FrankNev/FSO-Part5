import { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import BlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'


const App = () => {
   const [blogs, setBlogs] = useState([])
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [user, setUser] = useState(null)
   const [notification, setNotification] = useState(null)

   useEffect(() => {
      const getBlogsList = async () => {
         const initialBlogs = await blogService.getAll()
         initialBlogs.sort((a, b) => b.likes - a.likes)
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
            'type': 'error',
            'info': `wrong username or password`
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

   const addBlog = async (blogObj) => {
      try {
         const result = await blogService.create(blogObj)
         setBlogs(blogs.concat(result))

         setNotification({
            'type': 'success',
            'info': `The blog '${blogObj.title}' has been correctly added`
         })
         setTimeout(() => {
            setNotification(null)
         }, 4000)

      } catch (error) {
         console.log(error)
         setNotification({
            'type': 'error',
            'info': 'Failed to create a blog (Invalid or missing content)'
         })
         setTimeout(() => {
            setNotification(null)
         }, 3000)
      }
   }

   const updateBlogLikes = async (blogObj) => {
      const BlogId = blogObj.target.value
      const selectedBlog = blogs.find(b => b.id === BlogId)

      try {
         const response = await blogService.updateLikes(BlogId, selectedBlog)

         setBlogs(blogs.map(blog => blog.id === BlogId ? response : blog))
      } catch (error) {
         console.log(error)
         setNotification({
            'type': 'error',
            'info': 'Failed trying to update the blog'
         })
         setTimeout(() => {
            setNotification(null)
         }, 4000)
      }
   }

   const handleRemoveBlog = async (blogObj) => {
      const BlogId = blogObj.target.value
      const selectedBlog = blogs.find(b => b.id === BlogId)

      const message = `Remove ${selectedBlog.title} ?`

      try {
         if (window.confirm(message) === true) {
            await blogService.remove(BlogId)

            setBlogs(blogs.filter(b => b.id !== BlogId))
         }
      } catch (error) {
         setNotification({
            'type': 'error',
            'info': 'Failed trying to remove the blog'
         })
         setTimeout(() => {
            setNotification(null)
         }, 4000)
      }
   }

   return (
      <div>
         <h1>Blogs App</h1>

         <Notification message={notification !== null ? notification : null} />

         {user === null ?
            <Togglable buttonLabel='login'>
               <LoginForm
                  username={username}
                  password={password}
                  handleUsernameChange={({ target }) => setUsername(target.value)}
                  handlePasswordChange={({ target }) => setPassword(target.value)}
                  handleSubmit={handleLogin}
               />
            </Togglable> :
            <div>
               <div className='userInfo'>
                  <p><b>{user.name}</b> logged-in</p><button onClick={handleLogOut}>log-out</button>
               </div>

               <Togglable buttonLabel='Add a new blog'>
                  <BlogForm createNewBlog={addBlog} />
               </Togglable>
               <div className='blogList'>
                  {blogs.map(blog =>
                     <Blog
                        key={blog.id}
                        blog={blog}
                        handleLikes={updateBlogLikes}
                        handleRemove={handleRemoveBlog}
                     />
                  )}
               </div>
            </div>
         }
      </div>
   )
}

export default App
