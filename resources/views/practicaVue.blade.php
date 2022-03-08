@extends('layouts.master')
@section('titulo','Practicando Vue')
@section('contenido')

<div id="vm">
	<h1>@{{mensaje}}</h1>
	
	<img :src="imagen">
	<div v-text="texto"></div>
	<div v-html="texto2">
		
	</div>
	<div>
			<ul>
				<li v-for="canal in canalesYoutube">
					El canal <strong> <a v-bind:href="canal.url">@{{canal.nombre}}</a></strong>
					está dirigido por @{{canal.edu}}
					
				</li>
			</ul>
	</div>
</div>
@endsection
@push('scripts')
	<script type="text/javascript" src="js/vue-resource.js"></script>
	<script type="text/javascript" src="js/apis/practicaVue.js"></script>
@endpush