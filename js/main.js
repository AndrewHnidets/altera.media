/** Full page library set-up **/
    var setTooltip = false;

    if (device.desktop()) {
        if (location.pathname === '/ru') {
            setTooltip = ["главная —","мебель —", "авто —","клининг —","ковры —","стирки —","одежда —","обувь —","аксессуары —"]
        } else {
            setTooltip = ["головна —","меблі —", "авто —","клінінг —","коври —","прання —","одяг —","взуття —","аксесуари —"];
        }
    }
    $("#fullpage").fullpage({
        lazyLoading: true,
        controlArrows: false,
        verticalCentered: false,
        slidesNavigation: true,
        scrollOverflow: true,
        touchSensitivity: 80,
        navigationTooltips: setTooltip,
        normalScrollElements: ".scrollable-element1",
        normalScrollElementTouchThreshold: 200,
        anchors: [ "main", "furniture", "car", "cleaning", "carpet", "wash", "clothes", "footwear", "accessory" ],
        navigation: true,
        navigationPosition: "right",
        sectionsColor: ["#f1f1f1", "#f1f1f1", "#f1f1f1", "#f1f1f1", "#f1f1f1"],
        afterRender: function(){
            setTimeout(function(){
               $('.container-loader').css('display', 'none');
            }, 1500);
        },
        afterLoad: function(anchorLink) {
            var loadedSection = $(this);
            if (anchorLink == "main") {
                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true);
                $.fn.fullpage.setAllowScrolling(true, "down, up");
                $.fn.fullpage.setKeyboardScrolling(true, "down, up");
                $.fn.fullpage.setAllowScrolling(true, "left, right");
                $.fn.fullpage.setKeyboardScrolling(true, "left, right");
                $('#lang').removeAttr( 'style' );
                $('.fp-slidesNav').removeAttr('style');
                $("#myModalButton").show();
                $("#lang").show();
                $("#fp-nav").show().removeClass("hover-dark");
                $('.fp-slidesNav').removeClass("hover-dark");
                $("#rightSlide").show();
                $("#downSection").show();
                $("#ukr").addClass("main-bottom-link").removeClass("contacts-bottom-link");
                $("#ru").addClass("main-bottom-link").removeClass("contacts-bottom-link");
                $('.main-bottom-message').removeAttr('style');
                if ($(window).height() <= 450 || $(window).width() <= 450) {
                    $(".fp-slidesNav").hide();
                    $(".arrow-right").hide();
                    $(".arrow-down").hide();
                    $("#lang").hide();
                }
            } else {
                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true);
                $.fn.fullpage.setAllowScrolling(true, "down, up");
                $.fn.fullpage.setKeyboardScrolling(true, "down, up");
                $.fn.fullpage.setAllowScrolling(true, "left, right");
                $.fn.fullpage.setKeyboardScrolling(true, "left, right");
                $('#lang').removeAttr( 'style' );
                $('.fp-slidesNav').removeAttr('style');
                $("#myModalButton").show();
                $("#lang").show();
                $("#fp-nav").show().addClass("hover-dark");
                $('.fp-slidesNav').addClass("hover-dark");
                $("#rightSlide").hide();
                $("#downSection").hide();
                $("#ukr").addClass("contacts-bottom-link").removeClass("main-bottom-link");
                $("#ru").addClass("contacts-bottom-link").removeClass("main-bottom-link");

                if ($(window).height() <= 450 || $(window).width() <= 450) {
                    $(".arrow-right").hide();
                    $(".arrow-down").hide();
                    $("#lang").hide();
                }
            }
        },
        afterSlideLoad: function(anchorLink, idex, slideIndex) {
            if (anchorLink == "main" && slideIndex == 0) {
                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true);
                $.fn.fullpage.setAllowScrolling(true, "down, up");
                $.fn.fullpage.setKeyboardScrolling(true, "down, up");
                $.fn.fullpage.setAllowScrolling(true, "left, right");
                $.fn.fullpage.setKeyboardScrolling(true, "left, right");
                $('#lang').removeAttr( 'style' );
                $('.fp-slidesNav').removeAttr('style');
                $("#myModalButton").show();
                $("#lang").show();
                $("#fp-nav").show().removeClass("hover-dark");
                $('.fp-slidesNav').removeClass("hover-dark");
                $("#rightSlide").show();
                $("#downSection").show();
                $("#ukr").addClass("main-bottom-link").removeClass("contacts-bottom-link");
                $("#ru").addClass("main-bottom-link").removeClass("contacts-bottom-link");

                if ($(window).height() <= 450 || $(window).width() <= 450) {
                    $('.fp-slidesNav').removeAttr('style').hide().removeClass('hover-dark');
                    $(".arrow-right").hide();
                    $(".arrow-down").hide();
                    $("#lang").hide();
                }
            } else if (anchorLink == "main" && slideIndex == 'contacts') {
                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true);
                $.fn.fullpage.setAllowScrolling(false, "down, up");
                $.fn.fullpage.setKeyboardScrolling(false, "down, up");
                $.fn.fullpage.setAllowScrolling(true, "left, right");
                $.fn.fullpage.setKeyboardScrolling(true, "left, right");
                $("#myModalButton").show();
                $("#lang").show();
                $("#ukr").addClass("contacts-bottom-link").removeClass("main-bottom-link");
                $("#ru").addClass("contacts-bottom-link").removeClass("main-bottom-link");
                $("#rightSlide").hide();
                $("#downSection").hide();
                $('#fp-nav').hide();
                $('.fp-slidesNav').addClass("hover-dark");
                $('.main-bottom-message').css('left', '4%');

                if ($(window).height() <= 450 || $(window).width() <= 450) {
                    $('.fp-slidesNav').removeAttr('style');
                    $('.main-bottom-message').removeAttr('style');
                    $("#lang").hide();
                } else if ($(window).width() <= 1024) {
                    $('.fp-slidesNav').removeAttr('style');
                    $('.fp-slidesNav').attr('style', 'margin-left: 10vw !important');
                } else {
                    $('#lang').css('right', '0').css('left', '30vw');
                    $('.fp-slidesNav').attr('style', 'margin-left: 13vw !important');
                }
            } else if (anchorLink == "main" && (slideIndex == 'about-us' || slideIndex == 'guarantees' || slideIndex == 'reviews' )) {
                console.log(anchorLink, idex, slideIndex);
                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true);
                $.fn.fullpage.setAllowScrolling(false, "down, up");
                $.fn.fullpage.setKeyboardScrolling(false, "down, up");
                $.fn.fullpage.setAllowScrolling(true, "left, right");
                $.fn.fullpage.setKeyboardScrolling(true, "left, right");
                $("#myModalButton").show();
                $("#lang").show();
                $("#ukr").addClass("contacts-bottom-link").removeClass("main-bottom-link");
                $("#ru").addClass("contacts-bottom-link").removeClass("main-bottom-link");
                $("#rightSlide").hide();
                $("#downSection").hide();
                $('#fp-nav').hide();
                $('#lang').removeAttr('style');
                $('.fp-slidesNav').addClass("hover-dark").removeAttr('style');
                $('.main-bottom-message').removeAttr('style');

                if ($(window).height() <= 450 || $(window).width() <= 450) {
                    $('.fp-slidesNav').removeAttr('style');
                    $("#lang").hide();
                }
            } else if (anchorLink != "main" && (slideIndex == 'price' || slideIndex == 'portfolio')) {
                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true);
                $.fn.fullpage.setAllowScrolling(false, "down, up");
                $.fn.fullpage.setKeyboardScrolling(false, "down, up");
                $.fn.fullpage.setAllowScrolling(true, "left, right");
                $.fn.fullpage.setKeyboardScrolling(true, "left, right");
                $('.fp-slidesNav').addClass("hover-dark");
                $('#fp-nav').hide();
                $('#lang').removeAttr('style');
                $('.main-bottom-message').removeAttr('style');

                if ($(window).height() <= 450 || $(window).width() <= 450) {
                    $(".arrow-right").hide();
                    $('#fp-nav').hide();
                    $(".arrow-down").hide();
                    $("#lang").hide();
                }
            } else if (anchorLink != "main" && slideIndex == 0) {
                $.fn.fullpage.setAllowScrolling(true);
                $.fn.fullpage.setKeyboardScrolling(true);
                $.fn.fullpage.setAllowScrolling(true, "down, up");
                $.fn.fullpage.setKeyboardScrolling(true, "down, up");
                $.fn.fullpage.setAllowScrolling(true, "left, right");
                $.fn.fullpage.setKeyboardScrolling(true, "left, right");
                $('#fp-nav').show();
                $('#lang').removeAttr('style');
            }
        }
    });
