'use strict'

var connection = require('../config.js');


function deleteCustomer(request, response){

  let customers = request.params.idcustomer;
  
   connection.query('DELETE FROM cliente WHERE id_cliente= ?', customers, (error, results, fields) => {
  
    if (results.affectedRows > 0) {
  
     response.send({
         ok : true,
         msj: 'Delete Cliente Success'
     });
    }
   
    });
  
}


function registerCustomers(request, response){

    let customers;
   
   
    customers = {
         razon_social: request.body.razon_social,
         nit: request.body.nit,
         codigo: request.body.codigo,
         cod_detalle: request.body.cod_detalle,
         nombres: request.body.nombres,
         apellidos: request.body.apellidos,
         tipo_cedula: request.body.tipo_cedula,
         cedula: request.body.cedula,
         direccion: request.body.direccion,
         email: request.body.email,
         telefono: request.body.telefono,
         coordenada_lat:   request.body.coordenada_lat,
         coordenada_lon:  request.body.coordenada_lon,
         id_ciudad: request.body.id_ciudad,
         id_departamento: request.body.id_departamento
      }
   
   
   if ( customers.razon_social !== '') {
   
   
    connection.query('INSERT INTO cliente SET ?', customers, (error, results, fields) => {
   
   
     if (results.affectedRows > 0) {
   
      response.send({
          ok : true,
          msj: 'Register Cliente Success',
          iduser: results.insertId
      });
     }
    
   });
   
   } else {
   
      response.send({
       ok : false,
       msj: 'Incorrect register Cliente'
      });
   
   }
   
   
   
   }


function allCustomers(request, response){

 connection.query('SELECT * FROM cliente', (error, results, fields) => {

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
 allCustomers,
 registerCustomers,
 deleteCustomer
}
