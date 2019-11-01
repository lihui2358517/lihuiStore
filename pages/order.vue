<template>
	<div class="page-order">
		<el-row>
			<el-col
				:span='23'
				class='table'>
				<el-tabs
					v-model='activeName'
					@tab-click='handleClick'>
					<el-tab-pane 
						label='全部订单'
						name='all'>
							<list :cur='cur' />
					</el-tab-pane>
					<el-tab-pane 
						label='已付款'
						name='payed'>
							<list :cur='cur' />
					</el-tab-pane>
					<el-tab-pane 
						label='待付款'
						name='unpay'>
							<list :cur='cur' />
					</el-tab-pane>
					<el-tab-pane 
						label='待使用'
						name='unuse'>
							<list :cur='cur' />
					</el-tab-pane>
					<el-tab-pane 
						label='待评价'
						name='unreplay'>
							<list :cur='cur' />
					</el-tab-pane>
				</el-tabs>		
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import list from '@/components/order/list'
	export default{
		components:{
			list,
		},
		data(){
			return{
				activeName:'all',
				list:[],
				cur:[]
			}
		},
		methods:{
			handleClick:function(tab){
				this.activeName = tab.name
			}
		},
		watch:{
			activeName:function(val){
				this.cur = this.list.filter(item=>{
					if (val == 'payed') {
						return item.status === 0
					}else if(val == 'unpay'){
						return item.status === 1
					}else if(val == 'all'){
						return true
					}else{
						return false
					}
				})
			},
			list:function(){
				let val = this.name
				this.cur = this.list.filter(item=>{
					if (val == 'payed') {
						return item.status === 0
					}else if(val == 'unpay'){
						return item.status === 1
					}else if(val == 'all'){
						return true
					}else{
						return false
					}
				})
			}
		},
		async asyncData(ctx){
			let {status,data:{code,list}} = await ctx.$axios.post('/order/getOrders')
			console.log(list)
			if (status === 200 && code===0 && list.length) {
				return {
					list:list.map(item=>{
						return {
							img:item.imgs.length?item.imgs[0].url:'/logo.png',
							name:item.name,
							count:1,
							total:item.total,
							status:item.status,
							statusTxt:item.status===1?"待付款":"待使用"
						}
					}),
					cur:list.map(item=>{
						return {
							img:item.imgs.length?item.imgs[0].url:'/logo.png',
							name:item.name,
							count:1,
							total:item.total,
							status:item.status,
							statusTxt:item.status===1?"待付款":"待使用"
						}
					})
				}
			}
		},
		mounted(){
			console.log(this.list,this.cur)
		}
	};
</script>
<style lang="scss" scoped>
	@import '@/assets/css/order/index.scss';
</style>