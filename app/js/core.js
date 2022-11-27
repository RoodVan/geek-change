/* jquery-confirm v3.3.4 (http://craftpip.github.io/jquery-confirm/) */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(i,n){return void 0===n&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(i)),t(n),n}:t(jQuery)}(function(t){"use strict";var i=window;t.fn.confirm=function(n,o){return void 0===n&&(n={}),"string"==typeof n&&(n={content:n,title:o||!1}),t(this).each(function(){var o=t(this);o.attr("jc-attached")?console.warn("jConfirm has already been attached to this element ",o[0]):(o.on("click",function(e){e.preventDefault();var s=t.extend({},n);if(o.attr("data-title")&&(s.title=o.attr("data-title")),o.attr("data-content")&&(s.content=o.attr("data-content")),void 0===s.buttons&&(s.buttons={}),s.$target=o,o.attr("href")&&0===Object.keys(s.buttons).length){var a=t.extend(!0,{},i.jconfirm.pluginDefaults.defaultButtons,(i.jconfirm.defaults||{}).defaultButtons||{}),c=Object.keys(a)[0];s.buttons=a,s.buttons[c].action=function(){location.href=o.attr("href")}}s.closeIcon=!1;t.confirm(s)}),o.attr("jc-attached",!0))}),t(this)},t.confirm=function(n,o){void 0===n&&(n={}),"string"==typeof n&&(n={content:n,title:o||!1});var e=!(!1===n.buttons);if("object"!=typeof n.buttons&&(n.buttons={}),0===Object.keys(n.buttons).length&&e){var s=t.extend(!0,{},i.jconfirm.pluginDefaults.defaultButtons,(i.jconfirm.defaults||{}).defaultButtons||{});n.buttons=s}return i.jconfirm(n)},t.alert=function(n,o){void 0===n&&(n={}),"string"==typeof n&&(n={content:n,title:o||!1});var e=!(!1===n.buttons);if("object"!=typeof n.buttons&&(n.buttons={}),0===Object.keys(n.buttons).length&&e){var s=t.extend(!0,{},i.jconfirm.pluginDefaults.defaultButtons,(i.jconfirm.defaults||{}).defaultButtons||{}),a=Object.keys(s)[0];n.buttons[a]=s[a]}return i.jconfirm(n)},t.dialog=function(t,n){return void 0===t&&(t={}),"string"==typeof t&&(t={content:t,title:n||!1,closeIcon:function(){}}),t.buttons={},void 0===t.closeIcon&&(t.closeIcon=function(){}),t.confirmKeys=[13],i.jconfirm(t)},i.jconfirm=function(n){void 0===n&&(n={});var o=t.extend(!0,{},i.jconfirm.pluginDefaults);i.jconfirm.defaults&&(o=t.extend(!0,o,i.jconfirm.defaults)),o=t.extend(!0,{},o,n);var e=new i.Jconfirm(o);return i.jconfirm.instances.push(e),e},i.Jconfirm=function(i){t.extend(this,i),this._init()},i.Jconfirm.prototype={_init:function(){var n=this;i.jconfirm.instances.length||(i.jconfirm.lastFocused=t("body").find(":focus")),this._id=Math.round(99999*Math.random()),this.contentParsed=t(document.createElement("div")),this.lazyOpen||setTimeout(function(){n.open()},0)},_buildHTML:function(){var i=this;this._parseAnimation(this.animation,"o"),this._parseAnimation(this.closeAnimation,"c"),this._parseBgDismissAnimation(this.backgroundDismissAnimation),this._parseColumnClass(this.columnClass),this._parseTheme(this.theme),this._parseType(this.type);var n=t(this.template);n.find(".jconfirm-box").addClass(this.animationParsed).addClass(this.backgroundDismissAnimationParsed).addClass(this.typeParsed),this.typeAnimated&&n.find(".jconfirm-box").addClass("jconfirm-type-animated"),this.useBootstrap?(n.find(".jc-bs3-row").addClass(this.bootstrapClasses.row),n.find(".jc-bs3-row").addClass("justify-content-md-center justify-content-sm-center justify-content-xs-center justify-content-lg-center"),n.find(".jconfirm-box-container").addClass(this.columnClassParsed),this.containerFluid?n.find(".jc-bs3-container").addClass(this.bootstrapClasses.containerFluid):n.find(".jc-bs3-container").addClass(this.bootstrapClasses.container)):n.find(".jconfirm-box").css("width",this.boxWidth),this.titleClass&&n.find(".jconfirm-title-c").addClass(this.titleClass),n.addClass(this.themeParsed);var o="jconfirm-box"+this._id;n.find(".jconfirm-box").attr("aria-labelledby",o).attr("tabindex",-1),n.find(".jconfirm-content").attr("id",o),null!==this.bgOpacity&&n.find(".jconfirm-bg").css("opacity",this.bgOpacity),this.rtl&&n.addClass("jconfirm-rtl"),this.$el=n.appendTo(this.container),this.$jconfirmBoxContainer=this.$el.find(".jconfirm-box-container"),this.$jconfirmBox=this.$body=this.$el.find(".jconfirm-box"),this.$jconfirmBg=this.$el.find(".jconfirm-bg"),this.$title=this.$el.find(".jconfirm-title"),this.$titleContainer=this.$el.find(".jconfirm-title-c"),this.$content=this.$el.find("div.jconfirm-content"),this.$contentPane=this.$el.find(".jconfirm-content-pane"),this.$icon=this.$el.find(".jconfirm-icon-c"),this.$closeIcon=this.$el.find(".jconfirm-closeIcon"),this.$holder=this.$el.find(".jconfirm-holder"),this.$btnc=this.$el.find(".jconfirm-buttons"),this.$scrollPane=this.$el.find(".jconfirm-scrollpane"),i.setStartingPoint(),this._contentReady=t.Deferred(),this._modalReady=t.Deferred(),this.$holder.css({"padding-top":this.offsetTop,"padding-bottom":this.offsetBottom}),this.setTitle(),this.setIcon(),this._setButtons(),this._parseContent(),this.initDraggable(),this.isAjax&&this.showLoading(!1),t.when(this._contentReady,this._modalReady).then(function(){i.isAjaxLoading?setTimeout(function(){i.isAjaxLoading=!1,i.setContent(),i.setTitle(),i.setIcon(),setTimeout(function(){i.hideLoading(!1),i._updateContentMaxHeight()},100),"function"==typeof i.onContentReady&&i.onContentReady()},50):(i._updateContentMaxHeight(),i.setTitle(),i.setIcon(),"function"==typeof i.onContentReady&&i.onContentReady()),i.autoClose&&i._startCountDown()}).then(function(){i._watchContent()}),"none"===this.animation&&(this.animationSpeed=1,this.animationBounce=1),this.$body.css(this._getCSS(this.animationSpeed,this.animationBounce)),this.$contentPane.css(this._getCSS(this.animationSpeed,1)),this.$jconfirmBg.css(this._getCSS(this.animationSpeed,1)),this.$jconfirmBoxContainer.css(this._getCSS(this.animationSpeed,1))},_typePrefix:"jconfirm-type-",typeParsed:"",_parseType:function(t){this.typeParsed=this._typePrefix+t},setType:function(t){var i=this.typeParsed;this._parseType(t),this.$jconfirmBox.removeClass(i).addClass(this.typeParsed)},themeParsed:"",_themePrefix:"jconfirm-",setTheme:function(t){var i=this.theme;this.theme=t||this.theme,this._parseTheme(this.theme),i&&this.$el.removeClass(i),this.$el.addClass(this.themeParsed),this.theme=t},_parseTheme:function(i){var n=this;i=i.split(","),t.each(i,function(o,e){-1===e.indexOf(n._themePrefix)&&(i[o]=n._themePrefix+t.trim(e))}),this.themeParsed=i.join(" ").toLowerCase()},backgroundDismissAnimationParsed:"",_bgDismissPrefix:"jconfirm-hilight-",_parseBgDismissAnimation:function(i){var n=i.split(","),o=this;t.each(n,function(i,e){-1===e.indexOf(o._bgDismissPrefix)&&(n[i]=o._bgDismissPrefix+t.trim(e))}),this.backgroundDismissAnimationParsed=n.join(" ").toLowerCase()},animationParsed:"",closeAnimationParsed:"",_animationPrefix:"jconfirm-animation-",setAnimation:function(t){this.animation=t||this.animation,this._parseAnimation(this.animation,"o")},_parseAnimation:function(i,n){n=n||"o";var o=i.split(","),e=this;t.each(o,function(i,n){-1===n.indexOf(e._animationPrefix)&&(o[i]=e._animationPrefix+t.trim(n))});var s=o.join(" ").toLowerCase();return"o"===n?this.animationParsed=s:this.closeAnimationParsed=s,s},setCloseAnimation:function(t){this.closeAnimation=t||this.closeAnimation,this._parseAnimation(this.closeAnimation,"c")},setAnimationSpeed:function(t){this.animationSpeed=t||this.animationSpeed},columnClassParsed:"",setColumnClass:function(t){this.useBootstrap?(this.columnClass=t||this.columnClass,this._parseColumnClass(this.columnClass),this.$jconfirmBoxContainer.addClass(this.columnClassParsed)):console.warn("cannot set columnClass, useBootstrap is set to false")},_updateContentMaxHeight:function(){var i=t(window).height()-(this.$jconfirmBox.outerHeight()-this.$contentPane.outerHeight())-(this.offsetTop+this.offsetBottom);this.$contentPane.css({"max-height":i+"px"})},setBoxWidth:function(t){this.useBootstrap?console.warn("cannot set boxWidth, useBootstrap is set to true"):(this.boxWidth=t,this.$jconfirmBox.css("width",t))},_parseColumnClass:function(t){var i;switch(t=t.toLowerCase()){case"xl":case"xlarge":i="col-md-12";break;case"l":case"large":i="col-md-8 col-md-offset-2";break;case"m":case"medium":i="col-md-6 col-md-offset-3";break;case"s":case"small":i="col-md-4 col-md-offset-4";break;case"xs":case"xsmall":i="col-md-2 col-md-offset-5";break;default:i=t}this.columnClassParsed=i},initDraggable:function(){var i=this,n=this.$titleContainer;this.resetDrag(),this.draggable&&(n.on("mousedown",function(t){n.addClass("jconfirm-hand"),i.mouseX=t.clientX,i.mouseY=t.clientY,i.isDrag=!0}),t(window).on("mousemove."+this._id,function(t){i.isDrag&&(i.movingX=t.clientX-i.mouseX+i.initialX,i.movingY=t.clientY-i.mouseY+i.initialY,i.setDrag())}),t(window).on("mouseup."+this._id,function(){n.removeClass("jconfirm-hand"),i.isDrag&&(i.isDrag=!1,i.initialX=i.movingX,i.initialY=i.movingY)}))},resetDrag:function(){this.isDrag=!1,this.initialX=0,this.initialY=0,this.movingX=0,this.movingY=0,this.mouseX=0,this.mouseY=0,this.$jconfirmBoxContainer.css("transform","translate(0px, 0px)")},setDrag:function(){if(this.draggable){this.alignMiddle=!1;var i=this.$jconfirmBox.outerWidth(),n=this.$jconfirmBox.outerHeight(),o=t(window).width(),e=t(window).height();if(this.movingX%1==0||this.movingY%1==0){if(this.dragWindowBorder){var s=o/2-i/2,a=e/2-n/2;a-=this.dragWindowGap,(s-=this.dragWindowGap)+this.movingX<0?this.movingX=-s:s-this.movingX<0&&(this.movingX=s),a+this.movingY<0?this.movingY=-a:a-this.movingY<0&&(this.movingY=a)}this.$jconfirmBoxContainer.css("transform","translate("+this.movingX+"px, "+this.movingY+"px)")}}},_scrollTop:function(){if("undefined"!=typeof pageYOffset)return pageYOffset;var t=document.body,i=document.documentElement;return(i=i.clientHeight?i:t).scrollTop},_watchContent:function(){var i=this;this._timer&&clearInterval(this._timer);var n=0;this._timer=setInterval(function(){if(i.smoothContent){var o=i.$content.outerHeight()||0;o!==n&&(n=o);var e=t(window).height();i.offsetTop+i.offsetBottom+i.$jconfirmBox.height()-i.$contentPane.height()+i.$content.height()<e?i.$contentPane.addClass("no-scroll"):i.$contentPane.removeClass("no-scroll")}},this.watchInterval)},_overflowClass:"jconfirm-overflow",_hilightAnimating:!1,highlight:function(){this.hiLightModal()},hiLightModal:function(){var t=this;if(!this._hilightAnimating){t.$body.addClass("hilight");var i=parseFloat(t.$body.css("animation-duration"))||2;this._hilightAnimating=!0,setTimeout(function(){t._hilightAnimating=!1,t.$body.removeClass("hilight")},1e3*i)}},_bindEvents:function(){var i=this;this.boxClicked=!1,this.$scrollPane.click(function(t){if(!i.boxClicked){var n,o=!1,e=!1;if("string"==typeof(n="function"==typeof i.backgroundDismiss?i.backgroundDismiss():i.backgroundDismiss)&&void 0!==i.buttons[n]?(o=n,e=!1):e=void 0===n||!0==!!n,o){var s=i.buttons[o].action.apply(i);e=void 0===s||!!s}e?i.close():i.hiLightModal()}i.boxClicked=!1}),this.$jconfirmBox.click(function(t){i.boxClicked=!0});var n=!1;t(window).on("jcKeyDown."+i._id,function(t){n||(n=!0)}),t(window).on("keyup."+i._id,function(t){n&&(i.reactOnKey(t),n=!1)}),t(window).on("resize."+this._id,function(){i._updateContentMaxHeight(),setTimeout(function(){i.resetDrag()},100)})},_cubic_bezier:"0.36, 0.55, 0.19",_getCSS:function(t,i){return{"-webkit-transition-duration":t/1e3+"s","transition-duration":t/1e3+"s","-webkit-transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+i+")","transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+i+")"}},_setButtons:function(){var i=this,n=0;if("object"!=typeof this.buttons&&(this.buttons={}),t.each(this.buttons,function(o,e){n+=1,"function"==typeof e&&(i.buttons[o]=e={action:e}),i.buttons[o].text=e.text||o,i.buttons[o].btnClass=e.btnClass||"btn-default",i.buttons[o].action=e.action||function(){},i.buttons[o].keys=e.keys||[],i.buttons[o].isHidden=e.isHidden||!1,i.buttons[o].isDisabled=e.isDisabled||!1,t.each(i.buttons[o].keys,function(t,n){i.buttons[o].keys[t]=n.toLowerCase()});var s=t('<button type="button" class="btn"></button>').html(i.buttons[o].text).addClass(i.buttons[o].btnClass).prop("disabled",i.buttons[o].isDisabled).css("display",i.buttons[o].isHidden?"none":"").click(function(t){t.preventDefault();var n=i.buttons[o].action.apply(i,[i.buttons[o]]);i.onAction.apply(i,[o,i.buttons[o]]),i._stopCountDown(),(void 0===n||n)&&i.close()});i.buttons[o].el=s,i.buttons[o].setText=function(t){s.html(t)},i.buttons[o].addClass=function(t){s.addClass(t)},i.buttons[o].removeClass=function(t){s.removeClass(t)},i.buttons[o].disable=function(){i.buttons[o].isDisabled=!0,s.prop("disabled",!0)},i.buttons[o].enable=function(){i.buttons[o].isDisabled=!1,s.prop("disabled",!1)},i.buttons[o].show=function(){i.buttons[o].isHidden=!1,s.css("display","")},i.buttons[o].hide=function(){i.buttons[o].isHidden=!0,s.css("display","none")},i["$_"+o]=i["$$"+o]=s,i.$btnc.append(s)}),0===n&&this.$btnc.hide(),null===this.closeIcon&&0===n&&(this.closeIcon=!0),this.closeIcon){if(this.closeIconClass){var o='<i class="'+this.closeIconClass+'"></i>';this.$closeIcon.html(o)}this.$closeIcon.click(function(t){t.preventDefault();var n,o=!1,e=!1;if("string"==typeof(n="function"==typeof i.closeIcon?i.closeIcon():i.closeIcon)&&void 0!==i.buttons[n]?(o=n,e=!1):e=void 0===n||!0==!!n,o){var s=i.buttons[o].action.apply(i);e=void 0===s||!!s}e&&i.close()}),this.$closeIcon.show()}else this.$closeIcon.hide()},setTitle:function(t,i){if(i=i||!1,void 0!==t)if("string"==typeof t)this.title=t;else if("function"==typeof t){"function"==typeof t.promise&&console.error("Promise was returned from title function, this is not supported.");var n=t();this.title="string"==typeof n&&n}else this.title=!1;this.isAjaxLoading&&!i||(this.$title.html(this.title||""),this.updateTitleContainer())},setIcon:function(t,i){if(i=i||!1,void 0!==t)if("string"==typeof t)this.icon=t;else if("function"==typeof t){var n=t();this.icon="string"==typeof n&&n}else this.icon=!1;this.isAjaxLoading&&!i||(this.$icon.html(this.icon?'<i class="'+this.icon+'"></i>':""),this.updateTitleContainer())},updateTitleContainer:function(){this.title||this.icon?this.$titleContainer.show():this.$titleContainer.hide()},setContentPrepend:function(t,i){t&&this.contentParsed.prepend(t)},setContentAppend:function(t){t&&this.contentParsed.append(t)},setContent:function(t,i){i=!!i;var n=this;t&&this.contentParsed.html("").append(t),this.isAjaxLoading&&!i||(this.$content.html(""),this.$content.append(this.contentParsed),setTimeout(function(){n.$body.find("input[autofocus]:visible:first").focus()},100))},loadingSpinner:!1,showLoading:function(t){this.loadingSpinner=!0,this.$jconfirmBox.addClass("loading"),t&&this.$btnc.find("button").prop("disabled",!0)},hideLoading:function(t){this.loadingSpinner=!1,this.$jconfirmBox.removeClass("loading"),t&&this.$btnc.find("button").prop("disabled",!1)},ajaxResponse:!1,contentParsed:"",isAjax:!1,isAjaxLoading:!1,_parseContent:function(){var i=this,n="&nbsp;";if("function"==typeof this.content){var o=this.content.apply(this);"string"==typeof o?this.content=o:"object"==typeof o&&"function"==typeof o.always?(this.isAjax=!0,this.isAjaxLoading=!0,o.always(function(t,n,o){i.ajaxResponse={data:t,status:n,xhr:o},i._contentReady.resolve(t,n,o),"function"==typeof i.contentLoaded&&i.contentLoaded(t,n,o)}),this.content=n):this.content=n}if("string"==typeof this.content&&"url:"===this.content.substr(0,4).toLowerCase()){this.isAjax=!0,this.isAjaxLoading=!0;var e=this.content.substring(4,this.content.length);t.get(e).done(function(t){i.contentParsed.html(t)}).always(function(t,n,o){i.ajaxResponse={data:t,status:n,xhr:o},i._contentReady.resolve(t,n,o),"function"==typeof i.contentLoaded&&i.contentLoaded(t,n,o)})}this.content||(this.content=n),this.isAjax||(this.contentParsed.html(this.content),this.setContent(),i._contentReady.resolve())},_stopCountDown:function(){clearInterval(this.autoCloseInterval),this.$cd&&this.$cd.remove()},_startCountDown:function(){var i=this,n=this.autoClose.split("|");if(2!==n.length)return console.error("Invalid option for autoClose. example 'close|10000'"),!1;var o=n[0],e=parseInt(n[1]);if(void 0===this.buttons[o])return console.error("Invalid button key '"+o+"' for autoClose"),!1;var s=Math.ceil(e/1e3);this.$cd=t('<span class="countdown"> ('+s+")</span>").appendTo(this["$_"+o]),this.autoCloseInterval=setInterval(function(){i.$cd.html(" ("+(s-=1)+") "),s<=0&&(i["$$"+o].trigger("click"),i._stopCountDown())},1e3)},_getKey:function(t){switch(t){case 192:return"tilde";case 13:return"enter";case 16:return"shift";case 9:return"tab";case 20:return"capslock";case 17:return"ctrl";case 91:return"win";case 18:return"alt";case 27:return"esc";case 32:return"space"}var i=String.fromCharCode(t);return!!/^[A-z0-9]+$/.test(i)&&i.toLowerCase()},reactOnKey:function(i){var n=this,o=t(".jconfirm");if(o.eq(o.length-1)[0]!==this.$el[0])return!1;var e=i.which;if(this.$content.find(":input").is(":focus")&&/13|32/.test(e))return!1;var s=this._getKey(e);if("esc"===s&&this.escapeKey)if(!0===this.escapeKey)this.$scrollPane.trigger("click");else if("string"==typeof this.escapeKey||"function"==typeof this.escapeKey){var a;(a="function"==typeof this.escapeKey?this.escapeKey():this.escapeKey)&&(void 0===this.buttons[a]?console.warn("Invalid escapeKey, no buttons found with key "+a):this["$_"+a].trigger("click"))}t.each(this.buttons,function(t,i){-1!==i.keys.indexOf(s)&&n["$_"+t].trigger("click")})},setDialogCenter:function(){console.info("setDialogCenter is deprecated, dialogs are centered with CSS3 tables")},_unwatchContent:function(){clearInterval(this._timer)},close:function(n){var o=this;return"function"==typeof this.onClose&&this.onClose(n),this._unwatchContent(),t(window).unbind("resize."+this._id),t(window).unbind("keyup."+this._id),t(window).unbind("jcKeyDown."+this._id),this.draggable&&(t(window).unbind("mousemove."+this._id),t(window).unbind("mouseup."+this._id),this.$titleContainer.unbind("mousedown")),o.$el.removeClass(o.loadedClass),t("body").removeClass("jconfirm-no-scroll-"+o._id),o.$jconfirmBoxContainer.removeClass("jconfirm-no-transition"),setTimeout(function(){o.$body.addClass(o.closeAnimationParsed),o.$jconfirmBg.addClass("jconfirm-bg-h");var n="none"===o.closeAnimation?1:o.animationSpeed;setTimeout(function(){o.$el.remove();i.jconfirm.instances;for(var n=i.jconfirm.instances.length-1;n>=0;n--)i.jconfirm.instances[n]._id===o._id&&i.jconfirm.instances.splice(n,1);if(!i.jconfirm.instances.length&&o.scrollToPreviousElement&&i.jconfirm.lastFocused&&i.jconfirm.lastFocused.length&&t.contains(document,i.jconfirm.lastFocused[0])){var e=i.jconfirm.lastFocused;if(o.scrollToPreviousElementAnimate){var s=t(window).scrollTop(),a=i.jconfirm.lastFocused.offset().top,c=t(window).height();if(a>s&&a<s+c)e.focus();else{var r=a-Math.round(c/3);t("html, body").animate({scrollTop:r},o.animationSpeed,"swing",function(){e.focus()})}}else e.focus();i.jconfirm.lastFocused=!1}"function"==typeof o.onDestroy&&o.onDestroy()},.4*n)},50),!0},open:function(){return!this.isOpen()&&(this._buildHTML(),this._bindEvents(),this._open(),!0)},setStartingPoint:function(){var n=!1;if(!0!==this.animateFromElement&&this.animateFromElement)n=this.animateFromElement,i.jconfirm.lastClicked=!1;else{if(!i.jconfirm.lastClicked||!0!==this.animateFromElement)return!1;n=i.jconfirm.lastClicked,i.jconfirm.lastClicked=!1}if(!n)return!1;var o=n.offset(),e=n.outerHeight()/2,s=n.outerWidth()/2;e-=this.$jconfirmBox.outerHeight()/2,s-=this.$jconfirmBox.outerWidth()/2;var a=o.top+e;a-=this._scrollTop();var c=o.left+s,r=t(window).height()/2,l=t(window).width()/2;if(a-=r-this.$jconfirmBox.outerHeight()/2,c-=l-this.$jconfirmBox.outerWidth()/2,Math.abs(a)>r||Math.abs(c)>l)return!1;this.$jconfirmBoxContainer.css("transform","translate("+c+"px, "+a+"px)")},_open:function(){var t=this;"function"==typeof t.onOpenBefore&&t.onOpenBefore(),this.$body.removeClass(this.animationParsed),this.$jconfirmBg.removeClass("jconfirm-bg-h"),this.$body.focus(),t.$jconfirmBoxContainer.css("transform","translate(0px, 0px)"),setTimeout(function(){t.$body.css(t._getCSS(t.animationSpeed,1)),t.$body.css({"transition-property":t.$body.css("transition-property")+", margin"}),t.$jconfirmBoxContainer.addClass("jconfirm-no-transition"),t._modalReady.resolve(),"function"==typeof t.onOpen&&t.onOpen(),t.$el.addClass(t.loadedClass)},this.animationSpeed)},loadedClass:"jconfirm-open",isClosed:function(){return!this.$el||0===this.$el.parent().length},isOpen:function(){return!this.isClosed()},toggle:function(){this.isOpen()?this.close():this.open()}},i.jconfirm.instances=[],i.jconfirm.lastFocused=!1,i.jconfirm.pluginDefaults={template:'<div class="jconfirm"><div class="jconfirm-bg jconfirm-bg-h"></div><div class="jconfirm-scrollpane"><div class="jconfirm-row"><div class="jconfirm-cell"><div class="jconfirm-holder"><div class="jc-bs3-container"><div class="jc-bs3-row"><div class="jconfirm-box-container jconfirm-animated"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="jconfirm-closeIcon">&times;</div><div class="jconfirm-title-c"><span class="jconfirm-icon-c"></span><span class="jconfirm-title"></span></div><div class="jconfirm-content-pane"><div class="jconfirm-content"></div></div><div class="jconfirm-buttons"></div><div class="jconfirm-clear"></div></div></div></div></div></div></div></div></div></div>',title:"Hello",titleClass:"",type:"default",typeAnimated:!0,draggable:!0,dragWindowGap:15,dragWindowBorder:!0,animateFromElement:!0,alignMiddle:!0,smoothContent:!0,content:"Are you sure to continue?",buttons:{},defaultButtons:{ok:{action:function(){}},close:{action:function(){}}},contentLoaded:function(){},icon:"",lazyOpen:!1,bgOpacity:null,theme:"light",animation:"scale",closeAnimation:"scale",animationSpeed:400,animationBounce:1,escapeKey:!0,rtl:!1,container:"body",containerFluid:!1,backgroundDismiss:!1,backgroundDismissAnimation:"shake",autoClose:!1,closeIcon:null,closeIconClass:!1,watchInterval:100,columnClass:"col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1",boxWidth:"50%",scrollToPreviousElement:!0,scrollToPreviousElementAnimate:!0,useBootstrap:!0,offsetTop:40,offsetBottom:40,bootstrapClasses:{container:"container",containerFluid:"container-fluid",row:"row"},onContentReady:function(){},onOpenBefore:function(){},onOpen:function(){},onClose:function(){},onDestroy:function(){},onAction:function(){}};var n=!1;t(window).on("keydown",function(i){if(!n){var o=!1;t(i.target).closest(".jconfirm-box").length&&(o=!0),o&&t(window).trigger("jcKeyDown"),n=!0}}),t(window).on("keyup",function(){n=!1}),i.jconfirm.lastClicked=!1,t(document).on("mousedown","button, a, [jc-source]",function(){i.jconfirm.lastClicked=t(this)})});


