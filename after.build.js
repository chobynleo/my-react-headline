const fs = require('fs');
const path = require('path');

const handle = (targetPath, callback) => {
  fs.readFile(targetPath, { flag: 'r+', encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    // 修改 /public/fonts/iconfont.css => ./fonts/iconfont.css
    const resultData = data.replace(/\/public\//, './');
    callback(targetPath, resultData);
  });
};

const writeFile = (targetPath, data) => {
  fs.writeFile(targetPath, data, { flag: 'w' }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('修改内容成功');
    }
  });
};

const changeFontRefersPath = (filePath) => {
  // 根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, (err, files) =>{
    if (err) {
      console.warn(err);
    } else {
      // 遍历读取到的文件列表
      files.forEach((filename) => {
        // 获取当前文件的绝对路径
        const filedir = path.join(filePath, filename);
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, (eror, stats) => {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            const isFile = stats.isFile(); // 是文件
            if (isFile && /\.css$/.test(filedir)) {
              handle(filedir, writeFile);
            }
          }
        });
      });
    }
  });
};

changeFontRefersPath(path.join(__dirname, '/dist/'));
