// var express = require('express');
// var cookieParser = require('cookie-parser');
 
// var app = express();
// app.use(cookieParser());
 
// app.use(function (req, res) {
// 	 if (req.url === '/favicon.ico') {
// 	 return
// 	 }
	 
// 	 // 设置常规cookie, 有效期为20s, 客户端脚本不能访问它的值
// 	 res.cookie('name', 'abc', { signed: false, maxAge: 20 * 1000, httpOnly: true });
// 	 console.log(req.cookies, req.url, req.signedCookies);
// 	 res.end('hello cookie');
// })
 
// app.listen(3000)