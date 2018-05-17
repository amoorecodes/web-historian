var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var http = require('http');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  httpHelpers.serveAssets(res, archive.paths.siteAssets, fs.readFile);
  

  let requestStream = fs.createReadStream(archive.paths.publicList);

  if (req.method === "GET") {
    
  } else if (req.method === "POST") {
    let storage = '';
    req.on('data', (data) => {
      storage += data;
    }).on('end', () => {
      let url = storage.split('=')[1] + '\n';
      fs.appendFile('./archives/sites.txt', url, (error) => {
        if (error) {
          throw error;
        } 
        archive.readListOfUrls(function(results) {
          console.log('read list results, ', results);
          var data = results;
          archive.isUrlInList(data, url, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              if (result) {
                res.end(result);
              } else {
                res.end(result);
              }
            }
          });
        });
      });
    });
  }
};
