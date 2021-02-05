module.exports = (sequelize, dataTypes) => {
    let alias = 'tasks';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        name: dataTypes.STRING
    }

    const tasks = sequelize.define(alias, cols);

    tasks.associate = function(models) {
        tasks.belongsToMany(
            models.projects,
            {
                as: 'projects',
                through:'project_task',
                foreignKey: 'task_id',
                otherKey:'project_id'
            }
        )
    }

    return tasks
}