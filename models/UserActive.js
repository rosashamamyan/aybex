module.exports = (sequelize, DataTypes) => {
    const { INTEGER } = DataTypes;
    const UserActive = sequelize.define(
        'userActive',
        {
            userId: INTEGER,
            activated: INTEGER,
            deleted: INTEGER
        },
        {   
            timestamps: false,
            freezeTableName: true
        }
    );
    return UserActive
}