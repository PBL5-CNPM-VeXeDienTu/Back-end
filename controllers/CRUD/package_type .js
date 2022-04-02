const packageTypeModel = require(process.cwd() + '/models/index').PackageType;

async function index(){
    return packageTypeMode.findAll();
}

async function showById(id){
    return packageTypeMode.findByPk(id);
}

async function create(newPackageType){
    packageTypeMode.create(newPackageType);
}

async function update(id,updatePackageType){
    packageTypeMode.update(updatePackageType, {where: {id:id}});
}

async function destroy(id){
    packageTypeMode.destroy({where:{id:id}});
}

module.exports = {
    index: index,
    getPackageTypeById: showById,
    addNewPackageType: create,
    updatePackageTypeById: update,
    deletePackageTypeById: destroy
}
