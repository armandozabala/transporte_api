'use strict'

var connection = require('../config.js');

function allDepartamentos(request, response){

 connection.query('SELECT * FROM departamentos', (error, results, fields) => {

   if (results.length > 0) {

       response.send({
           results
       });

  }else{

     response.send({
      ok : false,
      msj: 'Incorrect Customers'
     });

  }

 });

}

module.exports = {
 allDepartamentos
}
