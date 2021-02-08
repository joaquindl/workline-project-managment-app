module.exports = (sequelize, dataTypes) => {
    let alias = 'users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: dataTypes.STRING,
        lastName: dataTypes.STRING,
        email: dataTypes.STRING,
        password: dataTypes.STRING
    };

    
    const users = sequelize.define(alias, cols);

    return users
}