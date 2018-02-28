<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderShoppingCart extends Model
{
    protected $table = 'order_shopping_carts';

    protected $fillable = [
        'number', 'user_id', 'product_id', 'order_id', 'name', 'surname', 'city', 'department', 'phone', 'rrc',
    ];

    public function users()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function products()
    {
        return $this->hasOne('App\Product', 'id', 'product_id');
    }

    public function types()
    {
        return $this->hasOne('App\OrderType', 'id', 'type_id');
    }

    public function orders()
    {
        return $this->belongsTo('App\Order', 'order_id');
    }

    public function getRealPrice()
    {
        return $this->rrc == 0 ? $this->products->rrc : $this->rrc;
    }

    public function checkForEmptyValues()
    {
        return $this->name == NULL || $this->surname == NULL || $this->city == NULL || $this->department == NULL || $this->phone == NULL ? false : true;
    }

}
