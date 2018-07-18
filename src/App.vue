<template>
	<div id="app">
		<router-view/>
	</div>
</template>
<script>
	

	export default {
		name: 'App',

	}
</script>

<style>
	html,
	body,
	div,
	ul,
	li,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	dl,
	dt,
	dd,
	ol,
	form,
	input,
	textarea,
	th,
	td,
	select {
		margin: 0;
		padding: 0;
	}
	
	body {
		overflow: auto;
	}
	
	#app {
		height: 100vh;
	}
</style>