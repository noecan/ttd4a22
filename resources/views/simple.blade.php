<!DOCTYPE html>
<html>
<head>
	<title>imagen</title>
	<script type="text/javascript" src="js/vue.js"></script>
	
</head>
<body>
	<div id="vm">
	<h1>@{{mensaje}}</h1>
	<img v-bind:src="imagen">
	<h2>@{{cosa}}</h2>
	<div v-text="texto"></div>
	
	</div>
<script type="text/javascript" src="js/apis/practicaVue.js"></script>
</body>
</html>