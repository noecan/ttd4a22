var ruta = document.querySelector("[name=route]").value;

var apiProd=ruta + '/apiProducto';

new Vue({


	http: {
      headers: {
        'X-CSRF-TOKEN': document.querySelector('#token').getAttribute('value')
      }
    },

	el:"#apiVenta",

	data:{
		prueba:'HOLA MUNDO',
		
		sku:'',
		producto:[],
		ventas:[],		
		cantidades:[1,1,1,1,1,1,1,1,1],
		auxSubTotal:0,
		pagara_con:0,
	},

	// // AL CREARSE LA PAGINA
	// created:function(){
	// 	this.obtenerMascotas();
	// 	this.obtenerEspecies();
	// },

	methods:{
		buscarProducto:function(){
			var encontrado=0;
			// console.log('HOLA');
			var producto={};
			//inicio  de busqueda
     for (var i = 0; i < this.ventas.length; i++) {
     if (this.sku==this.ventas[i].sku){
     	encontrado=1; 
     	this.ventas[i].cantidad++;
     	this.cantidades[i]++;
     }
     }
     //fin de busqueda


			//inicio get de  ajax
			if(encontrado==0)
			this.$http.get(apiProd + '/' + this.sku).then(function(j){
				this.producto=j.data;

				producto={sku: j.data.sku,
						 nombre:j.data.nombre,
						 precio:j.data.precio,
						 foto:'prods/'+ j.data.foto,
						cantidad:1,
					    total:j.data.precio_venta

					  };
					    
					  

				if (this.producto)
					this.ventas.push(producto);
				this.sku="";
			})
		},//fin de buscar producto
		
		mostrarcobro:function(){
     $('#modalCobro').modal('show')
		},//fin de mostrar cobro

		eliminarProducto:function(id){
			this.ventas.splice(id,1);
		}
		
	},
	// FIN DE METHODS



	// INICIO COMPUTED
	computed:{
		totalProducto(){
			return (id)=>{
				 var total =0;
				total=this.ventas[id].precio*this.cantidades[id];

				// Actualizo el total del producto en el array ventas
				this.ventas[id].total=total;
				// Actulizo la cantidad en el array ventas
				this.ventas[id].cantidad=this.cantidades[id];

				return total.toFixed(1);
				
			}


		},
		// Fin de TotalProducto

		subTotal(){
			
			 var total=0;
			 			
			for (var i = this.ventas.length - 1; i >= 0; i--) {
				total=total+this.ventas[i].total;

			}
			// Mando una copia del subTotal a la seccion del data
			//  para el uso de otros calculos
			this.auxSubTotal=total.toFixed(1);		 
			 return total.toFixed(1);
			},
		
		iva(){
			var auxIva=0;
			auxIva = this.auxSubTotal*0.16;
			return auxIva.toFixed(1);
		},

		granTotal(){
			var auxTotal=0;
			auxTotal=this.auxSubTotal*1.16;
			return auxTotal.toFixed(1);
		},

		noArticulos(){
			var acum=0;
			for (var i = this.ventas.length - 1; i >= 0; i--) {
				acum=acum+this.ventas[i].cantidad;
			}
			return acum;
		},
		cambio(){
			var camb=0;
			camb=this.pagara_con-this.granTotal;
			camb=camb.toFixed(1);
			return camb

		}
		
		

		
	}
	// FIN DE COMPUTED



});