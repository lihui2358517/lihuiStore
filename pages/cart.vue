<template>
  <div class="page-cart">
    <el-row>
      <el-col
        v-if="cart.length"
        :span="24"
        class="m-cart">
        <list :cart-data="cart"/>
        <p>
          应付金额：<em class="money">￥{{ total }}</em>
        </p>
        <div class="post">
          <el-button
            type="primary"
            @click="dialogVisible = true">提交订单</el-button>
        </div>
      </el-col>
      <el-col
        v-else
        class="empty">购物车为空</el-col>
    </el-row>

    <el-dialog
      title="请扫码支付"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span><img style="display:block;margin:auto;" src="../assets/img/pay-img.jpg"></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogBtnRefuse">取 消</el-button>
        <el-button type="primary" @click="dialogBtnSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import List from '@/components/cart/list.vue'
export default {
  components:{
    List
  },
  data(){
    return {
      cart:[],
      dialogVisible: false
    }
  },
  computed:{
    total(){
      let total=0;
      this.cart.forEach(item=>{
        total+=item.price*item.count
      })
      return total
    }
  },
  methods:{
    submit: async function(payStatus){
      let {status,data:{code,id}}=await this.$axios.post('/order/createOrder',{
        count:this.cart[0].count,
        price:this.cart[0].price,
        id:this.cartNo,
        status:payStatus
      })
      
      if(status==200&&code===0){
        if (payStatus==0) {//支付成功
          this.$alert(`恭喜您，已成功下单，订单号:${id}`,'下单成功',{
            confirmButtonText:'确定',
            callback:action=>{
              location.href='/order'
            }
          })
        }else{
          this.$alert(`已提交到待支付订单中，订单号:${id}`,'提交成功',{
            confirmButtonText:'确定',
            callback:action=>{
              location.href='/order'
            }
          })
        }
        
      }
    },
    dialogBtnSure(){
      this.dialogVisible = false
      this.submit(1)
    }, 
    dialogBtnRefuse(){
      this.dialogVisible = false
      // this.submit(1)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
  },
  async asyncData(ctx){
    let {status,data:{code,data:{name,price}}}=await ctx.$axios.post('/cart/getCart',{
      id:ctx.query.id
    })
    if(status===200&&code===0&&name){
      return {
        cart:[{
          name,
          price,
          count:1
        }],
        cartNo:ctx.query.id
      }
    }
  }

};
</script>

<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
