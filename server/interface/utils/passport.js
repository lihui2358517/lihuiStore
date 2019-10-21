/*
passport 功能
登录验证
*/


import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'


//查询
passport.use(new LocalStrategy(function(username,password,done){
	let where = {
		username
	}
	let result = await UserModel.findOne(where)
	if (result != null) {
		if (result.password === password) {
			return done(null,result)
		}else{
			return done(null,false,"密码错误")
		}
	}else{
		return done(null,false,"用户不存在")
	}
}))

/* 序列化
验证用户提交的凭证是否正确
是与session中储存的对象进行对比
所以涉及到从session中存取数据，需要做session对象序列化与反序列化
*/
passport.serializeUser(function(user, done) {
  done(null, user);
});
//反序列化
passport.deserializeUser(function(user, done) {
 return done(null, user);
});

export default passport