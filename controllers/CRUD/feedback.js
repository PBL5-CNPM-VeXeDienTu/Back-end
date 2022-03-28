const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const feedbacks = await models.Feedback.findAll();
    return feedbacks
}

async function showById(id){
    const feedback = await models.Feedback.findByPk(id)
    return feedback
}

async function create(newFeedback){
    await models.Feedback.create(newFeedback)
}

async function update(id,updateFeedback){
    await models.Feedback.update(updateFeedback, {where: {id:id}})
}

async function destroy(id){
    await models.Feedback.destroy({where:{id:id}})
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}