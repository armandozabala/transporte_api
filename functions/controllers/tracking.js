'use strict'

var connection = require('../config.js');


function getTracking(request, response){

     let idusuario = request.params.idUser;

     connection.query('SELECT * FROM tracking_entrega WHERE id_usuario = ? AND  DATE(fecha) = CURDATE()', idusuario , (error, results, fields) => {
    
       if (results.length > 0) {
    
           response.send({ 
                results
           });
    
      }else{
    
         response.send({
          ok : false,
          msj: 'Incorrect Rutas Query'
         });
    
      }
    
     });

}

function trackingEntrega(request, response){

   let id_entrega = request.body.id_entrega;
   let fecha = new Date();
   let ms_time = new Date().getTime() / 1000;
   let latitud = request.body.latitud;
   let longitud = request.body.longitud;
   let batery = request.body.batery;
   let id_usuario = request.body.id_usuario;
 
   let tracking_entrega = {
       id_entrega,
       fecha,
       ms_time,
       latitud,
       longitud,
       batery,
       id_usuario 
   }
 
   if ( tracking_entrega.id_entrega !== '' ) {
 
 
    connection.query('INSERT INTO tracking_entrega SET ?', tracking_entrega, (error, results, fields) => {
 
     console.log(error);
   
     if (results.insertId > 0) {
   
       response.send({
           ok : true,
           msj: 'Register Tracking Success',
           iduser: results.insertId
       });
 
     }
    });
 
 
   }
 
 
 }

module.exports = {
 trackingEntrega,
 getTracking
}
