const express = require("express");
const router = express.Router();
const path = require("path");

const controllerUsers = require("../controllers/controllerusers");

// Requiero middlewares de validación

const loginValidation = require(path.resolve(__dirname, '../middlewares/loginValidation.js'));
const signUpValidation = require(path.resolve(__dirname, '../middlewares/signUpValidation.js'));
const userEditValidation = require(path.resolve(__dirname, '../middlewares/userEditValidation.js'));
const editPassValidation = require(path.resolve(__dirname, '../middlewares/editPassValidation.js'));

router.get('/login', controllerUsers.login);
router.post('/login',loginValidation , controllerUsers.sign_in);
router.get('/signup', controllerUsers.create);
router.post('/signup', signUpValidation, controllerUsers.save);
router.get('/logout', controllerUsers.logout);
router.get('/user/edit/:id', controllerUsers.edit);
router.put('/user/edit/:id', userEditValidation, controllerUsers.update);
router.get('/user/editPass/:id', controllerUsers.password)
router.put('/user/editPass/:id', editPassValidation, controllerUsers.update_password)
router.get('/user/delete/:id', controllerUsers.destroy)

module.exports = router;
