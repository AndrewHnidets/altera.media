<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductPhoto extends Model
{
    protected $table = 'product_photos';

    protected $fillable = [
        'photo', 'product_id',
    ];

    public function products()
    {
        return $this->belongsTo('App\Product', 'id');
    }

}
