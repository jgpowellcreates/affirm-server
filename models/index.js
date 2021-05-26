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

CategoryModel.hasMany(CollectionModel, {allowNull: false, onDelete: 'CASCADE'});
CollectionModel.belongsTo(CategoryModel, {allowNull: false, onDelete: 'CASCADE'});

CollectionModel.hasMany(AffirmationModel, {allowNull: false, onDelete: 'CASCADE'});
AffirmationModel.belongsTo(CollectionModel, {allowNull: true, onDelete: 'CASCADE'});

UserCollectionModel.hasMany(AffirmationModel, {allowNull: false});
AffirmationModel.belongsTo(UserCollectionModel, {allowNull: true});