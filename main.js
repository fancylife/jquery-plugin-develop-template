var $body$1 = $('body');
var modal = {
    defaults: {
        tpl: '',
        width: 400,
        height: 300
    },
    //打开
    open: function(opts) {
        opts = $.extend({}, this.defaults, opts);
        if ($('.t__modal').length === 1) {
            this.destory();
        }
        this.onClose = opts.onClose;
        this.init(opts);
        this.bindEvents();
    },
    //绑定事件
    bindEvents: function() {
        this.$el.on('click', '.t__modal-close', () => {
            this.close();
        });
        this.$el.on('click', '.t__modal-bg', () => {
            this.close();
        });
    },
    //初始化模板
    init: function(opts) {
        var html = `<div class="t__modal ${opts.wrapClass}">
            <div class="t__modal-bg"></div>
            <div class="t__modal-inner">
                <span class="t__modal-close icon icon-close"></span>
                <div class="t__modal-inner-content">
                    ${opts.tpl}
                </div>
            </div>
        </div>`;
        this.$el = $(html).appendTo($body$1);
        this.$el.find('.t__modal-inner').css({
            width: opts.width,
            height: opts.height,
            'margin-left': -opts.width / 2,
            'margin-top': -opts.height / 2
        });
        this.$el.show();
    },
    destory() {
        if (this.$el) {
            this.$el.off('click', '.t__modal-close');
            this.$el.off('click', '.t__modal-bg');
            this.$el.remove();
        }
    },
    //关闭
    close: function() {
        this.$el && this.$el.hide();
        this.onClose && this.onClose();
        this.destory();
    }
};

var $body = $('body');
var doc = window.document;
$.fn.extend({
    tlNotice(content, _speed) {
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
    },
    tlModal(opts = {}) { //遮罩层
        modal.open(opts);
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
        var $trigger = this;
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
    }
});
