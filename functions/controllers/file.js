'use strict'
const { Storage } = require('@google-cloud/storage');
const { v4 } = require('uuid');

const storage = new Storage({
 projectId: 'restaurantearm',
 keyFilename: './serviceAccountKey.json',
});

// Create a bucket associated to Firebase storage bucket
const bucket = storage.bucket('restaurantearm.appspot.com');


 function uploads(request, response){

   let paths = request.params.path;

   const {
    fieldname,
    filename,
    originalname,
    encoding,
    mimetype,
    buffer,
  } = request.files[0]



  uploadFiles(paths, request.files[0]).then(res => {

  
     response.json({
       res
     });

     return res;

  }).catch(err =>{

    console.log(err);

  })



}

function uploadFiles(path, file){

 return new Promise((resolve, reject) => {

 
  const name = (new Date()) + '_' + file.originalname;


 const blob = bucket.file(decodeURIComponent(path+"%2F"+name));

 
 let token = v4();

 // Create writable stream and specifying file mimetype
 const blobWriter = blob.createWriteStream({
   metadata: {
     contentType: file.mimetype,
     metadata: {
      firebaseStorageDownloadTokens: token
    }
    
   },
 });

 blobWriter.on('error', (err) => {
   reject(err);
  //next(err)
 });

 blobWriter.on('finish', () => {
   // Assembling public URL for accessing the file via HTTP

   let name = blob.name.replace("/", "%2F");

   const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
     bucket.name
   }/o/${name}?alt=media`;

   // Return the file name and its public URL
   /*res
     .status(200)
     .send({ fileName: originalname, fileLocation: publicUrl });*/

     resolve(publicUrl);
 });

 // When there is no more data to be consumed from the stream
 blobWriter.end(file.buffer);
 
});

}

module.exports = {
 uploads,
 uploadFiles
}
