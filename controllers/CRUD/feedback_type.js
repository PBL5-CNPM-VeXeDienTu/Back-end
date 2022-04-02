const feedbackTypeModel = require(process.cwd() + '/models/index').FeedbackType;

async function index(){
    return feedbackTypeModel.findAll();
}

async function showById(id){
    return feedbackTypeModel.findByPk(id);
}

async function create(newFeedbackType){
    feedbackTypeModel.create(newFeedbackType);
}

async function update(id,updateFeedbackType){
    feedbackTypeModel.update(updateFeedbackType, {where: {id:id}});
}

async function destroy(id){
    feedbackTypeModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getFeedbackTypeById: showById,
    addNewFeedbackType: create,
    updateFeedbackTypeById: update,
    deleteFeedbackTypeById: destroy
}
