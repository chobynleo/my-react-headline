const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const getConfig = require('af-webpack/getUserConfig').default ;
const getPaths = require('roadhog/lib/getPaths').default ;
const getWebpackConfig = require('roadhog/lib/getWebpackConfig').default ;
const registerBabel = require('roadhog/lib/registerBabel').default ;
const build = require('af-webpack/build').default;

const cwd = process.cwd();
const paths = getPaths(cwd);
const babel = `${cwd}/node_modules/roadhog/lib/babel.js`;
const { config } = getConfig({ cwd });
config.proxy = {};
config.define['process.env.contextPath'] = '';
config.define['process.env.NO_PROXY'] = 'true';

const getTheme = (name) => {
  const themePath = path.join(__dirname, `./src/themes/${name}.less`);
  return lessToJs(fs.readFileSync(themePath, 'utf8'));
};

const themes = ['default', 'red', 'blue'];

const buildATheme = (aTheme) => {
  console.info('build:========', aTheme);
  config.theme = getTheme(aTheme);
  if (aTheme === 'default') {
    config.outputPath = 'dist';
  } else {
    config.outputPath = `dist/${aTheme}`;
  }
  config.publicPath = './';
  const webpackConfig = getWebpackConfig({
    cwd,
    config,
    babel,
    paths,
  });
  const watch = false;
  return new Promise(resolve => {
    registerBabel(babel, {
      cwd,
      configOnly: true,
    });
    build({
      webpackConfig,
      watch,
      success: resolve,
    });
  });
};

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const curPath = `${dir}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        removeDir(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
  }
}

buildATheme('default');
themes.map((aTheme) => {
  if (aTheme !== 'default') {
    buildATheme(aTheme).then(() => {
      fs.writeFileSync(`dist/${aTheme}.css`, fs.readFileSync(`dist/${aTheme}/index.css`));
      removeDir(`dist/${aTheme}`);
    });
  }
  return null;
});

