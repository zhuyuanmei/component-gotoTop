define(function(){var e=function(t){this.settings=$.extend({},e.defaults,t),this.init()};e.prototype={init:function(){this.create()},create:function(){var e=this,t=e.settings,o=t.container,n=$.proxy(e._eventHandler,e);t.useHide&&$(document).on("touchmove",n),$(window).on("touchend touchcancel scrollStop",n),$(window).on("scroll resize",n),o.on("click",n),o.on("destroy",function(){$(window).off("touchend touchcancel scrollStop",n),$(document).off("touchmove",n),$(window).off("scroll resize",n),o.remove()}),e._check()},_eventHandler:function(e){var t=this;switch(e.type){case"touchmove":t.hide();break;case"scroll":clearTimeout(t.settings._TID);break;case"touchend":case"touchcancel":clearTimeout(t.settings._TID),t.settings._TID=setTimeout(function(){t._check.call(t)},300);break;case"scrollStop":t._check();break;case"resize":t._check.call(t);break;case"click":t._scrollTo()}},_check:function(e){var t=this;return(void 0!==e?e:window.pageYOffset)>document.documentElement.clientHeight?t.show():t.hide(),t},_scrollTo:function(){var e=this,t=window.pageYOffset,o=e.settings.afterScroll;return e.hide(),clearTimeout(e.settings._TID),e.settings.useAnimation?e.settings.moveToTop=setInterval(function(){t>1?(window.scrollBy(0,-Math.min(150,t-1)),t-=150):(clearInterval(e.settings.moveToTop),"[object Function]"===Object.prototype.toString.call(o)&&o())},25,!0):(window.scrollTo(0,1),"[object Function]"===Object.prototype.toString.call(o)&&o()),e},show:function(){var e=this;return e.settings.container.show(),e},hide:function(){var e=this;return e.settings.container.hide(),e}},e.defaults={container:null,useFix:!0,useHide:!0,useAnimation:!1,position:{bottom:10,right:10},afterScroll:null};var t=function(t){new e(t)};window.rGoTop=$.rGoTop=$.goTop=t});