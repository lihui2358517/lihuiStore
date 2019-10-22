import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import config from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
	prefix:'/users'
})
let Store = new Redis().client


//注册接口
router.post('/singnup',async (ctx) => {
	const {
		username,
		password,
		email,
		code
	} = ctx.request.body

	//验证码
	if (code) {
		//hget redis命令  HGET获取对应 field 对应的 value
		const saveCode = await Store.hget(`nodemailer:${username}`,'code')
		const saveExpire = await Store.hget(`nodeMailer:${username}`,'expire')

		if (code === saveCode) {
			//当前时间大于发送验证码时间后一分钟
			if (new Date().getTime() - saveExpire >0) {
				ctx.body = {
					code:-1,
					msg:"验证码已过期，请重新尝试"
				}
				return false
			}
		}else{
			ctx.body = {
				code:-1,
				msg:'请填写正确的验证码'
			}
		}
	}else{
		ctx.body = {
			code:-1,
			msg:'请填写验证码'
		}
	}

	let user = await User.find({username})
	if (user.length) {
		ctx.body = {
			code:-1,
			msg:'已注册'
		}
		return
	}
	//创建新注册用户数据
	let newUser = await User.create({username,password,email})
	if (newUser) {
		//创建成功后，登录，应该把登录模块化，然后在这里调用
		let res = await axios.post('/users/singnin',{username,password})
		if (res.data&&res.data.code === 0) {
			ctx.body = {
				code:0,
				msg:'注册成功',
				user:res.data.user
			}
		}else{
			ctx.body = {
				code:-1,
				msg:"注册成功，但登录失败"
			}
		}
	}else{
		ctx.body = {
			code:-1,
			msg:'注册失败'
		}
	}

})

//登录接口
router.post('/singnin',async (ctx,next) => {
	//调local策略进行Authenticate验证,通过就进入后面的回调函数
	/*authenticate()方法有3个参数，第一是name，即验证策略的名称，第二个是options，包括下列属性
		session：Boolean。设置是否需要session，默认为true
		successRedirect：String。设置当验证成功时的跳转链接
		failureRedirect：String。设置当验证失败时的跳转链接
		failureFlash：Boolean or String。设置为Boolean时，express-flash将调用use()里设置的message。设置为String时将直接调用这里的信息。
		successFlash：Boolean or String。使用方法同上。
	第三个参数是callback,注意如果使用了callback，那么验证之后建立session和发出响应都应该由这个callback来做，passport中间件之后不应该再有其他中间件或callback
	*/
	return Passport.authenticate('local',function(err,user,info,status){
		if (err) {
			ctx.body = {
				code:-1,
				msg:err
			}
		}else{
			if (user) {
				ctx.body = {
					code:0,
					msg:"登录成功",
					user
				}
				return ctx.login(user)
			}else{
				ctx.body = {
					code:1,
					msg:info
				}
			}

		}
	})(ctx,next)
})


//验证码
router.post('/verify',async(ctx,next)=>{
	let username = ctx.request.body.username
	const saveExpire = await Store.hget(`nodemailer:${username}`,'expire')
	if (saveExpire&& new Date().getTime() - saveExpire < 0) {
		ctx.body = {
			code:-1,
			msg:"验证请求过于频繁，1分钟内人次"
		}
		return false
	}
	//创建nodeMailer实例
	let transporter = nodeMailer.createTransport({
		service:'qq',
		auth:{
			user:config.smtp.user,
			pass:config.smtp.pass
		}
	})
	//mail 相关信息
	let ko = {
		code:config.smtp.code(),
		expire:config.smtp.expire(),
		email:ctx.request.body.email,
		user:ctx.request.body.username
	}
	//注册邮件的相关内容
	let mailOptions = {
		from:`"认证邮件"<${config.smtp.user}>`,
		to:ko.email,
		subject:'《惠团电子商务网站》--注册码',
		html:`您在《惠团电子商务网站》中请求注册，您的邀请码是${ko.code}`
	}
	//发送
	await transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	      return console.log(error)
	    } else {
	    	// 创建redis数据
	      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
	    }
	})
	ctx.body = {
	    code: 0,
	    msg: '验证码已发送，有效期1分钟'
	}
})

//退出
router.get('/exit', async (ctx,next)=>{
	await ctx.logout()
	//isAuthenticated 退出的状态
	if (!ctx.isAuthenticated()) {
		ctx.body = {
			code:0,
			msg:"退出成功"
		}
	}else{
		ctx.body = {
			code:-1,
			msg:'退出失败'
		}
	}
})

//获取用户信息
router.get('/getUser',async (ctx) => {
	if (ctx.isAuthenticated()) {
		const {username,email} = ctx.session.passport.user
		ctx.body = {
			user:username,
			email
		}
	}else{
		ctx.body = {
			user:'',
			email:''
		}
	}
})

export default router