/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 */
;(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);


/* animateNumber */
;(function(d){var q=function(b){return b.split("").reverse().join("")},m={numberStep:function(b,a){var e=Math.floor(b);d(a.elem).text(e)}},h=function(b){var a=b.elem;a.nodeType&&a.parentNode&&(a=a._animateNumberSetter,a||(a=m.numberStep),a(b.now,b))};d.Tween&&d.Tween.propHooks?d.Tween.propHooks.number={set:h}:d.fx.step.number=h;d.animateNumber={numberStepFactories:{append:function(b){return function(a,e){var g=Math.floor(a);d(e.elem).prop("number",a).text(g+b)}},separator:function(b,a,e){b=b||" ";
a=a||3;e=e||"";return function(g,k){var c=Math.floor(g).toString(),t=d(k.elem);if(c.length>a){for(var f=c,l=a,m=f.split("").reverse(),c=[],n,r,p,s=0,h=Math.ceil(f.length/l);s<h;s++){n="";for(p=0;p<l;p++){r=s*l+p;if(r===f.length)break;n+=m[r]}c.push(n)}f=c.length-1;l=q(c[f]);c[f]=q(parseInt(l,10).toString());c=c.join(b);c=q(c)}t.prop("number",g).text(c+e)}}}};d.fn.animateNumber=function(){for(var b=arguments[0],a=d.extend({},m,b),e=d(this),g=[a],k=1,c=arguments.length;k<c;k++)g.push(arguments[k]);
if(b.numberStep){var h=this.each(function(){this._animateNumberSetter=b.numberStep}),f=a.complete;a.complete=function(){h.each(function(){delete this._animateNumberSetter});f&&f.apply(this,arguments)}}return e.animate.apply(e,g)}})(jQuery);


