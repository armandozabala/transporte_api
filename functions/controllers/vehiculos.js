'use strict'

var connection = require('../config.js');

function allVehiculos(request, response){

 connection.query('SELECT * FROM vehiculo', (error, results, fields) => {

   if (results.length > 0) {

       response.send({
            results
       });

  }else{

     response.send({
      ok : false,
      msj: 'Incorrect Vehiculos'
     });

  }

 });

}

module.exports = {
 allVehiculos
}
