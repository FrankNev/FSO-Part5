import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './AddBlogForm'


describe('Blog Form test', () => {
   test('create a new blog', () => {
      const createBlog = jest.fn()

      const component = render(<BlogForm createNewBlog={createBlog} />)

      const title = component.container.querySelector('#Title')
      const author = component.container.querySelector('#Author')
      const url = component.container.querySelector('#URL')
      const form = component.container.querySelector('form')

      fireEvent.change(title, {
         target: { value: 'An interesting title' },
      })

      fireEvent.change(author, {
         target: { value: 'Adam Brown' },
      })

      fireEvent.change(url, {
         target: { value: 'www.web.com' },
      })

      fireEvent.submit(form)

      expect(createBlog.mock.calls).toHaveLength(1)
      expect(createBlog.mock.calls[0][0].title).toBe('An interesting title')
      expect(createBlog.mock.calls[0][0].author).toBe('Adam Brown')
      expect(createBlog.mock.calls[0][0].url).toBe('www.web.com')
   })
})