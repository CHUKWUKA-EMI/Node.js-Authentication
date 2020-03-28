const request = require('supertest')

const app = require('../routes/home')

test("home page", function () {
    request(app).get('/')
        .expect(200)
        .expect(/LOGIN OR REGISTER/)

})
