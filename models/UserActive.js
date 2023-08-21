module.exports = (sequelize, DataTypes) => {
    const UserActive = sequelize.define(
        'userActive',
        {
            userId: DataTypes.INTEGER,
            activated: DataTypes.BOOLEAN,
            deleted: DataTypes.BOOLEAN
        },
        {   
            timestamps: false,
            freezeTableName: true
        }
    );
    return UserActive
}