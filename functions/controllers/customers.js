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

function registerCustomerExcel(request, response){

    let customer = [];
   
    
    let info = request.body;
   
   
    info.forEach(item => {
   
        
           let entrega = [
             item[0],//razon social
             item[1], //nit
             item[2], //codigo
             item[3], //cod_detalle
             item[4], //nombres
             item[5], //apellidos
             item[6], //tipo cedula CE
             item[7], //cedula
             item[8], //direccion
             item[9], //telefono
             item[10], //email
             item[11], //coordenada_lat
             item[12], //coordenada_lon
             item[13], //hora1_desde
             item[14], //hora1_hasta
             item[15], //hora2_desde
             item[16], //hora2_hasta
             item[17], //id_ciudad
             item[18] //id_departamento
           ];
          
   
          customer.push(entrega);
           
         
      
    });
   
   
   
   if (customer.length > 0) {
   
   
   connection.query(`INSERT INTO cliente (
                                          razon_social,
                                          nit,
                                          codigo,
                                          cod_detalle,
                                          nombres, 
                                          apellidos, 
                                          tipo_cedula, 
                                          cedula, 
                                          direccion, 
                                          telefono, 
                                          email, 
                                          coordenada_lat, 
                                          coordenada_lon, 
                                          hora1_desde,
                                          hora1_hasta,
                                          hora2_desde,
                                          hora2_hasta,
                                          id_ciudad,
                                          id_departamento
                                          ) VALUES ?`, [customer], (error, results, fields) => {
   
     //if (results.affectedRows > 0) {
         response.send({
             ok : true,
             msj: 'Register Customer Success',
             iduser: customer
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


        connection.query(`SELECT * FROM cliente`, (error, results, fields) => {

        if (results.length > 0) {

            response.send({
                size: results.length,  
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


   function allCustomersPaginate(request, response){

    const limit = 20
    // page number
    const page = request.query.page
    // calculate offset
    const offset = (page - 1) * limit


 connection.query(`SELECT * FROM cliente limit ${limit} OFFSET ${offset}`, (error, results, fields) => {

   if (results.length > 0) {

       response.send({
           'customersa_page_count':results.length,
           'page_number':page,
           'customers':results
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
 deleteCustomer,
 registerCustomerExcel
}
