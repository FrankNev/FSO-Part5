describe('Blog app', function () {
   beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
         name: 'Jerry',
         username: 'JerryTheUser',
         password: 'password123'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
   })

   it('front page can be opened', function () {
      cy.contains('Blogs App')
   })

   describe('Login test', function () {
      it('Login form is shown', function () {
         cy.contains('login').click()
      })

      it('succeeds with correct credentials', function () {
         cy.contains('login').click()
         cy.get('#username').type('JerryTheUser')
         cy.get('#password').type('password123')
         cy.get('#loginBttn').click()

         cy.contains('Jerry logged-in')
      })

      it('fails with wrong credentials', function () {
         cy.contains('login').click()
         cy.get('#username').type('JerryTheUser')
         cy.get('#password').type('wrongpassword')
         cy.get('#loginBttn').click()

         cy.should('not.contain', 'Jerry logged-in')
         cy.get('#messageAlert')
            .should('contain', 'wrong username or password')
            .and('have.css', 'background-color', 'rgb(255, 29, 29)')
      })
   })

   describe('When logged in', function () {
      beforeEach(function () {
         cy.login({ username: 'JerryTheUser', password: 'password123' })
         cy.createBlog({ title: 'I will be removed soon', author: 'Cypress', url: 'www.example.com', likes: '2' })
         cy.get('.toggleArea').click()
      })

      it('a blog can receive likes', function () {
         cy.get('#likesCount').then((obj) => {
            const num1 = parseFloat(obj.text())

            cy.get('.likeBttn').click()

            cy.get('#likesCount').should('have.text', num1 + 1)
         })
      })

      it('a blog can be removed', function () {
         cy.get('.Blog')
            .contains('I will be removed soon')
            .get('.removeBttn').click()

         cy.should('not.contain', 'I will be removed soon')
      })
   })

   describe('In a list of blogs', function () {
      beforeEach(function () {
         cy.login({ username: 'JerryTheUser', password: 'password123' })
         cy.createBlog({ title: 'A blog automatically created', author: 'Cypress', url: 'www.example.com', likes: '4' })
         cy.createBlog({ title: 'Another blog', author: 'Cypress', url: 'www.example.com', likes: '5' })
         cy.createBlog({ title: 'I will be removed soon', author: 'Cypress', url: 'www.example.com', likes: '2' })
         cy.createBlog({ title: 'The most liked blog', author: 'Cypress', url: 'www.example.com', likes: '7' })
         cy.get('.toggleArea').click({ multiple: true })
      })

      it('they are ordered by the number of likes', function () {
         cy.get('.blogList').then(blogs => {
            cy.wrap(blogs[0]).contains('7')
            cy.wrap(blogs[1]).contains('5')
            cy.wrap(blogs[2]).contains('4')
            cy.wrap(blogs[2]).contains('2')
         })
      })
   })
})