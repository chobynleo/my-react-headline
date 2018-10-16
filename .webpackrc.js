// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中可兼容 mock 以及真实后端服务，mock 需实际配置
const proxy = {
  "/api/students": {
    "target": "http://192.168.14.47:8082", // 学生信息请求地址
    "changeOrigin": true
  },
  "/api/dicts": {
    "target": "http://192.168.14.47:8082", // 实际后端字典请求地址
    "changeOrigin": true
  },
  "/api": {
    "target": "http://localhost:3004", //  需修改为真实后端服务地址
    "changeOrigin": true
  },
  "/SinoAuth/oauth/token": {
    "target": "http://192.168.14.100:10080",
    "changeOrigin": true
  }
};
module.exports =  {
  "entry": "./src/index.js",
  "theme": "./theme.config.js",
  "publicPath": process.env.NODE_ENV === 'development'?"/":"./",
  "html": { "template": "./src/index.ejs" },
  "define": {
    "process.env.contextPath": process.env.contextPath,
    "process.env.NO_PROXY": process.env.NO_PROXY
  },
  "extraBabelPlugins": [
    [
      "import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }
    ]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  "ignoreMomentLocale": true,
  "disableDynamicImport": true,
  "hash": false,
  "proxy": noProxy ? {} : proxy
}
