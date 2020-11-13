'use strict'

var connection = require('../config.js');


function registerEstado(request, response){

 let estados;


 estados = {
      id_estado: request.body.id_estado,
      estado: request.body.estado
   }


if ( estados.estado !== '') {


 connection.query('INSERT INTO estados SET ?', estados, (error, results, fields) => {


  if (results.affectedRows > 0) {

   response.send({
       ok : true,
       msj: 'Register Estado Success',
       iduser: estados.id_estado
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


function allEstados(request, response){


 connection.query('SELECT * FROM estados', (error, results, fields) => {

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
 registerEstado,
 allEstados
}
