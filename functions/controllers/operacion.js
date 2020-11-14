'use strict'

var connection = require('../config.js');

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
 deleteOperacion
}
