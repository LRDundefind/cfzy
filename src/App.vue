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
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		overflow-x: hidden;
	}
	
	#app {
		min-width: 1200px;
		height: 100%;
		overflow-x: hidden;
	}
</style>