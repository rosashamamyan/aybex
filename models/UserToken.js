module.exports = (sequelize, DataTypes) => {
    const UserToken = sequelize.define(
        'usertoken',
        {
            refreshToken: DataTypes.STRING
        },
        {   
            timestamps: false,
            freezeTableName: true
        }
    );
    return UserToken
}