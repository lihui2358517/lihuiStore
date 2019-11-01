import Router from 'koa-router';
import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import Order from '../dbs/models/order'
import md5 from 'crypto-js/md5'

let router = new Router({prefix: '/order'})

router.post('/createOrder', async ctx => {
  let {id,price,count,status} = ctx.request.body
  let time = Date()
  let orderID = md5(Math.random() * 1000 + time).toString()

  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    let findCart = await Cart.findOne({cartNo:id})
    let order = new Order({
      id:orderID,
      count,
      total:price*count,
      time,
      user:ctx.session.passport.user,
      name:findCart.detail[0].name,
      imgs:findCart.detail[0].imgs,
      status,//0 已支付 1 待支付
    })
    try{
      let result = await order.save();
      if (result) {
        await findCart.remove()
        ctx.body = {
          code:0,
          id:orderID
        }
      }else{
        ctx.body = {
          code:-1,
          msg:"购物车数据库没找到相应的订单"
        }
      }
    }catch(e){
      ctx.body = {
        code:-1,
        msg:'执行出错'
      }
    }
  }
})

router.post('/getOrders', async ctx => {
     if (!ctx.isAuthenticated()) {
        ctx.body = {
          code: -1,
          list:[],
          msg: 'please login'
        }
     }else{
      try {
        let result = await Order.find()
        if (result) {
          ctx.body = {
            code: 0,
            list: result
          }
        }else{
          ctx.body = {
            code: -1,
            list: result
          }
        }
       
      } catch (e) {
        ctx.body = {
          code: -1,
          list: result
        }
      }
    }
})

export default router

// var kbj = document.getElementsByClassName('ie-fix')[3]; 
// var ps = kbj.getElementsByTagName('p');
// var htmls = '';
// var list = [].slice.call(list)
// list.forEach(function(val,index,arr){
//   htmls = htmls + val.innerHTML
//   // console.log(item.innerHTML)
// })
// console.log(html)
