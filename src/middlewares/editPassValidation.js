const bcrypt = require('bcryptjs');
const {users} = require('../database/models')
const {
  check,
  validationResult,
  body
} = require('express-validator');

let allUsers = users.findAll();

module.exports = [
    check('email').not().isEmpty().withMessage('El campo email no puede estar vacio'),
    check('email').isEmail().withMessage('Agregue un email válido'),
    body('email').custom( async (value) =>{
        let user = await users.findOne({where: {email: value}})
        if (user === null){
          return Promise.reject('El Correo electrónico es incorrecto')
        } 
        return true
      }),
    // Valido que el password viejo sea el correcto
    check('old_password').not().isEmpty().withMessage('Debes ingresar tu contraseña actual'),
    body('old_password').custom( async (value, {req}) => {
        let user = await users.findOne({
          where: {email: req.body.email}
        })
        if(bcrypt.compareSync(value, user.password)){
          return true
        } else {
            // return Promise.reject('La contraseña es incorrecta')
            return false
        }
    }).withMessage('La contraseña es incorrecta'),
    
    //Aquí valido el Password   
    check('password').not().isEmpty().withMessage('Debes ingresar una nueva contraseña'),
    check('password').isLength({min: 8 }).withMessage('La contraseña nueva debe tener un mínimo de 8 caractéres'),
       
    //Acá valido la confimación del password dispuesto por el usuario
    check('confirmPassword').not().isEmpty().withMessage('Debes repetir tu nueva contraseña'),
    check('confirmPassword').isLength({min: 8 }).withMessage('La confirmación de la nueva contraseña debe tener un mínimo de 8 caractéres'),
    
    //Acá valido si las contraseñas son iguales o no
    //El ( value ) viene a ser el valor que viaje en el name del del input del campo 
    //El valor { req } corresponde a lo que viene desde el formulario
    body('confirmPassword').custom((value, {req}) =>{
      if(req.body.password == value ){
        return true    // Si yo retorno un true  no se muestra el error     
      }else{
        return false   // Si retorno un false si se muestra el error
      }    
    }).withMessage('Las contraseñas deben coincidir'),
]


  
  

