<?php

namespace App\Http\Controllers;

use App\Product;
use App\ProductCategory;
use App\ProductSubCategory;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\View;
use Maatwebsite\Excel\Facades\Excel;

class UserXlsYmlController extends Controller
{
    public function get_all_products_xls(Request $request, UserProfileController $userProfileController)
    {
        $user = User::find($request->user_id);
        $products = Product::where('user_id', $user->id)->get();

        return Excel::create($userProfileController->str2url($user->profiles->company_name), function ($excel) use ($products) {

            $excel->sheet('New sheet', function ($sheet) use ($products) {

                $sheet->loadView('user.export_templates.xls', compact('products'));

            });
        })->download('xls');
    }

    public function get_all_products_yml(Request $request)
    {
        $user = User::find($request->user_id);
        $products = Product::where('user_id', $user->id)->get();
        $categories = ProductCategory::all();
        $sub_categories = ProductSubCategory::all();


        $output = View::make('user.export_templates.yml')
            ->with(compact('products', 'categories', 'sub_categories'))
            ->render();

        //add xml header - blade does not seem to like it

        return response()
            ->view('user.export_templates.yml',
                compact('products', 'categories', 'sub_categories'))
            ->header('Cache-Control', 'public')
            ->header('Content-Description', 'File Transfer')
            ->header('Content-Disposition', 'attachment; filename=' . 'Продукция поставщика ' . $user->profiles->company_name . '.xml')
            ->header('Content-Transfer-Encoding', 'binary')
            ->header('Content-Type', 'text/xml');
    }

    public function import_products(Request $request, UserProfileController $controller)
    {
        $rules = array();

        $validator = Validator::make(Input::all(), $rules);
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $file = Input::file('file');
        $file_name = time() . '.' . $request->file->getClientOriginalExtension();
        $file->move('files', $file_name);

        $results = Excel::load('files\\' . $file_name, function ($reader) {
        }, 'CP1251//ignore')->all();

        $user_id = Auth::id();
        foreach ($results as $sheet) {
            foreach ($sheet as $row) {
                $category = ProductSubCategory::where('name_ru', $row->kategoriya_tovara)
                    ->orWhere('name_uk', $row->kategoriya_tovara)
                    ->first();

                if ($category != NULL) {

                    $url = $controller->str2url($row->naimenovanie_tovara);

                    if (Product::where('user_id', $user_id)
                            ->where('name_ru', $row->naimenovanie_tovara)
                            ->first() ||
                        Product::where('user_id', $user_id)
                            ->where('url', $url)
                            ->first()
                    )
                        continue;

                    Product::create([
                        'name_ru' => $row->naimenovanie_tovara,
                        'name_uk' => $row->naimenovanie_tovara,
                        'description_ru' => $row->opisanie_tovara,
                        'description_uk' => $row->opisanie_tovara,
                        'vendor_code' => $row->kod_tovara_artikul_proizvoditelya,
                        'main_photo' => $row->ssylka_na_izobrazhenie,
                        'is_available' => $row->nalichie == 'в наличии' ? true : false,
                        'drop_price' => $row['tsena_rozn._grn.'],
                        'rrc' => $row['tsena_rozn._grn.'],
                        'url' => $url,
                        'user_id' => $user_id,
                        'sub_category_id' => $category->id,
                    ]);
                }
            }
        }

        unlink('files\\' . $file_name);

        return back()->with('message', trans('cabinet.added_message'));
    }
}
