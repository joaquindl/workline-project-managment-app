const path = require("path");
const { projects, tasks, project_task, users } = require('../database/models');


module.exports = {
  start: async (req, res) => {
    const allProjects = await projects.findAll({include: ['tasks']});
    res.render(path.resolve(__dirname, '../views/index'), {allProjects});
  },
  index: async (req, res) => {
    
    const allProjects = await projects.findAll({include: ['tasks']});
    const allTasks = await tasks.findAll();
    // Cuenta los elementos de la tabla. Le puedo incluirr condiciones
    const taskNumber = await tasks.count();
    const user = users.findAll()

    // console.log(taskNumber);
    res.render(path.resolve(__dirname, '../views/index'), {allProjects, taskNumber, user});
    // res.send(proyectoTarea)
  },
  create: async (req, res) => {
    
    const project_body = {
      title: req.body.title,
      description: req.body.description
    };
    
    const newProject = await projects.create(project_body);

    //Para poder acceder a req.body.task[] tuve que cambiar el urlencoded del entry-point de false a true
    req.body.task.forEach(async tarea => {
      if (tarea.length){
        let newTask = await tasks.create({name: tarea})
        await project_task.create({project_id: newProject.id, task_id: newTask.id})
      }
    });
    
    
    res.redirect('/');
    
  },
  read: async (req, res) => {
    const project = await projects.findByPk(req.params.id, {include: ['tasks']});
    const taskNumber = await tasks.count();

    // res.send({project})
    res.render(path.resolve(__dirname, '../views/project'), {project, taskNumber})
  },
  edit: async (req, res) => {
    const project = await projects.findByPk(req.params.id, {include: ['tasks']});
    // let taskNumber = await tasks.count();
    const emptyInputs = 10 - (project.tasks.length);
    const inputsArray = []
    for (let i = 0; i < emptyInputs; i++) {
      inputsArray.push(emptyInputs[i]);
    }
    // res.send(inputsArray)
    res.render(path.resolve(__dirname, '../views/edit'), {project, inputsArray})
  },
  update: async (req, res) => {

    // const projectId = req.params.id

    const project_body = {
      title: req.body.title ? req.body.title : req.body.oldTitle,
      description: req.body.description ? req.body.description : req.body.oldDescription,
    };

    await projects.update(project_body, {where: {id: req.params.id}});
    // await project_task.update({where: {project_id: req.}})

    const lastTasks = await projects.findByPk(req.params.id, {include: ['tasks']});

    lastTasks.tasks.forEach( async task => {
      await tasks.destroy({where: {id: task.id}})
      await project_task.destroy({where: {task_id: task.id}})
    });


    req.body.task.forEach(async tarea => {
      if (tarea.length){
        let newTask = await tasks.create({name: tarea})
        await project_task.create({project_id: lastTasks.id, task_id: newTask.id})
      }
    });

    // req.body.task.forEach(async tarea => {
    //   if (tarea.length){
    //     let newTask = await tasks.create({name: tarea})
    //     await project_task.create({project_id: req.params.id, task_id: newTask.id})
    //   }
    // });



    // req.body.task.forEach(async tarea => {
    //   if (tarea.length){
    //     let newTask = await tasks.update({name: tarea})
    //     await project_task.create({project_id: newProject.id, task_id: newTask.id})
    //   }
    // });
    res.redirect('/')

  },
  delete: async (req, res) => {
    const project = await projects.findByPk(req.params.id, {include: 'tasks'});

  },
  destroy: async(req, res) => {

    const projectTasks = await projects.findByPk(req.params.id, {include: ['tasks']});

    projectTasks.tasks.forEach( async task => {
      await tasks.destroy({where: {id: task.id}})
      await project_task.destroy({where: {task_id: task.id}})
    });

    await projects.destroy({where: {id: req.params.id}, force: true});


    res.redirect('/')

  }
};
