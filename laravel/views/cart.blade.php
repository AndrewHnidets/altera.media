<tr class="column_cart" id="cart-{{$cart->id}}">
    <td class="first_column_cart">
        <input class="checkbox-to-select" type="checkbox"
               name="checkbox-to-select"
               value="{{$cart->id}}"
               id="checkbox-{{$cart->id}}"/>
        <label for="checkbox-{{$cart->id}}"></label>
        <div class="title_shop_cart">
            <span class="title_of_product">{{str_limit($cart->products->textTrans('name'), 20)}}</span>
            <span class="title_of_company">{{$cart->users->profiles->company_name}}</span>
        </div>
    </td>
    <td class="second_column_cart"><span
                class="second_column_cart-{{$cart->id}}">{{$cart->types->textTrans('name')}}</span>
        <i class="show_info_icon material-icons" onclick="show_info(this);">keyboard_arrow_down</i>
    </td>
    <td class="third_column_cart third_column_cart-{{$cart->id}}">
        <input type="text"
               @if($cart->type_id == 1)
               value="{{$cart->products->rrc}}"
               @else
               value="{{$cart->rrc}}"
               @endif
               @if($cart->type_id == 1)
               readonly="true"
               @endif
               onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46 || event.charCode == 44'
               class="input_quantity_number">
    </td>
    <td class="fourth_column_cart">
        <i class="bminus material-icons"
           onkeypress="getOrdersStats();">remove</i>
        <input type="text"
               onkeypress='return event.charCode >= 48 && event.charCode <= 57'
               value="{{$cart->number}}"
               class="counting input_quantity_number"
               id="fourth_column_cart-{{$cart->id}}"
               onchange=""
        >
        <i class="bplus material-icons" onkeypress="getOrdersStats();">add</i>
    </td>
    <td class="fifth_column_cart fifth_column_cart-{{$cart->id}}">
        ${{$cart->products->drop_price}}
    </td>
    <td class="sixth_column_cart center-align">
        <i class="material-icons button_delete_cart"
           id="delete-cart-{{$cart->id}}">close</i>
    </td>
</tr>
<tr id="tr-{{$cart->id}}" class="show_when_clicked">
    <td class="show_first_td">
        <span class="title_show_content">Данные получателя</span>
        <div class="input-field margin_top_show">
            <input name="name-cart-{{$cart->id}}" id="last_name_show"
                   value="{{$cart->name}}"
                   type="text" class="validate name-cart-{{$cart->id}}">
            <label for="last_name_show">Имя</label>
        </div>
        <div class="input-field">
            <input name="city-cart-{{$cart->id}}" id="city_show" type="text"
                   value="{{$cart->city}}"
                   class="validate city-cart-{{$cart->id}}">
            <label for="city_show">Город Получателя</label>
        </div>
    </td>
    <td colspan="2" class="show_second_td">
        <div class="input-field margin_top_show">
            <input name="surname-cart-{{$cart->id}}" id="surname_name_show"
                   value="{{$cart->surname}}"
                   type="text" class="validate surname-cart-{{$cart->id}}">
            <label for="surname_name_show">Фамилия</label>
        </div>
        <div class="input-field">
            <input name="np-department-cart-{{$cart->id}}" id="new_mail_show"
                   value="{{$cart->department}}"
                   type="text"
                   class="validate np-department-cart-{{$cart->id}}">
            <label for="new_mail_show">Отделения НП</label>
        </div>
        <i class="hide_info_icon material-icons" onclick="hide_info(this);">keyboard_arrow_up</i>
    </td>
    <td colspan="3" class="phone_column">
        <div class="input-field input_with_border_block">
            <input name="phone-cart-{{$cart->id}}" placeholder="(__) __ - ___ "
                   value="{{$cart->phone}}"
                   id="phone_show" type="text"
                   class="input_with_borders only_number input_quantity_number_show phone-cart-{{$cart->id}}">
        </div>
        <div class="input-field input_with_border_block">
            <button class="btn btn-success input_quantity_number_show save-button-recipient-info"
                    id="save-button-recipient-info-{{$cart->id}}"
                    onclick="event.preventDefault();">Сохранить
            </button>
        </div>
    </td>
</tr>