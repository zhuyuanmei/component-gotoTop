/**
 * 返回顶部模块
 * @author zym
 * @version 1.0
 * @since 2016-06-23(2周年lou~)
 */
define(function(require, exports, module) {
    var GoTop = function(options) {
        this.settings = $.extend({}, GoTop.defaults, options);
        this.init();
    };

    GoTop.prototype = {
        /**
         * 初始化
         */
        init : function() {
            this.create();
        },

        /**
         * 创建
         */
        create : function() {
            var _this = this,
                _opts = _this.settings,
                $el = _opts.container,
                _eventHandler = $.proxy(_this._eventHandler, _this);

            _opts['useHide'] && $(document).on('touchmove', _eventHandler);
            $(window).on('touchend touchcancel scrollStop', _eventHandler);
            $(window).on('scroll resize', _eventHandler);
            $el.on('click', _eventHandler);

            $el.on('destroy', function() {
                $(window).off('touchend touchcancel scrollStop', _eventHandler);
                $(document).off('touchmove', _eventHandler);
                $(window).off('scroll resize', _eventHandler);
                $el.remove();
            });

            _this._check();
        },

        /**
         * 事件处理中心
         */
        _eventHandler: function(e) {
            var _this = this;

            switch (e.type) {
                case 'touchmove':
                    _this.hide();
                    break;
                case 'scroll':
                    clearTimeout(_this.settings['_TID']);
                    break;
                case 'touchend':
                case 'touchcancel':
                    clearTimeout(_this.settings['_TID']);
                    _this.settings['_TID'] = setTimeout(function(){
                        _this._check.call(_this);
                    }, 300);
                    break;
                case 'scrollStop':
                    _this._check();
                    break;
                case 'resize':
                    _this._check.call(_this);
                    break;
                case 'click':
                    _this._scrollTo();
                    break;
            }
        },

        /**
         * 判断是否显示gotop
         */
        _check: function(position) {
            var _this = this;

            (position !== undefined ? position : window.pageYOffset) > document.documentElement.clientHeight ? _this.show() : _this.hide();

            return  _this;
        },

        /**
         * 滚动到顶部或指定节点位置
         */
        _scrollTo: function() {
            var _this = this,
                from = window.pageYOffset,
                afterScrollFunc = _this.settings.afterScroll;

            _this.hide();
            clearTimeout(_this.settings['_TID']);
            if (!_this.settings['useAnimation']) {
                window.scrollTo(0, 1);

                if(Object.prototype.toString.call(afterScrollFunc) === '[object Function]'){
                    afterScrollFunc();
                }
            } else {
                _this.settings['moveToTop'] = setInterval(function() {
                    if (from > 1) {
                        window.scrollBy(0, -Math.min(150,from - 1));
                        from -= 150;
                    } else {
                        clearInterval(_this.settings['moveToTop']);

                        if(Object.prototype.toString.call(afterScrollFunc) === '[object Function]'){
                            afterScrollFunc();
                        }
                    }
                }, 25, true);
            }
            return _this;
        },

        /**
         * 显示gotop
         * @method show
         * @return {self} 返回本身
         */
        show: function() {
            var _this = this;

            _this.settings.container.show();

            return _this;
        },

        /**
         * 隐藏gotop
         * @method hide
         * @chainable
         * @return {self} 返回本身
         */
        hide: function() {
            var _this = this;

            _this.settings.container.hide();

            return _this;
        }
    };

    /**
     * 默认配置
     */
    GoTop.defaults = {
        // 组件容器
        container: null,

        // 是否使用固顶效果
        useFix: true,

        // 是否在touchmove的时候隐藏gotop图标
        useHide: true,

        // 返回顶部时是否使用动画
        useAnimation: false,

        // 使用fix效果时，要用的位置参数
        position: {bottom:10, right:10},

        // 返回顶部后执行的回调函数
        afterScroll: null
    };

    var rGoTop = function(options) {
        new GoTop(options);
    };

    window.rGoTop = $.rGoTop = $.goTop = rGoTop;
});