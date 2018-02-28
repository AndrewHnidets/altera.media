@extends('layouts.app_user_seller')

@section('content')

    <form action="{{route('orders.store')}}" method="post">
        <div class="row">
            <div class="title_every_page">
                <span class="uppercase">Корзина</span>
            </div>
            <div class="shopping_cart_page">
                <div class="col l7">
                    <div class="card">
                        <div class="shopping_cart_header">
                            <div class="header_after_check valign-wrapper">
                                <div class="select_header_cart">
                                    <select id="select_modals" onchange="cart_open_modal(this);">
                                        <option value="" disabled selected>Изменить</option>
                                        <option value="1">предоплата(способ оплаты)</option>
                                        <option value="2">наложенный(способ оплаты)</option>
                                        <option value="3">изменить розничную цену</option>
                                        <option value="4">изменить количество</option>
                                        <option value="5">ввести данные получателя</option>
                                        <option value="6">дублировать</option>
                                        <option value="7">удалить</option>
                                    </select>
                                </div>
                                <i class="remove_checked material-icons">close</i>
                            </div>
                            <div class="default_header valign-wrapper">
                                <span class="default_span_header_cart">#</span>
                                {{--<input class="search_input_cart" placeholder="Поиск" type="text">--}}
                            </div>
                        </div>

                        <div class="shopping_cart_content">
                            <div class="first_product_shopping_cart">
                                <table class=" responsive-table">
                                    <tbody>
                                    @foreach($shopping_carts as $cart)
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
                                            <td class="fourth_column_cart fourth_column_cart-{{$cart->id}}">
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
                                    @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    @if($shopping_carts->count() == 0)
                        @lang('cabinet.empty_shopping_cart_message')
                    @endif
                </div>

                <div class="col l5 shopping_cart_totals">
                    <div class="card">
                        <div class="info_about_orders">
                            <span>Заказы наложенным платежом:</span>
                            <span id="cash_on_delivery_number">{{number_format($cash_on_delivery_number, 0, '', ' ')}}</span>
                        </div>
                        <div class="info_about_orders">
                            <span>Заказы по предоплате:</span>
                            <span id="prepayment_number">{{number_format($prepayment_number, 0, '', ' ')}}</span>
                        </div>
                        <div class="info_about_orders">
                            <span>Поставщиков:</span>
                            <span id="providers_number">{{number_format($providers_number, 0, '', ' ')}}</span>
                        </div>
                    </div>
                    <div class="card">
                        <div class="info_about_orders">
                            <span>Наложенный платеж:</span>
                            <span class="font_medium" id="cash_on_delivery_sum">{{number_format($cash_on_delivery_sum, 0, '', ' ')}} грн</span>
                        </div>
                        <div class="info_about_orders">
                            <span>Сумма предоплаты:</span>
                            <span class="font_medium" id="prepayment_sum">{{number_format($prepayment_sum, 0, '', ' ')}} грн</span>
                        </div>
                        <div class="info_about_orders">
                            <span>Сумма РРЦ:</span>
                            <span class="font_medium" id="rrc_sum">{{number_format($rrc_sum, 0, '', ' ')}} грн</span>
                        </div>
                        <div class="in_orders_button_cart right-align">
                            {{csrf_field()}}
                            @foreach($shopping_carts as $cart_to_backend)
                                <input type="hidden" name="shopping_carts_ids[]" value="{{$cart_to_backend->id}}">
                            @endforeach
                            <button class="waves-effect waves-light btn uppercase" type="submit">В заказы</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODALS -->

        <!-- retail_price_modal modal -->
        <div id="modal_shopping_cart_retail_price" class="modal modal_shopping_cart_retail_price">
            <div class="modal-content">
                <form class="col s12">
                    <div class="modal_content_column">
                        <span class="title_modal_content">Розничная цена</span>
                        <span class="label_for_input_modal">Укажите сумму</span>
                        <input id="input_quantity" name="input-price" value="1" class="input_quantity_number"
                               onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46 || event.charCode == 44'>
                    </div>
                </form>
            </div>
            <div class="modal-footer modal_footer_buttons_cart">
                <a class="modal-action modal-close" onclick="event.preventDefault();">Отмена</a>
                <a class="modal-action modal-close update-price" onclick="event.preventDefault();">Сохранить</a>
            </div>
        </div>
        <!-- End retail_price_modal -->
        <!-- modal_shopping_cart_quantity_number modal -->
        <div id="modal_shopping_cart_quantity_number"
             class="modal modal_shopping_cart_retail_price modal_shopping_cart_quantity_number">
            <div class="modal-content">
                <form class="col s12">
                    <div class="modal_content_column">
                        <span class="title_modal_content">Количество товаров</span>
                        <span class="label_for_input_modal">Укажите количество</span>
                        <input name="input-quantity" value="1" type="text" class="input_quantity_number"
                               onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
                    </div>
                </form>
            </div>
            <div class="modal-footer modal_footer_buttons_cart">
                <a class="modal-action modal-close" onclick="event.preventDefault();">Отмена</a>
                <a id="save-quantity" class="modal-action modal-close"
                   onclick="event.preventDefault();">Сохранить</a>
            </div>
        </div>
        <!-- End modal_shopping_cart_quantity_number -->
        <!-- modal_shopping_cart_quantity_duplication modal -->
        <div id="modal_shopping_cart_quantity_duplication"
             class="modal modal_shopping_cart_retail_price modal_shopping_cart_quantity_duplication">
            <div class="modal-content">
                <form class="col s12">
                    <div class="modal_content_column">
                        <span class="title_modal_content">Дублирование товаров</span>
                        <span class="label_for_input_modal">Количество дубликатов</span>
                        <input name="input-duplicate" value="1" type="number" class="input_quantity_number">
                    </div>
                </form>
            </div>
            <div class="modal-footer modal_footer_buttons_cart">
                <a class="modal-action modal-close" onclick="event.preventDefault();">Отмена</a>
                <a class="modal-action modal-close" id="modal-duplicate-save" onclick="event.preventDefault();">Сохранить</a>
            </div>
        </div>
        <!-- End modal_shopping_cart_quantity_duplication -->
        <!-- modal_shopping_cart_recipient_data modal -->
        <div id="modal_shopping_cart_recipient_data"
             class="modal modal_shopping_cart_retail_price modal_shopping_cart_recipient_data">
            <div class="modal-content">
                <form class="col s12">
                    <div class="modal_content_column">
                        <div class="forms_modal">
                            <div class="input-field name_modal_form_cart">
                                <input id="last_name" type="text" class="validate name-cart">
                                <label for="last_name">Имя</label>
                            </div>
                            <div class="input-field surnname_modal_form_cart">
                                <input id="surname" type="text" class="validate surname-cart">
                                <label for="surname">Фамилия</label>
                            </div>
                        </div>
                        <div class="input-field surnname_modal_form_cart">
                            <input id="city_recipient" type="text" class="validate city-cart">
                            <label for="city_recipient">Город получателя</label>
                        </div>
                        <div class="input-field surnname_modal_form_cart">
                            <input id="new_mail" type="text" class="validate np-department-cart">
                            <label for="new_mail">Отделения НП</label>
                        </div>
                        <div class="input-field surnname_modal_form_cart phone_number_block_modal">
                            <span class="label_for_input_modal_phone">Номер телефона</span>
                            <input placeholder="()__-___" id="number_recipient" type="text"
                                   class="only_number input_quantity_number phone-cart">
                        </div>

                    </div>
                </form>
            </div>
            <div class="modal-footer modal_footer_buttons_cart">
                <a class="modal-action modal-close" onclick="event.preventDefault();">Отмена</a>
                <a class="modal-action modal-close" id="save-multiple-duplication" onclick="event.preventDefault();">Сохранить</a>
            </div>
        </div>
        <!-- End modal_shopping_cart_recipient_data -->

        <!-- MODALS END -->

    </form>