/** End of set-up **/

/** Functions when document already loaded **/
    $(document).ready(function() {

        /** Mask and form validation **/
            $("#phone").mask("8 (999) 999-9999");
            $("#form").validate();
            $("#secondForm").validate();
            jQuery.validator.setDefaults({
                debug: true,
                success: "valid"
            });
        /** End of validation **/

        /** Modal status switcher **/
            $("#close").click(function() {
                $("#main-Modal").removeClass("modal__active");
            });
            $('.reviews-modal-container').click(function() {

            })
            $("#myModalButton").click(function() {
                $("#main-Modal").addClass("modal__active");
            });
            $("#secondclose").click(function() {
                $("#mySecondModal").hide();
            });
            $("#cont-button").click(function() {
                $("#main-Modal").addClass("modal__active");
            });
            $("#rbutton").click(function() {
                $("#reviewsModal").addClass("modal__active");
            });
            $("#rclose").click(function() {
                $("#reviewsModal").removeClass("modal__active");
            });
            $("#main-Modal").click(function(event) {
                if (!$(event.target).closest("#modal-content").length && !$(event.target).is("#modal-content")) {
                        $("#main-Modal").removeClass("modal__active");
                }
            });
            $("#reviewsModal").click(function(event) {

                if ($(event.target).closest(".reviews-modal").length && $(event.target).is(".reviews-modal")) {
                    $("#reviewsModal").removeClass("modal__active");
                }
            });
            $("#contact-switcher").click(function() {
                $(".contact-address").slideDown();
                $("#mySecondModal").hide();
            });
            $("#main-sw").click(function() {
                $("#phone-modal").slideDown();
                $(".fp-slidesNav").show();
                $(".main-bottom-message").show();
                $("#rightSlide").show();
                $("#fp-nav").show();
                $("#downSection").show();
                $("#lang").show();
            });
            $("#close-sw").click(function() {
                $("#phone-modal").slideUp();
                $(".fp-slidesNav").hide();
                $(".main-bottom-message").hide();
                $("#rightSlide").hide();
                $("#fp-nav").hide();
                $("#downSection").hide();
                $("#lang").hide();
            });
        /** End of modal switcher **/

        /** Social icons hover effects **/
            $("#fb").hover(
                function() {
                    $(this).attr("src", "./img/fb-icon-hover.png");
                },
                function() {
                    $(this).attr("src", "./img/fb-ic.png");
                }
            );
            $("#instagram").hover(
                function() {
                    $(this).attr("src", "./img/instagram-icon-hover.png");
                },
                function() {
                    $(this).attr("src", "./img/instagram-icon.png");
                }
            );
            $("#youtube").hover(
                function() {
                    $(this).attr("src", "./img/youtube-icon-hover.png");
                },
                function() {
                    $(this).attr("src", "./img/youtube-icon.png");
                }
            );
        /** End of hover effects **/

        /** Input and textarea placeholder logic **/
            $("input, textarea").each(function() {
                var placeholder = $(this).attr("placeholder");
                $(this).focus(function() {
                    $(this).attr("placeholder", "");
                });
                $(this).focusout(function() {
                    $(this).attr("placeholder", placeholder);
                });
            });
        /** End of placeholder logic **/

        /** Google Map rendering **/
            function render_map($el) {
                var $markers = $el.find(".marker");
                var args = {
                    zoom: 18,
                    center: new google.maps.LatLng(0, 0),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: false
                };
                var map = new google.maps.Map($el[0], args);
                map.markers = [];
                $markers.each(function() {
                    add_marker($(this), map);
                });
                center_map(map);
            }
            function add_marker($marker, map) {
                var latlng = new google.maps.LatLng(
                    $marker.attr("data-lat"),
                    $marker.attr("data-lng")
                );
                var markerImage = "./img/location.png";
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: markerImage
                });
                map.markers.push(marker);
                marker.addListener("click", function() {
                    $("#mySecondModal").toggle();
                });
            }
            function center_map(map) {
                var bounds = new google.maps.LatLngBounds();

                $.each(map.markers, function(i, marker) {
                    var latlng = new google.maps.LatLng(
                        marker.position.lat(),
                        marker.position.lng()
                    );
                    bounds.extend(latlng);
                });
                if (map.markers.length == 1) {
                    map.setCenter(bounds.getCenter());
                    map.setZoom(16);
                } else {
                    map.fitBounds(bounds);
                }
            }
            $(".map").each(function() {
                render_map($(this));
            });
        /** End of google map rendering **/

        /** Check for tablet device **/
            if (device.tablet()) {
                $("#tablet").removeClass("slider");
                $("#tablet").removeClass("reviewcard-container");
                $("#tablet").addClass("reviewcard-container__tablet");
                $("#photo-tablet").removeClass("foto-container");
                $("#photo-tablet").addClass("foto-container__tablet");

            }
        /** End of check for tablet device **/

        /** Run function for resize main block with icons **/
            resizeBlock();
        /** End of resize **/

        /** SlickJS slider for reviews and comments **/
            var slideToShow = 3;
            if ($(window).width() <= 450) {
                slideToShow = 1;
            }
            $('#tablet').slick({
                dots: false,
                infinite: true,
                slidesToShow: slideToShow,
                slidesToScroll: 1
            });

        /** Enf of SlickJS **/

        /** Set the active language for page **/
            if (location.pathname === '/ru') {
                $('#ru').addClass('action');
                $('#ukr').removeClass('action');
            } else {
                $('#ukr').addClass('action');
                $('#ru').removeClass('action');
            }
        /** End of language **/

        /** Photo slider set-up with twentytwenty library **/
            $(".foto-container").each(function() {
                $(this).slick({
                    dots: false,
                    infinite: true,
                    speed: 300,
                    draggable: false,
                    touchMove: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    touchThreshold: 300,
                    responsive: [
                        {
                            breakpoint: 1026,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                infinite: true,
                                draggable: false,
                                touchMove: false
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                infinite: true,
                                draggable: false,
                                touchMove: false
                            }
                        },
                        {
                            breakpoint: 450,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: true,
                                draggable: false,
                                touchMove: false
                            }
                        }
                    ]
                });
            });
        /** End of photo slider **/

        /** Control arrow for fullpage slide **/
            $("#rightSlide").click(function() {
                $.fn.fullpage.moveSlideRight();
            });
            $("#downSection").click(function() {
                $.fn.fullpage.moveSectionDown();
            });
        /** End of control arrow for fullpage slide **/

        /** Control arrow for portfolio slider **/
            // $(".bot-arrow-l").each(function() {
            //     $(this).click(function() {
            //         $(".foto-container").slick("slickPrev");
            //     });
            // });
            // $(".bot-arrow-r").each(function() {
            //     $(this).click(function() {
            //         $(".foto-container").slick("slickNext");
            //     });
            // });
            $('.slick-prev').each(function(){
                $(this).append('<svg width="20px" height="20px" viewBox="0 0 50 80" xml:space="preserve"><polyline fill="none" stroke="#727272" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375 "/></svg>');
            });
            $('.slick-next').each(function(){
                $(this).append('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 50 80" xml:space="preserve"> <polyline fill="none" stroke="#727272" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8 "/></svg>');
            });
        /** End of control arrow for portfolio slider **/

        if ($(window).width() <= 320) {
            $('.video iframe').attr('width', '280');
            $('.video iframe').attr('height', '170');
        } else if ($(window).width() <= 375) {
            $('.video iframe').attr('width', '320');
            $('.video iframe').attr('height', '200');
        } else if ($(window).width() <= 450) {
            $('.video iframe').attr('width', '360');
            $('.video iframe').attr('height', '215');
        }
    });
