@extends('layouts.master')
@section('titulo','CRUD Productos')
@section('contenido')
<div id="crudProductos">

	@{{mensaje}}
	<!--@{{productos}}-->
	
<div class="card card-danger">
              <div class="card-header">
                <h5 class="m-0">Productos
                	<!--el @clic sirve para ejecutar metodos-->
                  <button class="btn btn-danger" @click="mostrarModal()">  
                    <i class="fas fa-plus">
                      
                    </i>
                  </button></h5>

              </div>
              <div class="card-body">
                <table class="table table-bordered table-striped table-hover table-sm">
                  <thead>
                    <th>Sku</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                  </thead>
                  <tbody>
                    <tr v-for="producto in productos">
                      <td>@{{producto.sku}}</td>
                      <td>@{{producto.nombre}}</td>
                      <td>@{{producto.precio}}</td>
                      <td>@{{producto.cantidad}}</td>
                      <td>
                        <!--loa iconos estan en font awesome.com-->
                        <button class="btn btn-sm" @click="editandoProducto(producto.sku)">
                          <i class="fas fa-pen">
                            
                          </i>
                        </button>
                        <button class="btn btn-sm" @click="eliminarProducto(producto.sku)" >
                          <i class="fas fa-trash">
                            
                          </i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
</div>
<!-- Modal para el formulario del registro de los productos recuerda que es muy importante que la ventana modal se encuentre dentro del onjeto vue-->
<div class="modal fade" id="modalProductos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" v-if="agregando==true">Agregando Producto</h5>
        <h5 class="modal-title" id="exampleModalLabel" v-if="agregando==false">Editando Producto</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-row">
            <div class="col col-md-6">
              <input type="text" class="form-control" placeholder="sku" v-model="sku">
              
            </div>
          </div>
           <br>
          <div class="form-row">
            <div class="col col-md-6">
            	<!--v-model sirve para capturar los datos y pasarlo a la variable establecida en el archivo js-->
              <input type="text" class="form-control" placeholder="nombre del producto" v-model="nombre">
              
            </div>
          </div>
          <br>
          <div class="form-row">
            <div class="col col-md-6">
              <input type="number" class="form-control" placeholder="Precio" v-model="precio_venta">
              
            </div>
          </div>
           <br>
          <div class="form-row">
            <div class="col col-md-6">
              <input type="number" class="form-control" placeholder="Cantidad" v-model="cantidad">
              
            </div>
          </div>
          
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" @click="guardarProducto"  v-if="agregando==true">Guardar</button>
        <button type="button" class="btn btn-warning" @click="actualizarProducto()" v-if="agregando==false">Guardar cambios</button>
      </div>
    </div>
  </div>
</div>
</div><!--aqui termina vue-->


@endsection
@push('scripts')
	<script type="text/javascript" src="js/vue-resource.js"></script>
	<script type="text/javascript" src="js/apis/apiProductosCrud.js"></script>
@endpush

<input type="hidden" name="route" value="{{url('/')}}">