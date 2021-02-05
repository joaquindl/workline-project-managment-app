module.exports = (sequelize, dataTypes) => {
    let alias = 'project_task';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        project_id: dataTypes.INTEGER,
        task_id: dataTypes.INTEGER
    };

    // freezeTableName prevents the names from being plural.
    let freeze = {freezeTableName: true};

    const project_task = sequelize.define(alias, cols, freeze);


    project_task.associate = function(models) {
        project_task.belongsTo(
            models.projects,
            {
                as: 'projects',
                foreignKey: 'project_id'
            }
        )
        project_task.belongsTo(
            models.tasks,
            {
                as: 'tasks',
                foreignKey: 'task_id'
            }
        )
    
    }

    return project_task
}