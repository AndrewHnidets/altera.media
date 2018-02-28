<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = [
        'name_ru', 'name_uk', 'description_ru', 'description_uk', 'vendor_code', 'main_photo',
        'drop_price', 'rrc', 'user_id', 'sub_category_id', 'is_available', 'url'
    ];

    protected $casts = [
        'is_available',
    ];

    public function textTrans($text)
    {
        $locale = App::getLocale();
        $column = $text . '_' . $locale;

        return $this->{$column};
    }

    public function product_sub_categories()
    {
        return $this->belongsTo('App\ProductSubCategory', 'sub_category_id');
    }

    public function product_photos()
    {
        return $this->hasMany('App\ProductPhoto', 'product_id', 'id');
    }

    public function product_wholesale_price()
    {
        return $this->hasMany('App\ProductWholesalePrice', 'product_id', 'id');
    }

    public function users()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function storages()
    {
        return $this->belongsTo('App\Storage', 'id');
    }

    public function getCategory()
    {
        return ProductCategory::find(Product::getSubCategory()->categories_id);
    }

    public function getSubCategory()
    {
        return ProductSubCategory::find($this->sub_category_id);
    }

    public function order_shopping_carts()
    {
        return $this->belongsTo('App\OrderShoppingCart', 'id');
    }

    public function orders()
    {
        return $this->belongsToMany('App\Order', 'order_products',
            'product_id', 'order_id');
    }

    public function getPriceByNumber($number)
    {
        $price = ProductWholesalePrice::where('product_id', $this->id)
            ->where('pieces', '<=', $number)
            ->get();

        return (isset($price) && count($price) > 0) ? $price[sizeof($price) - 1]->price : $this->drop_price;
    }
}
