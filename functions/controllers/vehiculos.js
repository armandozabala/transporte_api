'use strict'

var connection = require('../config.js');


function deleteVehiculo(request, response){

     let idvehiculo = request.params.id;
     
      connection.query('DELETE FROM vehiculo WHERE id_vehiculo= ?', idvehiculo, (error, results, fields) => {
     
       if (results.affectedRows > 0) {
     
               response.send({
                    ok : true,
                    msj: 'Delete Vehiculo Success'
               });

       }else{

               response.send({
                    ok : true,
                    msj: 'Vehiculo not exist'
               });

       }
      
       });
     
   }


function registerVehiculo(request, response){

     let cars;
     


     connection.query('SELECT * FROM vehiculo WHERE placas = ?', request.body.placas ,(error, results, fields) => {

               if(results.length === 0){

                    cars = {
                         id_usuario: request.body.id_usuario,
                         marca: request.body.marca,
                         modelo: request.body.modelo,
                         placas: request.body.placas,
                         id_ruta: request.body.id_ruta,
                         fecha_soat: request.body.fecha_soat,
                         fecha_mecanica: request.body.fecha_mecanica,
                         fecha_sanidad: request.body.fecha_sanidad
                    }

              
                    connection.query('INSERT INTO vehiculo SET ?',cars,(error, results, fields) => {


                         if(results.insertId > 0){
                              response.json({
                                   ok: true,
                                   msg: 'Placa Register Success'
                             })
         
                         }
                    
                    });
                    
               }else{

                    response.json({
                          ok: false,
                          msg: 'Placa exist'
                    })

               }


     });


}

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
 allVehiculos,
 registerVehiculo,
 deleteVehiculo
}
