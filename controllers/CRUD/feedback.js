const feedbackModel = require(process.cwd() + '/models/index').Feedback;

async function index(){
    return feedbackModel.findAll();
}

async function showById(id){
    return feedbackModel.findByPk(id);
}

async function create(newFeedback){
    feedbackModel.create(newFeedback);
}

async function update(id,updateFeedback){
    feedbackModel.update(updateFeedback, {where: {id:id}});
}

async function destroy(id){
    feedbackModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getFeedbackById: showById,
    addNewFeedback: create,
    updateFeedbackById: update,
    deleteFeedbackById: destroy
}
