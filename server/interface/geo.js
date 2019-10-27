import Router from 'koa-router'
import axios from './utils/axios'

//被注释的是直接从本地mongod中取数据的方法，现在用的是从线上请求数据
import Province from '../dbs/models/province'
import City from '../dbs/models/city'

const sign = 'fdfdfdfd';

let router = new Router({
  prefix: '/geo'
})


router.get('/getPosition', async (ctx) => {


	//http://cp-tools.cn/get/getPosition 一个工具地址，可以获取你当前所在省市
  //不知道为啥 获取的位置总是安徽省 马鞍山市，用这个城市请求其他geo下的请求，也是报错，用其他城市则没有问题
  //所以，先在这里用固定城市
  // let { status, data: { province, city } } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  // if (status == 200) {
  // 	ctx.body = {
  // 		province,
  // 		city
  // 	}
  // }else{
  // 	ctx.body = {
  // 		province:'',
  // 		city:''
  // 	}
  // }
   ctx.body = {
     province:'上海省',
     city:'上海市'
   }
  // console.log(province,city)

})


router.get('/province', async (ctx) => {
  // let province = await Province.find()
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }
  let {status, data: {
      province
    }} = await axios.get(`http://cp-tools.cn/geo/province`)
  ctx.body = {
    province: status === 200
      ? province
      : []
  }
})

router.get('/province/:id', async (ctx) => {
  // let city = await City.findOne({id: ctx.params.id})
  //
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return {province: item.province, id: item.id, name: item.name}
  //   })
  // }
  let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/city', async (ctx) => {
  // let city = []
  // let result = await City.find()
  // result.forEach(item => {
  //   city = city.concat(item.value)
  // })
  // ctx.body = {
  //   code: 0,
  //   city: city.map(item => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
  //         ? item.province
  //         : item.name
  //     }
  //   })
  // }
  let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/city`);
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/hotCity', async (ctx) => {
  // let list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // let result = await City.find()
  // let nList = []
  // result.forEach(item => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })
  // ctx.body = {
  //   hots: nList
  // }
  let {status, data: {
      hots
    }} = await axios.get(`http://cp-tools.cn/geo/hotCity`);
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
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
