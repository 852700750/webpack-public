####
1.初始化一个 package.json文件
npm init -y

2.
npm install webpack web

### 在webpack中所有文件都是模块 
js模块（AMD CMD es6Module commonjs ）
、


###直接允许webpack文件
会执行node_modules文件对应的bin下的webpack.cmd

npx  node官方提供的命令 
npx webpack  

### 在webpack中如何配置开发服务器 ？
// 安装模块 ： cmd webpack-dev-server服务器  webpack-dev-server -D

### 配置快捷键 package.json文件里 、、 scripts对象
build:webpack
start:webpack-dev-server

### 安装webpack插件 将html文件打包到build文件下可以自动引入生产js文件

cmd html-webpack-plugin
并在config文件里引入html-webpack-plugin
######使用热加载
在devserver里配置： hot：true
在plugin里引入 new webpack.HotModuleReplacementPlugin();
在对应的文件里做判断
if(module.hot){
   module.hot.accept();
}
####css处理
、、、、、、、、、
npm install style-loader css-loader less less-loader -D
、、、、、、、、、
### 抽离css样式文件
npm install extract-text-webpack-plugin@next mini-css-extract-plugin -D
###去除没用的css文件
npm install purifycss-webpack purify-css glob -D


###css文件自动加前缀
npm install postcss-loader autoprefixer -D

### 拷贝插件
npm install copy-webpack-plugin -D