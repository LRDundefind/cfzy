<template>
		<div class="sorketmessage">
			<div class="sorketmessage_cont" @click="open">
					<h2>新订单</h2>
					<p>订单编号：12312312312</p>
					<p>订单时间：:2017-12-21 13:53</p>
					<p>卖手为：王欣宇</p>
					<p>客户为：王欣宇</p>
			</div>
		</div>
	

</template>
<style scoped>
.sorketmessage{
	width: 240px;
	max-height: 300px;
	background: rgba(0, 0, 0, 0.6);
	position:fixed;
	right: 15px;
	bottom: 0;
	z-index: 1000;	
	padding: 10px;
	border: 1px solid #dfdfdf;
	text-align: center;
}
.sorketmessage h2{
	padding: 5px 0 15px;
}
.sorketmessage p{
	line-height: 20px;
	padding: 5px 0;
}
</style>

<script>
	export default {
		name: 'sorketmessage',
		data() {
			return {
				mess:'王欣宇'
			}
		},
		sockets:{
			connect: function(){
			this.id=this.$socket.id
			},
			customEmit: function(val){
			console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
			}
		},
		methods: {
			gohref(){
				this.$router.push({name:'order'});
			},
			clickButton: function(val){
					// $socket is socket.io-client instance
					this.$socket.emit('emit_method', val);
				},
			  open() {
				const h = this.$createElement;

				this.$notify({
				title: '新订单',
				position: 'bottom-right',
				message: h('i', { style: 'color: teal'}, '姓名'+ this.mess  )
				})}
			
			
			
		},
		mounted: function() {
		
		},
		computed:{
			
		},
		watch:{
		
		}
	}
	
</script>