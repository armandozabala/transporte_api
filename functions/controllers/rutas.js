'use strict'

var connection = require('../config.js');


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
 allRutas
}
