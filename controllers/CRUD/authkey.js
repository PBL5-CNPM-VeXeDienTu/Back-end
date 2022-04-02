const authKeyModel = require(process.cwd() + '/models/index').AuthKey;

async function index(){
    return authKeyModel.findAll();
}

async function showById(id){
    return authKeyModel.findByPk(id);
}

async function create(newAuthKey){
    authKeyModel.create(newAuthKey);
}

async function update(id,updateAuthKey){
    authKeyModel.update(_updateAuthKey, {where: {id:id}});
}

async function destroy(id){
    authKeyModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getAuthKeyById: showById,
    addNewAuthKey: create,
    updateAuthKeyById: update,
    deleteAuthKeyById: destroy
}