/**
 * @popperjs/core v2.11.6 - MIT License
 */

 !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).Popper={})}(this,(function(e){"use strict";function t(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function n(e){return e instanceof t(e).Element||e instanceof Element}function r(e){return e instanceof t(e).HTMLElement||e instanceof HTMLElement}function o(e){return"undefined"!=typeof ShadowRoot&&(e instanceof t(e).ShadowRoot||e instanceof ShadowRoot)}var i=Math.max,a=Math.min,s=Math.round;function f(){var e=navigator.userAgentData;return null!=e&&e.brands?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function c(){return!/^((?!chrome|android).)*safari/i.test(f())}function p(e,o,i){void 0===o&&(o=!1),void 0===i&&(i=!1);var a=e.getBoundingClientRect(),f=1,p=1;o&&r(e)&&(f=e.offsetWidth>0&&s(a.width)/e.offsetWidth||1,p=e.offsetHeight>0&&s(a.height)/e.offsetHeight||1);var u=(n(e)?t(e):window).visualViewport,l=!c()&&i,d=(a.left+(l&&u?u.offsetLeft:0))/f,h=(a.top+(l&&u?u.offsetTop:0))/p,m=a.width/f,v=a.height/p;return{width:m,height:v,top:h,right:d+m,bottom:h+v,left:d,x:d,y:h}}function u(e){var n=t(e);return{scrollLeft:n.pageXOffset,scrollTop:n.pageYOffset}}function l(e){return e?(e.nodeName||"").toLowerCase():null}function d(e){return((n(e)?e.ownerDocument:e.document)||window.document).documentElement}function h(e){return p(d(e)).left+u(e).scrollLeft}function m(e){return t(e).getComputedStyle(e)}function v(e){var t=m(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function y(e,n,o){void 0===o&&(o=!1);var i,a,f=r(n),c=r(n)&&function(e){var t=e.getBoundingClientRect(),n=s(t.width)/e.offsetWidth||1,r=s(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(n),m=d(n),y=p(e,c,o),g={scrollLeft:0,scrollTop:0},b={x:0,y:0};return(f||!f&&!o)&&(("body"!==l(n)||v(m))&&(g=(i=n)!==t(i)&&r(i)?{scrollLeft:(a=i).scrollLeft,scrollTop:a.scrollTop}:u(i)),r(n)?((b=p(n,!0)).x+=n.clientLeft,b.y+=n.clientTop):m&&(b.x=h(m))),{x:y.left+g.scrollLeft-b.x,y:y.top+g.scrollTop-b.y,width:y.width,height:y.height}}function g(e){var t=p(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function b(e){return"html"===l(e)?e:e.assignedSlot||e.parentNode||(o(e)?e.host:null)||d(e)}function w(e){return["html","body","#document"].indexOf(l(e))>=0?e.ownerDocument.body:r(e)&&v(e)?e:w(b(e))}function x(e,n){var r;void 0===n&&(n=[]);var o=w(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),a=t(o),s=i?[a].concat(a.visualViewport||[],v(o)?o:[]):o,f=n.concat(s);return i?f:f.concat(x(b(s)))}function O(e){return["table","td","th"].indexOf(l(e))>=0}function j(e){return r(e)&&"fixed"!==m(e).position?e.offsetParent:null}function E(e){for(var n=t(e),i=j(e);i&&O(i)&&"static"===m(i).position;)i=j(i);return i&&("html"===l(i)||"body"===l(i)&&"static"===m(i).position)?n:i||function(e){var t=/firefox/i.test(f());if(/Trident/i.test(f())&&r(e)&&"fixed"===m(e).position)return null;var n=b(e);for(o(n)&&(n=n.host);r(n)&&["html","body"].indexOf(l(n))<0;){var i=m(n);if("none"!==i.transform||"none"!==i.perspective||"paint"===i.contain||-1!==["transform","perspective"].indexOf(i.willChange)||t&&"filter"===i.willChange||t&&i.filter&&"none"!==i.filter)return n;n=n.parentNode}return null}(e)||n}var D="top",A="bottom",L="right",P="left",M="auto",k=[D,A,L,P],W="start",B="end",H="viewport",T="popper",R=k.reduce((function(e,t){return e.concat([t+"-"+W,t+"-"+B])}),[]),S=[].concat(k,[M]).reduce((function(e,t){return e.concat([t,t+"-"+W,t+"-"+B])}),[]),V=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function q(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function C(e){return e.split("-")[0]}function N(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&o(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function I(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function _(e,r,o){return r===H?I(function(e,n){var r=t(e),o=d(e),i=r.visualViewport,a=o.clientWidth,s=o.clientHeight,f=0,p=0;if(i){a=i.width,s=i.height;var u=c();(u||!u&&"fixed"===n)&&(f=i.offsetLeft,p=i.offsetTop)}return{width:a,height:s,x:f+h(e),y:p}}(e,o)):n(r)?function(e,t){var n=p(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(r,o):I(function(e){var t,n=d(e),r=u(e),o=null==(t=e.ownerDocument)?void 0:t.body,a=i(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=i(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),f=-r.scrollLeft+h(e),c=-r.scrollTop;return"rtl"===m(o||n).direction&&(f+=i(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:f,y:c}}(d(e)))}function F(e,t,o,s){var f="clippingParents"===t?function(e){var t=x(b(e)),o=["absolute","fixed"].indexOf(m(e).position)>=0&&r(e)?E(e):e;return n(o)?t.filter((function(e){return n(e)&&N(e,o)&&"body"!==l(e)})):[]}(e):[].concat(t),c=[].concat(f,[o]),p=c[0],u=c.reduce((function(t,n){var r=_(e,n,s);return t.top=i(r.top,t.top),t.right=a(r.right,t.right),t.bottom=a(r.bottom,t.bottom),t.left=i(r.left,t.left),t}),_(e,p,s));return u.width=u.right-u.left,u.height=u.bottom-u.top,u.x=u.left,u.y=u.top,u}function U(e){return e.split("-")[1]}function z(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function X(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?C(o):null,a=o?U(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case D:t={x:s,y:n.y-r.height};break;case A:t={x:s,y:n.y+n.height};break;case L:t={x:n.x+n.width,y:f};break;case P:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?z(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case W:t[c]=t[c]-(n[p]/2-r[p]/2);break;case B:t[c]=t[c]+(n[p]/2-r[p]/2)}}return t}function Y(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function G(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function J(e,t){void 0===t&&(t={});var r=t,o=r.placement,i=void 0===o?e.placement:o,a=r.strategy,s=void 0===a?e.strategy:a,f=r.boundary,c=void 0===f?"clippingParents":f,u=r.rootBoundary,l=void 0===u?H:u,h=r.elementContext,m=void 0===h?T:h,v=r.altBoundary,y=void 0!==v&&v,g=r.padding,b=void 0===g?0:g,w=Y("number"!=typeof b?b:G(b,k)),x=m===T?"reference":T,O=e.rects.popper,j=e.elements[y?x:m],E=F(n(j)?j:j.contextElement||d(e.elements.popper),c,l,s),P=p(e.elements.reference),M=X({reference:P,element:O,strategy:"absolute",placement:i}),W=I(Object.assign({},O,M)),B=m===T?W:P,R={top:E.top-B.top+w.top,bottom:B.bottom-E.bottom+w.bottom,left:E.left-B.left+w.left,right:B.right-E.right+w.right},S=e.modifiersData.offset;if(m===T&&S){var V=S[i];Object.keys(R).forEach((function(e){var t=[L,A].indexOf(e)>=0?1:-1,n=[D,A].indexOf(e)>=0?"y":"x";R[e]+=V[n]*t}))}return R}var K={placement:"bottom",modifiers:[],strategy:"absolute"};function Q(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function Z(e){void 0===e&&(e={});var t=e,r=t.defaultModifiers,o=void 0===r?[]:r,i=t.defaultOptions,a=void 0===i?K:i;return function(e,t,r){void 0===r&&(r=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},K,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],p=!1,u={state:f,setOptions:function(r){var i="function"==typeof r?r(f.options):r;l(),f.options=Object.assign({},a,f.options,i),f.scrollParents={reference:n(e)?x(e):e.contextElement?x(e.contextElement):[],popper:x(t)};var s,p,d=function(e){var t=q(e);return V.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(o,f.options.modifiers),p=s.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(p).map((function(e){return p[e]}))));return f.orderedModifiers=d.filter((function(e){return e.enabled})),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:u,options:r}),a=function(){};c.push(i||a)}})),u.update()},forceUpdate:function(){if(!p){var e=f.elements,t=e.reference,n=e.popper;if(Q(t,n)){f.rects={reference:y(t,E(n),"fixed"===f.options.strategy),popper:g(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<f.orderedModifiers.length;r++)if(!0!==f.reset){var o=f.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,c=o.name;"function"==typeof i&&(f=i({state:f,options:s,name:c,instance:u})||f)}else f.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(e){u.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(i())}))}))),s}),destroy:function(){l(),p=!0}};if(!Q(e,t))return u;function l(){c.forEach((function(e){return e()})),c=[]}return u.setOptions(r).then((function(e){!p&&r.onFirstUpdate&&r.onFirstUpdate(e)})),u}}var $={passive:!0};var ee={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var n=e.state,r=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,f=void 0===s||s,c=t(n.elements.popper),p=[].concat(n.scrollParents.reference,n.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",r.update,$)})),f&&c.addEventListener("resize",r.update,$),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",r.update,$)})),f&&c.removeEventListener("resize",r.update,$)}},data:{}};var te={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=X({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},ne={top:"auto",right:"auto",bottom:"auto",left:"auto"};function re(e){var n,r=e.popper,o=e.popperRect,i=e.placement,a=e.variation,f=e.offsets,c=e.position,p=e.gpuAcceleration,u=e.adaptive,l=e.roundOffsets,h=e.isFixed,v=f.x,y=void 0===v?0:v,g=f.y,b=void 0===g?0:g,w="function"==typeof l?l({x:y,y:b}):{x:y,y:b};y=w.x,b=w.y;var x=f.hasOwnProperty("x"),O=f.hasOwnProperty("y"),j=P,M=D,k=window;if(u){var W=E(r),H="clientHeight",T="clientWidth";if(W===t(r)&&"static"!==m(W=d(r)).position&&"absolute"===c&&(H="scrollHeight",T="scrollWidth"),W=W,i===D||(i===P||i===L)&&a===B)M=A,b-=(h&&W===k&&k.visualViewport?k.visualViewport.height:W[H])-o.height,b*=p?1:-1;if(i===P||(i===D||i===A)&&a===B)j=L,y-=(h&&W===k&&k.visualViewport?k.visualViewport.width:W[T])-o.width,y*=p?1:-1}var R,S=Object.assign({position:c},u&&ne),V=!0===l?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:s(t*r)/r||0,y:s(n*r)/r||0}}({x:y,y:b}):{x:y,y:b};return y=V.x,b=V.y,p?Object.assign({},S,((R={})[M]=O?"0":"",R[j]=x?"0":"",R.transform=(k.devicePixelRatio||1)<=1?"translate("+y+"px, "+b+"px)":"translate3d("+y+"px, "+b+"px, 0)",R)):Object.assign({},S,((n={})[M]=O?b+"px":"",n[j]=x?y+"px":"",n.transform="",n))}var oe={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:C(t.placement),variation:U(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,re(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,re(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}};var ie={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},i=t.elements[e];r(i)&&l(i)&&(Object.assign(i.style,n),Object.keys(o).forEach((function(e){var t=o[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],i=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});r(o)&&l(o)&&(Object.assign(o.style,a),Object.keys(i).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]};var ae={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=S.reduce((function(e,n){return e[n]=function(e,t,n){var r=C(e),o=[P,D].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[P,L].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},se={left:"right",right:"left",bottom:"top",top:"bottom"};function fe(e){return e.replace(/left|right|bottom|top/g,(function(e){return se[e]}))}var ce={start:"end",end:"start"};function pe(e){return e.replace(/start|end/g,(function(e){return ce[e]}))}function ue(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?S:f,p=U(r),u=p?s?R:R.filter((function(e){return U(e)===p})):k,l=u.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=u);var d=l.reduce((function(t,n){return t[n]=J(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[C(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}var le={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.flipVariations,h=void 0===d||d,m=n.allowedAutoPlacements,v=t.options.placement,y=C(v),g=f||(y===v||!h?[fe(v)]:function(e){if(C(e)===M)return[];var t=fe(e);return[pe(e),t,pe(t)]}(v)),b=[v].concat(g).reduce((function(e,n){return e.concat(C(n)===M?ue(t,{placement:n,boundary:p,rootBoundary:u,padding:c,flipVariations:h,allowedAutoPlacements:m}):n)}),[]),w=t.rects.reference,x=t.rects.popper,O=new Map,j=!0,E=b[0],k=0;k<b.length;k++){var B=b[k],H=C(B),T=U(B)===W,R=[D,A].indexOf(H)>=0,S=R?"width":"height",V=J(t,{placement:B,boundary:p,rootBoundary:u,altBoundary:l,padding:c}),q=R?T?L:P:T?A:D;w[S]>x[S]&&(q=fe(q));var N=fe(q),I=[];if(i&&I.push(V[H]<=0),s&&I.push(V[q]<=0,V[N]<=0),I.every((function(e){return e}))){E=B,j=!1;break}O.set(B,I)}if(j)for(var _=function(e){var t=b.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return E=t,"break"},F=h?3:1;F>0;F--){if("break"===_(F))break}t.placement!==E&&(t.modifiersData[r]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function de(e,t,n){return i(e,a(t,n))}var he={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=void 0===o||o,f=n.altAxis,c=void 0!==f&&f,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.padding,h=n.tether,m=void 0===h||h,v=n.tetherOffset,y=void 0===v?0:v,b=J(t,{boundary:p,rootBoundary:u,padding:d,altBoundary:l}),w=C(t.placement),x=U(t.placement),O=!x,j=z(w),M="x"===j?"y":"x",k=t.modifiersData.popperOffsets,B=t.rects.reference,H=t.rects.popper,T="function"==typeof y?y(Object.assign({},t.rects,{placement:t.placement})):y,R="number"==typeof T?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,V={x:0,y:0};if(k){if(s){var q,N="y"===j?D:P,I="y"===j?A:L,_="y"===j?"height":"width",F=k[j],X=F+b[N],Y=F-b[I],G=m?-H[_]/2:0,K=x===W?B[_]:H[_],Q=x===W?-H[_]:-B[_],Z=t.elements.arrow,$=m&&Z?g(Z):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[N],ne=ee[I],re=de(0,B[_],$[_]),oe=O?B[_]/2-G-re-te-R.mainAxis:K-re-te-R.mainAxis,ie=O?-B[_]/2+G+re+ne+R.mainAxis:Q+re+ne+R.mainAxis,ae=t.elements.arrow&&E(t.elements.arrow),se=ae?"y"===j?ae.clientTop||0:ae.clientLeft||0:0,fe=null!=(q=null==S?void 0:S[j])?q:0,ce=F+ie-fe,pe=de(m?a(X,F+oe-fe-se):X,F,m?i(Y,ce):Y);k[j]=pe,V[j]=pe-F}if(c){var ue,le="x"===j?D:P,he="x"===j?A:L,me=k[M],ve="y"===M?"height":"width",ye=me+b[le],ge=me-b[he],be=-1!==[D,P].indexOf(w),we=null!=(ue=null==S?void 0:S[M])?ue:0,xe=be?ye:me-B[ve]-H[ve]-we+R.altAxis,Oe=be?me+B[ve]+H[ve]-we-R.altAxis:ge,je=m&&be?function(e,t,n){var r=de(e,t,n);return r>n?n:r}(xe,me,Oe):de(m?xe:ye,me,m?Oe:ge);k[M]=je,V[M]=je-me}t.modifiersData[r]=V}},requiresIfExists:["offset"]};var me={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=C(n.placement),f=z(s),c=[P,L].indexOf(s)>=0?"height":"width";if(i&&a){var p=function(e,t){return Y("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:G(e,k))}(o.padding,n),u=g(i),l="y"===f?D:P,d="y"===f?A:L,h=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],m=a[f]-n.rects.reference[f],v=E(i),y=v?"y"===f?v.clientHeight||0:v.clientWidth||0:0,b=h/2-m/2,w=p[l],x=y-u[c]-p[d],O=y/2-u[c]/2+b,j=de(w,O,x),M=f;n.modifiersData[r]=((t={})[M]=j,t.centerOffset=j-O,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&N(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ve(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function ye(e){return[D,L,A,P].some((function(t){return e[t]>=0}))}var ge={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=J(t,{elementContext:"reference"}),s=J(t,{altBoundary:!0}),f=ve(a,r),c=ve(s,o,i),p=ye(f),u=ye(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":u})}},be=Z({defaultModifiers:[ee,te,oe,ie]}),we=[ee,te,oe,ie,ae,le,he,me,ge],xe=Z({defaultModifiers:we});e.applyStyles=ie,e.arrow=me,e.computeStyles=oe,e.createPopper=xe,e.createPopperLite=be,e.defaultModifiers=we,e.detectOverflow=J,e.eventListeners=ee,e.flip=le,e.hide=ge,e.offset=ae,e.popperGenerator=Z,e.popperOffsets=te,e.preventOverflow=he,Object.defineProperty(e,"__esModule",{value:!0})}));


/**!
* tippy.js v6.3.7
* (c) 2017-2021 atomiks
* MIT License
*/

(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?module.exports=factory(require('@popperjs/core')):typeof define==='function'&&define.amd?define(['@popperjs/core'],factory):(global=global||self,global.tippy=factory(global.Popper));}(this,(function(core){'use strict';var css=".tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#121620;box-shadow: 15px 15px 30px rgba(14, 12, 12, 0.1);color:#FEFEFE;border-radius:10px;font-size:13px;line-height:20px;padding:15px 20px;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-8px;left:0;border-width:9px 9px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-8px;left:0;border-width:0 9px 9px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:9px 0 9px 9px;border-left-color:initial;right:-8px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-8px;border-width:9px 9px 9px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:18px;height:18px;color:#121620}.tippy-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;z-index:1}";function injectCSS(css){var style=document.createElement('style');style.textContent=css;style.setAttribute('data-tippy-stylesheet','');var head=document.head;var firstStyleOrLinkTag=document.querySelector('head>style,head>link');if(firstStyleOrLinkTag){head.insertBefore(style,firstStyleOrLinkTag);}else{head.appendChild(style);}}
var isBrowser=typeof window!=='undefined'&&typeof document!=='undefined';var isIE11=isBrowser?!!window.msCrypto:false;var ROUND_ARROW='<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>';var BOX_CLASS="tippy-box";var CONTENT_CLASS="tippy-content";var BACKDROP_CLASS="tippy-backdrop";var ARROW_CLASS="tippy-arrow";var SVG_ARROW_CLASS="tippy-svg-arrow";var TOUCH_OPTIONS={passive:true,capture:true};var TIPPY_DEFAULT_APPEND_TO=function TIPPY_DEFAULT_APPEND_TO(){return document.body;};function hasOwnProperty(obj,key){return{}.hasOwnProperty.call(obj,key);}
function getValueAtIndexOrReturn(value,index,defaultValue){if(Array.isArray(value)){var v=value[index];return v==null?Array.isArray(defaultValue)?defaultValue[index]:defaultValue:v;}
return value;}
function isType(value,type){var str={}.toString.call(value);return str.indexOf('[object')===0&&str.indexOf(type+"]")>-1;}
function invokeWithArgsOrReturn(value,args){return typeof value==='function'?value.apply(void 0,args):value;}
function debounce(fn,ms){if(ms===0){return fn;}
var timeout;return function(arg){clearTimeout(timeout);timeout=setTimeout(function(){fn(arg);},ms);};}
function removeProperties(obj,keys){var clone=Object.assign({},obj);keys.forEach(function(key){delete clone[key];});return clone;}
function splitBySpaces(value){return value.split(/\s+/).filter(Boolean);}
function normalizeToArray(value){return[].concat(value);}
function pushIfUnique(arr,value){if(arr.indexOf(value)===-1){arr.push(value);}}
function unique(arr){return arr.filter(function(item,index){return arr.indexOf(item)===index;});}
function getBasePlacement(placement){return placement.split('-')[0];}
function arrayFrom(value){return[].slice.call(value);}
function removeUndefinedProps(obj){return Object.keys(obj).reduce(function(acc,key){if(obj[key]!==undefined){acc[key]=obj[key];}
return acc;},{});}
function div(){return document.createElement('div');}
function isElement(value){return['Element','Fragment'].some(function(type){return isType(value,type);});}
function isNodeList(value){return isType(value,'NodeList');}
function isMouseEvent(value){return isType(value,'MouseEvent');}
function isReferenceElement(value){return!!(value&&value._tippy&&value._tippy.reference===value);}
function getArrayOfElements(value){if(isElement(value)){return[value];}
if(isNodeList(value)){return arrayFrom(value);}
if(Array.isArray(value)){return value;}
return arrayFrom(document.querySelectorAll(value));}
function setTransitionDuration(els,value){els.forEach(function(el){if(el){el.style.transitionDuration=value+"ms";}});}
function setVisibilityState(els,state){els.forEach(function(el){if(el){el.setAttribute('data-state',state);}});}
function getOwnerDocument(elementOrElements){var _element$ownerDocumen;var _normalizeToArray=normalizeToArray(elementOrElements),element=_normalizeToArray[0];return element!=null&&(_element$ownerDocumen=element.ownerDocument)!=null&&_element$ownerDocumen.body?element.ownerDocument:document;}
function isCursorOutsideInteractiveBorder(popperTreeData,event){var clientX=event.clientX,clientY=event.clientY;return popperTreeData.every(function(_ref){var popperRect=_ref.popperRect,popperState=_ref.popperState,props=_ref.props;var interactiveBorder=props.interactiveBorder;var basePlacement=getBasePlacement(popperState.placement);var offsetData=popperState.modifiersData.offset;if(!offsetData){return true;}
var topDistance=basePlacement==='bottom'?offsetData.top.y:0;var bottomDistance=basePlacement==='top'?offsetData.bottom.y:0;var leftDistance=basePlacement==='right'?offsetData.left.x:0;var rightDistance=basePlacement==='left'?offsetData.right.x:0;var exceedsTop=popperRect.top-clientY+topDistance>interactiveBorder;var exceedsBottom=clientY-popperRect.bottom-bottomDistance>interactiveBorder;var exceedsLeft=popperRect.left-clientX+leftDistance>interactiveBorder;var exceedsRight=clientX-popperRect.right-rightDistance>interactiveBorder;return exceedsTop||exceedsBottom||exceedsLeft||exceedsRight;});}
function updateTransitionEndListener(box,action,listener){var method=action+"EventListener";['transitionend','webkitTransitionEnd'].forEach(function(event){box[method](event,listener);});}
function actualContains(parent,child){var target=child;while(target){var _target$getRootNode;if(parent.contains(target)){return true;}
target=target.getRootNode==null?void 0:(_target$getRootNode=target.getRootNode())==null?void 0:_target$getRootNode.host;}
return false;}
var currentInput={isTouch:false};var lastMouseMoveTime=0;function onDocumentTouchStart(){if(currentInput.isTouch){return;}
currentInput.isTouch=true;if(window.performance){document.addEventListener('mousemove',onDocumentMouseMove);}}
function onDocumentMouseMove(){var now=performance.now();if(now-lastMouseMoveTime<20){currentInput.isTouch=false;document.removeEventListener('mousemove',onDocumentMouseMove);}
lastMouseMoveTime=now;}
function onWindowBlur(){var activeElement=document.activeElement;if(isReferenceElement(activeElement)){var instance=activeElement._tippy;if(activeElement.blur&&!instance.state.isVisible){activeElement.blur();}}}
function bindGlobalEventListeners(){document.addEventListener('touchstart',onDocumentTouchStart,TOUCH_OPTIONS);window.addEventListener('blur',onWindowBlur);}
function createMemoryLeakWarning(method){var txt=method==='destroy'?'n already-':' ';return[method+"() was called on a"+txt+"destroyed instance. This is a no-op but",'indicates a potential memory leak.'].join(' ');}
function clean(value){var spacesAndTabs=/[ \t]{2,}/g;var lineStartWithSpaces=/^[ \t]*/gm;return value.replace(spacesAndTabs,' ').replace(lineStartWithSpaces,'').trim();}
function getDevMessage(message){return clean("\n  %ctippy.js\n\n  %c"+clean(message)+"\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");}
function getFormattedMessage(message){return[getDevMessage(message),'color: #00C584; font-size: 1.3em; font-weight: bold;','line-height: 1.5','color: #a6a095;'];}
var visitedMessages;{resetVisitedMessages();}
function resetVisitedMessages(){visitedMessages=new Set();}
function warnWhen(condition,message){if(condition&&!visitedMessages.has(message)){var _console;visitedMessages.add(message);(_console=console).warn.apply(_console,getFormattedMessage(message));}}
function errorWhen(condition,message){if(condition&&!visitedMessages.has(message)){var _console2;visitedMessages.add(message);(_console2=console).error.apply(_console2,getFormattedMessage(message));}}
function validateTargets(targets){var didPassFalsyValue=!targets;var didPassPlainObject=Object.prototype.toString.call(targets)==='[object Object]'&&!targets.addEventListener;errorWhen(didPassFalsyValue,['tippy() was passed','`'+String(targets)+'`','as its targets (first) argument. Valid types are: String, Element,','Element[], or NodeList.'].join(' '));errorWhen(didPassPlainObject,['tippy() was passed a plain object which is not supported as an argument','for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));}
var pluginProps={animateFill:false,followCursor:false,inlinePositioning:false,sticky:false};var renderProps={allowHTML:false,animation:'fade',arrow:true,content:'',inertia:false,maxWidth:350,role:'tooltip',theme:'',zIndex:9999};var defaultProps=Object.assign({appendTo:TIPPY_DEFAULT_APPEND_TO,aria:{content:'auto',expanded:'auto'},delay:0,duration:[300,250],getReferenceClientRect:null,hideOnClick:true,ignoreAttributes:false,interactive:false,interactiveBorder:2,interactiveDebounce:0,moveTransition:'',offset:[0,10],onAfterUpdate:function onAfterUpdate(){},onBeforeUpdate:function onBeforeUpdate(){},onCreate:function onCreate(){},onDestroy:function onDestroy(){},onHidden:function onHidden(){},onHide:function onHide(){},onMount:function onMount(){},onShow:function onShow(){},onShown:function onShown(){},onTrigger:function onTrigger(){},onUntrigger:function onUntrigger(){},onClickOutside:function onClickOutside(){},placement:'top',plugins:[],popperOptions:{},render:null,showOnCreate:false,touch:true,trigger:'mouseenter focus',triggerTarget:null},pluginProps,renderProps);var defaultKeys=Object.keys(defaultProps);var setDefaultProps=function setDefaultProps(partialProps){{validateProps(partialProps,[]);}
var keys=Object.keys(partialProps);keys.forEach(function(key){defaultProps[key]=partialProps[key];});};function getExtendedPassedProps(passedProps){var plugins=passedProps.plugins||[];var pluginProps=plugins.reduce(function(acc,plugin){var name=plugin.name,defaultValue=plugin.defaultValue;if(name){var _name;acc[name]=passedProps[name]!==undefined?passedProps[name]:(_name=defaultProps[name])!=null?_name:defaultValue;}
return acc;},{});return Object.assign({},passedProps,pluginProps);}
function getDataAttributeProps(reference,plugins){var propKeys=plugins?Object.keys(getExtendedPassedProps(Object.assign({},defaultProps,{plugins:plugins}))):defaultKeys;var props=propKeys.reduce(function(acc,key){var valueAsString=(reference.getAttribute("data-tippy-"+key)||'').trim();if(!valueAsString){return acc;}
if(key==='content'){acc[key]=valueAsString;}else{try{acc[key]=JSON.parse(valueAsString);}catch(e){acc[key]=valueAsString;}}
return acc;},{});return props;}
function evaluateProps(reference,props){var out=Object.assign({},props,{content:invokeWithArgsOrReturn(props.content,[reference])},props.ignoreAttributes?{}:getDataAttributeProps(reference,props.plugins));out.aria=Object.assign({},defaultProps.aria,out.aria);out.aria={expanded:out.aria.expanded==='auto'?props.interactive:out.aria.expanded,content:out.aria.content==='auto'?props.interactive?null:'describedby':out.aria.content};return out;}
function validateProps(partialProps,plugins){if(partialProps===void 0){partialProps={};}
if(plugins===void 0){plugins=[];}
var keys=Object.keys(partialProps);keys.forEach(function(prop){var nonPluginProps=removeProperties(defaultProps,Object.keys(pluginProps));var didPassUnknownProp=!hasOwnProperty(nonPluginProps,prop);if(didPassUnknownProp){didPassUnknownProp=plugins.filter(function(plugin){return plugin.name===prop;}).length===0;}
warnWhen(didPassUnknownProp,["`"+prop+"`","is not a valid prop. You may have spelled it incorrectly, or if it's",'a plugin, forgot to pass it in an array as props.plugins.','\n\n','All props: https://atomiks.github.io/tippyjs/v6/all-props/\n','Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));});}
var innerHTML=function innerHTML(){return'innerHTML';};function dangerouslySetInnerHTML(element,html){element[innerHTML()]=html;}
function createArrowElement(value){var arrow=div();if(value===true){arrow.className=ARROW_CLASS;}else{arrow.className=SVG_ARROW_CLASS;if(isElement(value)){arrow.appendChild(value);}else{dangerouslySetInnerHTML(arrow,value);}}
return arrow;}
function setContent(content,props){if(isElement(props.content)){dangerouslySetInnerHTML(content,'');content.appendChild(props.content);}else if(typeof props.content!=='function'){if(props.allowHTML){dangerouslySetInnerHTML(content,props.content);}else{content.textContent=props.content;}}}
function getChildren(popper){var box=popper.firstElementChild;var boxChildren=arrayFrom(box.children);return{box:box,content:boxChildren.find(function(node){return node.classList.contains(CONTENT_CLASS);}),arrow:boxChildren.find(function(node){return node.classList.contains(ARROW_CLASS)||node.classList.contains(SVG_ARROW_CLASS);}),backdrop:boxChildren.find(function(node){return node.classList.contains(BACKDROP_CLASS);})};}
function render(instance){var popper=div();var box=div();box.className=BOX_CLASS;box.setAttribute('data-state','hidden');box.setAttribute('tabindex','-1');var content=div();content.className=CONTENT_CLASS;content.setAttribute('data-state','hidden');setContent(content,instance.props);popper.appendChild(box);box.appendChild(content);onUpdate(instance.props,instance.props);function onUpdate(prevProps,nextProps){var _getChildren=getChildren(popper),box=_getChildren.box,content=_getChildren.content,arrow=_getChildren.arrow;if(nextProps.theme){box.setAttribute('data-theme',nextProps.theme);}else{box.removeAttribute('data-theme');}
if(typeof nextProps.animation==='string'){box.setAttribute('data-animation',nextProps.animation);}else{box.removeAttribute('data-animation');}
if(nextProps.inertia){box.setAttribute('data-inertia','');}else{box.removeAttribute('data-inertia');}
box.style.maxWidth=typeof nextProps.maxWidth==='number'?nextProps.maxWidth+"px":nextProps.maxWidth;if(nextProps.role){box.setAttribute('role',nextProps.role);}else{box.removeAttribute('role');}
if(prevProps.content!==nextProps.content||prevProps.allowHTML!==nextProps.allowHTML){setContent(content,instance.props);}
if(nextProps.arrow){if(!arrow){box.appendChild(createArrowElement(nextProps.arrow));}else if(prevProps.arrow!==nextProps.arrow){box.removeChild(arrow);box.appendChild(createArrowElement(nextProps.arrow));}}else if(arrow){box.removeChild(arrow);}}
return{popper:popper,onUpdate:onUpdate};}
render.$$tippy=true;var idCounter=1;var mouseMoveListeners=[];var mountedInstances=[];function createTippy(reference,passedProps){var props=evaluateProps(reference,Object.assign({},defaultProps,getExtendedPassedProps(removeUndefinedProps(passedProps))));var showTimeout;var hideTimeout;var scheduleHideAnimationFrame;var isVisibleFromClick=false;var didHideDueToDocumentMouseDown=false;var didTouchMove=false;var ignoreOnFirstUpdate=false;var lastTriggerEvent;var currentTransitionEndListener;var onFirstUpdate;var listeners=[];var debouncedOnMouseMove=debounce(onMouseMove,props.interactiveDebounce);var currentTarget;var id=idCounter++;var popperInstance=null;var plugins=unique(props.plugins);var state={isEnabled:true,isVisible:false,isDestroyed:false,isMounted:false,isShown:false};var instance={id:id,reference:reference,popper:div(),popperInstance:popperInstance,props:props,state:state,plugins:plugins,clearDelayTimeouts:clearDelayTimeouts,setProps:setProps,setContent:setContent,show:show,hide:hide,hideWithInteractivity:hideWithInteractivity,enable:enable,disable:disable,unmount:unmount,destroy:destroy};if(!props.render){{errorWhen(true,'render() function has not been supplied.');}
return instance;}
var _props$render=props.render(instance),popper=_props$render.popper,onUpdate=_props$render.onUpdate;popper.setAttribute('data-tippy-root','');popper.id="tippy-"+instance.id;instance.popper=popper;reference._tippy=instance;popper._tippy=instance;var pluginsHooks=plugins.map(function(plugin){return plugin.fn(instance);});var hasAriaExpanded=reference.hasAttribute('aria-expanded');addListeners();handleAriaExpandedAttribute();handleStyles();invokeHook('onCreate',[instance]);if(props.showOnCreate){scheduleShow();}
popper.addEventListener('mouseenter',function(){if(instance.props.interactive&&instance.state.isVisible){instance.clearDelayTimeouts();}});popper.addEventListener('mouseleave',function(){if(instance.props.interactive&&instance.props.trigger.indexOf('mouseenter')>=0){getDocument().addEventListener('mousemove',debouncedOnMouseMove);}});return instance;function getNormalizedTouchSettings(){var touch=instance.props.touch;return Array.isArray(touch)?touch:[touch,0];}
function getIsCustomTouchBehavior(){return getNormalizedTouchSettings()[0]==='hold';}
function getIsDefaultRenderFn(){var _instance$props$rende;return!!((_instance$props$rende=instance.props.render)!=null&&_instance$props$rende.$$tippy);}
function getCurrentTarget(){return currentTarget||reference;}
function getDocument(){var parent=getCurrentTarget().parentNode;return parent?getOwnerDocument(parent):document;}
function getDefaultTemplateChildren(){return getChildren(popper);}
function getDelay(isShow){if(instance.state.isMounted&&!instance.state.isVisible||currentInput.isTouch||lastTriggerEvent&&lastTriggerEvent.type==='focus'){return 0;}
return getValueAtIndexOrReturn(instance.props.delay,isShow?0:1,defaultProps.delay);}
function handleStyles(fromHide){if(fromHide===void 0){fromHide=false;}
popper.style.pointerEvents=instance.props.interactive&&!fromHide?'':'none';popper.style.zIndex=""+instance.props.zIndex;}
function invokeHook(hook,args,shouldInvokePropsHook){if(shouldInvokePropsHook===void 0){shouldInvokePropsHook=true;}
pluginsHooks.forEach(function(pluginHooks){if(pluginHooks[hook]){pluginHooks[hook].apply(pluginHooks,args);}});if(shouldInvokePropsHook){var _instance$props;(_instance$props=instance.props)[hook].apply(_instance$props,args);}}
function handleAriaContentAttribute(){var aria=instance.props.aria;if(!aria.content){return;}
var attr="aria-"+aria.content;var id=popper.id;var nodes=normalizeToArray(instance.props.triggerTarget||reference);nodes.forEach(function(node){var currentValue=node.getAttribute(attr);if(instance.state.isVisible){node.setAttribute(attr,currentValue?currentValue+" "+id:id);}else{var nextValue=currentValue&&currentValue.replace(id,'').trim();if(nextValue){node.setAttribute(attr,nextValue);}else{node.removeAttribute(attr);}}});}
function handleAriaExpandedAttribute(){if(hasAriaExpanded||!instance.props.aria.expanded){return;}
var nodes=normalizeToArray(instance.props.triggerTarget||reference);nodes.forEach(function(node){if(instance.props.interactive){node.setAttribute('aria-expanded',instance.state.isVisible&&node===getCurrentTarget()?'true':'false');}else{node.removeAttribute('aria-expanded');}});}
function cleanupInteractiveMouseListeners(){getDocument().removeEventListener('mousemove',debouncedOnMouseMove);mouseMoveListeners=mouseMoveListeners.filter(function(listener){return listener!==debouncedOnMouseMove;});}
function onDocumentPress(event){if(currentInput.isTouch){if(didTouchMove||event.type==='mousedown'){return;}}
var actualTarget=event.composedPath&&event.composedPath()[0]||event.target;if(instance.props.interactive&&actualContains(popper,actualTarget)){return;}
if(normalizeToArray(instance.props.triggerTarget||reference).some(function(el){return actualContains(el,actualTarget);})){if(currentInput.isTouch){return;}
if(instance.state.isVisible&&instance.props.trigger.indexOf('click')>=0){return;}}else{invokeHook('onClickOutside',[instance,event]);}
if(instance.props.hideOnClick===true){instance.clearDelayTimeouts();instance.hide();didHideDueToDocumentMouseDown=true;setTimeout(function(){didHideDueToDocumentMouseDown=false;});if(!instance.state.isMounted){removeDocumentPress();}}}
function onTouchMove(){didTouchMove=true;}
function onTouchStart(){didTouchMove=false;}
function addDocumentPress(){var doc=getDocument();doc.addEventListener('mousedown',onDocumentPress,true);doc.addEventListener('touchend',onDocumentPress,TOUCH_OPTIONS);doc.addEventListener('touchstart',onTouchStart,TOUCH_OPTIONS);doc.addEventListener('touchmove',onTouchMove,TOUCH_OPTIONS);}
function removeDocumentPress(){var doc=getDocument();doc.removeEventListener('mousedown',onDocumentPress,true);doc.removeEventListener('touchend',onDocumentPress,TOUCH_OPTIONS);doc.removeEventListener('touchstart',onTouchStart,TOUCH_OPTIONS);doc.removeEventListener('touchmove',onTouchMove,TOUCH_OPTIONS);}
function onTransitionedOut(duration,callback){onTransitionEnd(duration,function(){if(!instance.state.isVisible&&popper.parentNode&&popper.parentNode.contains(popper)){callback();}});}
function onTransitionedIn(duration,callback){onTransitionEnd(duration,callback);}
function onTransitionEnd(duration,callback){var box=getDefaultTemplateChildren().box;function listener(event){if(event.target===box){updateTransitionEndListener(box,'remove',listener);callback();}}
if(duration===0){return callback();}
updateTransitionEndListener(box,'remove',currentTransitionEndListener);updateTransitionEndListener(box,'add',listener);currentTransitionEndListener=listener;}
function on(eventType,handler,options){if(options===void 0){options=false;}
var nodes=normalizeToArray(instance.props.triggerTarget||reference);nodes.forEach(function(node){node.addEventListener(eventType,handler,options);listeners.push({node:node,eventType:eventType,handler:handler,options:options});});}
function addListeners(){if(getIsCustomTouchBehavior()){on('touchstart',onTrigger,{passive:true});on('touchend',onMouseLeave,{passive:true});}
splitBySpaces(instance.props.trigger).forEach(function(eventType){if(eventType==='manual'){return;}
on(eventType,onTrigger);switch(eventType){case'mouseenter':on('mouseleave',onMouseLeave);break;case'focus':on(isIE11?'focusout':'blur',onBlurOrFocusOut);break;case'focusin':on('focusout',onBlurOrFocusOut);break;}});}
function removeListeners(){listeners.forEach(function(_ref){var node=_ref.node,eventType=_ref.eventType,handler=_ref.handler,options=_ref.options;node.removeEventListener(eventType,handler,options);});listeners=[];}
function onTrigger(event){var _lastTriggerEvent;var shouldScheduleClickHide=false;if(!instance.state.isEnabled||isEventListenerStopped(event)||didHideDueToDocumentMouseDown){return;}
var wasFocused=((_lastTriggerEvent=lastTriggerEvent)==null?void 0:_lastTriggerEvent.type)==='focus';lastTriggerEvent=event;currentTarget=event.currentTarget;handleAriaExpandedAttribute();if(!instance.state.isVisible&&isMouseEvent(event)){mouseMoveListeners.forEach(function(listener){return listener(event);});}
if(event.type==='click'&&(instance.props.trigger.indexOf('mouseenter')<0||isVisibleFromClick)&&instance.props.hideOnClick!==false&&instance.state.isVisible){shouldScheduleClickHide=true;}else{scheduleShow(event);}
if(event.type==='click'){isVisibleFromClick=!shouldScheduleClickHide;}
if(shouldScheduleClickHide&&!wasFocused){scheduleHide(event);}}
function onMouseMove(event){var target=event.target;var isCursorOverReferenceOrPopper=getCurrentTarget().contains(target)||popper.contains(target);if(event.type==='mousemove'&&isCursorOverReferenceOrPopper){return;}
var popperTreeData=getNestedPopperTree().concat(popper).map(function(popper){var _instance$popperInsta;var instance=popper._tippy;var state=(_instance$popperInsta=instance.popperInstance)==null?void 0:_instance$popperInsta.state;if(state){return{popperRect:popper.getBoundingClientRect(),popperState:state,props:props};}
return null;}).filter(Boolean);if(isCursorOutsideInteractiveBorder(popperTreeData,event)){cleanupInteractiveMouseListeners();scheduleHide(event);}}
function onMouseLeave(event){var shouldBail=isEventListenerStopped(event)||instance.props.trigger.indexOf('click')>=0&&isVisibleFromClick;if(shouldBail){return;}
if(instance.props.interactive){instance.hideWithInteractivity(event);return;}
scheduleHide(event);}
function onBlurOrFocusOut(event){if(instance.props.trigger.indexOf('focusin')<0&&event.target!==getCurrentTarget()){return;}
if(instance.props.interactive&&event.relatedTarget&&popper.contains(event.relatedTarget)){return;}
scheduleHide(event);}
function isEventListenerStopped(event){return currentInput.isTouch?getIsCustomTouchBehavior()!==event.type.indexOf('touch')>=0:false;}
function createPopperInstance(){destroyPopperInstance();var _instance$props2=instance.props,popperOptions=_instance$props2.popperOptions,placement=_instance$props2.placement,offset=_instance$props2.offset,getReferenceClientRect=_instance$props2.getReferenceClientRect,moveTransition=_instance$props2.moveTransition;var arrow=getIsDefaultRenderFn()?getChildren(popper).arrow:null;var computedReference=getReferenceClientRect?{getBoundingClientRect:getReferenceClientRect,contextElement:getReferenceClientRect.contextElement||getCurrentTarget()}:reference;var tippyModifier={name:'$$tippy',enabled:true,phase:'beforeWrite',requires:['computeStyles'],fn:function fn(_ref2){var state=_ref2.state;if(getIsDefaultRenderFn()){var _getDefaultTemplateCh=getDefaultTemplateChildren(),box=_getDefaultTemplateCh.box;['placement','reference-hidden','escaped'].forEach(function(attr){if(attr==='placement'){box.setAttribute('data-placement',state.placement);}else{if(state.attributes.popper["data-popper-"+attr]){box.setAttribute("data-"+attr,'');}else{box.removeAttribute("data-"+attr);}}});state.attributes.popper={};}}};var modifiers=[{name:'offset',options:{offset:offset}},{name:'preventOverflow',options:{padding:{top:2,bottom:2,left:5,right:5}}},{name:'flip',options:{padding:5}},{name:'computeStyles',options:{adaptive:!moveTransition}},tippyModifier];if(getIsDefaultRenderFn()&&arrow){modifiers.push({name:'arrow',options:{element:arrow,padding:3}});}
modifiers.push.apply(modifiers,(popperOptions==null?void 0:popperOptions.modifiers)||[]);instance.popperInstance=core.createPopper(computedReference,popper,Object.assign({},popperOptions,{placement:placement,onFirstUpdate:onFirstUpdate,modifiers:modifiers}));}
function destroyPopperInstance(){if(instance.popperInstance){instance.popperInstance.destroy();instance.popperInstance=null;}}
function mount(){var appendTo=instance.props.appendTo;var parentNode;var node=getCurrentTarget();if(instance.props.interactive&&appendTo===TIPPY_DEFAULT_APPEND_TO||appendTo==='parent'){parentNode=node.parentNode;}else{parentNode=invokeWithArgsOrReturn(appendTo,[node]);}
if(!parentNode.contains(popper)){parentNode.appendChild(popper);}
instance.state.isMounted=true;createPopperInstance();{warnWhen(instance.props.interactive&&appendTo===defaultProps.appendTo&&node.nextElementSibling!==popper,['Interactive tippy element may not be accessible via keyboard','navigation because it is not directly after the reference element','in the DOM source order.','\n\n','Using a wrapper <div> or <span> tag around the reference element','solves this by creating a new parentNode context.','\n\n','Specifying `appendTo: document.body` silences this warning, but it','assumes you are using a focus management solution to handle','keyboard navigation.','\n\n','See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'].join(' '));}}
function getNestedPopperTree(){return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));}
function scheduleShow(event){instance.clearDelayTimeouts();if(event){invokeHook('onTrigger',[instance,event]);}
addDocumentPress();var delay=getDelay(true);var _getNormalizedTouchSe=getNormalizedTouchSettings(),touchValue=_getNormalizedTouchSe[0],touchDelay=_getNormalizedTouchSe[1];if(currentInput.isTouch&&touchValue==='hold'&&touchDelay){delay=touchDelay;}
if(delay){showTimeout=setTimeout(function(){instance.show();},delay);}else{instance.show();}}
function scheduleHide(event){instance.clearDelayTimeouts();invokeHook('onUntrigger',[instance,event]);if(!instance.state.isVisible){removeDocumentPress();return;}
if(instance.props.trigger.indexOf('mouseenter')>=0&&instance.props.trigger.indexOf('click')>=0&&['mouseleave','mousemove'].indexOf(event.type)>=0&&isVisibleFromClick){return;}
var delay=getDelay(false);if(delay){hideTimeout=setTimeout(function(){if(instance.state.isVisible){instance.hide();}},delay);}else{scheduleHideAnimationFrame=requestAnimationFrame(function(){instance.hide();});}}
function enable(){instance.state.isEnabled=true;}
function disable(){instance.hide();instance.state.isEnabled=false;}
function clearDelayTimeouts(){clearTimeout(showTimeout);clearTimeout(hideTimeout);cancelAnimationFrame(scheduleHideAnimationFrame);}
function setProps(partialProps){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('setProps'));}
if(instance.state.isDestroyed){return;}
invokeHook('onBeforeUpdate',[instance,partialProps]);removeListeners();var prevProps=instance.props;var nextProps=evaluateProps(reference,Object.assign({},prevProps,removeUndefinedProps(partialProps),{ignoreAttributes:true}));instance.props=nextProps;addListeners();if(prevProps.interactiveDebounce!==nextProps.interactiveDebounce){cleanupInteractiveMouseListeners();debouncedOnMouseMove=debounce(onMouseMove,nextProps.interactiveDebounce);}
if(prevProps.triggerTarget&&!nextProps.triggerTarget){normalizeToArray(prevProps.triggerTarget).forEach(function(node){node.removeAttribute('aria-expanded');});}else if(nextProps.triggerTarget){reference.removeAttribute('aria-expanded');}
handleAriaExpandedAttribute();handleStyles();if(onUpdate){onUpdate(prevProps,nextProps);}
if(instance.popperInstance){createPopperInstance();getNestedPopperTree().forEach(function(nestedPopper){requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);});}
invokeHook('onAfterUpdate',[instance,partialProps]);}
function setContent(content){instance.setProps({content:content});}
function show(){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('show'));}
var isAlreadyVisible=instance.state.isVisible;var isDestroyed=instance.state.isDestroyed;var isDisabled=!instance.state.isEnabled;var isTouchAndTouchDisabled=currentInput.isTouch&&!instance.props.touch;var duration=getValueAtIndexOrReturn(instance.props.duration,0,defaultProps.duration);if(isAlreadyVisible||isDestroyed||isDisabled||isTouchAndTouchDisabled){return;}
if(getCurrentTarget().hasAttribute('disabled')){return;}
invokeHook('onShow',[instance],false);if(instance.props.onShow(instance)===false){return;}
instance.state.isVisible=true;if(getIsDefaultRenderFn()){popper.style.visibility='visible';}
handleStyles();addDocumentPress();if(!instance.state.isMounted){popper.style.transition='none';}
if(getIsDefaultRenderFn()){var _getDefaultTemplateCh2=getDefaultTemplateChildren(),box=_getDefaultTemplateCh2.box,content=_getDefaultTemplateCh2.content;setTransitionDuration([box,content],0);}
onFirstUpdate=function onFirstUpdate(){var _instance$popperInsta2;if(!instance.state.isVisible||ignoreOnFirstUpdate){return;}
ignoreOnFirstUpdate=true;void popper.offsetHeight;popper.style.transition=instance.props.moveTransition;if(getIsDefaultRenderFn()&&instance.props.animation){var _getDefaultTemplateCh3=getDefaultTemplateChildren(),_box=_getDefaultTemplateCh3.box,_content=_getDefaultTemplateCh3.content;setTransitionDuration([_box,_content],duration);setVisibilityState([_box,_content],'visible');}
handleAriaContentAttribute();handleAriaExpandedAttribute();pushIfUnique(mountedInstances,instance);(_instance$popperInsta2=instance.popperInstance)==null?void 0:_instance$popperInsta2.forceUpdate();invokeHook('onMount',[instance]);if(instance.props.animation&&getIsDefaultRenderFn()){onTransitionedIn(duration,function(){instance.state.isShown=true;invokeHook('onShown',[instance]);});}};mount();}
function hide(){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('hide'));}
var isAlreadyHidden=!instance.state.isVisible;var isDestroyed=instance.state.isDestroyed;var isDisabled=!instance.state.isEnabled;var duration=getValueAtIndexOrReturn(instance.props.duration,1,defaultProps.duration);if(isAlreadyHidden||isDestroyed||isDisabled){return;}
invokeHook('onHide',[instance],false);if(instance.props.onHide(instance)===false){return;}
instance.state.isVisible=false;instance.state.isShown=false;ignoreOnFirstUpdate=false;isVisibleFromClick=false;if(getIsDefaultRenderFn()){popper.style.visibility='hidden';}
cleanupInteractiveMouseListeners();removeDocumentPress();handleStyles(true);if(getIsDefaultRenderFn()){var _getDefaultTemplateCh4=getDefaultTemplateChildren(),box=_getDefaultTemplateCh4.box,content=_getDefaultTemplateCh4.content;if(instance.props.animation){setTransitionDuration([box,content],duration);setVisibilityState([box,content],'hidden');}}
handleAriaContentAttribute();handleAriaExpandedAttribute();if(instance.props.animation){if(getIsDefaultRenderFn()){onTransitionedOut(duration,instance.unmount);}}else{instance.unmount();}}
function hideWithInteractivity(event){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('hideWithInteractivity'));}
getDocument().addEventListener('mousemove',debouncedOnMouseMove);pushIfUnique(mouseMoveListeners,debouncedOnMouseMove);debouncedOnMouseMove(event);}
function unmount(){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('unmount'));}
if(instance.state.isVisible){instance.hide();}
if(!instance.state.isMounted){return;}
destroyPopperInstance();getNestedPopperTree().forEach(function(nestedPopper){nestedPopper._tippy.unmount();});if(popper.parentNode){popper.parentNode.removeChild(popper);}
mountedInstances=mountedInstances.filter(function(i){return i!==instance;});instance.state.isMounted=false;invokeHook('onHidden',[instance]);}
function destroy(){{warnWhen(instance.state.isDestroyed,createMemoryLeakWarning('destroy'));}
if(instance.state.isDestroyed){return;}
instance.clearDelayTimeouts();instance.unmount();removeListeners();delete reference._tippy;instance.state.isDestroyed=true;invokeHook('onDestroy',[instance]);}}
function tippy(targets,optionalProps){if(optionalProps===void 0){optionalProps={};}
var plugins=defaultProps.plugins.concat(optionalProps.plugins||[]);{validateTargets(targets);validateProps(optionalProps,plugins);}
bindGlobalEventListeners();var passedProps=Object.assign({},optionalProps,{plugins:plugins});var elements=getArrayOfElements(targets);{var isSingleContentElement=isElement(passedProps.content);var isMoreThanOneReferenceElement=elements.length>1;warnWhen(isSingleContentElement&&isMoreThanOneReferenceElement,['tippy() was passed an Element as the `content` prop, but more than','one tippy instance was created by this invocation. This means the','content element will only be appended to the last tippy instance.','\n\n','Instead, pass the .innerHTML of the element, or use a function that','returns a cloned version of the element instead.','\n\n','1) content: element.innerHTML\n','2) content: () => element.cloneNode(true)'].join(' '));}
var instances=elements.reduce(function(acc,reference){var instance=reference&&createTippy(reference,passedProps);if(instance){acc.push(instance);}
return acc;},[]);return isElement(targets)?instances[0]:instances;}
tippy.defaultProps=defaultProps;tippy.setDefaultProps=setDefaultProps;tippy.currentInput=currentInput;var hideAll=function hideAll(_temp){var _ref=_temp===void 0?{}:_temp,excludedReferenceOrInstance=_ref.exclude,duration=_ref.duration;mountedInstances.forEach(function(instance){var isExcluded=false;if(excludedReferenceOrInstance){isExcluded=isReferenceElement(excludedReferenceOrInstance)?instance.reference===excludedReferenceOrInstance:instance.popper===excludedReferenceOrInstance.popper;}
if(!isExcluded){var originalDuration=instance.props.duration;instance.setProps({duration:duration});instance.hide();if(!instance.state.isDestroyed){instance.setProps({duration:originalDuration});}}});};var applyStylesModifier=Object.assign({},core.applyStyles,{effect:function effect(_ref){var state=_ref.state;var initialStyles={popper:{position:state.options.strategy,left:'0',top:'0',margin:'0'},arrow:{position:'absolute'},reference:{}};Object.assign(state.elements.popper.style,initialStyles.popper);state.styles=initialStyles;if(state.elements.arrow){Object.assign(state.elements.arrow.style,initialStyles.arrow);}}});var createSingleton=function createSingleton(tippyInstances,optionalProps){var _optionalProps$popper;if(optionalProps===void 0){optionalProps={};}
{errorWhen(!Array.isArray(tippyInstances),['The first argument passed to createSingleton() must be an array of','tippy instances. The passed value was',String(tippyInstances)].join(' '));}
var individualInstances=tippyInstances;var references=[];var triggerTargets=[];var currentTarget;var overrides=optionalProps.overrides;var interceptSetPropsCleanups=[];var shownOnCreate=false;function setTriggerTargets(){triggerTargets=individualInstances.map(function(instance){return normalizeToArray(instance.props.triggerTarget||instance.reference);}).reduce(function(acc,item){return acc.concat(item);},[]);}
function setReferences(){references=individualInstances.map(function(instance){return instance.reference;});}
function enableInstances(isEnabled){individualInstances.forEach(function(instance){if(isEnabled){instance.enable();}else{instance.disable();}});}
function interceptSetProps(singleton){return individualInstances.map(function(instance){var originalSetProps=instance.setProps;instance.setProps=function(props){originalSetProps(props);if(instance.reference===currentTarget){singleton.setProps(props);}};return function(){instance.setProps=originalSetProps;};});}
function prepareInstance(singleton,target){var index=triggerTargets.indexOf(target);if(target===currentTarget){return;}
currentTarget=target;var overrideProps=(overrides||[]).concat('content').reduce(function(acc,prop){acc[prop]=individualInstances[index].props[prop];return acc;},{});singleton.setProps(Object.assign({},overrideProps,{getReferenceClientRect:typeof overrideProps.getReferenceClientRect==='function'?overrideProps.getReferenceClientRect:function(){var _references$index;return(_references$index=references[index])==null?void 0:_references$index.getBoundingClientRect();}}));}
enableInstances(false);setReferences();setTriggerTargets();var plugin={fn:function fn(){return{onDestroy:function onDestroy(){enableInstances(true);},onHidden:function onHidden(){currentTarget=null;},onClickOutside:function onClickOutside(instance){if(instance.props.showOnCreate&&!shownOnCreate){shownOnCreate=true;currentTarget=null;}},onShow:function onShow(instance){if(instance.props.showOnCreate&&!shownOnCreate){shownOnCreate=true;prepareInstance(instance,references[0]);}},onTrigger:function onTrigger(instance,event){prepareInstance(instance,event.currentTarget);}};}};var singleton=tippy(div(),Object.assign({},removeProperties(optionalProps,['overrides']),{plugins:[plugin].concat(optionalProps.plugins||[]),triggerTarget:triggerTargets,popperOptions:Object.assign({},optionalProps.popperOptions,{modifiers:[].concat(((_optionalProps$popper=optionalProps.popperOptions)==null?void 0:_optionalProps$popper.modifiers)||[],[applyStylesModifier])})}));var originalShow=singleton.show;singleton.show=function(target){originalShow();if(!currentTarget&&target==null){return prepareInstance(singleton,references[0]);}
if(currentTarget&&target==null){return;}
if(typeof target==='number'){return references[target]&&prepareInstance(singleton,references[target]);}
if(individualInstances.indexOf(target)>=0){var ref=target.reference;return prepareInstance(singleton,ref);}
if(references.indexOf(target)>=0){return prepareInstance(singleton,target);}};singleton.showNext=function(){var first=references[0];if(!currentTarget){return singleton.show(0);}
var index=references.indexOf(currentTarget);singleton.show(references[index+1]||first);};singleton.showPrevious=function(){var last=references[references.length-1];if(!currentTarget){return singleton.show(last);}
var index=references.indexOf(currentTarget);var target=references[index-1]||last;singleton.show(target);};var originalSetProps=singleton.setProps;singleton.setProps=function(props){overrides=props.overrides||overrides;originalSetProps(props);};singleton.setInstances=function(nextInstances){enableInstances(true);interceptSetPropsCleanups.forEach(function(fn){return fn();});individualInstances=nextInstances;enableInstances(false);setReferences();setTriggerTargets();interceptSetPropsCleanups=interceptSetProps(singleton);singleton.setProps({triggerTarget:triggerTargets});};interceptSetPropsCleanups=interceptSetProps(singleton);return singleton;};var BUBBLING_EVENTS_MAP={mouseover:'mouseenter',focusin:'focus',click:'click'};function delegate(targets,props){{errorWhen(!(props&&props.target),['You must specity a `target` prop indicating a CSS selector string matching','the target elements that should receive a tippy.'].join(' '));}
var listeners=[];var childTippyInstances=[];var disabled=false;var target=props.target;var nativeProps=removeProperties(props,['target']);var parentProps=Object.assign({},nativeProps,{trigger:'manual',touch:false});var childProps=Object.assign({touch:defaultProps.touch},nativeProps,{showOnCreate:true});var returnValue=tippy(targets,parentProps);var normalizedReturnValue=normalizeToArray(returnValue);function onTrigger(event){if(!event.target||disabled){return;}
var targetNode=event.target.closest(target);if(!targetNode){return;}
var trigger=targetNode.getAttribute('data-tippy-trigger')||props.trigger||defaultProps.trigger;if(targetNode._tippy){return;}
if(event.type==='touchstart'&&typeof childProps.touch==='boolean'){return;}
if(event.type!=='touchstart'&&trigger.indexOf(BUBBLING_EVENTS_MAP[event.type])<0){return;}
var instance=tippy(targetNode,childProps);if(instance){childTippyInstances=childTippyInstances.concat(instance);}}
function on(node,eventType,handler,options){if(options===void 0){options=false;}
node.addEventListener(eventType,handler,options);listeners.push({node:node,eventType:eventType,handler:handler,options:options});}
function addEventListeners(instance){var reference=instance.reference;on(reference,'touchstart',onTrigger,TOUCH_OPTIONS);on(reference,'mouseover',onTrigger);on(reference,'focusin',onTrigger);on(reference,'click',onTrigger);}
function removeEventListeners(){listeners.forEach(function(_ref){var node=_ref.node,eventType=_ref.eventType,handler=_ref.handler,options=_ref.options;node.removeEventListener(eventType,handler,options);});listeners=[];}
function applyMutations(instance){var originalDestroy=instance.destroy;var originalEnable=instance.enable;var originalDisable=instance.disable;instance.destroy=function(shouldDestroyChildInstances){if(shouldDestroyChildInstances===void 0){shouldDestroyChildInstances=true;}
if(shouldDestroyChildInstances){childTippyInstances.forEach(function(instance){instance.destroy();});}
childTippyInstances=[];removeEventListeners();originalDestroy();};instance.enable=function(){originalEnable();childTippyInstances.forEach(function(instance){return instance.enable();});disabled=false;};instance.disable=function(){originalDisable();childTippyInstances.forEach(function(instance){return instance.disable();});disabled=true;};addEventListeners(instance);}
normalizedReturnValue.forEach(applyMutations);return returnValue;}
var animateFill={name:'animateFill',defaultValue:false,fn:function fn(instance){var _instance$props$rende;if(!((_instance$props$rende=instance.props.render)!=null&&_instance$props$rende.$$tippy)){{errorWhen(instance.props.animateFill,'The `animateFill` plugin requires the default render function.');}
return{};}
var _getChildren=getChildren(instance.popper),box=_getChildren.box,content=_getChildren.content;var backdrop=instance.props.animateFill?createBackdropElement():null;return{onCreate:function onCreate(){if(backdrop){box.insertBefore(backdrop,box.firstElementChild);box.setAttribute('data-animatefill','');box.style.overflow='hidden';instance.setProps({arrow:false,animation:'shift-away'});}},onMount:function onMount(){if(backdrop){var transitionDuration=box.style.transitionDuration;var duration=Number(transitionDuration.replace('ms',''));content.style.transitionDelay=Math.round(duration/10)+"ms";backdrop.style.transitionDuration=transitionDuration;setVisibilityState([backdrop],'visible');}},onShow:function onShow(){if(backdrop){backdrop.style.transitionDuration='0ms';}},onHide:function onHide(){if(backdrop){setVisibilityState([backdrop],'hidden');}}};}};function createBackdropElement(){var backdrop=div();backdrop.className=BACKDROP_CLASS;setVisibilityState([backdrop],'hidden');return backdrop;}
var mouseCoords={clientX:0,clientY:0};var activeInstances=[];function storeMouseCoords(_ref){var clientX=_ref.clientX,clientY=_ref.clientY;mouseCoords={clientX:clientX,clientY:clientY};}
function addMouseCoordsListener(doc){doc.addEventListener('mousemove',storeMouseCoords);}
function removeMouseCoordsListener(doc){doc.removeEventListener('mousemove',storeMouseCoords);}
var followCursor={name:'followCursor',defaultValue:false,fn:function fn(instance){var reference=instance.reference;var doc=getOwnerDocument(instance.props.triggerTarget||reference);var isInternalUpdate=false;var wasFocusEvent=false;var isUnmounted=true;var prevProps=instance.props;function getIsInitialBehavior(){return instance.props.followCursor==='initial'&&instance.state.isVisible;}
function addListener(){doc.addEventListener('mousemove',onMouseMove);}
function removeListener(){doc.removeEventListener('mousemove',onMouseMove);}
function unsetGetReferenceClientRect(){isInternalUpdate=true;instance.setProps({getReferenceClientRect:null});isInternalUpdate=false;}
function onMouseMove(event){var isCursorOverReference=event.target?reference.contains(event.target):true;var followCursor=instance.props.followCursor;var clientX=event.clientX,clientY=event.clientY;var rect=reference.getBoundingClientRect();var relativeX=clientX-rect.left;var relativeY=clientY-rect.top;if(isCursorOverReference||!instance.props.interactive){instance.setProps({getReferenceClientRect:function getReferenceClientRect(){var rect=reference.getBoundingClientRect();var x=clientX;var y=clientY;if(followCursor==='initial'){x=rect.left+relativeX;y=rect.top+relativeY;}
var top=followCursor==='horizontal'?rect.top:y;var right=followCursor==='vertical'?rect.right:x;var bottom=followCursor==='horizontal'?rect.bottom:y;var left=followCursor==='vertical'?rect.left:x;return{width:right-left,height:bottom-top,top:top,right:right,bottom:bottom,left:left};}});}}
function create(){if(instance.props.followCursor){activeInstances.push({instance:instance,doc:doc});addMouseCoordsListener(doc);}}
function destroy(){activeInstances=activeInstances.filter(function(data){return data.instance!==instance;});if(activeInstances.filter(function(data){return data.doc===doc;}).length===0){removeMouseCoordsListener(doc);}}
return{onCreate:create,onDestroy:destroy,onBeforeUpdate:function onBeforeUpdate(){prevProps=instance.props;},onAfterUpdate:function onAfterUpdate(_,_ref2){var followCursor=_ref2.followCursor;if(isInternalUpdate){return;}
if(followCursor!==undefined&&prevProps.followCursor!==followCursor){destroy();if(followCursor){create();if(instance.state.isMounted&&!wasFocusEvent&&!getIsInitialBehavior()){addListener();}}else{removeListener();unsetGetReferenceClientRect();}}},onMount:function onMount(){if(instance.props.followCursor&&!wasFocusEvent){if(isUnmounted){onMouseMove(mouseCoords);isUnmounted=false;}
if(!getIsInitialBehavior()){addListener();}}},onTrigger:function onTrigger(_,event){if(isMouseEvent(event)){mouseCoords={clientX:event.clientX,clientY:event.clientY};}
wasFocusEvent=event.type==='focus';},onHidden:function onHidden(){if(instance.props.followCursor){unsetGetReferenceClientRect();removeListener();isUnmounted=true;}}};}};function getProps(props,modifier){var _props$popperOptions;return{popperOptions:Object.assign({},props.popperOptions,{modifiers:[].concat((((_props$popperOptions=props.popperOptions)==null?void 0:_props$popperOptions.modifiers)||[]).filter(function(_ref){var name=_ref.name;return name!==modifier.name;}),[modifier])})};}
var inlinePositioning={name:'inlinePositioning',defaultValue:false,fn:function fn(instance){var reference=instance.reference;function isEnabled(){return!!instance.props.inlinePositioning;}
var placement;var cursorRectIndex=-1;var isInternalUpdate=false;var triedPlacements=[];var modifier={name:'tippyInlinePositioning',enabled:true,phase:'afterWrite',fn:function fn(_ref2){var state=_ref2.state;if(isEnabled()){if(triedPlacements.indexOf(state.placement)!==-1){triedPlacements=[];}
if(placement!==state.placement&&triedPlacements.indexOf(state.placement)===-1){triedPlacements.push(state.placement);instance.setProps({getReferenceClientRect:function getReferenceClientRect(){return _getReferenceClientRect(state.placement);}});}
placement=state.placement;}}};function _getReferenceClientRect(placement){return getInlineBoundingClientRect(getBasePlacement(placement),reference.getBoundingClientRect(),arrayFrom(reference.getClientRects()),cursorRectIndex);}
function setInternalProps(partialProps){isInternalUpdate=true;instance.setProps(partialProps);isInternalUpdate=false;}
function addModifier(){if(!isInternalUpdate){setInternalProps(getProps(instance.props,modifier));}}
return{onCreate:addModifier,onAfterUpdate:addModifier,onTrigger:function onTrigger(_,event){if(isMouseEvent(event)){var rects=arrayFrom(instance.reference.getClientRects());var cursorRect=rects.find(function(rect){return rect.left-2<=event.clientX&&rect.right+2>=event.clientX&&rect.top-2<=event.clientY&&rect.bottom+2>=event.clientY;});var index=rects.indexOf(cursorRect);cursorRectIndex=index>-1?index:cursorRectIndex;}},onHidden:function onHidden(){cursorRectIndex=-1;}};}};function getInlineBoundingClientRect(currentBasePlacement,boundingRect,clientRects,cursorRectIndex){if(clientRects.length<2||currentBasePlacement===null){return boundingRect;}
if(clientRects.length===2&&cursorRectIndex>=0&&clientRects[0].left>clientRects[1].right){return clientRects[cursorRectIndex]||boundingRect;}
switch(currentBasePlacement){case'top':case'bottom':{var firstRect=clientRects[0];var lastRect=clientRects[clientRects.length-1];var isTop=currentBasePlacement==='top';var top=firstRect.top;var bottom=lastRect.bottom;var left=isTop?firstRect.left:lastRect.left;var right=isTop?firstRect.right:lastRect.right;var width=right-left;var height=bottom-top;return{top:top,bottom:bottom,left:left,right:right,width:width,height:height};}
case'left':case'right':{var minLeft=Math.min.apply(Math,clientRects.map(function(rects){return rects.left;}));var maxRight=Math.max.apply(Math,clientRects.map(function(rects){return rects.right;}));var measureRects=clientRects.filter(function(rect){return currentBasePlacement==='left'?rect.left===minLeft:rect.right===maxRight;});var _top=measureRects[0].top;var _bottom=measureRects[measureRects.length-1].bottom;var _left=minLeft;var _right=maxRight;var _width=_right-_left;var _height=_bottom-_top;return{top:_top,bottom:_bottom,left:_left,right:_right,width:_width,height:_height};}
default:{return boundingRect;}}}
var sticky={name:'sticky',defaultValue:false,fn:function fn(instance){var reference=instance.reference,popper=instance.popper;function getReference(){return instance.popperInstance?instance.popperInstance.state.elements.reference:reference;}
function shouldCheck(value){return instance.props.sticky===true||instance.props.sticky===value;}
var prevRefRect=null;var prevPopRect=null;function updatePosition(){var currentRefRect=shouldCheck('reference')?getReference().getBoundingClientRect():null;var currentPopRect=shouldCheck('popper')?popper.getBoundingClientRect():null;if(currentRefRect&&areRectsDifferent(prevRefRect,currentRefRect)||currentPopRect&&areRectsDifferent(prevPopRect,currentPopRect)){if(instance.popperInstance){instance.popperInstance.update();}}
prevRefRect=currentRefRect;prevPopRect=currentPopRect;if(instance.state.isMounted){requestAnimationFrame(updatePosition);}}
return{onMount:function onMount(){if(instance.props.sticky){updatePosition();}}};}};function areRectsDifferent(rectA,rectB){if(rectA&&rectB){return rectA.top!==rectB.top||rectA.right!==rectB.right||rectA.bottom!==rectB.bottom||rectA.left!==rectB.left;}
return true;}
if(isBrowser){injectCSS(css);}
tippy.setDefaultProps({plugins:[animateFill,followCursor,inlinePositioning,sticky],render:render});tippy.createSingleton=createSingleton;tippy.delegate=delegate;tippy.hideAll=hideAll;tippy.roundArrow=ROUND_ARROW;return tippy;})));

/* #PlUGINS END                                         
--------------------------------------------------------*/  



/* Functions                                        
--------------------------------------------------------*/
function alerx(ititle, icontent, type) {
	
	let width 	= ($(window).width() > 860) ? '640px' : '90%';
	
	if (type == 'error') {
		$.alert({
			boxWidth: width,
			useBootstrap: false,
			theme: 'material',
			title: ititle,
			content: icontent,
			closeIcon: true,
			draggable: true,
			
			buttons: {
				OK: {
					btnClass: 'btn-red',
					action: function(){}
				},
			}
		});
	}
	else {
		$.alert({
			boxWidth: width,
			useBootstrap: false,
			theme: 'material',
			title: ititle,
			content: icontent,
			closeIcon: true,
			draggable: true,
			buttons: {
				OK: {
					btnClass: 'btn-green',
					action: function(){}
				},
			}

		});
	}
}


function xconfirm(ititle, icontent, type, fn1, fn2){
	
	const width 	= ($(window).width() > 860) ? '640px' : '90%';
	let btns = {};
	
	fn1 = fn1 || function(){};
	fn2 = fn2 || function(){};
	
	if(type == 'delete'){
		btns = {
			Cancel: {
				btnClass: 'btn-line',
				action: fn1
			},
			Delete: {
				btnClass: 'btn-red',
				action: fn2
			},
		}
	} else {
		btns = {
			Cancel: {
				btnClass: 'btn-line',
				action: fn1
			},
			OK: {
				btnClass: 'btn-green',
				action: fn2
			},
		}		
	}
	
	$.confirm({
		boxWidth: width,
		useBootstrap: false,
		theme: 'material',
	    title: ititle,
	    content: icontent,
    	closeIcon: true,
		draggable: true,
	    buttons: btns
	});
}


function goTo(line, t) {
	t = (t == undefined)  ? 100 : t;
	$('html, body').animate({
		scrollTop: $(line).offset().top-t
	}, 500);
}


function addZero(num){
	return num <= 9 ? `0${num}` : num;
}

//Slider
function xslider(opt){
	//dom
	const btnLeft = $(opt.btnLeft);
	const btnRight = $(opt.btnRight);
	const sliderWrap = $(opt.sliderWrap);
	const slider = $(opt.slider);
	const items = $(opt.items);
	const dots = $(opt.dots);
			
	items.css("width", `${sliderWrap.width() || sliderWrap.innerWidth}px`);
	$(window).on("resize", () => items.css("width", `${sliderWrap.width() || sliderWrap.innerWidth}px`));
	slider.css("transform", "translateX(0)");
	
	//counter
	let counter = 0;
	const stepSize = items.width() || items.innerWidth;
	
	dots.html(`${addZero(counter+1)}/${addZero(items.length)}`);
	
	//move right
	btnRight.on("click", function(){		
		if(counter < items.length-1){
			counter++;
			slider.css("transform", `translateX(${-stepSize * counter}px)`);
			counter >= items.length-1 ? $(this).prop('disabled', true) : null;
		}			
	});
	
	//move left
	btnLeft.on("click", function(){
		if(counter > 0){
			counter--;
			slider.css("transform", `translateX(${-stepSize * counter}px)`);
			counter <= items.length-1 ? $(this).prop('disabled', true) : null;
		} 
	});
	
	//end step
	slider.on("transitionend", (e) => {
		//btn disabled switch
		counter > 0 ? btnLeft.prop("disabled", false) : null;
		counter < items.length-1 ? btnRight.prop("disabled", false) : null;
		
		//dots num
		dots.html(`${addZero(counter+1)}/${addZero(items.length)}`);
	});
		
	//mob swip
	slider.touchwipe({
		wipeLeft: function() {btnRight.trigger("click");},
		wipeRight: function() { btnLeft.trigger("click");},
		min_move_x: 60         
	});

}


//Popup
const popup = new Popup();
function Popup(){
	
	if(!(this instanceof Popup)) { return new Popup(); }
	
	const wWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
	const wHeight = window.innerHeight > 0 ? window.innerHeight : screen.height;
	const scrollSize = wWidth - $("body").width();
	
	this.open = function(id){
		$('.popup').hide();
		$(`${id} .popup__container`).css("transform","translate(-50%,-400%)");
		
		$(id).fadeIn(1, function(){
			let popupHeight = parseInt( $(`${id} .popup__container`).innerHeight() + 50);
			
			$(`${id} .popup__overlay`).css({ "opacity": "1", "min-height": popupHeight + "px" });
						
			if( (wWidth <= 992) || (popupHeight > wHeight) ){
				$(`${id} .popup__container`).css({ "transform":"translate(-50%,0%)", "top": "30px" });
			} else {
				$(`${id} .popup__container`).css("transform","translate(-50%,-50%)");
			}
			
			$("body").css({"overflow": "hidden", "margin-right": scrollSize + "px"});
			$(".wrapper").addClass("blur");
		});
		
		$(window).on("resize", function() {
			let w = window.innerWidth > 0 ? window.innerWidth : screen.width;
			let h = window.innerHeight > 0 ? window.innerHeight : screen.height;
			let ph = $(`${id} .popup__container`).innerHeight();
			
			if( (w <= 992) || (ph > h) ){
				$(document.body).find(`${id} .popup__container`).css({ "transform":"translate(-50%,0%)", "top": "30px" });
			} else {
				$(document.body).find(`${id} .popup__container`).css({ "transform":"translate(-50%,-50%)", "top": "50%" });
			}		
		});	
	}	
	
	this.close = function(id){
		$(`${id} .popup__container`).css("transform","translate(-50%, -400%)");
		$(`${id} .popup__overlay`).css("opacity","0");
		
		setTimeout(function(){
			$(id).hide(0);
			$("body").css({"overflow": "", "margin-right":"0"});
			$(".wrapper").removeClass("blur");
		}, 500);
	}
}


//Rating stars render
function renderStars(count=1){
	const maxCount = 5;
	const starOn = "flaticon-star-1";
	const starOff = "flaticon-star-0";
	let html = "";
	
	for(let i = 1; i <= maxCount; i++){
		html += i <= count ? `<i class="${starOn}"></i>` : `<i class="${starOff}"></i>`;
	}
	
	this.find("i").remove();
	this.find("input").val(count);
	this.append(html)
}


//Upload files
function xupload(selector, options){
	const $input = $(selector);
	const $trigger = $(options.trigger);
	options.cb = options.cb || function(){}
	
	if(options.multi){
		$input.attr("multiple", true);
	}
	
	if(options.accept && Array.isArray(options.accept)){
		$input.attr("accept", options.accept.join(","));
	}
	
	const changeHandler = event => {
		if(!event.target.files.length) return;
		
		const files = Array.from(event.target.files);
				
		files.forEach(file => {
			if(!file.type.match("image")) return;
			
			const reader = new FileReader();
			
			reader.onload = ev => {
				options.cb({name: file.name, result: ev.target.result});
			}
			
			reader.readAsDataURL(file);
		});
	}
	
	$trigger.on("click", () => {
		$input.trigger("click");
	});
	
	$input.on("change", changeHandler);		
}


//Copy text
function copyText(input,text,flag=false) {
	// Get the text field
	const copyText = document.querySelector(input);
	let textValue;
  
	// if input element
	if(!flag){
		copyText.select();
		copyText.setSelectionRange(0, 99999); // For mobile devices
		textValue = copyText.value;
	} else {
		textValue = copyText.innerText;
	}
  
	 // Copy the text inside the text field
	navigator.clipboard.writeText(textValue);
  
	// Alert the copied text
	alerx(`${text} 👍`, '', 'info');
  }



/* Onload DOM                                        
--------------------------------------------------------*/
$(function(){
		
	//Mob. menu
	$(".js-menu-mob").on("click", function(){
		$("body").toggleClass("menu--open");
	});
	
	
	//Question
	$(".question").on("click", ".question__title", function(){
		
		const item = $(this).parent(".question__item");
		
		if(item.hasClass("question__item--open")){
			item.find(".question__txt").slideToggle("fast", function(){
				item.removeClass("question__item--open");
			});
			return;
		}

		$(".question").find(".question__item").removeClass("question__item--open");
		$(".question").find(".question__txt").hide("fast");
	
		item.find(".question__txt").slideToggle("fast", function(){
			item.addClass("question__item--open");
		});

	});
	
	
	//Slider
	if($(".hreviews__wrap").length){
		const sliderOpt = {
			btnLeft: ".hreviews__btn-left",
			btnRight: ".hreviews__btn-right",
			sliderWrap: ".hreviews__wrap",
			slider: ".hreviews__car",
			items: ".hreviews__item",
			dots: ".hreviews__dots"			
		}
		xslider(sliderOpt);
		$(window).on("resize", e => xslider(sliderOpt));
	}
	
	
	//Animate numbers
	$("[data-animate-number]").each(function(index, elem){
		const csns = $.animateNumber.numberStepFactories.separator(' ');
		$(elem).animateNumber({ number: +$(elem).data("animate-number"), numberStep: csns }, +$(elem).data("delay"));
	});
	
	
	//Lottie animations
	if(document.querySelectorAll(".js-lottie").length) {
		const lottieElems = document.querySelectorAll(".js-lottie");
		lottieElems.forEach((elem) => {
						
			lottie.loadAnimation({
				container: elem, // the dom element that will contain the animation
				renderer: 'svg',
				loop: true,
				autoplay: true,
				path: elem.dataset.path // the path to the animation json
			});	
					
		});
	}
	
	
	//Footer nav
	$(".ftnav__cap").on("click", function(){
		$(this).parent(".ftnav__list").toggleClass("ftnav__list--open");
	});
	
	
	//Range slider
	if($(".js-range").length){
		const progress = $(".xrange__progress");		
		
		$(".js-range").on("input", function(e){
			let val = parseInt($(this).val());
			let max = $(this).attr("max");
			let percent = (val / max) * 100;
			
			progress.css("width", `${percent}%`);
			$(".js-bx-turnover").text(val);
			$(".js-bx-earn").text(`${(val * 0.0028).toFixed(5)}`);
			
		}).trigger("input");
		
	}
	
	
	//Ratings
	$(".rating__action input").each(function(){
		let val = $(this).val();
		const $wrap = $(this).parent(".rating__action");
			
		renderStars.call($wrap, val);
		
		$wrap.on("click", "i", function(){
			renderStars.call($wrap, $(this).index());
		});
	});
	
	
	//Rating stars render
	$(".js-stars").each(function(){
		renderStars.call($(this), $(this).attr("data-val"))
	});

	
	
	//Review box show[mobile]
	$(".js-add-review").on("click", function(e){
		e.preventDefault();
		$(".js-add-review").remove();
		$(".prw-form").fadeIn("fast");
	});
	
	
	//Review message length
	$(".js-msg-lentgh .prw-item__msg").each(function(){
		const maxLength = 250;
		const $el = $(this);
		const moreTxt = $(this).closest(".js-msg-lentgh").data("more-txt");
		let msg = $(this).text();
		
		if(msg.length > maxLength){
			$el.html(`
				${msg.substring(0,maxLength)}<span class="hidden">${msg.substring(maxLength, msg.length)}</span>
				<p class="mlink"><span>${moreTxt}</span></p>
			`)
			.find(".mlink").on("click", "span", function(e){
				e.preventDefault();
				$(this).remove();
				$el.find(".hidden").removeClass("hidden");
		
			});		
		}
		
	});
	
	
	//Chat files upload
	const renderChatFiles = function(file){
		const input = document.querySelector("#chat-file-inp");
		
		let html = `<li>
						<i class="js-del-att flaticon-close" data-name="${file.name}"></i>
						<p class="fn">${file.name}</p>
						<p class="img"><img src="${file.result}" alt=""/></p>
					</li>`;
		
		$(".chat-att-file").append(html).on("click", ".js-del-att", function(){
			const dt = new DataTransfer();
			const files = input.files;
			
			for (let i = 0; i < files.length; i++) {
				if (files[i].name !== $(this).attr("data-name"))
					dt.items.add(files[i])
			}
			
			input.files = dt.files;
	
			$(this).parent("li").remove();
		});	
	}
	//call chat upload
	xupload("#chat-file-inp", {
		trigger: "#chat-upl",
		multi  : true,
		accept : [".png",".jpg",".jpeg",".gif"],
		cb 	   : function(file) { renderChatFiles(file); }
	});


	//Search form loading
	$("#serch-line-form").on("submit", function(e){
		e.preventDefault();
		$(this).parent("div").addClass("ldg");
		$(this).find("input").prop("readonly", true);
		setTimeout(function(){
			$("#serch-line-form").parent("div").removeClass("ldg");
			$("#serch-line-form").find("input").prop("readonly", false);
		}, 3000)
	});


	//tippy tooltip
	tippy('[data-tippy-content]', {
		allowHTML: true,
		animation: 'scale'
    });


	//Tab navs
	$("[data-tab-navs]").each(function(index, el){
		const $nav = $(el).find("a");
		const $navActive = $(el).find("a.active");
		const hasFlex = $(this).attr("data-display-flex") || false;
		const tabPanels = $(this).attr("data-tab-navs");

		const showBox = (box, hasFlex) => {
			hasFlex
			? box.css("display", "flex").hide().fadeIn("fast")
			: box.fadeIn("fast");
		};

		if(!$navActive.length) {
			$nav.first().addClass("active");
			showBox($($nav.first().attr("href")), hasFlex);
		} else {
			showBox($($navActive.attr("href")), hasFlex);
		}

		$nav.on("click", function(e){
			e.preventDefault();
			if($(this).hasClass("active")) return;			

			$nav.removeClass("active");		
			$(this).addClass("active");

			$(`${tabPanels} > div`).fadeOut("fast", () => {
				showBox($($(this).attr("href")), hasFlex);
			});
		});
	});



	//Userpic file render
	const renderUserpicFiles = function(file){
		$("#upload-userpic").val(file.name);
	}

	//call userpic upload
	xupload("#file-upload-userpic", {
		trigger: "#upload-userpic",
		multi  : false,
		accept : [".png",".jpg",".jpeg",".gif"],
		cb 	   : function(file) { renderUserpicFiles(file); }
	});

	

});