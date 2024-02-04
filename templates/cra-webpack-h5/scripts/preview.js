#!/usr/bin/env node

/**
 * Module dependencies.
 */
const express = require('express')
const app = express()
app.use(express.static('./build'));
const debug = require('debug')('small:server');
//直接引入https模块
const https = require('https');
const fs = require('fs');
//如果想使用socket可以参考下
// const Wss = require('../routes/wss.js');

/**
 * Get port from environment and store in Express.
 */
//将默认置成  https的默认端口 443   http默认端口80
const port = parseInt(process.env.PORT || '443');
app.set('port', port);
//此处读取文件名称更改成自己下载的证书名称， 将证书放置到对应的目录下
const pk = fs.readFileSync('./cert/server.key');
const pc = fs.readFileSync('./cert/server.crt');
const opt = {
    key: pk,
    cert: pc
}
/**
 * Create HTTP server.
 */
//启动https服务
const server = https.createServer(opt, app);
//初始化socket
// Wss.initServer(server);


server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);