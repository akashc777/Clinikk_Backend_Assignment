/*
*
* Library used for storing and editting data
*
*/

// Dependencies
const fs = require('fs');
const path = require('path'); // for normalising the path to different dir
const helpers = require('./helpers');

// Container for the module
const lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = function (dir, file, data, callback) {

  // Open the file for writting
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {

      // Convert data to string
      const stringData = JSON.stringify(data);

      // Write to a file and close
      fs.writeFile(fileDescriptor, stringData, function (err) {
        if (!err) {
          fs.close(fileDescriptor, function(err){
            if(!err){

              callback(false);

            }else {
              callback("Error closing new file");
            }
          });
        }else {
          callback('Error writting to file\n');
        }

      });

    }else {
      callback('could not create new file, it may already exist\n');
    }
  });

};


// REad data from a file
lib.read = async function (dir, file, callback) {
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf-8', function (err, data) {
    if (!err && data) {
      const parseData = helpers.parseJsonToObject(data);
      callback(false, parseData);
    }else {
      callback(err, data);
    }

  });

};


// Update data inside a file
lib.update = function (dir, file, data, callback) {
  // OPen the file for writting
  fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      // Convert data to string
      const stringData = JSON.stringify(data);

      // Truncate the content of the fileDescriptor
      fs.ftruncate(fileDescriptor, function (err) {
        if (!err) {

          //  Write to the file and cose it
          fs.writeFile(fileDescriptor, stringData, function (err) {
            if (!err) {
              fs.close(fileDescriptor, function (err) {
                if(!err){

                  callback(false);

                }else {
                  callback("Error closing new file");
                }
              });

            }else {
              callback('Error writting to an existing file')
            }
          });

        }else {
          callback('Error truncating the file');
        }
      });

    }else {
      callback('could not open file for updating it may not exist yet');
    }
  });
};

// delete a file
lib.delete = function (dir, file, callback) {
  // unlink the file
  fs.unlink(lib.baseDir+dir+'/'+file+'.json', function (err) {
    if (!err) {
      callback(false);
    }else {
      callback('Error deleting file\n');
    }
  });

};

//List all the items in a dir
lib.list = function (dir, callback) {
  fs.readdir(lib.baseDir+dir+'/', function (err, data) {
    if (!err && data && data.length > 0) {
      const trimmedFileNames = [];
      data.forEach(function (fileName) {
        trimmedFileNames.push(fileName.replace('.json', ''));
      });
      return callback(false, trimmedFileNames);
    }else {
      return callback(err, data)
    }
  });
};


// Export the module
module.exports = lib;
