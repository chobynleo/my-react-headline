# module-starter

应用开发框架SinoGear的模块模板，这里我主要是写了一个headline的modules进行测试。

## 目录介绍

```
├── .gitattributes   // 控制git在check in/out时对文件的操作
├── .gitignore       // git的忽略列表
├── .mvn             // maven的wrapper目录，通过wrapper能自动下载并配置好maven
│   └── wrapper
│       ├── maven-wrapper.jar
│       └── maven-wrapper.properties   // 配置maven的下载地址
├── README.md         // 本介绍文档
├── mvnw              // maven wrapper的命令行工具，在类Unix系统使用
├── mvnw.cmd          // maven wrapper的命令行工具，在Windows系统使用
├── node_modules      // node的模块存放目录，安装了node模块后自动出现
│   ├── cz-conventional-changelog
│   ├── ...
├── package.json      // node的配置文件
├── pom.xml           // maven配置文件
└── src               // 源码目录
    ├── main
    │   ├── java
    │   │   └── cn
    │   │       └── sinobest
    │   │           └── sinogear                 // 代码根目录
    │   │               └── package-info.java    // 包信息，可安全删除
    │   └── resources        // 资源配置目录
    │       └── .gitkeep     // 用作占位的文件，可以安全删除
    └── test
        ├── java
        │   └── cn
        │       └── sinobest
        │           └── sinogear                  // 测试代码根目录
        │               └── package-info.java     // 包信息，可安全删除
        └── resources        // 测试用的资源配置目录
            └── .gitkeep     // 用作占位的文件，可以安全删除
```

## Maven和Maven Wrapper

Maven的wrapper是提供给没有正确安装Maven的用户使用，已经安装Maven的可以忽略。

### 使用

若要使用Maven wrapper，则需要通过命令行工具```mvnw```(Windows下使用```mvnw.cmd```)执行所有原来的Maven命令。

例如```mvn clean```，通过wrapper则需要执行```mvnw clean```。

这样，用户就不需要手动安装Maven即可进行项目的构建，提供另外一种方便。

### 原理

简单来说，通过```mvnw```执行命令，会先自行安装一个Maven到**用户目录**，并进行配置。后续的操作就相当于一个Maven的代理执行器，代理执行Maven的命令。

### 依赖

作为一个模块的模版，没有办法提前确立项目的Jar包依赖，故此先提供常用的Spring相关依赖。这部分需要自行修改。

### 私服

默认配置了公司的[私服地址](http://192.168.14.96:8081/nexus/)作为第一位的仓库地址，如若在公司外的环境使用，可以考虑注释掉配置以加快速度。

## Git

### 日志编写

项目的日志编写有规范的格式，所有日志必须符合格式才能顺利提交到Git服务器。

日志规范来源于AngularJs项目组所遵循的规范，通过规范地编写日志，能为我们自动生成项目的更新历史纪录文档。

具体的规范请参考阮一峰的[Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

### 日志辅助编写工具

Commitizen是一个撰写合格 Commit message 的工具。安装命令如下。

```
$ npm install -g commitizen
```

然后，在**项目目录**里，运行下面的命令，使其支持 Angular 的 Commit message 格式。

```
$ npm install
```

以后，凡是用到git commit命令，一律改为使用git cz。这时，就会出现选项，用来生成符合格式的 Commit message。

**PS1: 该日志辅助编写工具Commitizen不是必须的，只是用于辅助编写和规范的日志，用户也可以自行按照规范编写日志。**

**PS2: 需要自行先安装node.js。安装方法可以参考使用[gnvm](http://ksria.com/gnvm/)及版本v6.9.1(LTS)。**

**PS3: 由于Eclipse的Git插件EGit实现有bug，强烈建议不要使用。替代品可以有乌龟Git或SourceTree。**

### 更新纪录生成

如果你的所有 Commit 都符合 Angular 格式，那么发布新版本时， Change log 就可以用脚本自动生成。

每个部分都会罗列相关的 commit ，并且有指向这些 commit 的链接。当然，生成的文档允许手动修改，所以发布前，你还可以添加其他内容。

conventional-changelog 就是生成 Change log 的工具，运行下面的命令即可。

```
$ npm install -g conventional-changelog-cli
$ cd my-project
$ conventional-changelog -p angular -i CHANGELOG.md -w
```

#### 更新记录生成的推荐流程Recommended workflow

1. Make changes
2. Commit those changes
3. Make sure unit test turns green
4. Bump version in package.json and pom.xml(or build.gradle)
5. conventionalChangelog
6. Commit package.json and CHANGELOG.md files
7. Tag
8. conventionalChangelog again for Tag links in CHANGELOG.md file(IMPORTANT!)
9. Push


## EditorConfig

通过配置.editorconfig文件，为项目确立代码的一般规范。

EditorConfig还需要配合插件使用，如在Intellij IDEA当中已经内置了该插件，会自动检测到项目中的.editorconfig配置文件，并采纳其方案作为代码风格的方案。

其它IDE或编辑器，可参看[官网](http://editorconfig.org)。

**PS1: 对使用Eclipse的用户，需要安装插件才能应用该配置。**

**PS2: 对SinoGear框架的维护者，均需按本代码规范去执行，代码的格式规范作为代码审查的项目之一。**

## config.js的配置能够支持在不同环境下的自动解析
config.js配置:
```
contextPath: process.env.contextPath === 'none' ? '' :
			(process.env.contextPath || 'http://192.168.14.47:8013')
```
.roadhogrc.js配置
```
"define": {
	'process.env.contextPath': process.env.contextPath
}
```

构建

```bash
// 指定contentPath为默认，即contentPath='http://192.168.14.47:8013'
npm run dev
或者
set contextPath=&&npm run dev

// 指定contentPath='http://192.168.15.83:8080'
set contextPath=http://192.168.15.83:8080&&npm run dev

// 指定contentPath=''
set contextPath=none&&npm run dev

```