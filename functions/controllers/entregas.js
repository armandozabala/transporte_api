'use strict'

var connection = require('../config.js');


function registerRecursos(request, response){

   let recursos;

   recursos = {
      id_entrega: request.body.id_entrega,
      foto: request.body.foto,
   }


   if ( recursos.foto != '') {

      connection.query('INSERT INTO recursos_ent SET ?', recursos, function(error, results, fields) {


         if (results.affectedRows > 0) {
       
          response.send({
              ok : true,
              msj: 'Register Recursos Success',
              iduser: results.insertId
          });
         }
        
       });


   }else{

       response.send({
         ok : false,
         msj: 'Incorrent register Ruta'
        });

   }


}

function registerEntregas(request, response){

 let entregas;


 entregas = {
      fecha_ent: new Date(),
      id_cliente: request.body.id_cliente,
      id_operacion:  request.body.id_operacion,
      observacion: request.body.observacion,
      id_mercancia: request.body.id_mercancia,
      cantidad_trans: request.body.cantidad_trans,
      unidades_trans: request.body.unidades_trans,
      factura_num: request.body.factura_num,
      monto: request.body.monto,
      estado: request.body.estado
   }


if ( entregas.estado != '') {


 connection.query('INSERT INTO entregas SET ?', entregas, function(error, results, fields) {


  if (results.affectedRows > 0) {

   response.send({
       ok : true,
       msj: 'Register Estado Success',
       iduser: results.insertId
   });
  }
 
});

} else {

   response.send({
    ok : false,
    msj: 'Incorrent register Ruta'
   });

}



}


/** Entregas por IdUSer */
function allEntregas(request, response){

 let idUser = request.params.idUser;


 connection.query('SELECT * FROM entregas_asignadas WHERE id_usuario = ?', idUser, function(error, results, fields) {

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


function entregasAsignadas(request, response){

   let id_entrega = request.body.id_entrega;
   let id_usuario = request.body.id_usuario;
   let fecha_asignacion = new Date();
   let orden = 0;
 
   let entrega_asignada = {
       id_entrega,
       id_usuario,
       fecha_asignacion,
       orden   
   }
 
   if ( entrega_asignada.id_entrega != '' ) {
 
 
    connection.query('INSERT INTO entregas_asignadas SET ?', entrega_asignada, function(error, results, fields) {
 
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

module.exports = {
 allEntregas,
 registerEntregas,
 entregasAsignadas,
 registerRecursos
}
