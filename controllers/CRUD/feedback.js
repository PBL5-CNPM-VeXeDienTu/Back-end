const models = require('../../models');

async function index(){
    return await models.Feedback.findAll();
}

async function showById(id){
    return await models.Feedback.findByPk(id);
}

async function create(newFeedback){
    await models.Feedback.create(newFeedback);
}

async function update(id,updateFeedback){
    await models.Feedback.update(updateFeedback, {where: {id:id}});
}

async function destroy(id){
    await models.Feedback.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}