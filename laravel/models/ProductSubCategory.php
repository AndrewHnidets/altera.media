<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class ProductSubCategory extends Model
{
    protected $table = 'product_sub_categories';

    protected $fillable = [
        'name_ru', 'name_uk', 'work_id', 'categories_id',
    ];

    public function textTrans($text)
    {
        $locale = App::getLocale();
        $column = $text . '_' . $locale;

        return $this->{$column};
    }

    public function product_categories()
    {
        return $this->belongsTo('App\ProductCategory', 'id');
    }

    public function products()
    {
        return $this->hasMany('App\Product', 'sub_category_id', 'id');
    }

    public function getCategory()
    {
        return ProductCategory::find($this->categories_id);
    }
}