/** End of document ready **/

/** Functions while window load **/
    $(window).load(function() {
        $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({
            default_offset_pct: 0.7
        });
        $(".twentytwenty-container[data-orientation='vertical']").twentytwenty({
            default_offset_pct: 0.4,
            orientation: "vertical"
        });
    });
/** End of window load **/

/** Functions when screen is resizing **/
    $(document).resize(function(){
        /** Run function for resize main block with icons **/
            resizeBlock();
        /** End of resize **/
    });
/** End of functions for resizing **/

/** Function for resize block on main page **/
    function resizeBlock() {
        var arr = new Array();
        var max = 0;

        $('.main-card-ico').each(function(){
            arr.push($(this).height());
            $(this).height('auto');
        });
        max = Math.max.apply(null, arr);
        $('.main-card-ico').each(function(){
            $(this).height(max);
        });
    }
/** End of resize function **/

/** Slide menu for mobile **/
    function openNav(elem) {
        document.getElementById('sidenavmenu').style.width = "100%";
        $('#fp-nav').hide();
        $("#lang").show();
    }
    function closeNav(elem) {
        var thisHash = location.hash.split('/');
        var newHash = elem.getAttribute("href").split('/');

        event.preventDefault();
        document.getElementById('sidenavmenu').style.width = "0%";

        if ((location.hash.split('/')[0] == '' || location.hash.split('/')[0] == '#main')
            && (location.hash.split('/')[1] == undefined)) {
            $('#fp-nav').show();
        } else {
            $('#fp-nav').hide();
        }
        if ($(window).width() <= 450) {
            $("#lang").hide();
        }

        if (elem.getAttribute("href") != 'javascript:void(0)') {
            if (thisHash[0] != newHash[0]) {
                location.hash = thisHash[0] + '/0';
                setTimeout(function() {
                    location.hash = elem.getAttribute("href");
                }, 0);
            } else {
                location.hash = elem.getAttribute("href");
            }
        }
    }
    function openServices(elem) {
        document.getElementById('main-menu-anchor').style.height = "0%";
        document.getElementById('services-anchor').style.height = "100%";
    }
    function closeServices(elem) {
        document.getElementById('main-menu-anchor').style.height = "100%";
        document.getElementById('services-anchor').style.height = "0%";
    }
    function openSubServices(elem) {
        var blockToToggle = document.getElementById(elem.dataset.page + '-block-anchor');

        if (blockToToggle.style.height == '100px') {
            $(elem).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            blockToToggle.style.height = "0";
        } else {
            $(elem).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
            blockToToggle.style.height = "100px";
        }
        $('.sub-block-anchor').each(function(){
            if (this.id != blockToToggle.id) {
                this.style.height = "0";
            }
        });
        $('.sub-href-anchor').each(function(){
            if (this.dataset.page != elem.dataset.page) {
                $(this).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            }
        });
    }
/** End of mobile menu **/

$('.header-img-logo').click(function (){
    event.preventDefault();
    var thisHash = location.hash.split('/');
    location.hash = thisHash[0] + '/0';
    setTimeout(function() {
        location.hash = '#main';
    }, 0);
});

function changeLanguage(elem) {
    if ($(elem).hasClass('action')) {
        event.preventDefault();
        return (false);
    } else {
        if (elem.id === 'ukr') {
            event.preventDefault();
            $('#myform2 .route-input').val(location.hash);
            document.getElementById('myform2').submit();
        } else {
            event.preventDefault();
            $('#myform1 .route-input').val(location.hash);
            document.getElementById('myform1').submit();
        }
    }
}
