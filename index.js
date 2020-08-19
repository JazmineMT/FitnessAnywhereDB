const server = require('./api/server')

const PORT = process.env.PORT || 5400;


server.get('/', (req, res) =>{
    res.send({api : "up"})
})


server.listen(PORT , () =>{
    console.log(`Listening on port ${PORT}`)
})