const router = require('express').Router()
const Users = require('./users-model')
const restricted = require('../auth/restricted-middleware')
const userRestricted = require('../auth/user-type-restricted-middleware')

router.get('/users',(req,res)=>{
    Users.findUsers()
    .then(users => {
        res.status(200).json({data: users})
    })
})

router.get('/classes' ,(req,res)=>{
    Users.findClasses()
    .then(classes => {
        res.status(200).json({data: classes})
    })
})

router.post('/classes', (req, res)=>{
    const newclass = req.body
    Users.addClass(newclass)
    .then( added => {
        res.status(201).json({data : added})
    })
    .catch( err =>{
        res.status(500).json({message: err.message})
    })
})

router.put('/classes/:id',(req,res) =>{
    const changes = req.body
    const {id }= req.params
    Users.findClassesById(id)
    .then( classes =>{
        if(classes){
            Users.updateClass(changes , id)
            .then( changed =>{
                res.status(200).json({updated: changed})
            })
        }else {
            res.status(404).json({ message: 'Could not find scheme with given id' });
          }
    })

    .catch( err => {
        res.status(500).json({message: err.message})
    })

})

router.delete('/classes/:id', restricted, userRestricted, (req, res)=>{
    const {id }= req.params
    Users.deleteClass(id)
    .then( deleted => {
        if (deleted) {
            res.json({ removed: deleted });
          } else {
            res.status(404).json({ message: 'Could not find scheme with given id' });
          }
    })
    .catch( err => {
        res.status(500).json({message: err.message})
    })
})
router.delete('/users/:id', restricted, userRestricted, (req, res)=>{
    const {id }= req.params
    Users.deleteUser(id)
    .then( deleted => {
        if (deleted) {
            res.json({ removed: deleted });
          } else {
            res.status(404).json({ message: 'Could not find scheme with given id' });
          }
    })
    .catch( err => {
        res.status(500).json({message: err.message})
    })
})






module.exports = router;