<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

class OrderStatus extends Model
{
    protected $table = 'order_statuses';

    protected $fillable = [
        'name_ru', 'name_uk',
    ];

    public function textTrans($text)
    {
        $locale = App::getLocale();
        $column = $text . '_' . $locale;

        return $this->{$column};
    }

    public function orders()
    {
        return $this->belongsTo('App\Order', 'id');
    }
}
