'use strict'

var connection = require('../config.js');
var moment = require('moment');

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

 let entregas = [];

 
 let info = request.body;


 info.forEach(item => {

     
        let entrega = [
          moment(item[0]).format('YYYY-MM-DD'),
          item[1] == null ? null : moment(item[1]).format('hh:mm:ss'),
          item[2] == null ? null : moment(item[2]).format('hh:mm:ss'),
          item[3] == null ? null : moment(item[3]).format('hh:mm:ss'),
          item[4] == null ? null : moment(item[4]).format('hh:mm:ss'),
          item[5],
          item[6],
          item[7],
          item[8],
          item[9],
          item[10],
          item[11],
          item[12],
          item[13],
          item[14] == null ? 0 : item[14],
          item[15] == null ? 0 : item[15],
        ];
       

       entregas.push(entrega);
        
      
   
 });



if (entregas.length > 0) {


connection.query(`INSERT INTO entregas (
                                       fecha_ent,
                                       hora1_desde,
                                       hora1_hasta,
                                       hora2_desde,
                                       hora2_hasta, 
                                       id_cliente, 
                                       id_operacion, 
                                       observacion, 
                                       id_mercancia, 
                                       cantidad_trans, 
                                       unidades_trans, 
                                       factura_num, 
                                       monto, 
                                       estado,
                                       latitud,
                                       longitud
                                       ) VALUES ?`, [entregas], (error, results, fields) => {

  //if (results.affectedRows > 0) {
      response.send({
          ok : true,
          msj: 'Register Estado Success',
          iduser: entregas
      });
 // }
 
});

} else {

      response.send({
        ok : false,
        msj: 'Incorrent register Ruta'
      });

}



}


/** Entregas por IdUSer */
function allEntregasByUser(request, response){

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

/** Entregas por 
 * All Entregas
 */
function allEntregas(request, response){


 
  connection.query(`SELECT * FROM entregas e 
                    INNER JOIN cliente cl ON (cl.id_cliente = e.id_cliente)
                    WHERE DATE(e.fecha_ent) = CURDATE()`, (error, results, fields) => {
 
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
 reportarEntrega,
 allEntregasByUser
}
