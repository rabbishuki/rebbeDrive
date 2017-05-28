var google = require('googleapis');
var drive = google.drive('v3');

exports.getFiles = function (auth) {
  return new Promise (function(resolve, reject) {
    drive.files.list({
      auth: auth,
      maxResults: 5,
      fields: "nextPageToken, files(id, name)"
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      var files = response.files;
      if (files.length == 0) {
        console.log('No files found.');
      } else {
        console.log('Files:');
        resolve(files)
      }
    })
  });
}

exports.addTag = function (auth, params) {
    var fileID = '1Atsz9W9KBX3k09RUz32I3dzYKATRKIM-7e2Ji_DYk3k';

    var fileMetadata = {
        'properties': { "bamba": params.tagName }
    };

    drive.files.update({
        fileId: fileID,
        resource: fileMetadata,
        fields: 'id',
        auth: auth
    }, function (err, file) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        } else {
            console.log('File Updated ' + file.id);
            fileID = file.id;
        }
    });
}