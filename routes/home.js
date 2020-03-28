const express = require('express')
const passport = require('passport')

const router = express.Router()

const app = express()

router.get('/', (req, res) => {

    res.render('home')
})



module.exports = router;