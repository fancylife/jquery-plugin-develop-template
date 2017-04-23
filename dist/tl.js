"use strict";

(function (win, $) {
    var $body = $('body');
    var Tl = {
        notice: function notice(content, _speed) {
            var speed = _speed || 1000;
            var doc_height = document.documentElement.clientHeight;
            var doc_scroll_top = document.body.scrollTop;
            var doc_width = document.documentElement.clientWidth;

            var elem = $("<div></div>");
            elem.html(content);
            var cssObj = {
                "position": "absolute",
                "top": 0,
                "left": 0,
                "z-index": 1000,
                "font-size": "22px",
                "max-width": "150px",
                "background-color": "#ffffff",
                "color": "#049FF1",
                "border": "2px solid #ffffff",
                "border-radius": "5px",
                "-webkit-border-radius": "5px",
                "padding": "10px 10px 10px 10px",
                "box-shadow": "0 1px 12px #bbb",
                "text-align": "center",
                "opacity": "1"
            };
            elem.css(cssObj);
            elem.appendTo($("body"));
            elem.css("top", (doc_height - elem.height()) / 2 + doc_scroll_top);
            elem.css("left", (doc_width - elem.width()) / 2);

            elem.animate({
                opacity: '0.25',
                top: '-=50'
            }, speed, function () {
                elem.remove();
            });
        }
    };
    $.fn.extend({
        TlMakerLayer: function TlMakerLayer(content, w, h) {
            //遮罩层
            var screenwidth, screenheight, mytop, getPosLeft, getPosTop;
            screenwidth = $(win).width();
            screenheight = $(win).height();
            //获取滚动条距顶部的偏移
            //mytop = $(document).scrollTop();
            //计算弹出层的left
            mytop = $(document).scrollTop();
            getPosLeft = screenwidth / 2;
            //计算弹出层的top
            getPosTop = screenheight / 2;
            $body.append("<div class='t__bg'></div>");

            $body.append("<div class='t__shade'><div class='t__shade__close' title='关闭'>X</div>  </div>");
            $(".t__shade").css({
                'width': w + "px",
                'height': h + "px",
                "left": getPosLeft - w / 2,
                "top": getPosTop + mytop - h * 2 / 3
            }).append(content);
            var docheight = $(document).height();
            $(".t__bg").css({
                "height": docheight
            });
            var close = function close() {
                $(".t__shade").remove();
                $(".t__bg").remove();
                Tl.notice('关闭了');
                $("body").off('click', close);
            };
            $(".t__shade__close").bind("click", function () {
                close();
            });

            $(".t__shade").fadeIn("slow", function (argument) {
                $("body").bind("click", close);
            });

            //当浏览器窗口大小改变时
            $(win).resize(function () {
                screenwidth = $(win).width();
                screenheight = $(win).height();
                mytop = $(document).scrollTop();
                getPosLeft = screenwidth / 2 - w / 2;
                getPosTop = screenheight / 2 - h * 2 / 3;
                $(".t__shade").css({
                    "left": getPosLeft,
                    "top": getPosTop + mytop
                });
            });
            //当拉动滚动条时，弹出层跟着移动
            $(win).scroll(function () {
                screenwidth = $(win).width();
                screenheight = $(win).height();
                mytop = $(document).scrollTop();
                getPosLeft = screenwidth / 2 - w / 2;
                getPosTop = screenheight / 2 - h * 2 / 3;
                $(".t__shade").css({
                    "left": getPosLeft,
                    "top": getPosTop + mytop
                });
            });
        },
        TlPopover: function TlPopover(content) {
            //名片
            var popX = this.offset().left + this.width() + 10;
            var popY = this.offset().top - this.height() * 3;

            return {
                Show: function Show() {

                    $body.append("<div id='t__popover' class='t__popover'>" + content + "</div>");
                    $("#t__popover").offset({
                        top: popY,
                        left: popX
                    }).fadeIn("slow");
                },
                Remove: function Remove() {
                    $("#t__popover").remove();
                }
            };
        },
        TlSetBackTop: function TlSetBackTop(status, _x, _y, scrollspeed) {

            $body.append("<div id='t__backtop' class='t__backtop'  title='回到顶部'></div>");
            //設定位置
            $("#t__backtop").css({
                bottom: _x == null ? 100 : _x + "px",
                right: _y == null ? 70 : _y + "px",
                display: status == "none" ? "none" : "block"
            });
            //在IE、FF、Chrome下滚动条的onscroll事件，改写兼容s
            function _onScroll() {

                var labeller_layer = document.getElementById('labeller_layer');
                var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;

                labeller_layer.style.top = scrollTop + 'px';
            };
            //将窗口滚动条事件替换
            win.onscroll = _onScroll;

            //当滚动条的位置处于距顶部20像素以下时，跳转链接出现，否则消失
            $(win).scroll(function () {
                if ($(win).scrollTop() > 20) {
                    $("#t__backtop").fadeIn("1000");
                } else {
                    $("#t__backtop").fadeOut("1000");
                }
            });

            //当点击跳转链接后，回到页面顶部位置
            $("#t__backtop").click(function () {
                $("body,html").animate({
                    scrollTop: 0 //跳转位置
                }, scrollspeed);
                //跳转速度

                return false;
            });
        }
    });
})(window, window.jQuery);