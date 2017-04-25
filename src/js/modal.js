var $body = $('body');
export default {
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
        this.$el = $(html).appendTo($body);
        this.$el.find('.t__modal-inner').css({
            width: opts.width,
            height: opts.height,
            'margin-left': -opts.width / 2,
            'margin-top': -opts.height / 2
        })
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
