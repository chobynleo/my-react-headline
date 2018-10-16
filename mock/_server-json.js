const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

// 递归获取文件夹中的json文件
function getJsonFilesInDirectory(dir) {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    var filePath = path.join(dir, file);
    var stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      files = files.concat(getJsonFilesInDirectory(filePath));
    } else if (file.match(/.json$/)) {
      if (file.match(/^.~/)) {
        // 删除临时文件
        fs.unlinkSync(filePath);
      } else {
        files.push(filePath);
      }
    }
  });
  return files;
}
// 获取mock/json文件夹中的所有json文件，每个文件为绝对路径
const JSON_ROOT_DIRECTORY = path.join(__dirname + '/json');
const jsonsFiles = getJsonFilesInDirectory(JSON_ROOT_DIRECTORY);

const urlMap = {};
jsonsFiles.map(function(file) {
  const json = require(file);
  for (var key in json) {
    const originalUrl = `${getFileUrl(file, true)}/${key}`.replace(/[\/]+/g, '/');
    const redirectUrl = `${getFileUrl(file, false)}/${key}`.replace(/[\/]+/g, '/');
    urlMap[originalUrl] = redirectUrl;
  }
});

function getFileUrl(file, isOrigin) {
  var filePaths = file
    .replace(JSON_ROOT_DIRECTORY, '')
    .replace('.json', '')
    .split('\\');
  var url;
  if (isOrigin) {
    url = `/${process.env.jsonServerPrefix || 'api'}/${filePaths.splice(0, filePaths.length - 1).join('/')}`;
  } else {
    url = `/jsonserver/${filePaths.join('/')}`;
  }
  url = url.replace(/[\/]+/g, '/');
  return url;
}

function applyJsonServer(server) {
  server.use((req, res, next) => {
    // 匹配url并作重定向
    let relatedKey = '';
    let originalUrl = req.originalUrl.replace(/[\/]+/g, '/');
    if (originalUrl.match('/updatePassword$')) {
      // 修改密码请求url转换
      const tmp = originalUrl.split('/');
      originalUrl = tmp.splice(0, tmp.length - 1).join('/');
    }

    for (var urlKey in urlMap) {
      if (
        Object.prototype.hasOwnProperty.call(urlMap, urlKey) &&
        originalUrl.indexOf(urlKey) === 0 &&
        relatedKey.length < urlKey.length
      ) {
        relatedKey = urlKey;
      }
    }
    if (relatedKey) {
      req.url = originalUrl.replace(relatedKey, urlMap[relatedKey]);
    } else if (req.originalUrl.indexOf('//') >= 0) {
      req.url = req.originalUrl.replace(/[\/]+/g, '/');
    }
    next();
  });

  // 根据json file定义路由
  jsonsFiles.map(function(file) {
    const routers = jsonServer.router(file);
    server.use(getFileUrl(file, false), routers);
  });
}

module.exports = applyJsonServer;
