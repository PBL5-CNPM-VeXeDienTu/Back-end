const models = require('../../models');
const Validator = require('fastest-validator');

async function index(){
    const feedbackTypes = await models.FeedbackType.findAll();
    return feedbackTypes
}

async function showById(id){
    const feedbackType = await models.FeedbackType.findByPk(id)
    return feedbackType
}

async function create(newFeedbackType){
    await models.FeedbackType.create(newFeedbackType)
}

async function update(id,updateFeedbackType){
    await models.FeedbackType.update(updateFeedbackType, {where: {id:id}})
}

async function destroy(id){
    await models.FeedbackType.destroy({where:{id:id}})
}

module.exports = {
    index: index,
    showById: showById,
    create: create,
    update: update,
    destroy: destroy
}