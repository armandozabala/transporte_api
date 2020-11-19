'use strict'

var fileCtrl = require('./file');
var connection = require('../config.js');
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;


function deleteUsuarioOperacion(request, response){


    let usuario_operacion = {
        id_usuario: request.params.id
    }
   
    connection.query('DELETE FROM usuarios_operacion WHERE id_usuario = ?', usuario_operacion.id_usuario, (error, results, fields) => {
      

     if (results.affectedRows > 0) {
   
      connection.query('DELETE FROM users WHERE id = ?', usuario_operacion.id_usuario, (error, results, fields) => {

        if (results.affectedRows > 0) { 

            response.send({
              ok : true,
              msj: 'Delete Usuario-Operacion Success'
          });

        }else{

          response.send({
            ok : false,
            msj: 'Usuario ID no exist'
          });
        }
    
      });
       
     }else{
 
       response.send({
         ok : false,
         msj: 'Usuario-Operacion ID no exist'
       });
     }
    
     });
   
 }
 


function usersOperations(request, response){

  let idUsuario = request.body.idusuario;
  let idOperacion = request.body.idoperacion;

  let usuario_operacion = {
      id_usuario: idUsuario,
      id_operacion: idOperacion
  }

  if ( idUsuario !== '' && idOperacion !== '' ) {


   connection.query('INSERT INTO usuarios_operacion SET ?', usuario_operacion, (error, results, fields) => {

    console.log(error);
  
    if (results.insertId > 0) {
  
      response.send({
          ok : true,
          msj: 'Register Usuarios-Operacion Success',
          iduser: results.insertId
      });

    }
   });


  }


}


function loginUser(request, response){


    let user;

    user = {
       email: request.body.email,
       password: request.body.password
    }

    if ( user.email !== '' && user.password !== '' ) {

            connection.query('SELECT * FROM users WHERE email = ?', user.email, (error, results, fields) => { 


                  if(results.length === 0){

                      response.json({
                        ok : false,
                        msj: 'Username and Password are Incorrect'
                    });


                  }else{

                    bcrypt.compare(user.password, results[0].password).then(result => {
                      
               
                            response.json({
                              ok : result,
                              msj: 'Login Access'
                            });

                            return result;


                      }).catch(err =>{

                          response.json({
                            ok : err,
                            msj: 'Username and Password are Incorrect.'
                          });

                     });

                  }
      
           


            });

    } 
    else {
      
        response.json({
            ok : false,
            msj: 'Username and Password are Incorrect'
        });
      
    }

 }


 function updateUser(request, response){

  let user;
 
  let photo = request.files[0];
  let email = request.body.email;

  user = {
   username: request.body.username,
   password: request.body.password,
   nombres:  request.body.nombres,
   apellidos:  request.body.apellidos,
   tipo_documento: request.body.tipo_documento,
   cedula: request.body.cedula,
   created_on: new Date().getTime() / 1000,
   fecha_nacimiento: request.body.fecha_nacimiento,
   edad: request.body.edad,
   telefono:  request.body.telefono,
   direccion:  request.body.direccion,
   id_departamento: 1,
   id_ciudad: 1,
   id_tipous: 1,
   foto: ''
 }
 
 
 
 if ( user.email !== '') {
 
 
 connection.query( `SELECT * FROM users WHERE email = ?`, email, (error, results, fields) => {


 if (!results.length > 0) {
 
      response.send({
          ok : false,
          msj: 'Email Wrong'
      });
 
 
 }else{
 
   bcrypt.hash(request.body.password, BCRYPT_SALT_ROUNDS).then(async (hash) => {
 
     user.password = hash;
 
     user.foto = await fileCtrl.uploadFiles('users',photo);
 
 
     connection.query(`UPDATE users  SET username = ?, password = ? , nombres = ?, apellidos = ?, tipo_documento = ?, cedula = ?, telefono = ?, direccion = ? , id_tipous = ?, fecha_nacimiento = ? WHERE email = ?`, [user.username, user.password, user.nombres, user.apellidos, user.tipo_documento, user.cedula, user.telefono, user.direccion, user.id_tipous, user.fecha_nacimiento,  email], (error, results, fields)=>  {
 
 
       if (results.affectedRows > 0) {
   
           response.send({
               ok : true,
               msj: 'Users Update Success'
           });
 
          
       }
     });
 
     return hash;
 
   }).catch((err)=>{
       console.log(err);
   })
 
 
   }
   });
 
 
 
 } else {
   response.send({
   ok : false,
   msj: 'Email and Password are empty'
   });
 
 }
 
 
 
 }


function registerUser(request, response){

 let user;

 let photo = request.files[0];

 user = {
  username: request.body.username,
  password: request.body.password,
  email: request.body.email,
  nombres:  request.body.nombres,
  apellidos:  request.body.apellidos,
  tipo_documento: request.body.tipo_documento,
  cedula: request.body.cedula,
  created_on: new Date().getTime() / 1000,
  fecha_nacimiento: new Date(),
  edad: request.body.edad,
  telefono:  request.body.telefono,
  direccion:  request.body.direccion,
  id_departamento: 1,
  id_ciudad: 1,
  id_tipous: 1,
  foto: ''
}




if ( user.username !== '' && user.password !== '' ) {



connection.query('SELECT * FROM users WHERE email = ?', user.email, (error, results, fields) => {



if (results.length > 0) {

     response.send({
         ok : false,
         msj: 'Email Exist'
     });


}else{

  bcrypt.hash(request.body.password, BCRYPT_SALT_ROUNDS).then(async (hash) => {

    user.password = hash;

    user.foto = await fileCtrl.uploadFiles('users',photo);


    connection.query('INSERT INTO users SET ?', user, (error, results, fields)=>  {


      if (results.insertId > 0) {
  
          response.send({
              ok : true,
              msj: 'Register Success',
              iduser: results.insertId
          });

         
      }
    });

    return hash;

  }).catch((err)=>{
      console.log(err);
  })


  }
  });



} else {
  response.send({
  ok : false,
  msj: 'Username and Password are empty'
  });

}



}


function allUsers(request, response){

  let idOperacion = request.params.idOperacion

  //INNER JOIN usuarios_operacion uo ON  us.id = uo.id_usuario AND uo.id_operacion =  ?
 connection.query(`SELECT * FROM users us INNER JOIN usuarios_operacion uo ON  us.id = uo.id_usuario`, idOperacion, (error, results, fields) => {

   if (results.length > 0) {

        response.send({
          size: results.length,
          results
       });

  }else{

     response.send({
      ok : false,
      msj: 'Incorrect'
     });

  }

 });

}


function allUsersPaginate(request, response){

  const limit = 20
  // page number
  const page = request.query.page
  // calculate offset
  const offset = (page - 1) * limit

 connection.query(`SELECT * FROM users limit ${limit} OFFSET ${offset}`, (error, results, fields) => {

   if (results.length > 0) {

        response.send({
          'users_page_count':results.length,
          'page_number':page,
          'users':results
       });

  }else{

     response.send({
      ok : false,
      msj: 'Incorrect'
     });

  }

 });

}



module.exports = {
 allUsers,
 registerUser,
 usersOperations,
 loginUser,
 deleteUsuarioOperacion,
 updateUser
}
