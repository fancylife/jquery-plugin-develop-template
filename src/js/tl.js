(function(win, $) {
    var $body = $('body');
    var doc = win.document;
    var Tl = {
        notice(content, _speed) {
            var speed = _speed || 1000;
            var docHeight = doc.documentElement.clientHeight;
            var docScrollTop = doc.body.scrollTop;
            var docWidth = doc.documentElement.clientWidth;
            var $el = $('<div class="t__notice">' + content + '</div>').appendTo($body);
            $el.css({
                "top": (docHeight - $el.height()) / 2 + docScrollTop,
                "left": (docWidth - $el.width()) / 2
            });
            $el.animate({
                opacity: '0.25',
                top: '-=50'
            }, speed, function() {
                $el.remove();
            });
        }
    };
    $.fn.extend({
        tlMakerLayer(content, w, h) { //遮罩层
            var screenwidth, screenheight, mytop, getPosLeft, getPosTop
            screenwidth = $(win).width();
            screenheight = $(win).height();
            //获取滚动条距顶部的偏移
            //mytop = $(doc).scrollTop();
            //计算弹出层的left
            mytop = $(doc).scrollTop();
            getPosLeft = screenwidth / 2;
            //计算弹出层的top
            getPosTop = screenheight / 2;
            $body.append("<div class='t__bg'></div>")

            $body.append("<div class='t__shade'><div class='t__shade__close' title='关闭'>X</div>  </div>");
            $(".t__shade").css({
                'width': w + "px",
                'height': h + "px",
                "left": getPosLeft - w / 2,
                "top": getPosTop + mytop - h * 2 / 3
            }).append(content);
            var docheight = $(doc).height();
            $(".t__bg").css({
                "height": docheight
            });
            var close = function() {
                $(".t__shade").remove();
                $(".t__bg").remove();
                Tl.notice('关闭了');
                $("body").off('click', close);
            };
            $(".t__shade__close").bind("click", function() {
                close();

            });

            $(".t__shade").fadeIn("slow", function(argument) {
                $("body").bind("click", close);
            });

            //当浏览器窗口大小改变时
            $(win).resize(function() {
                screenwidth = $(win).width();
                screenheight = $(win).height();
                mytop = $(doc).scrollTop();
                getPosLeft = screenwidth / 2 - w / 2;
                getPosTop = screenheight / 2 - h * 2 / 3;
                $(".t__shade").css({
                    "left": getPosLeft,
                    "top": getPosTop + mytop
                });
            });
            //当拉动滚动条时，弹出层跟着移动
            $(win).scroll(function() {
                screenwidth = $(win).width();
                screenheight = $(win).height();
                mytop = $(doc).scrollTop();
                getPosLeft = screenwidth / 2 - w / 2;
                getPosTop = screenheight / 2 - h * 2 / 3;
                $(".t__shade").css({
                    "left": getPosLeft,
                    "top": getPosTop + mytop
                });
            });

        },
        tlPopover(opts = {}) { //名片
            var content = opts.content;
            var width = opts.width || 300;
            var height = opts.height || 200;
            var placement = opts.placement || 'bottom-left';
            var $el = $("<div class='t__popover'>" + content + "</div>").appendTo($body);
            $el.css({
                width: width,
                height: height
            });
            $el.addClass('bottom-left');
            var $trigger = this;;
            var position = function($trigger) {
                var triggerOffset = $trigger.offset();
                var opts = {
                    left: triggerOffset.left + $trigger.outerWidth() / 2 - $el.outerWidth() / 2,
                    top: triggerOffset.top + $trigger.height() + 20
                };
                if (placement === 'bottom-left') {
                    opts.left = triggerOffset.left;
                }
                if (placement === 'bottom-right') {
                    opts.left = triggerOffset.left - $el.outerWidth();
                }
                $el.css(opts);
            };

            return {
                show() {
                    position($trigger);
                    $el.fadeIn("slow");
                },
                remove() {
                    $(".t__popover").remove();

                }
            }
        },
        tlSetBackTop(status, _x, _y, scrollspeed) {

            $body.append("<div  class='t__backtop'  title='回到顶部'></div>");
            //設定位置
            $(".t__backtop").css({
                bottom: _x == null ? 100 : _x + "px",
                right: _y == null ? 70 : _y + "px",
                display: status == "none" ? "none" : "block"
            });
            //在IE、FF、Chrome下滚动条的onscroll事件，改写兼容s
            function _onScroll() {

                var labeller_layer = doc.getElementById('labeller_layer');
                var scrollTop = doc.documentElement.scrollTop + doc.body.scrollTop;

                labeller_layer.style.top = scrollTop + 'px';

            };
            //将窗口滚动条事件替换
            win.onscroll = _onScroll;

            //当滚动条的位置处于距顶部20像素以下时，跳转链接出现，否则消失
            $(win).scroll(function() {
                if ($(win).scrollTop() > 20) {
                    $(".t__backtop").fadeIn("1000");
                } else {
                    $(".t__backtop").fadeOut("1000");
                }
            });

            //当点击跳转链接后，回到页面顶部位置
            $(".t__backtop").click(function() {
                $("body,html").animate({
                    scrollTop: 0 //跳转位置
                }, scrollspeed);
                //跳转速度

                return false;
            });

        }
    });

}(window, window.jQuery))