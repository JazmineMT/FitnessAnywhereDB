const router = require('express').Router()
const Users = require('./users-model')
const restricted = require('../auth/restricted-middleware')

router.get('/users', restricted ,(req,res)=>{
    Users.findUsers()
    .then(users => {
        res.status(200).json({data: users})
    })
})








module.exports = router;