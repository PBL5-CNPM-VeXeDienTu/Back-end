const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const users = await models.User.findAll();
    return users
}

async function showById(id){
    const user = await models.User.findByPk(id)
    return user
}

async function create(newUser){
    await models.User.create(newUser)
}

async function update(id,updateUser){
    await models.User.update(updateUser, {where: {id:id}})
}

async function destroy(id){
    await models.User.destroy({where:{id:id}})
}

// const example ={
//     name:"Hồ Thị Hiếu",
//     email: "hothihieu2404@gmail.com",
//     password: "12345678",
//     role: 1,
//     is_verified: false,
//     qr_key: "2404",
// }

// const func = index()
// func.then(function(result) {
//     console.log(JSON.stringify(result, null, 4)) 
//  })

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}