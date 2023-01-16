<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pasteleria extends Model
{
    //
    protected $table='productos';

    protected $primaryKey='sku';

    public $incrementing=false;

    public $timestamps=false;

    protected $fillable=[
    	'id_producto',
    	'nombre_producto',
    	'precio_producto',
    	'id_cat',
        'id_tamaño',
    ];

}
