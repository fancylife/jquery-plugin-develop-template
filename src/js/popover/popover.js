const $body = $('body');

var Popover = function(opts) {
    this.content = opts.content;
    this.$trigger = opts.trigger;
    this.width = opts.width || 300;
    this.height = opts.height || 200;
    this.placement = opts.placement || 'bottom-left';
    this.bindEvents();
};

Popover.prototype.position = function($trigger) {
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
Popover.prototype.init = function() {
    this.$el = $("<div class='tl__popover'>" +  this.content + "</div>").appendTo($body);
    this.$el.css({
        width: this.width,
        height: this.height
    });
    this.$el.addClass('bottom-left');
};
Popover.prototype.bindEvents = function() {
    this.$trigger.hover(() => {
        this.init();
        this.position(this.$trigger);
        this.$el.show();
    }, () => {
        $('.tl__popover').remove();
    });
};

export default Popover;