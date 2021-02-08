const path = require('path');
const {users} = require('../database/models')
const {
  check,
  validationResult,
  body
} = require('express-validator');

let allUsers = users.findAll();

module.exports = [
    //Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
    check('name').not().isEmpty().withMessage('El campo nombre no puede estar vacio'),
    check('name').isLength({min: 2}).withMessage('El campo nombre debe tener al menos 2 caracteres'),
    
    check('lastName').not().isEmpty().withMessage('El campo apellido no puede estar vacio'),
    check('lastName').isLength({min: 2}).withMessage('El campo apellido debe tener al menos 2 caracteres'),
    
    check('email').not().isEmpty().withMessage('El campo email no puede estar vacio'),
    check('email').isEmail().withMessage('Agregue un email válido'),
    body('email').custom( (value) =>{
      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email == value) {
          return false    //Si esto se cumple entonces muestra el mensaje de error
        }
      }
      return true   //De no encontrase el email entonces no muestra el mensaje de errror
    }).withMessage('Usuario ya se encuentra registrado...')
]


  
  

