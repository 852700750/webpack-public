// 基于node的要遵循commonjs规范
let path = require ('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
let PurifycssWebpack = require('purifycss-webpack');
let glob = require('glob');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
//less 文件与css文件方分别抽离
let CssExtract = new ExtractTextWebpackPlugin('css/style.css');
let LessExtract = new ExtractTextWebpackPlugin('css/style.less');
module.exports = {
    entry: './src/index.js', //入口文件
    // entry:['./src/index.js','./src/demo.js'], //多个入口文件entry可以是个数组
    // 如果是多页面应用entry是个对象
    // entry:{
    //     index:'./src/index.js',
    //     demo:'./src/demo.js'
    // },
    //多页面应用的时候应该是多个出口文件
    // output:{
    //     filename:'[name].js',
    //     path:path.resolve('./build')
    // },
    output:{ //出口
        filename: 'build.[hash:8].js',  //.[hash:8] build.ae71c411.js?ae71c41195893e2b145e
        path:path.resolve('./build') //这个路径必须是绝对路径
    },
    devServer: {  // 开发服务器
        contentBase:'./build',  //在内存中打包 以这个文件夹启动，内存中找不到找本地的
        port:3002, //端口号
        compress:true, // 服务器压缩
        open:true, // 自动打开浏览器
        hot:true //热更新
    }, 
    module:{
        rules:[
            {
                test: /\.css$/, use:CssExtract.extract({
                    use:[
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' }
                    ]
                }) 
                // test:/\.css$/,use:[
                //     { loader: 'style-loader' },
                //     {loader:'css-loader'}
                // ]
            },
            {
                test: /\.less$/, use:LessExtract.extract({
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'less-loader' },
                    ]
                }), 
            }
        ]
    },   // 模块配置
    plugins: [ // 插件配置
        CssExtract,
        LessExtract,
        new CopyWebpackPlugin([ //拷贝插件
            {
                from:'type',
                to:'public'
            }
        ]),
        new ExtractTextWebpackPlugin({ //抽离css文件
            filename:'css/index.css'

        }),
        //清空webpack插件
        new webpack.HotModuleReplacementPlugin(), //热更新
        new CleanWebpackPlugin(['./build']),
        // 多入口文件将对应多个plugin
        // new HtmlWebpackPlugin({
        //     filename:'index.html',
        //     template:'./src/index.html',
        //     title:'index',
        //     chunks:['index']
        // }),
        // new HtmlWebpackPlugin({
        //     filename: 'demo.html',
        //     template: './src/index.html',
        //     title: 'demo',
        //     chunks:['demo']
        // }),
        //打包html插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            title:'欢迎尝试webpack配置',
            hash: true, // 清空缓存build.ae71c411.js
            // minify:{
            //     removeAttributeQuotes:true,// 去掉引号
            //     collapseWhitespace:true, // 打包为一行文件
            // }
        }),
        new PurifycssWebpack({
            paths:glob.sync(path.resolve('src/*.html'))
        })
    ],  
    mode:'development',         // 可以更改模式  
    resolve:{},    //配置解析
}
//1.在webpack中如何配置开发服务器 ？
// 安装模块 ： webpack-dev-server服务器  webpack-dev-server
//2. 在webpack插件 将html文件打包到build文件下可以自动引入生产的js文件
//