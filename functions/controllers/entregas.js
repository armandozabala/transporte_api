'use strict'

var connection = require('../config.js');


function deleteEntrega(request, response){

  let entrega = request.params.id;
  
   connection.query('DELETE FROM entregas WHERE id_entrega = ?', entrega, (error, results, fields) => {
     
  
    if (results.affectedRows > 0) {
  
      response.send({
          ok : true,
          msj: 'Delete Entrega Success'
      });
      
    }else{

      response.send({
        ok : false,
        msj: 'Entrega no exist'
      });
    }
   
    });
  
}



function registerRecursos(request, response){

   let recursos;

   recursos = {
      id_entrega: request.body.id_entrega,
      foto: request.body.foto,
   }


   if ( recursos.foto !== '') {

      connection.query('INSERT INTO recursos_ent SET ?', recursos, (error, results, fields) => {


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


if ( entregas.estado !== '') {


 connection.query('INSERT INTO entregas SET ?', entregas, (error, results, fields) => {


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


 connection.query('SELECT * FROM entregas_asignadas WHERE id_usuario = ? AND  DATE(fecha_asignacion) = CURDATE()', idUser, (error, results, fields) => {

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
 
   if ( entrega_asignada.id_entrega !== '' ) {
 
 
    connection.query('INSERT INTO entregas_asignadas SET ?', entrega_asignada, (error, results, fields) => {
 
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


 function reportarEntrega(request, response){

        
          let id_entrega = request.body.id_entrega;
          let id_usuario = request.body.id_usuario;
          let estado = request.body.estado;
          let observacion = request.body.observacion === "" ? " ": request.body.observacion;
          let latitud = request.body.latitud === "" ? 0 : request.body.latitud;
          let longitud = request.body.longitud === "" ? 0 : request.body.longitud;

          connection.query('UPDATE entregas_asignadas  SET fecha_ejecucion= ? WHERE id_entrega= ?', [ new Date(), id_entrega], (error, results, fields) => {
 
    
            if (results.affectedRows > 0) {
          
       

              connection.query('UPDATE entregas SET estado= ?, observacion = ?, latitud = ?, longitud = ? WHERE id_entrega= ?', [ estado, observacion, latitud, longitud, id_entrega], (error, results, fields) => {


                if (results.affectedRows > 0) {

                    response.send({
                      ok : true,
                      msj: 'Report Entregas Asignadas Success',
                  });

                }

                 

              })
        
            }else{

              response.send({
                ok : false,
                msj: 'Entrega no asigned Error'
            });

            }


           });


 }

module.exports = {
 allEntregas,
 registerEntregas,
 entregasAsignadas,
 registerRecursos,
 deleteEntrega,
 reportarEntrega
}
