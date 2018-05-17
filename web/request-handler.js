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
      
      let url = storage.split('=')[1] + '/n';
        archive.readListOfUrls(function(results) {
          // console.log('read list results, ', results);
          archive.isUrlInList(results, url, function(err, result, url) {
            if (err) {
              console.log(err);
            } else {
              console.log('isInList result', err);
              if (archive.paths.list.includes(result)) {
                res.end(archive.paths.siteAssets + '/loading.html');
              } else {
                console.log('until this', url)
                archive.addUrlToList(url, function(url) {
                    console.log('addUrl', url)
                    archive.isUrlArchived(url, (err, website) => {
                      
                        console.log('website boolean',website);
                        if (website) {
                          fs.readFile(archive.paths.sites + url);
                        } else {
                          archive.downloadUrls();
                        }
                      
                    });
                  });
                }
                res.end(result);
              }
            });
          });
        });
      };
    };