@endsection

@section('scripts')
    <script>
        var input = $("form input:checkbox"),
            header_table = $(".shopping_cart_header"),
            header_after_check = $(".header_after_check"),
            default_header = $(".default_header"),
            remove_checked = $(".remove_checked");
        input.click(function () {
            var check = 0;
            for (i = 0; i < input.length; i++) {
                if (input[i].checked) {
                    header_table.css("background", "#4b4b4b");
                    header_after_check.css("display", "flex");
                    default_header.css("display", "none");
                } else {
                    check++;
                }
            }
            if (check == input.length) {
                header_table.css("background", "#fff");
                header_after_check.css("display", "none");
                default_header.css("display", "flex");
            }
        });
        remove_checked.click(function () {
            for (i = 0; i < input.length; i++) {
                if (input[i].checked) {
                    input.prop('checked', false);
                    header_table.css("background", "#fff");
                    header_after_check.css("display", "none");
                    default_header.css("display", "flex");
                }
            }
        })
    </script>
    <script>
        $(document).ready(function () {
            // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
            $('.modal_shopping_cart').modal();
        });

        function cart_open_modal() {
            var first_modal = document.getElementById("select_modals").value;

            if (first_modal == 1) {

                var selected = new Array();

                $("input:checkbox[name=checkbox-to-select]:checked").each(function () {
                    selected.push($(this).val());
                });

                $.ajax({
                    type: "PUT",
                    url: 'shopping_cart/update_carts_type',
                    data: {
                        selected_ids: selected,
                        _method: 'put',
                        type: 1
                    },
                    success: function (data) {
                        for (i = 0; i < selected.length; i++) {
                            span_to_change = $('.second_column_cart-' + selected[i]);
                            span_to_change.text(data.type_name);
                            input_to_readonly = $('.third_column_cart-' + selected[i]).children();
                            input_to_readonly.attr('readonly', true);
                            input_to_readonly.val(data.price_array[selected[i]]);
                        }
                        getOrdersStats();
                        Materialize.toast(data.message, 2500);
                    }
                });
            }

            if (first_modal == 2) {
                var selected = new Array();

                $("input:checkbox[name=checkbox-to-select]:checked").each(function () {
                    selected.push($(this).val());
                });

                $.ajax({
                    type: "PUT",
                    url: 'shopping_cart/update_carts_type',
                    data: {
                        selected_ids: selected,
                        _method: 'put',
                        type: 2
                    },
                    success: function (data) {

                        for (i = 0; i < selected.length; i++) {
                            span_to_change = $('.second_column_cart-' + selected[i]);
                            span_to_change.text(data.type_name);
                            input_to_readonly = $('.third_column_cart-' + selected[i]).children();
                            input_to_readonly.attr('readonly', false);
                            input_to_readonly.val(data.price_array[selected[i]]);
                        }
                        getOrdersStats();
                        Materialize.toast(data.message, 2500);
                    }
                });
            }

            if (first_modal == 3) {
                $('#modal_shopping_cart_retail_price').modal('open');
            }
            if (first_modal == 4) {
                $('#modal_shopping_cart_quantity_number').modal('open');
            }
            if (first_modal == 5) {
                $('#modal_shopping_cart_recipient_data').modal('open');
            }
            if (first_modal == 6) {
                $('#modal_shopping_cart_quantity_duplication').modal('open');
            }

        }

        document.getElementsByClassName('only_number')[0].onkeypress = function (e) {

            e = e || event;

            if (e.ctrlKey || e.altKey || e.metaKey) return;

            var chr = getChar(e);

            // с null надо осторожно в неравенствах, т.к. например null >= '0' => true!
            // на всякий случай лучше вынести проверку chr == null отдельно
            if (chr == null) return;

            if (chr < '0' || chr > '9') {
                return false;
            }

        };

        function getChar(event) {
            if (event.which == null) {
                if (event.keyCode < 32) return null;
                return String.fromCharCode(event.keyCode) // IE
            }

            if (event.which != 0 && event.charCode != 0) {
                if (event.which < 32) return null;
                return String.fromCharCode(event.which) // остальные
            }

            return null; // специальная клавиша
        }

        function show_info(hideicon) {
            $(hideicon).parent().parent().next().show(1000);
            $(hideicon).parent().parent().css("background", "#fff");
            $(hideicon).css("visibility", "hidden");
        }

        function hide_info(showicon) {
            $(showicon).parent().parent().hide(1);
            $(showicon).parent().parent().prev().children().children(".show_info_icon").css({
                "visibility": "visible",
            });
            $(showicon).parent().parent().prev().css("background", "#f7f7f7");
        }
    </script>



    <script>
        initScripts();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        function deleteStorage() {
            $('.button_delete_cart').click(function (event) {
                var cart_id = event.target.id.split('-')[2];
                $.ajax({
                    type: "POST",
                    url: 'shopping_cart/' + cart_id,
                    data: {
                        cart_id: cart_id,
                        _method: 'delete'
                    },
                    success: function (data) {
                        var shopping_cart_button = $('#shopping_cart_number');
                        var number = shopping_cart_button.html();
                        shopping_cart_button.html(parseInt(number) - 1);

                        var tr_to_delete = $('#cart-' + cart_id);
                        var hidden_tr_to_delete = $('#tr-' + cart_id);

                        tr_to_delete.fadeOut(600, function () {
                            tr_to_delete.remove();
                            return false;
                        });
                        hidden_tr_to_delete.fadeOut(600, function () {
                            hidden_tr_to_delete.remove();
                            return false;
                        });


                        getOrdersStats();
                        Materialize.toast(data.message, 2500);
                    }
                });
            });
        }

        function changeQuantity() {
            $('#save-quantity').click(function (event) {
                var value_to_change = $("input[name='input-quantity']").val();

                var selected = new Array();

                $("input:checkbox[name=checkbox-to-select]:checked").each(function () {
                    selected.push($(this).val());
                });

                $.ajax({
                    type: "PUT",
                    url: 'shopping_cart/update_quantity',
                    data: {
                        selected_ids: selected,
                        _method: 'put',
                        quantity: value_to_change
                    },
                    success: function (data) {

                        for (i = 0; i < selected.length; i++) {
                            span_to_change = $('#fourth_column_cart-' + selected[i]);
                            span_to_change.val(value_to_change);
                        }

                        for (i = 0; i < data.shopping_carts.length; i++) {
                            var input_to_change = $('.third_column_cart-' + data.shopping_carts[i].id).children();
                            input_to_change.val(data.shopping_carts[i].rrc);
                        }

                        getOrdersStats();
                        Materialize.toast(data.message, 2500);
                    }
                });
            });
        }

        function changeThisQuantity(id, number) {
            var value_to_change = number;
            var selected = new Array(id);

            $.ajax({
                type: "PUT",
                url: 'shopping_cart/update_quantity',
                data: {
                    selected_ids: selected,
                    _method: 'put',
                    quantity: value_to_change
                },
                success: function (data) {
                    for (i = 0; i < data.shopping_carts.length; i++) {
                        var input_to_change = $('.third_column_cart-' + data.shopping_carts[i].id).children();
                        input_to_change.val(data.shopping_carts[i].rrc);
                    }
                    getOrdersStats();
                    Materialize.toast(data.message, 2500);
                }
            });
        }

        function updatePrice() {
            $('.update-price').click(function (event) {
                var price_to_change = $("input[name='input-price']").val();

                var selected = new Array();

                $("input:checkbox[name=checkbox-to-select]:checked").each(function () {
                    selected.push($(this).val());
                });

                $.ajax({
                    type: "PUT",
                    url: 'shopping_cart/update_price',
                    data: {
                        selected_ids: selected,
                        _method: 'put',
                        price: price_to_change
                    },
                    success: function (data) {
                        for (i = 0; i < selected.length; i++) {
                            if (data.editable_ids.includes(parseFloat(selected[i]))) {
                                input_to_readonly = $('.third_column_cart-' + selected[i]).children();
                                input_to_readonly.val(price_to_change);
                            }
                        }
                        getOrdersStats();
                        Materialize.toast(data.message, 2500);
                    }
                });
            });
        }

        function cloneCart() {
            $('#modal-duplicate-save').click(function (event) {
                var value_to_duplicate = $("input[name='input-duplicate']").val();

                var selected = new Array();

                $("input:checkbox[name=checkbox-to-select]:checked").each(function () {
                    selected.push($(this).val());
                });

                $.ajax({
                    type: "PUT",
                    url: 'shopping_cart/clone_cart',
                    data: {
                        selected_ids: selected,
                        _method: 'put',
                        value_to_duplicate: value_to_duplicate
                    },
                    success: function (data) {

                        for (i = 0; i < data.duplicated_carts.length; i++) {
                            $('.responsive-table tr:last').after(data.duplicated_carts[i]);
                        }
                        initScripts();
                        getOrdersStats();
                        Materialize.toast(data.message, 2500);
                    }
                });
            });
        }

        function setRecipientInfoCart() {
            $('.save-button-recipient-info').click(function (event) {

                var cart_id = $(this).attr('id').split('-')[4];

                var cart_name = $('.name-cart-' + cart_id).val();
                var cart_surname = $('.surname-cart-' + cart_id).val();
                var cart_phone = $('.phone-cart-' + cart_id).val();
                var cart_np_department = $('.np-department-cart-' + cart_id).val();
                var cart_city = $('.city-cart-' + cart_id).val();

                $.ajax({
                    type: "PUT",
                    url: 'shopping_cart/update_one_info',
                    data: {
                        _method: 'put',
                        cart_id: cart_id,
                        cart_name: cart_name,
                        cart_surname: cart_surname,
                        cart_phone: cart_phone,
                        cart_np_department: cart_np_department,
                        cart_city: cart_city
                    },
                    success: function (data) {
                        Materialize.toast(data.message, 2500);
                    }
                });
            });
        }

        function setRecipientInfoToSelectedCart() {
            $('#save-multiple-duplication').click(function (event) {

                var cart_name = $('.name-cart').val();
                var cart_surname = $('.surname-cart').val();
                var cart_phone = $('.phone-cart').val();
                var cart_np_department = $('.np-department-cart').val();
                var cart_city = $('.city-cart').val();


                var selected = new Array();


                $("input:checkbox[name=checkbox-to-select]:checked").each(function () {
                    selected.push($(this).val());
                });


                $.ajax({
                    type: "PUT",
                    url: 'shopping_cart/update_info',
                    data: {
                        selected_ids: selected,
                        _method: 'put',
                        cart_name: cart_name,
                        cart_surname: cart_surname,
                        cart_phone: cart_phone,
                        cart_np_department: cart_np_department,
                        cart_city: cart_city
                    },
                    success: function (data) {

                        for (i = 0; i < selected.length; i++) {
                            var cart_id = selected[i];

                            $('.name-cart-' + cart_id).val(cart_name);
                            $('.surname-cart-' + cart_id).val(cart_surname);
                            $('.phone-cart-' + cart_id).val(cart_phone);
                            $('.np-department-cart-' + cart_id).val(cart_np_department);
                            $('.city-cart-' + cart_id).val(cart_city);
                        }


                        Materialize.toast(data.message, 2500);
                    }
                });
            });
        }

        function getOrdersStats() {
            $.ajax({
                type: "get",
                url: 'shopping_cart/',
                data: {
                    _method: 'get',
                },
                success: function (data) {
                    $('#cash_on_delivery_number').text(data.cash_on_delivery_number.toLocaleString('ru-RU'));
                    $('#prepayment_number').text(data.prepayment_number.toLocaleString('ru-RU'));
                    $('#providers_number').text(data.providers_number.toLocaleString('ru-RU'));
                    $('#cash_on_delivery_sum').text(data.cash_on_delivery_sum.toLocaleString('ru-RU') + " грн");
                    $('#prepayment_sum').text(data.prepayment_sum.toLocaleString('ru-RU') + " грн");
                    $('#rrc_sum').text(data.rrc_sum.toLocaleString('ru-RU') + " грн");

                    Materialize.toast(data.message, 2500);
                }
            });
        }

        function changeDropPrice() {
            $('.third_column_cart').on('change', function () {

                var id = $(this).attr("class").split('-')[1];
                var price_to_change = $(this).children().val();
                var selected = new Array(id);

                $.ajax({
                    type: "PUT",
                    url: 'shopping_cart/update_price',
                    data: {
                        selected_ids: selected,
                        _method: 'put',
                        price: price_to_change
                    },
                    success: function (data) {
                        getOrdersStats();
                        Materialize.toast(data.message, 2500);
                    }
                });
            });
        }

        function onChangeQuantity() {
            $('.fourth_column_cart').on('change', function () {

                var id = $(this).attr("class").split('-')[1];

                var value_to_change = $(this).children().next().val();
                var selected = new Array(id);

                $.ajax({
                    type: "PUT",
                    url: 'shopping_cart/update_quantity',
                    data: {
                        selected_ids: selected,
                        _method: 'put',
                        quantity: value_to_change
                    },
                    success: function (data) {


                        for (i = 0; i < data.shopping_carts.length; i++) {
                            var input_to_change = $('.third_column_cart-' + data.shopping_carts[i].id).children();
                            input_to_change.val(data.shopping_carts[i].rrc);
                        }

                        getOrdersStats();
                        Materialize.toast(data.message, 2500);
                    }
                });
            });
        }


        function initScripts() {
            deleteStorage();
            changeQuantity();
            updatePrice();
            cloneCart();
            setRecipientInfoCart();
            setRecipientInfoToSelectedCart();
            changeDropPrice();
            onChangeQuantity();

            $('.bplus').on('click', function () {
                var $qty = $(this).closest('td').find('.counting');
                var currentVal = parseInt($qty.val());
                if (!isNaN(currentVal)) {
                    id = $(this).prev().attr('id').split('-')[1];
                    $qty.val(currentVal + 1);
                    changeThisQuantity(id, currentVal + 1);
                    getOrdersStats();
                }
            });
            $('.bminus').on('click', function () {
                var $qty = $(this).closest('td').find('.counting');
                var currentVal = parseInt($qty.val());
                if (!isNaN(currentVal) && currentVal > 1) {
                    id = $(this).next().attr('id').split('-')[1];
                    $qty.val(currentVal - 1);
                    changeThisQuantity(id, currentVal - 1);
                    getOrdersStats();
                }
            });
        }

    </script>






@endsection