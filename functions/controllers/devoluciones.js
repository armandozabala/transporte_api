'use strict'

var connection = require('../config.js');


function deleteDevolucion(request, response){

 //idEntrega
  let devolucion = request.params.idEntrega;
  
   connection.query('DELETE FROM devoluciones WHERE id_entrega = ?', devolucion, (error, results, fields) => {
     
  
    if (results.affectedRows > 0) {
  
      response.send({
          ok : true,
          msj: 'Delete Entrega Success'
      });
      
    }else{

      response.send({
        ok : false,
        msj: 'Entrega ID no exist'
      });
    }
   
    });
  
}



function registerDevolucion(request, response){

   let devolucion;

   devolucion = {
      id_entrega: request.body.id_entrega,
      cliente:  request.body.cliente,
      nit:  request.body.nit,
      telefono:  request.body.telefono,
      comentarios:  request.body.comentarios,
      latitud:  request.body.latitud,
      longitud:  request.body.longitud
   }


   if ( devolucion.id_entrega !== '') {

      connection.query('INSERT INTO devoluciones SET ?', devolucion, (error, results, fields) => {


         if (results.affectedRows > 0) {
       
          response.send({
              ok : true,
              msj: 'Register Devolucion Success',
              iduser: results.insertId
          });
         }
        
       });


   }else{

       response.send({
         ok : false,
         msj: 'Incorrent Devolucion is Empty'
        });

   }


}



function allDevoluciones(request, response){

 let idUser = request.params.idUser;


 connection.query('SELECT * FROM entregas_asignadas WHERE id_usuario = ?', idUser, (error, results, fields) => {

   if (results.length > 0) {

       response.send({
           results
       });

  }else{

     response.send({
      ok : false,
      msj: 'Incorrect Entregas Query'
     });

  }

 });

}




module.exports = {
 allDevoluciones,
 registerDevolucion,
 deleteDevolucion
}
