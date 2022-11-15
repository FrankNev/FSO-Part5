import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blog tests', () => {
   let component
   const blog = {
      title: 'Just a blog for testing purposes',
      author: 'Oliver Smith',
      url: 'www.exampleweb.com',
      likes: 0,
      user: {
         username: 'OliverSm',
         name: 'Oliver',
         id: '78s65757xv550sd192'
      },
   }

   const mockHandler = jest.fn()

   beforeEach(() => {
      component = render(<Blog blog={blog} handleLikes={mockHandler} handleRemove={mockHandler} user={blog.user} />)
   })

   test('only title and author are displayed by default', () => {
      const div = component.container.querySelector('.togglableInfo')
      expect(div).toHaveStyle('display: none')
   })

   test('details are displayed after clicking to expand the blog info', () => {
      const button = component.container.querySelector('.toggleArea')
      fireEvent.click(button)

      const div = component.container.querySelector('.togglableInfo')
      expect(div).not.toHaveStyle('display: none')
   })

   test('clicking the like button twice, it calls the event handler twice too', () => {
      const button = component.container.querySelector('.likeBttn')
      fireEvent.click(button)
      fireEvent.click(button)

      expect(mockHandler.mock.calls).toHaveLength(2)
   })
})