'use strict'
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
 projectId: 'restaurantearm',
 keyFilename: './serviceAccountKey.json',
});

// Create a bucket associated to Firebase storage bucket
const bucket = storage.bucket('restaurantearm.appspot.com');


 function uploads(request, response){

   const {
    fieldname,
    filename,
    originalname,
    encoding,
    mimetype,
    buffer,
  } = request.files[0]

  files(request.files[0]).then(res => {

    response.json({
      res
    });

  }).catch(err =>{
    console.log(err);
    
    response.json({
     err
   });

  })



}

const files = (file) => {

 return new Promise((resolve, reject) => {

  console.log(file);

 const blob = bucket.file(file.originalname);

 // Create writable stream and specifying file mimetype
 const blobWriter = blob.createWriteStream({
   metadata: {
     contentType: file.mimetype,
   },
 });

 blobWriter.on('error', (err) => {
   reject('Something is wrong! Unable to upload at the moment.'+err);
  //next(err)
 });

 blobWriter.on('finish', () => {
   // Assembling public URL for accessing the file via HTTP
   const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
     bucket.name
   }/o/${encodeURI(blob.name)}?alt=media`;

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
 uploads
}
