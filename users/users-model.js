const db = require("../connection.js");

module.exports = {
  addUser,
  findUsers,
  findClassesBy,
  findUsersById,
  addClass,
  findUsersBy,
  findClasses
};


function findUsers(){
    return db('users as u')
    .join('userTypes as t', 'u.authCode', 't.authCodeForUser')
    .select( 'u.name', 't.type_name', 'u.username', 'u.email')
  
}
function findClasses(){
    return db('classes').orderBy('classDate')
}

function findClassesBy(filter){
    return db('classes').where(filter).orderBy('id')
}
function findUsersBy(filter){
    return db('users').where(filter).orderBy('id')
}

function findUsersById(id){
    return db('users').where({id}).first();
}

async function addUser(user){
    try{
        const [id] = await db('users').insert(user, "id")
        return findUsersById(id)
    } catch(error){
        throw error;
    }
}

async function addClass(newclass){
    try{
        const [id] = await db('classes').insert(newclass, "id")
        return findById(id)
    } catch(error){
        throw error;
    }
}