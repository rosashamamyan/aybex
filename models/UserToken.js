module.exports = (sequelize, DataTypes) => {
    const { STRING } = DataTypes;
    const UserToken = sequelize.define(
        'usertoken',
        {
            refreshToken: STRING
        },
        {   
            timestamps: false,
            freezeTableName: true
        }
    );
    return UserToken
}