const userPackageModel = require(process.cwd() + '/models/index').UserPackage;

async function index(){
    return userPackageModel.findAll();
}

async function showById(id){
    return userPackageModel.findByPk(id);
}

async function create(newUserPackage){
    userPackageModel.create(newUserPackage);
}

async function update(id,updateUserPackage){
    userPackageModel.update(_updateUserPackage, {where: {id:id}});
}

async function destroy(id){
    userPackageModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getUserPackageById: showById,
    addNewUserPackage: create,
    updateUserPackageById: update,
    deleteUserPackageById: destroy
}
