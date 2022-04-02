const verifyStateModel = require(process.cwd() + '/models/index').VerifyState;

async function index(){
    return verifyStateModel.findAll();
}

async function showById(id){
    return verifyStateModel.findByPk(id);
}

async function create(newVerifyState){
    verifyStateModel.create(newVerifyState);
}

async function update(id,updateVerifyState){
    verifyStateModel.update(_updateVerifyState, {where: {id:id}});
}

async function destroy(id){
    verifyStateModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getVerifyStateById: showById,
    addNewVerifyState: create,
    updateVerifyStateById: update,
    deleteVerifyStateById: destroy
}
