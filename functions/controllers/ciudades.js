'use strict'

var connection = require('../config.js');

function allCiudades(request, response){

 let idDepartamento = request.params.idDepartamento;

 connection.query('SELECT * FROM ciudades WHERE id_departamento = ?', idDepartamento, function(error, results, fields) {

   if (results.length > 0) {

       response.send({
           results
       });

  }else{

     response.send({
      ok : false,
      msj: 'Incorrect Cities'
     });

  }

 });

}

module.exports = {
 allCiudades
}
