'use strict'

var connection = require('../config.js');

function editRuta(request, response){

   let idRuta = request.params.id;
   let ruta = request.body.ruta;
   
    connection.query('UPDATE rutas  SET ruta= ? WHERE id_ruta= ?', [ruta, idRuta], (error, results, fields) => {
   

     if (results.affectedRows > 0) {
   
             response.send({
                  ok : true,
                  msj: 'Update Ruta Success'
             });
 
     }else{
 
             response.send({
                  ok : true,
                  msj: 'Ruta ID not exist'
             });
 
     }
    
     });
   
 }


function deleteRuta(request, response){

   let idRuta = request.params.id;
   
    connection.query('DELETE FROM rutas WHERE id_ruta= ?', idRuta, (error, results, fields) => {
   
     if (results.affectedRows > 0) {
   
             response.send({
                  ok : true,
                  msj: 'Delete Ruta Success'
             });
 
     }else{
 
             response.send({
                  ok : true,
                  msj: 'Ruta ID not exist'
             });
 
     }
    
     });
   
 }

function registerRuta(request, response){

 let rutas;


    rutas = {
      ruta: request.body.ruta,
      color: request.body.color,
      id_operacion: request.body.id_operacion
   }


if ( rutas.ruta !== '') {


 connection.query('INSERT INTO rutas SET ?', rutas, (error, results, fields) => {

   console.log(error);

  if (results.insertId > 0) {

   response.send({
       ok : true,
       msj: 'Register Ruta Success',
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


function allRutas(request, response){

 let idOperacion = request.params.idOperacion;

 connection.query('SELECT * FROM rutas WHERE id_operacion = ?', idOperacion , (error, results, fields) => {

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



module.exports = {
 registerRuta,
 allRutas,
 deleteRuta,
 editRuta
}
