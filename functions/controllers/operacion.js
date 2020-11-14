'use strict'

var connection = require('../config.js');


function editOperacion(request, response){

  let idOperacion = request.params.id;
  let nom_empresa = request.body.nom_empresa;
  let nit = request.body.nit;
  let telefono = request.body.telefono;
  let id_departamento = request.body.id_departamento;
  let id_ciudad = request.body.id_ciudad;
  let direccion = request.body.direccion;
  
   connection.query('UPDATE operacion SET nom_empresa= ? , nit = ? , telefono = ? , direccion = ? , id_departamento = ? , id_ciudad = ? WHERE id_operacion= ?', [nom_empresa, nit, telefono, direccion, id_departamento, id_ciudad, idOperacion], (error, results, fields) => {
  

    if (results.affectedRows > 0) {
  
            response.send({
                 ok : true,
                 msj: 'Update Operacion Success'
            });

    }else{

            response.send({
                 ok : true,
                 msj: 'Operacion ID not exist'
            });

    }
   
    });
  
}


function deleteOperacion(request, response){

  let idOperacion = request.params.id;
  
   connection.query('DELETE FROM operacion WHERE id_operacion= ?', idOperacion, (error, results, fields) => {
  
    if (results.affectedRows > 0) {
  
            response.send({
                 ok : true,
                 msj: 'Delete Operacion Success'
            });

    }else{

            response.send({
                 ok : true,
                 msj: 'Operacion ID not exist'
            });

    }
   
    });
  
}



function registerOperacion(request, response){

 let operacion;


    operacion = {
      nom_empresa: request.body.nom_empresa,
      nit: request.body.nit,
      telefono: request.body.telefono,
      id_departamento: request.body.id_departamento,
      id_ciudad: request.body.id_ciudad,
      direccion: request.body.direccion
   }




if ( operacion.nom_empresa !== '') {


 connection.query('INSERT INTO operacion SET ?', operacion, (error, results, fields) => {

   console.log(error);

  if (results.insertId > 0) {

   response.send({
       ok : true,
       msj: 'Register Operacion Success',
       iduser: results.insertId
   });
  }
 
});

} else {
response.send({
 ok : false,
 msj: 'Incorrent register Operacion'
});

}



}


function allOperacion(request, response){

 connection.query('SELECT * FROM operacion', (error, results, fields) => {

   if (results.length > 0) {

       response.send({
    
           iduser: results
       });

  }else{

     response.send({
      ok : false,
      msj: 'Incorrect Operacion Query'
     });

  }

 });

}



module.exports = {
 registerOperacion,
 allOperacion,
 deleteOperacion,
 editOperacion
}
