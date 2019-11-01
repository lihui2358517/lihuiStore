<template>
	<div class="m-menu">
		<dl class="nav" @mouseleave = 'mouseleave'>
			<dt>全部分类</dt>
			<dd
				v-for="(item,idx) in $store.state.home.menu"
		        :key="idx"
				@mouseenter='enter'
		    >
        		<i :class="item.type"/>{{ item.name }}<span class="arrow"/>
			</dd>
		</dl>
		<div class="detail" v-if='kind' @mouseenter='inte'  @mouseleave='out'>
			<template v-for='(item,index) in curdetail.child'>
				<h4 :key='index'>{{item.title}}</h4>
				<span v-for='its in item.child' @click='goDetail(its,item.title)'>{{its}}</span>	
			</template>
			
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				_timer:null,
				kind:'',
			}
		},
		computed:{
			curdetail(){
				return this.$store.state.home.menu.filter((item) => item.type === this.kind)[0]
			}
		},
		methods:{
			mouseleave(){
				let self = this
				self._timer = setTimeout(function(){
				 	self.kind = ''
				},150)

			},
			enter(e){
				this.kind = e.target.querySelector('i').className
			},
			inte(){
				clearInterval(this._timer)
			},
			out(){
				this.kind = ''
			},
			goDetail(keyword,type){
				this.$router.push({
			        path:'detail',
			        query:{
			          keyword,
			          type:type
			        }
			    })
			}

		}
	};
</script>
<style lang="scss">
	
</style>