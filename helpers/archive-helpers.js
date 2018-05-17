var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpHelpers = require('./http-helpers.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  publicList: path.join(__dirname, '../web/archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {

  fs.readFile(exports.paths.list, (error, data) => {
    if (error) {
      throw error;
    } else {
      callback(data.toString().split('\n'));
    }
  });
};

exports.isUrlInList = function(data, url, callback) {
  callback(data.includes(url));
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, (error) => {
    if (error) {
      throw error;
    } else {
      callback(url);
    }
  });
}

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(error, files) {
    files.forEach((fileName) => {
      var file = path.join(asset, fileName);
      fs.readFile(file, 'UTF-8', function(error, contents) {
        if (error) {
          throw error;
        } else {
          callback(contents);
        }
      });
    });
  });
};

exports.downloadUrls = function(urls) {
};
