<?php

namespace App\Http\Controllers;

use App\OrderShoppingCart;
use App\OrderType;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\View;
use PhpParser\Node\Expr\Array_;

class UserShoppingCartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shopping_carts = OrderShoppingCart::where('user_id', Auth::user()->id)
            ->where('order_id', NULL)
            ->with('products')
            ->latest()
            ->get();

        $cash_on_delivery_number = 0;
        $provider_ids = [];
        $prepayment_sum = 0;
        $cash_on_delivery_sum = 0;
        $rrc_sum = 0;


        foreach ($shopping_carts as $cart) {
            if ($cart->type_id == 2) {
                $cash_on_delivery_number++;
                $cash_on_delivery_sum += $cart->number * $cart->products->getPriceByNumber($cart->number);
            } else {
                $prepayment_sum += $cart->number * $cart->products->getPriceByNumber($cart->number);

            }
            $id = $cart->products->user_id;
            if (!in_array($id, $provider_ids)) {
                array_push($provider_ids, $id);
            }
            $rrc_sum += $cart->number * $cart->getRealPrice();
        }
        $prepayment_number = $shopping_carts->count() - $cash_on_delivery_number;
        $providers_number = count($provider_ids);

        if (\Request::ajax()) {
            return response()->json([
                "cash_on_delivery_number" => $cash_on_delivery_number,
                "prepayment_number" => $prepayment_number,
                "providers_number" => $providers_number,
                "cash_on_delivery_sum" => $cash_on_delivery_sum,
                "prepayment_sum" => $prepayment_sum,
                "rrc_sum" => $rrc_sum,
            ]);
        }

        return view('user.cabinets.seller.shopping_cart.index',
            compact('shopping_carts', 'cash_on_delivery_number', 'prepayment_number', 'providers_number',
                'cash_on_delivery_sum', 'prepayment_sum', 'rrc_sum'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (\Request::ajax()) {
            OrderShoppingCart::create(
                [
                    'user_id' => Auth::user()->id,
                    'product_id' => $request->product_id,
                    'number' => 1,
                    'rrc' => Product::find($request->product_id)->rrc,
                ]
            );

            return response()->json([
                "message" => trans('cabinet.added_to_shopping_cart_message'),
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (\Request::ajax()) {
            OrderShoppingCart::findOrFail($id)->delete();

            return response()->json([
                "message" => trans('cabinet.deleted_message'),
            ]);
        }
    }

    public function update_carts_type(Request $request)
    {
        if (\Request::ajax()) {
            if ($request->type == 2) {

                $order_carts = OrderShoppingCart::whereIn('id', $request->selected_ids)
                    ->with('products')
                    ->get();

                $id_to_price = Array();

                OrderShoppingCart::whereIn('id', $request->selected_ids);

                foreach ($order_carts as $cart) {
                    $cart->type_id = $request->type;
                    $cart->rrc = $cart->products->getPriceByNumber($cart->number);
                    $cart->save();
                    $id_to_price += Array($cart->id => $cart->rrc);
                }


                return response()->json([
                    "message" => trans('cabinet.edited_message'),
                    "type_name" => OrderType::find($request->type)->textTrans('name'),
                    "price_array" => $id_to_price
                ]);
            } else {
                $order_carts = OrderShoppingCart::whereIn('id', $request->selected_ids)
                    ->with('products')
                    ->get();

                $id_to_price = Array();

                foreach ($order_carts as $cart) {
                    $cart->type_id = $request->type;
                    $cart->rrc = $cart->products->rrc;
                    $cart->save();
                    $id_to_price += Array($cart->id => $cart->products->rrc);
                }

                return response()->json([
                    "message" => trans('cabinet.edited_message'),
                    "type_name" => OrderType::find($request->type)->textTrans('name'),
                    "price_array" => $id_to_price
                ]);
            }
        }
    }

    public function update_quantity(Request $request)
    {
        if (\Request::ajax()) {

            $shopping_carts = OrderShoppingCart::whereIn('id', $request->selected_ids)->get();

            foreach ($shopping_carts as $cart) {

                if ($cart->type_id == 2) {
                    $cart->number = $request->quantity;
                    $cart->rrc = $cart->products->getPriceByNumber((int)$request->quantity);
                    $cart->save();
                } else {
                    $cart->number = $request->quantity;
                    $cart->save();
                }
            }


            return response()->json([
                "message" => trans('cabinet.edited_message'),
                "shopping_carts" => $shopping_carts,
            ]);
        }
    }

    public function update_price(Request $request)
    {
        if (\Request::ajax()) {

            $shopping_carts = OrderShoppingCart::whereIn('id', $request->selected_ids)
                ->where('type_id', 2)->get();

            $editable_ids = Array();

            if (count($shopping_carts) > 0)
                foreach ($shopping_carts as $cart) {
                    $cart->rrc = $request->price;
                    $cart->save();

                    array_push($editable_ids, $cart->id);
                }

            return response()->json([
                "message" => trans('cabinet.edited_message'),
                "editable_ids" => $editable_ids
            ]);
        }
    }

    public function delete_cart(Request $request)
    {
        if (\Request::ajax()) {

            $shopping_carts = OrderShoppingCart::whereIn('id', $request->selected_ids)->get();

            foreach ($shopping_carts as $cart) {
                $cart->delete();
            }

            return response()->json([
                "message" => trans('cabinet.deleted_message')
            ]);
        }
    }

    public function clone_cart(Request $request)
    {
        if (\Request::ajax()) {

            $shopping_carts = OrderShoppingCart::whereIn('id', $request->selected_ids)->get();

            $duplicated_carts = Array();

            foreach ($shopping_carts as $cart) {
                for ($i = 0; $i < $request->value_to_duplicate; $i++) {
                    $new_cart = $cart->replicate();
                    $new_cart->push();

                    $generated_code = View::make('user.cabinets.seller.shopping_cart.cart')->with('cart', $new_cart)->render();

                    array_push($duplicated_carts, $generated_code);
                }
            }

            return response()->json([
                "message" => trans('cabinet.edited_message'),
                "duplicated_carts" => $duplicated_carts,
            ]);
        }
    }

    public function update_one_info(Request $request)
    {
        if (\Request::ajax()) {

            OrderShoppingCart::find($request->cart_id)->update([
                'name' => $request->cart_name,
                'surname' => $request->cart_surname,
                'phone' => $request->cart_phone,
                'department' => $request->cart_np_department,
                'city' => $request->cart_city,
            ]);

            return response()->json([
                "message" => trans('cabinet.edited_message')
            ]);
        }
    }

    public function update_info(Request $request)
    {
        if (\Request::ajax()) {

            $shopping_carts = OrderShoppingCart::whereIn('id', $request->selected_ids)->get();

            foreach ($shopping_carts as $cart) {
                $cart->update([
                    'name' => $request->cart_name,
                    'surname' => $request->cart_surname,
                    'phone' => $request->cart_phone,
                    'department' => $request->cart_np_department,
                    'city' => $request->cart_city,
                ]);
            }

            return response()->json([
                "message" => trans('cabinet.edited_message')
            ]);
        }
    }
}
