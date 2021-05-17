const AffirmationModel = require('./affirmation');
const CategoryModel = require('./category');
const CollectionModel = require('./collection');
const RoleModel = require('./role');
const UserModel = require('./user');
const UserCollectionModel = require('./usercollection');

module.exports = {
    AffirmationModel,
    CategoryModel,
    CollectionModel,
    RoleModel,
    UserModel,
    UserCollectionModel
}

//DB Associations
RoleModel.hasMany(UserModel, {allowNull: false});
UserModel.belongsTo(RoleModel, {allowNull: false});

UserModel.hasMany(UserCollectionModel, {allowNull: false});
UserCollectionModel.belongsTo(UserModel, {allowNull: false})

CategoryModel.hasMany(CollectionModel, {allowNull: false});
CollectionModel.belongsTo(CategoryModel, {allowNull: false});

CollectionModel.hasMany(AffirmationModel, {allowNull: false});
AffirmationModel.belongsTo(CollectionModel, {allowNull: true});

UserCollectionModel.hasMany(AffirmationModel, {allowNull: false});
AffirmationModel.belongsTo(UserCollectionModel, {allowNull: true});