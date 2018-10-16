/*
  mockjs语法参考官网http://mockjs.com/
 */

const fs = require('fs');
const formidable = require('formidable');
const async = require('async');

const fetchAvatar = '/api/users/dd55bda7-df0d-4b77-99b2-7056717c6923/avatar';
const avatarName = 'avatar.png';
const AVATAR_FOLDER = 'public/avatar/';

module.exports = {
  [`GET ${fetchAvatar}`](req, res) {
    res.setHeader('Content-Type', 'image/png');
    const content = fs.readFileSync(`../mock/public/avatar/${avatarName}`, 'binary');
    res.writeHead(200, 'Ok');
    res.write(content, 'binary');
    res.end();
  },
  [`POST ${fetchAvatar}`](req, res) {
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = `${AVATAR_FOLDER}`;
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return;
      }

      let extName = '';
      switch (files.file.type) {
        case 'image/pjpeg':
          extName = 'jpg';
          break;
        case 'image/jpeg':
          extName = 'jpg';
          break;
        case 'image/png':
          extName = 'png';
          break;
        case 'image/x-png':
          extName = 'png';
          break;
        default:
      }
      if (extName.length === 0) {
        const tempPath = files.file.path;
        fs.unlink(tempPath, (error) => {
          if (error) throw error;
        });
      } else {
        const newPath = `${AVATAR_FOLDER}${avatarName}`;
        const showUrl = `${AVATAR_FOLDER}${avatarName}`;
        async.series(
          [
            (cb) => {
              fs.exists(AVATAR_FOLDER, (exists) => {
                if (!exists) {
                  fs.mkdir(AVATAR_FOLDER, (error) => {
                    if (error);
                    cb();
                  });
                } else {
                  cb();
                }
              });
            },
            function(cb) {
              fs.renameSync(files.file.path, newPath); //重命名暂存在缓存区的图片文件，相当于将其移动到用户照片文件夹下
              res.json({
                newPath: showUrl
              });
              cb();
            }
          ],
          (error) => {
            if (error) {
              console.info(error);
            }
          }
        );
      }
    });
  }
};
