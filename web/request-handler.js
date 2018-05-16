var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var http = require('http');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  fs.readFile(archive.paths.homePage, 'UTF-8', function(error, contents) {
    if (error) {
      throw error;
    } else {
      res.end(contents);
    }
  });
};
