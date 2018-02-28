<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductWholesalePrice extends Model
{
    protected $table = 'product_wholesale_price';

    protected $fillable = [
        'pieces', 'price', 'product_id',
    ];

    public function products()
    {
        return $this->belongsTo('App\Product', 'id');
    }
}
