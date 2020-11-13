'use strict'

var connection = require('../config.js');
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;



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


                  if(results.length === []){

                      response.send({
                        ok : false,
                        msj: 'Username and Password are Incorrect'
                    });


                  }else{

                    bcrypt.compare(user.password, results[0].password).then(result => {
                      
               
                            response.send({
                              ok : result,
                              msj: 'Login Access'
                            });

                            return result;


                      }).catch(err =>{

                          response.send({
                            ok : err,
                            msj: 'Username and Password are Incorrect.'
                          });

                     });

                  }
      
           


            });

    } 
    else {
      
        response.send({
            ok : false,
            msj: 'Username and Password are Incorrect'
        });
      
    }

 }


 function registerUser(request, response){

 let user;




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
  id_tipous: 1
}




if ( user.username !== '' && user.password !== '' ) {



connection.query('SELECT * FROM users WHERE email = ?', user.email, (error, results, fields) => {



if (results.length > 0) {

     response.send({
         ok : false,
         msj: 'Email Exist'
     });


    
}else{

  bcrypt.hash(request.body.password, BCRYPT_SALT_ROUNDS).then((hash) => {

    user.password = hash;

    connection.query('INSERT INTO users SET ?', user, (error, results, fields)=>  {

      console.log(error);
  
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

 connection.query('SELECT * FROM users', (error, results, fields) => {

   if (results.length > 0) {

       response.send({
    
           iduser: results
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
 loginUser
}
