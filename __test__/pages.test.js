const request = require('supertest')
const app = require('../routes/pages')

test("renders pages", function () {
    request(app).get('/register')
        .set('Accept', 'html')
        .expect(200)
        .expect('Content-Type', /html/)

})

test("renders pages", function () {
    request(app).get('/login')
        .set('Accept', 'html')
        .expect(200)
        .expect('Content-Type', /html/)
})

test("post request", function () {
    request(app).post('/register')
        .expect(200)
        .send('email')
        .redirects(1)
})
