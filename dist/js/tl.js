'use strict';

var $body$1 = $('body');
var _modal = {
    defaults: {
        content: '',
        width: 400,
        height: 300
    },
    //打开
    open: function open(opts) {
        opts = $.extend({}, this.defaults, opts);
        if ($('.tl__modal').length === 1) {
            this.destory();
        }
        this.onClose = opts.onClose;
        this.init(opts);
        this.bindEvents();
    },
    //绑定事件
    bindEvents: function bindEvents() {
        var _this = this;

        this.$el.on('click', '.tl__modal-close', function () {
            _this.close();
        });
        this.$el.on('click', '.tl__modal-bg', function () {
            _this.close();
        });
    },
    //初始化模板
    init: function init(opts) {
        var html = '<div class="tl__modal ' + opts.wrapClass + '">\n            <div class="tl__modal-bg"></div>\n            <div class="tl__modal-inner">\n                <span class="tl__modal-close icon icon-close"></span>\n                <div class="tl__modal-inner-content">\n                    ' + opts.content + '\n                </div>\n            </div>\n        </div>';
        this.$el = $(html).appendTo($body$1);
        opts.width = opts.width - 30;
        opts.height = opts.height - 30;
        this.$el.find('.tl__modal-inner').css({
            width: opts.width,
            height: opts.height,
            'margin-left': -opts.width / 2,
            'margin-top': -opts.height / 2
        });
        this.$el.show();
    },
    destory: function destory() {
        if (this.$el) {
            this.$el.off('click', '.tl__modal-close');
            this.$el.off('click', '.tl__modal-bg');
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

var $body$2 = $('body');

var Popover = function Popover(opts) {
    this.content = opts.content;
    this.$trigger = opts.trigger;
    this.width = opts.width || 300;
    this.height = opts.height || 200;
    this.placement = opts.placement || 'bottom-left';
    this.bindEvents();
};

Popover.prototype.position = function ($trigger) {
    var triggerOffset = $trigger.offset();
    var opts = {
        left: triggerOffset.left + $trigger.outerWidth() / 2 - this.$el.outerWidth() / 2,
        top: triggerOffset.top + $trigger.height() + 20
    };
    if (this.placement === 'bottom-left') {
        opts.left = triggerOffset.left;
    }
    if (this.placement === 'bottom-right') {
        opts.left = triggerOffset.left - this.$el.outerWidth();
    }
    this.$el.css(opts);
};
Popover.prototype.init = function () {
    this.$el = $("<div class='tl__popover'>" + this.content + "</div>").appendTo($body$2);
    this.$el.css({
        width: this.width,
        height: this.height
    });
    this.$el.addClass('bottom-left');
};
Popover.prototype.bindEvents = function () {
    var _this2 = this;

    this.$trigger.hover(function () {
        _this2.init();
        _this2.position(_this2.$trigger);
        _this2.$el.show();
    }, function () {
        $('.tl__popover').remove();
    });
};

var $body = $('body');
var Tl = {
    remind: function remind(_text, lazyCloseTime) {
        lazyCloseTime = lazyCloseTime || 2000;
        var text = _text || '请稍等...';
        var me = this;
        if (!me.$utilTip || me.$utilTip.length === 0) {
            me.$utilTip = $('<div class="tl__remind"><span>' + text + '</div>').appendTo($body);
        } else {
            me.$utilTip.show();
            if (_text) {
                me.$utilTip.find('span').text(_text);
            }
        }
        if (lazyCloseTime) {
            setTimeout(function () {
                me.$utilTip.hide();
            }, lazyCloseTime);
        }
    },
    modal: function modal() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        //遮罩层
        _modal.open(opts);
    },
    popover: function popover() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        //名片
        new Popover(opts);
    }
};
$.Tl = Tl;