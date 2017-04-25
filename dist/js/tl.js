'use strict';

var $body$1 = $('body');
var modal = {
    defaults: {
        tpl: '',
        width: 400,
        height: 300
    },
    //打开
    open: function open(opts) {
        opts = $.extend({}, this.defaults, opts);
        if ($('.t__modal').length === 1) {
            this.destory();
        }
        this.onClose = opts.onClose;
        this.init(opts);
        this.bindEvents();
    },
    //绑定事件
    bindEvents: function bindEvents() {
        var _this = this;

        this.$el.on('click', '.t__modal-close', function () {
            _this.close();
        });
        this.$el.on('click', '.t__modal-bg', function () {
            _this.close();
        });
    },
    //初始化模板
    init: function init(opts) {
        var html = '<div class="t__modal ' + opts.wrapClass + '">\n            <div class="t__modal-bg"></div>\n            <div class="t__modal-inner">\n                <span class="t__modal-close icon icon-close"></span>\n                <div class="t__modal-inner-content">\n                    ' + opts.tpl + '\n                </div>\n            </div>\n        </div>';
        this.$el = $(html).appendTo($body$1);
        this.$el.find('.t__modal-inner').css({
            width: opts.width,
            height: opts.height,
            'margin-left': -opts.width / 2,
            'margin-top': -opts.height / 2
        });
        this.$el.show();
    },
    destory: function destory() {
        if (this.$el) {
            this.$el.off('click', '.t__modal-close');
            this.$el.off('click', '.t__modal-bg');
            this.$el.remove();
        }
    },

    //关闭
    close: function close() {
        this.$el && this.$el.hide();
        this.onClose && this.onClose();
        this.destory();
    }
};

var $body = $('body');
var doc = window.document;
$.fn.extend({
    tlNotice: function tlNotice(content, _speed) {
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
        }, speed, function () {
            $el.remove();
        });
    },
    tlModal: function tlModal() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        //遮罩层
        modal.open(opts);
    },
    tlPopover: function tlPopover() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        //名片
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
        var $trigger = this;
        var position = function position($trigger) {
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
            show: function show() {
                position($trigger);
                $el.fadeIn("slow");
            },
            remove: function remove() {
                $(".t__popover").remove();
            }
        };
    }
});