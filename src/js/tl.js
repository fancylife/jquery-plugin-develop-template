const $body = $('body');
const doc = window.document;
import modal from './modal/modal.js';
import Popover from './popover/popover.js';
let Tl = {
    remind: function(_text, lazyCloseTime) {
        lazyCloseTime = lazyCloseTime || 2000;
        var text = _text || '请稍等...';
        var me = this;
        if (!me.$utilTip || me.$utilTip.length === 0) {
            me.$utilTip = $('<div class="tl__remind"><span>' + text +
                '</div>').appendTo($body);
        } else {
            me.$utilTip.show();
            if (_text) {
                me.$utilTip.find('span').text(_text);
            }
        }
        if (lazyCloseTime) {
            setTimeout(function() {
                me.$utilTip.hide();
            }, lazyCloseTime);
        }
    },
    modal(opts = {}) { //遮罩层
        modal.open(opts);
    },
    popover(opts = {}) { //名片
        new Popover(opts);
    }
};
$.Tl = Tl;