var functions = require('firebase-functions');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const fileMiddleware = require('express-multipart-file-parser')


var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(fileMiddleware);



const userCtrl = require('./controllers/user');
const customersCtrl = require('./controllers/customers');
const departamentosCtrl = require('./controllers/departamentos');
const ciudadesCtrl = require('./controllers/ciudades');
const vehiculosCtrl = require('./controllers/vehiculos');
const operacionCtrl = require('./controllers/operacion');
const rutasCtrl = require('./controllers/rutas');
const estadoCtrl = require('./controllers/estados');
const entregasCtrl = require('./controllers/entregas');
const devolucionesCtrl = require('./controllers/devoluciones');
const trackingCtrl = require('./controllers/tracking');
const fileCtrl = require('./controllers/file');



app.get('/',(req, res) => {

   res.json({
      ok: true,
      msg: 'Welcome Transporte API'
   })

});

//upload
app.post('/file/:path', fileCtrl.uploads);


//Login Users
app.post('/registeruser', userCtrl.registerUser);
app.get('/allusers/:idOperacion',  userCtrl.allUsers);
app.post('/auth', userCtrl.loginUser);
app.put('/user', userCtrl.updateUser);
app.delete('/user/:id', userCtrl.deleteUsuarioOperacion);


//departamentos
app.get('/alldepartamentos', departamentosCtrl.allDepartamentos);
//ciudades
app.get('/allciudades/:idDepartamento', ciudadesCtrl.allCiudades);


//vehiculos
app.get('/allvehiculos', vehiculosCtrl.allVehiculos);
app.post('/registervehiculo', vehiculosCtrl.registerVehiculo);
app.delete('/vehiculo/:id', vehiculosCtrl.deleteVehiculo);

//operacion
app.post('/registeroperacion', operacionCtrl.registerOperacion);
app.get('/alloperacion',  operacionCtrl.allOperacion);
app.delete('/operacion/:id', operacionCtrl.deleteOperacion);
app.put('/operacion/:id', operacionCtrl.editOperacion);

//rutas
app.get('/allrutas/:idOperacion', rutasCtrl.allRutas);
app.post('/registerruta', rutasCtrl.registerRuta);
app.delete('/ruta/:id', rutasCtrl.deleteRuta);
app.put('/ruta/:id', rutasCtrl.editRuta);


//usuarios-operacion
app.post('/usuariosoperacion', userCtrl.usersOperations);
app.delete('/usuariosoperacion/:idusuario', userCtrl.deleteUsuarioOperacion);



//estados
app.post('/registerestado', estadoCtrl.registerEstado);
app.get('/allestados', estadoCtrl.allEstados);
app.delete('/estado/:idestado', estadoCtrl.deleteEstado);



//entregas por idUser / fecha Ini - Fecha Fin
app.get('/allentregas/:idUser', entregasCtrl.allEntregasByUser);
app.get('/allentregas', entregasCtrl.allEntregas);
app.post('/registerentregas', entregasCtrl.registerEntregas);
app.post('/entregasasignadas', entregasCtrl.entregasAsignadas);
app.post('/recursosentregas', entregasCtrl.registerRecursos);
app.delete('/entrega/:id', entregasCtrl.deleteEntrega);
app.put('/reportarentrega', entregasCtrl.reportarEntrega);


//devoluciones
app.post('/registerdevolucion', devolucionesCtrl.registerDevolucion);
app.delete('/devolucion/:idEntrega', devolucionesCtrl.deleteDevolucion);

//customers
app.post('/registercustomer', customersCtrl.registerCustomers);
app.post('/regcustomerexcel', customersCtrl.registerCustomerExcel);
app.get('/allcustomers', customersCtrl.allCustomers);
app.delete('/customers/:idcustomer', customersCtrl.deleteCustomer);

//tracking
app.post('/tracking', trackingCtrl.trackingEntrega);
app.get('/tracking/:idUser', trackingCtrl.getTracking);


exports.app = functions.https.onRequest(app);