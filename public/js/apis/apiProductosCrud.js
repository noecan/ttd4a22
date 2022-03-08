function init(){

var ruta = document.querySelector("[name=route]").value;

var apiProd=ruta + '/apiProducto';

new Vue({

	http: {
      headers: {
        'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
      }
    },

    el:"#crudProductos",

    data:{
    	mensaje:'Crud de productos',
    	productos:[],
        sku:'',
    	nombre:'',
    	precio_venta:'',
    	cantidad:'',

    	agregando:true,


    },
    //sin el created no se pueden traer los datos del api
    created:function(){

		this.traerProductos();
	},

    methods:{
    	traerProductos:function(){
    		this.$http.get(apiProd).then(function(j){
				this.productos=j.data;
			})
    	},
    	mostrarModal:function(){
    		this.agregando=true;
            //limpiar campos devuelve a la vista la ventana modal sin datos
            this.limpiarCampos();
    		$('#modalProductos').modal('show');
    	},
    	guardarProducto:function(){
    		//se construye el objeto json recuerda nombrar cada etiqueta tal cual está en el apiprod
    		var producto={sku:this.sku,nombre:this.nombre,precio:this.precio_venta,cantidad:this.cantidad};

    		this.$http.post(apiProd,producto).then(function(j){
                this.traerProductos();
                this.limpiarCampos();
                $('#modalProductos').modal('hide');
    			console.log('exito');
    		}).catch(function(j){
    			console.log(j);
    		})


    		
    		//console.log(producto);

    	},
        limpiarCampos:function(){
            this.sku='';
            this.nombre='';
            this.precio_venta='';
            this.cantidad='';

        },
        editandoProducto:function(id){
            //esta parte sirve para cambiar el estado de agregando
            this.agregando=false;
            //este sirve para enviar al api el valor del id
            this.sku=id;

            //el then tambien significa promesa y sirve para devolver una accion luego de recibir un status de la 
            //peticion

            this.$http.get(apiProd + '/' + id).then(function(j){
                //console sirve para ver en la consola los datos que se estan cargando al consumir
                //el metodo
                //console.log(j.data);
                this.sku=j.data.sku;
                this.nombre=j.data.nombre;
                this.precio_venta=j.data.precio;
                this.cantidad=j.data.cantidad;
            })
            $('#modalProductos').modal('show');

        },
        actualizarProducto:function(){
            var cambiosProducto = {nombre:this.nombre,precio:this.precio_venta,cantidad:this.cantidad}
            //console.log(cambiosProducto);

            this.$http.patch(apiProd + '/' + this.sku,cambiosProducto).then(function(j){
            this.traerProductos();
            });
            $('#modalProductos').modal('hide');

            //alert('modificando');

        },
        eliminarProducto:function(id){
            

        Swal.fire({
         title: 'Esta seguro de eliminar?',
         text: "No podras revertir el cambio luego de confirmar!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Sí, eliminar!'
         }).then((result) => {
           if (result.isConfirmed) {
            this.$http.delete(apiProd + '/' + id).then(function(j){
                //el get especies sirve para mostrar la tabla actualizada
                this.traerProductos();
            }).catch(function(j){
                console.log(j);
            })
            Swal.fire(
           'Eliminado!',
           'El producto se eliminó :(',
           'Listo'
          )
          }
         })

        },
    },

});
} window.onload = init;