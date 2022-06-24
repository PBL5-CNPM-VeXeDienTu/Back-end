const { Op } = require('sequelize')
const models = require(process.cwd() + '/models/index')
const objectCleaner = require(process.cwd() + '/helpers/object-cleaner')

async function index(startIndex, limit, params) {
    const selection = objectCleaner.clean({
        [Op.or]: objectCleaner.clean({
            type_name: { [Op.like]: `%${params.txt_search}%` },
        }),
        createdAt: {
            [Op.between]: [params.created_from_date, params.created_to_date],
        },
        updatedAt: {
            [Op.between]: [params.updated_from_date, params.updated_to_date],
        },
    })
    return models.PackageType.findAndCountAll({
        offset: startIndex,
        limit: limit,
        order: [
            ['id', 'DESC'],
            ['type_name', 'ASC'],
        ],
        where: selection,
    })
}

async function showById(id) {
    return models.PackageType.findByPk(id)
}

async function create(newPackageType) {
    return models.PackageType.create(newPackageType)
}

async function update(updatePackageType, id) {
    return models.PackageType.update(updatePackageType, { where: { id: id } })
}

async function destroy(id) {
    return models.PackageType.destroy({ where: { id: id } })
}

async function checkTypeNameExisted(typeName) {
    return !!(await models.PackageType.findOne({
        where: {
            type_name: typeName,
        },
    }))
}

module.exports = {
    getListPackageTypes: index,
    getPackageTypeById: showById,
    addNewPackageType: create,
    updatePackageTypeById: update,
    deletePackageTypeById: destroy,
    checkTypeNameExisted: checkTypeNameExisted,
}
