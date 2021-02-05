module.exports = (sequelize, dataTypes) => {
    let alias = 'projects';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: dataTypes.STRING,
        description: dataTypes.STRING,
        state: dataTypes.STRING,
        marked: dataTypes.STRING
    };

    
    const projects = sequelize.define(alias, cols);

    projects.associate = function(models) {
        projects.belongsToMany(
            models.tasks,
            {
                as: 'tasks',
                through:'project_task',
                foreignKey: 'project_id',
                otherKey:'task_id'
            }
        )
    }

    return projects
}