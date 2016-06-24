# component-gotoTop
组件名称：返回顶部<br>
组件功能：支持返回顶部功能<br>
组件参数：

    $.goTop({
            
            // 组件容器
            container: $('#J_GoTopIcon'),

            // 是否使用固顶效果
            useFix: true,

            // 是否在touchmove的时候隐藏gotop图标
            useHide: false,

            // 返回顶部时是否使用动画
            useAnimation: true,

            // 使用fix效果时，要用的位置参数
            position: {bottom:10, right:10},

            // 返回顶部后执行的回调函数
            afterScroll: null
        });
