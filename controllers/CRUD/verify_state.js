const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const verifyStates = await models.VerifyState.findAll();
    return verifyStates
}

async function showById(id){
    const verifyState = await models.VerifyState.findByPk(id)
    return verifyState
}

async function create(newVerifyState){
    await models.VerifyState.create(newVerifyState)
}

async function update(id,updateVerifyState){
    await models.VerifyState.update(_updateVerifyState, {where: {id:id}})
}

async function destroy(id){
    await models.VerifyState.destroy({where:{id:id}})
}

// const example ={
//     state: "Đã kiểm duyệt",
//     note: "Thời điểm: 12:00 28/3/2022",
// }

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}