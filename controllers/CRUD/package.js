const packageModel = require(process.cwd() + '/models/index').Package;

async function index(){
    return packageModel.findAll();
}

async function showById(id){
    return packageModel.findByPk(id);
}

async function create(newPackage){
    packageModel.create(newPackage);
}

async function update(id,updatePackage){
    packageModel.update(_updatePackage, {where: {id:id}});
}

async function destroy(id){
    packageModel.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getPackageById: showById,
    addNewPackage: create,
    updatePackageById: update,
    deletePackageById: destroy
}
