/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 OA Wu Design
 */

$(function () {

    function initialize() {
        var $loading = $('<div />').attr('id', 'loading')
                                   .append($('<div />'))
                                   .appendTo($('body'));
        var $runDice = $('#run_dice');
        var $dice = $('#dice');
        var $popUp = $('#pop_up');

        var popUp = [
          {
              t: '關於 OA-richman', is: [
               { t: '作者名稱', h: 'http://www.ioa.tw', c: 'OA Wu' },
               { t: 'E-mail', h: '', c: 'comdan66@gmail.com' },
               { t: '作品名稱', h: '', c: 'OA-richman' },
               { t: '最新版本', h: '', c: '1.0.0' },
               { t: 'GitHub', h: 'https://github.com/comdan66/OA-richman', c: 'OA-richman' },
               { t: '相關資源', h: 'https://developers.google.com/maps/documentation/javascript/markers', c: 'Google maps API' },
               { t: '更新日期', h: '', c: '2015/05/05' },
              ]
          },
          {
              t: '更多相關作品', is: [
               { t: 'Material Design UI', h: 'https://github.com/comdan66/OA-material', c: 'OA-material' },
               { t: '北港迎媽祖', h: 'http://comdan66.github.io/matsu/2015/din-tao_map-19an.html', c: 'OA-matsu' },
               { t: 'Js 迷宮', h: 'https://github.com/comdan66/OA-maze', c: 'OA-maze' },
               { t: 'Js imgLiquid', h: 'https://github.com/comdan66/OA-imgLiquid', c: 'OA-imgLiquid' },
               { t: '導航列', h: 'https://github.com/comdan66/OA-navbar', c: 'OA-navbar' },
               { t: 'Js Slider View', h: 'https://github.com/comdan66/OA-scrollSliderView', c: 'OA-scrollSliderView' },
               { t: 'Youtube Play List', h: 'https://github.com/comdan66/u2', c: 'OA-u2' },
              ]
          }

        ];

        var spot = [
            [25.0518795, 121.5423308, '起點'],
            [25.0508605, 121.5447991, '妞呀小廚(星馬泰料理)'],
            [25.0486081, 121.5425775, '太師傅便當專賣店'],
            [25.048875, 121.542208, '名峰烤肉飯'],
            [25.0522042, 121.5398879, '鮮五丼'],
            [25.053732, 121.540414, '周胖子'],
            [25.055046, 121.539874, '山東刀削麵'],
            [25.0560209, 121.5417548, '福生園(韓式鐵板)'],
        ]

        var markerInfos = [];
        var setMapMark = function () {
            //todo: sort
            for (var i = 0, data; data = spot[i]; i++) {
                markerInfos.push({ position: new google.maps.LatLng(data[0], data[1]), name: data[2] });
            }
        }();

        var map = new window.funcs();

        //yu: passing init start path from here
        if (!map.init(markerInfos, $('#map'), { center: new google.maps.LatLng(spot[0][0], spot[0][1]) })) {
            return alert('地圖資料初始化失敗');
        }

        var user = map.createUser();
        user.setPosition();

        $('#throw_dice').click(function () {
            var step = Math.floor((Math.random() * 6) + 1);
            $dice.attr('class', 'show' + step);

            $runDice.fadeIn(function () {
                for (var nStep = Math.floor((Math.random() * 6) + 1) ; nStep == step; nStep = Math.floor((Math.random() * 6) + 1));

                $dice.attr('class', 'show' + nStep);

                setTimeout(function () {
                    $runDice.fadeOut(function () { user.goStep(nStep); });
                }, 800);
            });
        });

        $('.btns .about').click(function () {
            var data = popUp[0];

            $popUp.find('.paper').empty().append($('<h2 />').text(data.t)).append($('<div />').addClass('pop_up').append(data.is.map(function (t) {
                return $('<div />').addClass('i').append($('<div />').addClass('l').text(t.t)).append($('<div />').addClass('r').append(t.h === '' ? t.c : $('<a />').attr('href', t.h).attr('target', '_blank').text(t.c)));
            }))).append($('<div />').addClass('close').html('&#10006;'));

            $popUp.removeClass('hide');
        });
        $('.btns .more').click(function () {
            var data = popUp[1];

            $popUp.find('.paper').empty().append($('<h2 />').text(data.t)).append($('<div />').addClass('pop_up').append(data.is.map(function (t) {
                return $('<div />').addClass('i').append($('<div />').addClass('l').text(t.t)).append($('<div />').addClass('r').append(t.h === '' ? t.c : $('<a />').attr('href', t.h).attr('target', '_blank').text(t.c)));
            }))).append($('<div />').addClass('close').html('&#10006;'));

            $popUp.removeClass('hide');
        });

        $popUp.on('click', '.close', function () {
            $popUp.find('.paper').empty();
            $popUp.addClass('hide');
        });

        $loading.fadeOut(function () {
            $(this).hide(function () {
                $(this).remove();
            });
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
});