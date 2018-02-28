<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    protected $fillable = [
        'ttn', 'price', 'commentary', 'price_paid', 'user_id', 'type_id', 'status_id',
    ];

    public function statuses()
    {
        return $this->hasOne('App\OrderStatus', 'id', 'status_id');
    }

    public function types()
    {
        return $this->hasOne('App\OrderType', 'id', 'type_id');
    }

    public function users()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function shopping_carts()
    {
        return $this->hasMany('App\OrderShoppingCart', 'id', 'id');
    }
}
