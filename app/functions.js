var SALT_WORK_FACTOR = 10;
var bcrypt = global.bcrypt;

module.exports = {
  imageRandomName: function() {
    var randomstr = Math.ceil((new Date().getTime()) / 1000);
    return randomstr;
  },
  chackImageValidation: function(fileData, options, callback) {
    var images_types_arr = [
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/png'
    ];

    console.log('fileData:', fileData)
    console.log('file-type:', fileData.type)
    if (images_types_arr.indexOf(fileData.type) === -1) {

      callback('Invalid image type please select valid image');
    } else {


      var mmm = require('mmmagic'),
        Magic = mmm.Magic;
      var magic = new Magic(mmm.MAGIC_MIME_TYPE);
      var fs = require('fs')

      fs.readFile(fileData.path, function(err, data) {
        if (err) {
          callback('Can not read image');
        } else {

          var buf = new Buffer(data, 'base64');

          magic.detect(buf, function(err, result) {
            if (err) {

              console.log('mime response here')
              callback('Can not read image');
              console.log(err);
            } else {

              var medianame = module.exports.imageRandomName();
              if (result == 'image/png') {
                medianame = medianame + '.png';
                callback(null, medianame)
              } else if (result == 'image/jpeg') {
                medianame = medianame + '.jpg';
                callback(null, medianame)
              } else if (result == 'image/jpg') {
                medianame = medianame + '.jpg';
                callback(null, medianame)
              } else if (result == 'image/gif') {
                medianame = medianame + '.gif';
                callback(null, medianame)
              } else if (result == 'image/x-ms-bmp') {
                medianame = medianame + '.bmp';
                callback(null, medianame)
              } else {
                callback('Invalid image type please select valid image')
              }
            }
          });
        }
      });
    }
  },
    crypto: function(text, type) {

   var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
    var key = 'hgyhghhgm';


    try {
      if (type.toString() === "encrypt") {
        var cipher = crypto.createCipher(algorithm, key);
        var encrypted = cipher.update(text.toString(), 'utf8', 'hex') + cipher.final('hex');
        return encrypted;
      } else {
        var decipher = crypto.createDecipher(algorithm, key);
        var decrypted = decipher.update(text.toString(), 'hex', 'utf8') + decipher.final('utf8');
        return decrypted;
      }
    } catch (err) {
      return false
    }
  },
  imageUpload: function(file, file_name, location_dir, callback) {
    var fs = require('fs-extra');

    fs.open(UPLOAD_PATH + location_dir, 'r', function(err, fd) {
      if (err && err.code == 'ENOENT') {

        fs.mkdirs(UPLOAD_PATH + location_dir, function(err) {
          if (err) {
            console.log('directory creation error: ', err);
            callback(err);
          } else {
            fs.readFile(file.path, function(err, r) {
              var newPath = global.UPLOAD_PATH + location_dir + '/' + file_name;
              console.log("11111111111111", newPath);
              fs.writeFile(newPath, r, function(err) {
                if (err) {
                  console.log('image-uploading-error:', err)
                  callback(err);
                } else {
                  callback(null, true);
                }
              });
            });
          }
        })

      } else {
        fs.readFile(file.path, function(err, r) {
          var newPath = global.UPLOAD_PATH + location_dir + '/' + file_name;
          console.log("1111111111111", newPath);
          fs.writeFile(newPath, r, function(err) {
            if (err) {
              console.log('image-uploading-error:', err)
              callback(err);
            } else {
              callback(null, true);
            }
          });
        });

      }
    });

  },
  deleteImage: function(folder_name, image_name) {
    fs.unlink(global.UPLOAD_PATH + folder_name + '/' + image_name, function(err) {
      if (err) {
        //console.log('image not found: ', err);
      } else {
        //console.log('image deleted');
      }
    });
  },
  get_last_insert_id: function(insert_json) {
    //console.log('insert_json:', insert_json);

    var last_insert_id;
    if (insert_json._id != undefined) {
      last_insert_id = insert_json._id;
    }

    return last_insert_id;
  },
  get_random_password: function() {

    var result;
    var rand_password = '123456';
    result = rand_password;
    return result;
  },
  get_password: function(password_string, callback) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err)
        return callback(err);

      // hash the password using our new salt
      bcrypt.hash(password_string, salt, function(err, hash) {
        if (err)
          return callback(err);

        // override the cleartext password with the hashed one
        return callback(null, hash);
      });
    });
  },
  update_session: function(UserData, req, callback) 
  {
	  req.session.regenerate(function() 
	  {
        req.session.user = UserData;
		callback();
      });
  }
};
