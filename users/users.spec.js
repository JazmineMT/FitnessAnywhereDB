const request = require('supertest')
const server = require('../api/server')
const { intersect } = require('../connection')
const db = require('../connection')

describe('server', () => {
    
    beforeEach(async () => {
         await db("classes").truncate();
         await db("users").truncate();
    });


    describe(" GET" , () => {

        // it("Should return an api property with the value of  up", () => {
        //     return request(server)
        //         .get("/")
        //         .then(res => {
        //             expect(res.body.api).toBe("up");
        //         });
        // });

       
        // it("should save token", async () => {
        //     await request(server).post('/api/auth/login')
        //     .send({
        //         username: "TerrannceManly", password : "password",
        //     })
        //     .end( function (err ,res){
        //         token = res.body.token
        //     })
        // })

        it("should return 200 OK", () => {
            return request(server)
                .get("/api/classes")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
        it("should return 200 OK", () => {
            return request(server)
                .get("/api/users")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        
    })

    describe("POST and DELTE", () => {
        it("should create a new class", async () => {
            await request(server).post("/api/classes")
            .send({name: "Power Hour 2" , type: 'weightlifting', startTime: '8:30pm', classDate: '8/21/2020', duration: '45 minutes',intensityLevel: 3, location: 'Redwood Park', currentRegistered: 24, maxClassSize: 25 })

            const classes = await db('classes')
            expect(classes).toHaveLength(1)
        })

        it("Should delete a class", async ()=>{
            await request(server).delete('/api/classes/1')

            const classes = await db('classes')
            expect(classes).toHaveLength(0)
        })

        it("should add new user", async () => {
            await request(server).post("/api/auth/register")
            .send({username: "sallyBird2", password : "password", name : "Sally", email : "sally@bird.com", authCode: 222},)

            const users = await db('users')
            expect(users).toHaveLength(1)
        })

        it("Should delete a user", async ()=>{
            await request(server).delete('/api/users/1')

            const classes = await db('users')
            expect(classes).toHaveLength(0)
        })

    })



})