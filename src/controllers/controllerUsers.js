const path = require("path");
const { users } = require('../database/models');
const bcrypt = require ('bcryptjs');
const {
    check,
    validationResult,
    body
  } = require('express-validator'); 

module.exports = {
    login: async (req, res) => {
        // res.send('Esto es login')
        res.render(path.resolve(__dirname, '../views/login'));
    },
    sign_in: async (req, res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            //return res.send(errors.mapped())
            return res.render(path.resolve(__dirname, '../views/login'), {errors: errors.mapped(),  old: req.body});
        } else {
            let user = await users.findOne({where: {email: req.body.email}})
            delete user.password;
            req.session.usuario = user;
            //return res.send (req.session.usuario)
            if(req.body.remember){
                res.cookie('email', user.email, {maxAge: 1000 * 60 * 60 * 48})
            }
            res.redirect('/');
        }
        
    },
    create: async (req, res) => {
        res.render(path.resolve(__dirname, '../views/signUp'))
    },
    save: async (req, res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            //return res.send(errors.mapped())
            return res.render(path.resolve(__dirname, '../views/signUp'), {
                errors: errors.mapped(),  old: req.body});
        }
        const user = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }

        await users.create(user)

        res.redirect('/login')
    },
    logout: async (req, res) => {
        req.session.destroy();
        res.cookie('email',null,{maxAge: -1});
        res.redirect('/')    
    },
    edit: (req, res) => {
        res.render(path.resolve(__dirname, '../views/editUser'))
    },
    update: async (req, res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            //return res.send(errors.mapped())
            return res.render(path.resolve(__dirname, '../views/editUser'), {errors: errors.mapped(),  old: req.body});
        } else {
            const pass = req.body.password ? req.body.password : req.body.old_password

            const user_body = {
                name: req.body.name ? req.body.name : req.body.oldName,
                lastName: req.body.lastName ? req.body.lastName : req.body.oldLastName,
                email: req.body.email ? req.body.email : req.body.oldEmail,
                password: bcrypt.hashSync(pass, 10)
            }
            // res.send(user_body)
            await users.update(user_body, {where: {id: req.params.id}});

            // req.session.update();
            // res.cookie('email',null,{maxAge: -1});
            res.redirect('/') 
        }
    },
    password: (req, res) => {
        res.render(path.resolve(__dirname, '../views/editPassword'))
    },
    update_password: async (req, res) => {
        let errors = validationResult(req);
        if(!errors.isEmpty()){
            //return res.send(errors.mapped())
            return res.render(path.resolve(__dirname, '../views/editPassword'), {errors: errors.mapped(),  old: req.body});
        }

        const user_body = {
            password: req.body.password
        }

        await users.update(user_body, {where: {id: req.params.id}})

        // req.session.destroy();
        // res.cookie('email',null,{maxAge: -1});
        res.redirect('/') 
    },
    destroy: async (req, res) => {

        await users.destroy({where: {id:req.params.id}, force: true})
        req.session.destroy();
        res.cookie('email',null,{maxAge: -1});        
        res.redirect('/')

        
        
    }
}