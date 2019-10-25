import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({
  prefix: '/geo'
})


router.get('/getPosition', async (ctx) => {
	//http://cp-tools.cn/get/getPosition 一个工具地址，可以获取你当前所在省市
  let { status, data: { province, city } } = await axios.get('http://cp-tools.cn/geo/getPosition')
  if (status == 200) {
  	ctx.body = {
  		province,
  		city
  	}
  }else{
  	ctx.body = {
  		province:'',
  		city:''
  	}
  }

})

router.get('/menu', async (ctx) => {
  let { status, data: { menu } } = await axios.get('http://cp-tools.cn/geo/menu')
  if (status == 200) {
  	ctx.body = {
  		menu,
  	}
  }else{
  	ctx.body = {
  		menu:[]
  	}
  }

})




export default router
