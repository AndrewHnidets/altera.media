<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class ProductCategory extends Model
{
    protected $table = 'product_categories';

    protected $guarded = array('_token');

    protected $fillable = [
        'name_ru', 'name_uk', 'work_id',
    ];
    public function textTrans($text)
    {
        $locale = App::getLocale();
        $column = $text . '_' . $locale;

        return $this->{$column};
    }

    public function product_sub_categories()
    {
        return $this->HasMany('App\ProductSubCategory', 'categories_id', 'id');
    }
}
