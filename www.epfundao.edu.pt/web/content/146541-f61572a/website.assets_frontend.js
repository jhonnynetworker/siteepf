
/* /web/static/src/js/framework/session_instance.js defined in bundle 'website.assets_frontend' */
odoo.define('web.session',function(require){var Session=require('web.Session');var modules=odoo._modules;return new Session(undefined,undefined,{modules:modules,use_cors:false});});;

/* /website/static/src/js/website.js defined in bundle 'website.assets_frontend' */
odoo.define('website.website',function(require){"use strict";var ajax=require('web.ajax');var core=require('web.core');var Widget=require('web.Widget');var session=require('web.session');var base=require('web_editor.base');var Tour=require('web.Tour');var qweb=core.qweb;var _t=core._t;base.url_translations='/website/translations';var browser;if($.browser.webkit)browser="webkit";else if($.browser.safari)browser="safari";else if($.browser.opera)browser="opera";else if($.browser.msie||($.browser.mozilla&&+$.browser.version.replace(/^([0-9]+\.[0-9]+).*/,'\$1')<20))browser="msie";else if($.browser.mozilla)browser="mozilla";browser+=","+$.browser.version;if(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))browser+=",mobile";document.documentElement.setAttribute('data-browser',browser);var get_context=base.get_context;base.get_context=base.get_context=function(dict){var html=document.documentElement;return _.extend({'website_id':html.getAttribute('data-website-id')|0},get_context(dict),dict);};var prompt=function(options,_qweb){if(typeof options==='string'){options={text:options};}
if(_.isUndefined(_qweb)){_qweb='website.prompt';}
options=_.extend({window_title:'',field_name:'','default':'',init:function(){},},options||{});var type=_.intersection(Object.keys(options),['input','textarea','select']);type=type.length?type[0]:'input';options.field_type=type;options.field_name=options.field_name||options[type];var def=$.Deferred();var dialog=$(qweb.render(_qweb,options)).appendTo("body");options.$dialog=dialog;var field=dialog.find(options.field_type).first();field.val(options['default']);field.fillWith=function(data){if(field.is('select')){var select=field[0];data.forEach(function(item){select.options[select.options.length]=new Option(item[1],item[0]);});}else{field.val(data);}};var init=options.init(field,dialog);$.when(init).then(function(fill){if(fill){field.fillWith(fill);}
dialog.modal('show');field.focus();dialog.on('click','.btn-primary',function(){var backdrop=$('.modal-backdrop');def.resolve(field.val(),field,dialog);dialog.modal('hide').remove();backdrop.remove();});});dialog.on('hidden.bs.modal',function(){var backdrop=$('.modal-backdrop');def.reject();dialog.remove();backdrop.remove();});if(field.is('input[type="text"], select')){field.keypress(function(e){if(e.which==13){e.preventDefault();dialog.find('.btn-primary').trigger('click');}});}
return def;};var error=function(data,url){var $error=$(qweb.render('website.error_dialog',{'title':data.data?data.data.arguments[0]:"",'message':data.data?data.data.arguments[1]:data.statusText,'backend_url':url}));$error.appendTo("body");$error.modal('show');};function _add_input(form,name,value){var param=document.createElement('input');param.setAttribute('type','hidden');param.setAttribute('name',name);param.setAttribute('value',value);form.appendChild(param);}
var form=function(url,method,params){var form=document.createElement('form');form.setAttribute('action',url);form.setAttribute('method',method);if(core.csrf_token){_add_input(form,'csrf_token',core.csrf_token);}
_.each(params,function(v,k){_add_input(form,k,v);});document.body.appendChild(form);form.submit();};ajax.loadXML('/website/static/src/xml/website.xml',qweb);ajax.loadXML('/web/static/src/xml/base_common.xml',qweb);base.ready().then(function(){data.topBar=new TopBar();data.topBar.attachTo($("#oe_main_menu_navbar"));});$(document).on('click','.js_publish_management .js_publish_btn',function(e){e.preventDefault();var $data=$(this).parents(".js_publish_management:first");ajax.jsonRpc($data.data('controller')||'/website/publish','call',{'id':+$data.data('id'),'object':$data.data('object')}).then(function(result){$data.toggleClass("css_unpublished css_published");$data.parents("[data-publish]").attr("data-publish",+result?'on':'off');}).fail(function(err,data){error(data,'/web#return_label=Website&model='+$data.data('object')+'&id='+$data.data('id'));});});if(!$('.js_change_lang').length){var links=$('ul.js_language_selector li a:not([data-oe-id])');var m=$(_.min(links,function(l){return $(l).attr('href').length;})).attr('href');links.each(function(){var t=$(this).attr('href');var l=(t===m)?"default":t.split('/')[1];$(this).data('lang',l).addClass('js_change_lang');});}
$(document).on('click','.js_change_lang',function(e){e.preventDefault();var self=$(this);var redirect={lang:self.data('lang'),url:encodeURIComponent(self.attr('href').replace(/[&?]edit_translations[^&?]+/,'')),hash:encodeURIComponent(location.hash)};location.href=_.str.sprintf("/website/lang/%(lang)s?r=%(url)s%(hash)s",redirect);});$('.js_kanban').each(function(){init_kanban(this);});$('body').on('submit','.js_website_submit_form',function(){var $buttons=$(this).find('button[type="submit"], a.a-submit');_.each($buttons,function(btn){$(btn).attr('data-loading-text','<i class="fa fa-spinner fa-spin"></i> '+$(btn).text()).button('loading');});});setTimeout(function(){if(window.location.hash.indexOf("scrollTop=")>-1){window.document.body.scrollTop=+location.hash.match(/scrollTop=([0-9]+)/)[1];}},0);$(".o_image[data-mimetype^='image']").each(function(){var $img=$(this);if(/gif|jpe|jpg|png/.test($img.data('mimetype'))&&$img.data('src')){$img.css('background-image',"url('"+$img.data('src')+"')");}});var TopBar=Widget.extend({start:function(){var $collapse=this.$('#oe_applications ul.dropdown-menu').clone().attr("id","oe_applications_collapse").attr("class","nav navbar-nav navbar-left navbar-collapse collapse");this.$('#oe_applications').before($collapse);$collapse.wrap('<div class="visible-xs"/>');this.$('[data-target="#oe_applications"]').attr("data-target","#oe_applications_collapse");return this._super();}});var data={prompt:prompt,form:form,TopBar:TopBar,ready:function(){console.warn("website.ready is deprecated: Please use require('web_editor.base').ready()");return base.ready();}};return data;});;

/* /website/static/src/js/website.share.js defined in bundle 'website.assets_frontend' */
odoo.define('website.share',function(require){"use strict";var ajax=require('web.ajax');var core=require('web.core');var Widget=require('web.Widget');var base=require('web_editor.base');var _t=core._t;var qweb=core.qweb;ajax.loadXML('/website/static/src/xml/website.share.xml',qweb);var SocialShare=Widget.extend({template:'website.social_hover',init:function(parent){this._super.apply(this,arguments);this.element=parent;if(parent.data('social')){this.social_list=(parent.data('social')).split();}else{this.social_list=['facebook','twitter','linkedin','google-plus'];}
this.hashtags=parent.data('hashtags')||'';this.renderElement();this.bind_events();},bind_events:function(){$('.oe_social_facebook').click($.proxy(this.renderSocial,this,'facebook'));$('.oe_social_twitter').click($.proxy(this.renderSocial,this,'twitter'));$('.oe_social_linkedin').click($.proxy(this.renderSocial,this,'linkedin'));$('.oe_social_google-plus').click($.proxy(this.renderSocial,this,'google-plus'));},renderElement:function(){this.$el.append(qweb.render('website.social_hover',{medias:this.social_list}));this.element.popover({'content':this.$el.html(),'placement':'bottom','container':this.element,'html':true,'trigger':'manual','animation':false,}).popover("show").on("mouseleave",function(){var self=this;setTimeout(function(){if(!$(".popover:hover").length){$(self).popover("destroy");}},200);});},renderSocial:function(social){var url=document.URL.split(/[?#]/)[0];var title=document.title.split(" | ")[0];var hashtags=' #'+document.title.split(" | ")[1].replace(' ','')+' '+this.hashtags;var social_network={'facebook':'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url),'twitter':'https://twitter.com/intent/tweet?original_referer='+encodeURIComponent(url)+'&text='+encodeURIComponent(title+hashtags+' - '+url),'linkedin':'https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title),'google-plus':'https://plus.google.com/share?url='+encodeURIComponent(url)};if(!_.contains(_.keys(social_network),social))return;var window_height=500,window_width=500;window.open(social_network[social],'','menubar=no, toolbar=no, resizable=yes, scrollbar=yes, height='+window_height+',width='+window_width);},});base.ready().done(function(){$('.oe_social_share').mouseenter(function(){new SocialShare($(this));});});return SocialShare;});;

/* /website/static/src/js/website.snippets.animation.js defined in bundle 'website.assets_frontend' */
odoo.define('website.snippets.animation',function(require){'use strict';var ajax=require('web.ajax');var core=require('web.core');var base=require('web_editor.base');var animation=require('web_editor.snippets.animation');var qweb=core.qweb;function load_called_template(){var ids_or_xml_ids=_.uniq($("[data-oe-call]").map(function(){return $(this).data('oe-call');}).get());if(ids_or_xml_ids.length){ajax.jsonRpc('/website/multi_render','call',{'ids_or_xml_ids':ids_or_xml_ids}).then(function(data){for(var k in data){var $data=$(data[k]).addClass('o_block_'+k);$("[data-oe-call='"+k+"']").each(function(){$(this).replaceWith($data.clone());});}});}}
base.ready().then(function(){load_called_template();if($(".o_gallery:not(.oe_slideshow)").size()){ajax.loadXML('/website/static/src/xml/website.gallery.xml',qweb);}});animation.registry.slider=animation.Class.extend({selector:".carousel",start:function(){this.$target.carousel();},stop:function(){this.$target.carousel('pause');this.$target.removeData("bs.carousel");},});animation.registry.parallax=animation.Class.extend({selector:".parallax",start:function(){var self=this;setTimeout(function(){self.set_values();});this.on_scroll=function(){var speed=parseFloat(self.$target.attr("data-scroll-background-ratio")||0);if(speed==1)return;var offset=parseFloat(self.$target.attr("data-scroll-background-offset")||0);var top=offset+window.scrollY*speed;self.$target.css("background-position","0px "+top+"px");};this.on_resize=function(){self.set_values();};$(window).on("scroll",this.on_scroll);$(window).on("resize",this.on_resize);},stop:function(){$(window).off("scroll",this.on_scroll).off("resize",this.on_resize);},set_values:function(){var self=this;var speed=parseFloat(self.$target.attr("data-scroll-background-ratio")||0);if(speed===1||this.$target.css("background-image")==="none"){this.$target.css("background-attachment","fixed").css("background-position","0px 0px");return;}else{this.$target.css("background-attachment","scroll");}
this.$target.attr("data-scroll-background-offset",0);var img=new Image();img.onload=function(){var offset=0;var padding=parseInt($(document.body).css("padding-top"));if(speed>1){var inner_offset=-self.$target.outerHeight()+this.height/this.width*document.body.clientWidth;var outer_offset=self.$target.offset().top-(document.body.clientHeight-self.$target.outerHeight())-padding;offset=-outer_offset*speed+inner_offset;}else{offset=-self.$target.offset().top*speed;}
self.$target.attr("data-scroll-background-offset",offset>0?0:offset);$(window).scroll();};img.src=this.$target.css("background-image").replace(/url\(['"]*|['"]*\)/g,"");$(window).scroll();}});animation.registry.share=animation.Class.extend({selector:".oe_share",start:function(){var url_regex=/(\?(?:|.*&)(?:u|url|body)=)(.*?)(&|#|$)/;var title_regex=/(\?(?:|.*&)(?:title|text|subject)=)(.*?)(&|#|$)/;var url=encodeURIComponent(window.location.href);var title=encodeURIComponent($("title").text());this.$("a").each(function(){var $a=$(this);$a.attr("href",function(i,href){return href.replace(url_regex,function(match,a,b,c){return a+url+c;}).replace(title_regex,function(match,a,b,c){return a+title+c;});});if($a.attr("target")&&$a.attr("target").match(/_blank/i)&&!$a.closest('.o_editable').length){$a.on('click',function(){window.open(this.href,'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=550,width=600');return false;});}});}});animation.registry.media_video=animation.Class.extend({selector:".media_iframe_video",start:function(){var def=this._super.apply(this,arguments);if(this.$target.children('iframe').length){return def;}
this.$target.empty();this.$target.append('<div class="css_editable_mode_display">&nbsp;</div>'+'<div class="media_iframe_video_size">&nbsp;</div>');this.$target.append($('<iframe/>',{src:_.escape(this.$target.data('oe-expression')||this.$target.data('src')),frameborder:'0',allowfullscreen:'allowfullscreen',sandbox:'allow-scripts allow-same-origin',}));return def;},});animation.registry.ul=animation.Class.extend({selector:"ul.o_ul_folded, ol.o_ul_folded",start:function(editable_mode){this.$('.o_ul_toggle_self').off('click').on('click',function(event){$(this).toggleClass('o_open');$(this).closest('li').find('ul,ol').toggleClass('o_close');event.preventDefault();});this.$('.o_ul_toggle_next').off('click').on('click',function(event){$(this).toggleClass('o_open');$(this).closest('li').next().toggleClass('o_close');event.preventDefault();});},});animation.registry._fix_apple_collapse=animation.Class.extend({selector:".s_faq_collapse [data-toggle='collapse']",start:function(){this.$target.off("click._fix_apple_collapse").on("click._fix_apple_collapse",function(){});},});animation.registry.gallery=animation.Class.extend({selector:".o_gallery:not(.o_slideshow)",start:function(){var self=this;this.$el.on("click","img",this.click_handler);},click_handler:function(event){var self=this;var $cur=$(event.currentTarget);var edition_mode=($cur.closest("[contenteditable='true']").size()!==0);if(!edition_mode){var urls=[],idx=undefined,milliseconds=undefined,params=undefined,$images=$cur.closest(".o_gallery").find("img"),size=0.8,dimensions={min_width:Math.round(window.innerWidth*size*0.9),min_height:Math.round(window.innerHeight*size),max_width:Math.round(window.innerWidth*size*0.9),max_height:Math.round(window.innerHeight*size),width:Math.round(window.innerWidth*size*0.9),height:Math.round(window.innerHeight*size)};$images.each(function(){urls.push($(this).attr("src"));});var $img=($cur.is("img")===true)?$cur:$cur.closest("img");idx=urls.indexOf($img.attr("src"));milliseconds=$cur.closest(".o_gallery").data("interval")||false;var params={srcs:urls,index:idx,dim:dimensions,interval:milliseconds,id:_.uniqueId("slideshow_")};var $modal=$(qweb.render('website.gallery.slideshow.lightbox',params));$modal.modal({keyboard:true,backdrop:true});$modal.on('hidden.bs.modal',function(){$(this).hide();$(this).siblings().filter(".modal-backdrop").remove();$(this).remove();});$modal.find(".modal-content, .modal-body.o_slideshow").css("height","100%");$modal.appendTo(document.body);this.carousel=new animation.registry.gallery_slider($modal.find(".carousel").carousel());}}});animation.registry.gallery_slider=animation.Class.extend({selector:".o_slideshow",start:function(){var $carousel=this.$target.is(".carousel")?this.$target:this.$target.find(".carousel");var self=this;var $indicator=$carousel.find('.carousel-indicators');var $lis=$indicator.find('li:not(.fa)');var $prev=$indicator.find('li.fa:first');var $next=$indicator.find('li.fa:last');var index=($lis.filter('.active').index()||1)-1;var page=Math.floor(index/10);var nb=Math.ceil($lis.length/10);$carousel.on('slide.bs.carousel',function(){setTimeout(function(){var $item=$carousel.find('.carousel-inner .prev, .carousel-inner .next');var index=$item.index();$lis.removeClass("active").filter('[data-slide-to="'+index+'"]').addClass("active");},0);});function hide(){$lis.addClass('hidden').each(function(i){if(i>=page*10&&i<(page+1)*10){$(this).removeClass('hidden');}});$prev.css('visibility',page===0?'hidden':'');$next.css('visibility',(page+1)>=nb?'hidden':'');}
$indicator.find('li.fa').on('click',function(){page=(page+($(this).hasClass('o_indicators_left')?-1:1))%nb;$carousel.carousel(page*10);hide();});hide();$carousel.on('slid.bs.carousel',function(){var index=($lis.filter('.active').index()||1)-1;page=Math.floor(index/10);hide();});}});});;

/* /web/static/lib/bootstrap/js/affix.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
this.$target=$(this.options.target).on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this)).on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=null
this.unpin=null
this.pinnedOffset=null
this.checkPosition()}
Affix.VERSION='3.3.4'
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0,target:window}
Affix.prototype.getState=function(scrollHeight,height,offsetTop,offsetBottom){var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
var targetHeight=this.$target.height()
if(offsetTop!=null&&this.affixed=='top')return scrollTop<offsetTop?'top':false
if(this.affixed=='bottom'){if(offsetTop!=null)return(scrollTop+this.unpin<=position.top)?false:'bottom'
return(scrollTop+targetHeight<=scrollHeight-offsetBottom)?false:'bottom'}
var initializing=this.affixed==null
var colliderTop=initializing?scrollTop:position.top
var colliderHeight=initializing?targetHeight:height
if(offsetTop!=null&&scrollTop<=offsetTop)return'top'
if(offsetBottom!=null&&(colliderTop+colliderHeight>=scrollHeight-offsetBottom))return'bottom'
return false}
Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
return(this.pinnedOffset=position.top-scrollTop)}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var height=this.$element.height()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
var scrollHeight=$(document.body).height()
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top(this.$element)
if(typeof offsetBottom=='function')offsetBottom=offset.bottom(this.$element)
var affix=this.getState(scrollHeight,height,offsetTop,offsetBottom)
if(this.affixed!=affix){if(this.unpin!=null)this.$element.css('top','')
var affixType='affix'+(affix?'-'+affix:'')
var e=$.Event(affixType+'.bs.affix')
this.$element.trigger(e)
if(e.isDefaultPrevented())return
this.affixed=affix
this.unpin=affix=='bottom'?this.getPinnedOffset():null
this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix','affixed')+'.bs.affix')}
if(affix=='bottom'){this.$element.offset({top:scrollHeight-height-offsetBottom})}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.affix
$.fn.affix=Plugin
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom!=null)data.offset.bottom=data.offsetBottom
if(data.offsetTop!=null)data.offset.top=data.offsetTop
Plugin.call($spy,data)})})}(jQuery);;

/* /web/static/lib/bootstrap/js/alert.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.VERSION='3.3.4'
Alert.TRANSITION_DURATION=150
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.closest('.alert')}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.detach().trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one('bsTransitionEnd',removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.alert
$.fn.alert=Plugin
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(jQuery);;

/* /web/static/lib/bootstrap/js/button.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)
this.isLoading=false}
Button.VERSION='3.3.4'
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state=state+'Text'
if(data.resetText==null)$el.data('resetText',$el[val]())
setTimeout($.proxy(function(){$el[val](data[state]==null?this.options[state]:data[state])
if(state=='loadingText'){this.isLoading=true
$el.addClass(d).attr(d,d)}else if(this.isLoading){this.isLoading=false
$el.removeClass(d).removeAttr(d)}},this),0)}
Button.prototype.toggle=function(){var changed=true
var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input')
if($input.prop('type')=='radio'){if($input.prop('checked')&&this.$element.hasClass('active'))changed=false
else $parent.find('.active').removeClass('active')}
if(changed)$input.prop('checked',!this.$element.hasClass('active')).trigger('change')}else{this.$element.attr('aria-pressed',!this.$element.hasClass('active'))}
if(changed)this.$element.toggleClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
var old=$.fn.button
$.fn.button=Plugin
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^="button"]',function(e){var $btn=$(e.target)
if(!$btn.hasClass('btn'))$btn=$btn.closest('.btn')
Plugin.call($btn,'toggle')
e.preventDefault()}).on('focus.bs.button.data-api blur.bs.button.data-api','[data-toggle^="button"]',function(e){$(e.target).closest('.btn').toggleClass('focus',/^focus(in)?$/.test(e.type))})}(jQuery);;

/* /web/static/lib/bootstrap/js/carousel.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';var Carousel=function(element,options){this.$element=$(element)
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=null
this.sliding=null
this.interval=null
this.$active=null
this.$items=null
this.options.keyboard&&this.$element.on('keydown.bs.carousel',$.proxy(this.keydown,this))
this.options.pause=='hover'&&!('ontouchstart'in document.documentElement)&&this.$element.on('mouseenter.bs.carousel',$.proxy(this.pause,this)).on('mouseleave.bs.carousel',$.proxy(this.cycle,this))}
Carousel.VERSION='3.3.4'
Carousel.TRANSITION_DURATION=600
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:true,keyboard:true}
Carousel.prototype.keydown=function(e){if(/input|textarea/i.test(e.target.tagName))return
switch(e.which){case 37:this.prev();break
case 39:this.next();break
default:return}
e.preventDefault()}
Carousel.prototype.cycle=function(e){e||(this.paused=false)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getItemIndex=function(item){this.$items=item.parent().children('.item')
return this.$items.index(item||this.$active)}
Carousel.prototype.getItemForDirection=function(direction,active){var activeIndex=this.getItemIndex(active)
var willWrap=(direction=='prev'&&activeIndex===0)||(direction=='next'&&activeIndex==(this.$items.length-1))
if(willWrap&&!this.options.wrap)return active
var delta=direction=='prev'?-1:1
var itemIndex=(activeIndex+delta)%this.$items.length
return this.$items.eq(itemIndex)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getItemIndex(this.$active=this.$element.find('.item.active'))
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid.bs.carousel',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',this.$items.eq(pos))}
Carousel.prototype.pause=function(e){e||(this.paused=true)
if(this.$element.find('.next, .prev').length&&$.support.transition){this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||this.getItemForDirection(type,$active)
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var that=this
if($next.hasClass('active'))return(this.sliding=false)
var relatedTarget=$next[0]
var slideEvent=$.Event('slide.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
this.$element.trigger(slideEvent)
if(slideEvent.isDefaultPrevented())return
this.sliding=true
isCycling&&this.pause()
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator&&$nextIndicator.addClass('active')}
var slidEvent=$.Event('slid.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
if($.support.transition&&this.$element.hasClass('slide')){$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one('bsTransitionEnd',function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd(Carousel.TRANSITION_DURATION)}else{$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger(slidEvent)}
isCycling&&this.cycle()
return this}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
var old=$.fn.carousel
$.fn.carousel=Plugin
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
var clickHandler=function(e){var href
var $this=$(this)
var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
if(!$target.hasClass('carousel'))return
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=false
Plugin.call($target,options)
if(slideIndex){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()}
$(document).on('click.bs.carousel.data-api','[data-slide]',clickHandler).on('click.bs.carousel.data-api','[data-slide-to]',clickHandler)
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
Plugin.call($carousel,$carousel.data())})})}(jQuery);;

/* /web/static/lib/bootstrap/js/collapse.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.$trigger=$('[data-toggle="collapse"][href="#'+element.id+'"],'+'[data-toggle="collapse"][data-target="#'+element.id+'"]')
this.transitioning=null
if(this.options.parent){this.$parent=this.getParent()}else{this.addAriaAndCollapsedClass(this.$element,this.$trigger)}
if(this.options.toggle)this.toggle()}
Collapse.VERSION='3.3.4'
Collapse.TRANSITION_DURATION=350
Collapse.DEFAULTS={toggle:true}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var activesData
var actives=this.$parent&&this.$parent.children('.panel').children('.in, .collapsing')
if(actives&&actives.length){activesData=actives.data('bs.collapse')
if(activesData&&activesData.transitioning)return}
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
if(actives&&actives.length){Plugin.call(actives,'hide')
activesData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded',true)
this.$trigger.removeClass('collapsed').attr('aria-expanded',true)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded',false)
this.$trigger.addClass('collapsed').attr('aria-expanded',false)
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0).one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
Collapse.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element)
this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()}
Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=$element.hasClass('in')
$element.attr('aria-expanded',isOpen)
$trigger.toggleClass('collapsed',!isOpen).attr('aria-expanded',isOpen)}
function getTargetFromTrigger($trigger){var href
var target=$trigger.attr('data-target')||(href=$trigger.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
return $(target)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&/show|hide/.test(option))options.toggle=false
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.collapse
$.fn.collapse=Plugin
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle="collapse"]',function(e){var $this=$(this)
if(!$this.attr('data-target'))e.preventDefault()
var $target=getTargetFromTrigger($this)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
Plugin.call($target,option)})}(jQuery);;

/* /web/static/lib/bootstrap/js/dropdown.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';var backdrop='.dropdown-backdrop'
var toggle='[data-toggle="dropdown"]'
var Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.VERSION='3.3.4'
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement&&!$parent.closest('.navbar-nav').length){$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.trigger('focus').attr('aria-expanded','true')
$parent.toggleClass('open').trigger('shown.bs.dropdown',relatedTarget)}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27|32)/.test(e.which)||/input|textarea/i.test(e.target.tagName))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if((!isActive&&e.which!=27)||(isActive&&e.which==27)){if(e.which==27)$parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc=' li:not(.disabled):visible a'
var $items=$parent.find('[role="menu"]'+desc+', [role="listbox"]'+desc)
if(!$items.length)return
var index=$items.index(e.target)
if(e.which==38&&index>0)index--
if(e.which==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).trigger('focus')}
function clearMenus(e){if(e&&e.which===3)return
$(backdrop).remove()
$(toggle).each(function(){var $this=$(this)
var $parent=getParent($this)
var relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.attr('aria-expanded','false')
$parent.removeClass('open').trigger('hidden.bs.dropdown',relatedTarget)})}
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.dropdown
$.fn.dropdown=Plugin
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','[role="menu"]',Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','[role="listbox"]',Dropdown.prototype.keydown)}(jQuery);;

/* /web/static/lib/bootstrap/js/modal.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';var Modal=function(element,options){this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$dialog=this.$element.find('.modal-dialog')
this.$backdrop=null
this.isShown=null
this.originalBodyPad=null
this.scrollbarWidth=0
this.ignoreBackdropClick=false
if(this.options.remote){this.$element.find('.modal-content').load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.VERSION='3.3.4'
Modal.TRANSITION_DURATION=300
Modal.BACKDROP_TRANSITION_DURATION=150
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.checkScrollbar()
this.setScrollbar()
this.$body.addClass('modal-open')
this.escape()
this.resize()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.$dialog.on('mousedown.dismiss.bs.modal',function(){that.$element.one('mouseup.dismiss.bs.modal',function(e){if($(e.target).is(that.$element))that.ignoreBackdropClick=true})})
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(that.$body)}
that.$element.show().scrollTop(0)
that.adjustDialog()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in').attr('aria-hidden',false)
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$dialog.one('bsTransitionEnd',function(){that.$element.trigger('focus').trigger(e)}).emulateTransitionEnd(Modal.TRANSITION_DURATION):that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
this.resize()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').attr('aria-hidden',true).off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal')
this.$dialog.off('mousedown.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one('bsTransitionEnd',$.proxy(this.hideModal,this)).emulateTransitionEnd(Modal.TRANSITION_DURATION):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.trigger('focus')}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keydown.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keydown.dismiss.bs.modal')}}
Modal.prototype.resize=function(){if(this.isShown){$(window).on('resize.bs.modal',$.proxy(this.handleUpdate,this))}else{$(window).off('resize.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.$body.removeClass('modal-open')
that.resetAdjustments()
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){if(this.ignoreBackdropClick){this.ignoreBackdropClick=false
return}
if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus():this.hide()},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one('bsTransitionEnd',callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
var callbackRemove=function(){that.removeBackdrop()
callback&&callback()}
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one('bsTransitionEnd',callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove()}else if(callback){callback()}}
Modal.prototype.handleUpdate=function(){this.adjustDialog()}
Modal.prototype.adjustDialog=function(){var modalIsOverflowing=this.$element[0].scrollHeight>document.documentElement.clientHeight
this.$element.css({paddingLeft:!this.bodyIsOverflowing&&modalIsOverflowing?this.scrollbarWidth:'',paddingRight:this.bodyIsOverflowing&&!modalIsOverflowing?this.scrollbarWidth:''})}
Modal.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:'',paddingRight:''})}
Modal.prototype.checkScrollbar=function(){var fullWindowWidth=window.innerWidth
if(!fullWindowWidth){var documentElementRect=document.documentElement.getBoundingClientRect()
fullWindowWidth=documentElementRect.right-Math.abs(documentElementRect.left)}
this.bodyIsOverflowing=document.body.clientWidth<fullWindowWidth
this.scrollbarWidth=this.measureScrollbar()}
Modal.prototype.setScrollbar=function(){var bodyPad=parseInt((this.$body.css('padding-right')||0),10)
this.originalBodyPad=document.body.style.paddingRight||''
if(this.bodyIsOverflowing)this.$body.css('padding-right',bodyPad+this.scrollbarWidth)}
Modal.prototype.resetScrollbar=function(){this.$body.css('padding-right',this.originalBodyPad)}
Modal.prototype.measureScrollbar=function(){var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target.one('show.bs.modal',function(showEvent){if(showEvent.isDefaultPrevented())return
$target.one('hidden.bs.modal',function(){$this.is(':visible')&&$this.trigger('focus')})})
Plugin.call($target,option,this)})}(jQuery);;

/* /web/static/lib/bootstrap/js/tooltip.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';var Tooltip=function(element,options){this.type=null
this.options=null
this.enabled=null
this.timeout=null
this.hoverState=null
this.$element=null
this.init('tooltip',element,options)}
Tooltip.VERSION='3.3.4'
Tooltip.TRANSITION_DURATION=150
Tooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false,viewport:{selector:'body',padding:0}}
Tooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.$viewport=this.options.viewport&&$(this.options.viewport.selector||this.options.viewport)
if(this.$element[0]instanceof document.constructor&&!this.options.selector){throw new Error('`selector` option must be specified when initializing '+this.type+' on the window.document object!')}
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(self&&self.$tip&&self.$tip.is(':visible')){self.hoverState='in'
return}
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
var inDom=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0])
if(e.isDefaultPrevented()||!inDom)return
var that=this
var $tip=this.tip()
var tipId=this.getUID(this.type)
this.setContent()
$tip.attr('id',tipId)
this.$element.attr('aria-describedby',tipId)
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement).data('bs.'+this.type,this)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var orgPlacement=placement
var $container=this.options.container?$(this.options.container):this.$element.parent()
var containerDim=this.getPosition($container)
placement=placement=='bottom'&&pos.bottom+actualHeight>containerDim.bottom?'top':placement=='top'&&pos.top-actualHeight<containerDim.top?'bottom':placement=='right'&&pos.right+actualWidth>containerDim.width?'left':placement=='left'&&pos.left-actualWidth<containerDim.left?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
var complete=function(){var prevHoverState=that.hoverState
that.$element.trigger('shown.bs.'+that.type)
that.hoverState=null
if(prevHoverState=='out')that.leave(that)}
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()}}
Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top=offset.top+marginTop
offset.left=offset.left+marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight}
var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight)
if(delta.left)offset.left+=delta.left
else offset.top+=delta.top
var isVertical=/top|bottom/.test(placement)
var arrowDelta=isVertical?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight
var arrowOffsetPosition=isVertical?'offsetWidth':'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],isVertical)}
Tooltip.prototype.replaceArrow=function(delta,dimension,isVertical){this.arrow().css(isVertical?'left':'top',50*(1-delta/dimension)+'%').css(isVertical?'top':'left','')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(callback){var that=this
var $tip=$(this.$tip)
var e=$.Event('hide.bs.'+this.type)
function complete(){if(that.hoverState!='in')$tip.detach()
that.$element.removeAttr('aria-describedby').trigger('hidden.bs.'+that.type)
callback&&callback()}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()
this.hoverState=null
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof($e.attr('data-original-title'))!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function($element){$element=$element||this.$element
var el=$element[0]
var isBody=el.tagName=='BODY'
var elRect=el.getBoundingClientRect()
if(elRect.width==null){elRect=$.extend({},elRect,{width:elRect.right-elRect.left,height:elRect.bottom-elRect.top})}
var elOffset=isBody?{top:0,left:0}:$element.offset()
var scroll={scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop()}
var outerDims=isBody?{width:$(window).width(),height:$(window).height()}:null
return $.extend({},elRect,scroll,outerDims,elOffset)}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0}
if(!this.$viewport)return delta
var viewportPadding=this.options.viewport&&this.options.viewport.padding||0
var viewportDimensions=this.getPosition(this.$viewport)
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll
var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight
if(topEdgeOffset<viewportDimensions.top){delta.top=viewportDimensions.top-topEdgeOffset}else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height){delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}}else{var leftEdgeOffset=pos.left-viewportPadding
var rightEdgeOffset=pos.left+viewportPadding+actualWidth
if(leftEdgeOffset<viewportDimensions.left){delta.left=viewportDimensions.left-leftEdgeOffset}else if(rightEdgeOffset>viewportDimensions.width){delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}}
return delta}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*1000000)
while(document.getElementById(prefix))
return prefix}
Tooltip.prototype.tip=function(){return(this.$tip=this.$tip||$(this.options.template))}
Tooltip.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow'))}
Tooltip.prototype.enable=function(){this.enabled=true}
Tooltip.prototype.disable=function(){this.enabled=false}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=this
if(e){self=$(e.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions())
$(e.currentTarget).data('bs.'+this.type,self)}}
self.tip().hasClass('in')?self.leave(self):self.enter(self)}
Tooltip.prototype.destroy=function(){var that=this
clearTimeout(this.timeout)
this.hide(function(){that.$element.off('.'+that.type).removeData('bs.'+that.type)})}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tooltip
$.fn.tooltip=Plugin
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQuery);;

/* /web/static/lib/bootstrap/js/popover.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.VERSION='3.3.4'
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content').children().detach().end()[this.options.html?(typeof content=='string'?'html':'append'):'text'](content)
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.arrow'))}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
if(!data&&/destroy|hide/.test(option))return
if(!data)$this.data('bs.popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.popover
$.fn.popover=Plugin
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(jQuery);;

/* /web/static/lib/bootstrap/js/scrollspy.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';function ScrollSpy(element,options){this.$body=$(document.body)
this.$scrollElement=$(element).is(document.body)?$(window):$(element)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||'')+' .nav li > a'
this.offsets=[]
this.targets=[]
this.activeTarget=null
this.scrollHeight=0
this.$scrollElement.on('scroll.bs.scrollspy',$.proxy(this.process,this))
this.refresh()
this.process()}
ScrollSpy.VERSION='3.3.4'
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)}
ScrollSpy.prototype.refresh=function(){var that=this
var offsetMethod='offset'
var offsetBase=0
this.offsets=[]
this.targets=[]
this.scrollHeight=this.getScrollHeight()
if(!$.isWindow(this.$scrollElement[0])){offsetMethod='position'
offsetBase=this.$scrollElement.scrollTop()}
this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#./.test(href)&&$(href)
return($href&&$href.length&&$href.is(':visible')&&[[$href[offsetMethod]().top+offsetBase,href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){that.offsets.push(this[0])
that.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.getScrollHeight()
var maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(this.scrollHeight!=scrollHeight){this.refresh()}
if(scrollTop>=maxScroll){return activeTarget!=(i=targets[targets.length-1])&&this.activate(i)}
if(activeTarget&&scrollTop<offsets[0]){this.activeTarget=null
return this.clear()}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(offsets[i+1]===undefined||scrollTop<offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
this.clear()
var selector=this.selector+'[data-target="'+target+'"],'+
this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate.bs.scrollspy')}
ScrollSpy.prototype.clear=function(){$(this.selector).parentsUntil(this.options.target,'.active').removeClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.scrollspy
$.fn.scrollspy=Plugin
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load.bs.scrollspy.data-api',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
Plugin.call($spy,$spy.data())})})}(jQuery);;

/* /web/static/lib/bootstrap/js/tab.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';var Tab=function(element){this.element=$(element)}
Tab.VERSION='3.3.4'
Tab.TRANSITION_DURATION=150
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var $previous=$ul.find('.active:last a')
var hideEvent=$.Event('hide.bs.tab',{relatedTarget:$this[0]})
var showEvent=$.Event('show.bs.tab',{relatedTarget:$previous[0]})
$previous.trigger(hideEvent)
$this.trigger(showEvent)
if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$previous.trigger({type:'hidden.bs.tab',relatedTarget:$this[0]})
$this.trigger({type:'shown.bs.tab',relatedTarget:$previous[0]})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&(($active.length&&$active.hasClass('fade'))||!!container.find('> .fade').length)
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',false)
element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded',true)
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu').length){element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',true)}
callback&&callback()}
$active.length&&transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(Tab.TRANSITION_DURATION):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tab
$.fn.tab=Plugin
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
var clickHandler=function(e){e.preventDefault()
Plugin.call($(this),'show')}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"]',clickHandler).on('click.bs.tab.data-api','[data-toggle="pill"]',clickHandler)}(jQuery);;

/* /web/static/lib/bootstrap/js/transition.js defined in bundle 'website.assets_frontend' */
+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}
return false}
$.fn.emulateTransitionEnd=function(duration){var called=false
var $el=this
$(this).one('bsTransitionEnd',function(){called=true})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()
if(!$.support.transition)return
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);;

/* /openschool_core/static/src/js/owl.carousel.min.js defined in bundle 'website.assets_frontend' */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this.drag=a.extend({},m),this.state=a.extend({},n),this.e=a.extend({},o),this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._invalidated={},this._pipe=[],a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a[0].toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Pipe,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}function f(a){if(a.touches!==d)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(a.touches===d){if(a.pageX!==d)return{x:a.pageX,y:a.pageY};if(a.pageX===d)return{x:a.clientX,y:a.clientY}}}function g(a){var b,d,e=c.createElement("div"),f=a;for(b in f)if(d=f[b],"undefined"!=typeof e.style[d])return e=null,[d,b];return[!1]}function h(){return g(["transition","WebkitTransition","MozTransition","OTransition"])[1]}function i(){return g(["transform","WebkitTransform","MozTransform","OTransform","msTransform"])[0]}function j(){return g(["perspective","webkitPerspective","MozPerspective","OPerspective","MsPerspective"])[0]}function k(){return"ontouchstart"in b||!!navigator.msMaxTouchPoints}function l(){return b.navigator.msPointerEnabled}var m,n,o;m={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,offsetX:0,offsetY:0,distance:null,startTime:0,endTime:0,updatedX:0,targetEl:null},n={isTouch:!1,isScrolling:!1,isSwiping:!1,direction:!1,inMotion:!1},o={_onDragStart:null,_onDragMove:null,_onDragEnd:null,_transitionEnd:null,_resizer:null,_responsiveCall:null,_goToLoop:null,_checkVisibile:null},e.Defaults={items:3,loop:!1,center:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,responsiveClass:!1,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",themeClass:"owl-theme",baseClass:"owl-carousel",itemClass:"owl-item",centerClass:"center",activeClass:"active"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Plugins={},e.Pipe=[{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){var a=this._clones,b=this.$stage.children(".cloned");(b.length!==a.length||!this.settings.loop&&a.length>0)&&(this.$stage.children(".cloned").remove(),this._clones=[])}},{filter:["items","settings"],run:function(){var a,b,c=this._clones,d=this._items,e=this.settings.loop?c.length-Math.max(2*this.settings.items,4):0;for(a=0,b=Math.abs(e/2);b>a;a++)e>0?(this.$stage.children().eq(d.length+c.length-1).remove(),c.pop(),this.$stage.children().eq(0).remove(),c.pop()):(c.push(c.length/2),this.$stage.append(d[c[c.length-1]].clone().addClass("cloned")),c.push(d.length-1-(c.length-1)/2),this.$stage.prepend(d[c[c.length-1]].clone().addClass("cloned")))}},{filter:["width","items","settings"],run:function(){var a,b,c,d=this.settings.rtl?1:-1,e=(this.width()/this.settings.items).toFixed(3),f=0;for(this._coordinates=[],b=0,c=this._clones.length+this._items.length;c>b;b++)a=this._mergers[this.relative(b)],a=this.settings.mergeFit&&Math.min(a,this.settings.items)||a,f+=(this.settings.autoWidth?this._items[this.relative(b)].width()+this.settings.margin:e*a)*d,this._coordinates.push(f)}},{filter:["width","items","settings"],run:function(){var b,c,d=(this.width()/this.settings.items).toFixed(3),e={width:Math.abs(this._coordinates[this._coordinates.length-1])+2*this.settings.stagePadding,"padding-left":this.settings.stagePadding||"","padding-right":this.settings.stagePadding||""};if(this.$stage.css(e),e={width:this.settings.autoWidth?"auto":d-this.settings.margin},e[this.settings.rtl?"margin-left":"margin-right"]=this.settings.margin,!this.settings.autoWidth&&a.grep(this._mergers,function(a){return a>1}).length>0)for(b=0,c=this._coordinates.length;c>b;b++)e.width=Math.abs(this._coordinates[b])-Math.abs(this._coordinates[b-1]||0)-this.settings.margin,this.$stage.children().eq(b).css(e);else this.$stage.children().css(e)}},{filter:["width","items","settings"],run:function(a){a.current&&this.reset(this.$stage.children().index(a.current))}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;d>c;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children("."+this.settings.activeClass).removeClass(this.settings.activeClass),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass(this.settings.activeClass),this.settings.center&&(this.$stage.children("."+this.settings.centerClass).removeClass(this.settings.centerClass),this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))}}],e.prototype.initialize=function(){if(this.trigger("initialize"),this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl",this.settings.rtl),this.browserSupport(),this.settings.autoWidth&&this.state.imagesLoaded!==!0){var b,c,e;if(b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&0>=e)return this.preloadAutoWidthImages(b),!1}this.$element.addClass("owl-loading"),this.$stage=a("<"+this.settings.stageElement+' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this._width=this.$element.width(),this.refresh(),this.$element.removeClass("owl-loading").addClass("owl-loaded"),this.eventsCall(),this.internalEvents(),this.addTriggerableEvents(),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){b>=a&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),delete e.responsive,e.responsiveClass&&this.$element.attr("class",function(a,b){return b.replace(/\b owl-responsive-\S+/g,"")}).addClass("owl-responsive-"+d)):e=a.extend({},this.options),(null===this.settings||this._breakpoint!==d)&&(this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}}))},e.prototype.optionsLogic=function(){this.$element.toggleClass("owl-center",this.settings.center),this.settings.loop&&this._items.length<this.settings.items&&(this.settings.loop=!1),this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.settings.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};c>b;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={}},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){if(0===this._items.length)return!1;(new Date).getTime();this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$stage.addClass("owl-refresh"),this.update(),this.$stage.removeClass("owl-refresh"),this.state.orientation=b.orientation,this.watchVisibility(),this.trigger("refreshed")},e.prototype.eventsCall=function(){this.e._onDragStart=a.proxy(function(a){this.onDragStart(a)},this),this.e._onDragMove=a.proxy(function(a){this.onDragMove(a)},this),this.e._onDragEnd=a.proxy(function(a){this.onDragEnd(a)},this),this.e._onResize=a.proxy(function(a){this.onResize(a)},this),this.e._transitionEnd=a.proxy(function(a){this.transitionEnd(a)},this),this.e._preventClick=a.proxy(function(a){this.preventClick(a)},this)},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this.e._onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return this._items.length?this._width===this.$element.width()?!1:this.trigger("resize").isDefaultPrevented()?!1:(this._width=this.$element.width(),this.invalidate("width"),this.refresh(),void this.trigger("resized")):!1},e.prototype.eventsRouter=function(a){var b=a.type;"mousedown"===b||"touchstart"===b?this.onDragStart(a):"mousemove"===b||"touchmove"===b?this.onDragMove(a):"mouseup"===b||"touchend"===b?this.onDragEnd(a):"touchcancel"===b&&this.onDragEnd(a)},e.prototype.internalEvents=function(){var c=(k(),l());this.settings.mouseDrag?(this.$stage.on("mousedown",a.proxy(function(a){this.eventsRouter(a)},this)),this.$stage.on("dragstart",function(){return!1}),this.$stage.get(0).onselectstart=function(){return!1}):this.$element.addClass("owl-text-select-on"),this.settings.touchDrag&&!c&&this.$stage.on("touchstart touchcancel",a.proxy(function(a){this.eventsRouter(a)},this)),this.transitionEndVendor&&this.on(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd,!1),this.settings.responsive!==!1&&this.on(b,"resize",a.proxy(this.onThrottledResize,this))},e.prototype.onDragStart=function(d){var e,g,h,i;if(e=d.originalEvent||d||b.event,3===e.which||this.state.isTouch)return!1;if("mousedown"===e.type&&this.$stage.addClass("owl-grab"),this.trigger("drag"),this.drag.startTime=(new Date).getTime(),this.speed(0),this.state.isTouch=!0,this.state.isScrolling=!1,this.state.isSwiping=!1,this.drag.distance=0,g=f(e).x,h=f(e).y,this.drag.offsetX=this.$stage.position().left,this.drag.offsetY=this.$stage.position().top,this.settings.rtl&&(this.drag.offsetX=this.$stage.position().left+this.$stage.width()-this.width()+this.settings.margin),this.state.inMotion&&this.support3d)i=this.getTransformProperty(),this.drag.offsetX=i,this.animate(i),this.state.inMotion=!0;else if(this.state.inMotion&&!this.support3d)return this.state.inMotion=!1,!1;this.drag.startX=g-this.drag.offsetX,this.drag.startY=h-this.drag.offsetY,this.drag.start=g-this.drag.startX,this.drag.targetEl=e.target||e.srcElement,this.drag.updatedX=this.drag.start,("IMG"===this.drag.targetEl.tagName||"A"===this.drag.targetEl.tagName)&&(this.drag.targetEl.draggable=!1),a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",a.proxy(function(a){this.eventsRouter(a)},this))},e.prototype.onDragMove=function(a){var c,e,g,h,i,j;this.state.isTouch&&(this.state.isScrolling||(c=a.originalEvent||a||b.event,e=f(c).x,g=f(c).y,this.drag.currentX=e-this.drag.startX,this.drag.currentY=g-this.drag.startY,this.drag.distance=this.drag.currentX-this.drag.offsetX,this.drag.distance<0?this.state.direction=this.settings.rtl?"right":"left":this.drag.distance>0&&(this.state.direction=this.settings.rtl?"left":"right"),this.settings.loop?this.op(this.drag.currentX,">",this.coordinates(this.minimum()))&&"right"===this.state.direction?this.drag.currentX-=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length):this.op(this.drag.currentX,"<",this.coordinates(this.maximum()))&&"left"===this.state.direction&&(this.drag.currentX+=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length)):(h=this.coordinates(this.settings.rtl?this.maximum():this.minimum()),i=this.coordinates(this.settings.rtl?this.minimum():this.maximum()),j=this.settings.pullDrag?this.drag.distance/5:0,this.drag.currentX=Math.max(Math.min(this.drag.currentX,h+j),i+j)),(this.drag.distance>8||this.drag.distance<-8)&&(c.preventDefault!==d?c.preventDefault():c.returnValue=!1,this.state.isSwiping=!0),this.drag.updatedX=this.drag.currentX,(this.drag.currentY>16||this.drag.currentY<-16)&&this.state.isSwiping===!1&&(this.state.isScrolling=!0,this.drag.updatedX=this.drag.start),this.animate(this.drag.updatedX)))},e.prototype.onDragEnd=function(b){var d,e,f;if(this.state.isTouch){if("mouseup"===b.type&&this.$stage.removeClass("owl-grab"),this.trigger("dragged"),this.drag.targetEl.removeAttribute("draggable"),this.state.isTouch=!1,this.state.isScrolling=!1,this.state.isSwiping=!1,0===this.drag.distance&&this.state.inMotion!==!0)return this.state.inMotion=!1,!1;this.drag.endTime=(new Date).getTime(),d=this.drag.endTime-this.drag.startTime,e=Math.abs(this.drag.distance),(e>3||d>300)&&this.removeClick(this.drag.targetEl),f=this.closest(this.drag.updatedX),this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(f),this.invalidate("position"),this.update(),this.settings.pullDrag||this.drag.updatedX!==this.coordinates(f)||this.transitionEnd(),this.drag.distance=0,a(c).off(".owl.dragEvents")}},e.prototype.removeClick=function(c){this.drag.targetEl=c,a(c).on("click.preventClick",this.e._preventClick),b.setTimeout(function(){a(c).off("click.preventClick")},300)},e.prototype.preventClick=function(b){b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation&&b.stopPropagation(),a(b.target).off("click.preventClick")},e.prototype.getTransformProperty=function(){var a,c;return a=b.getComputedStyle(this.$stage.get(0),null).getPropertyValue(this.vendorName+"transform"),a=a.replace(/matrix(3d)?\(|\)/g,"").split(","),c=16===a.length,c!==!0?a[4]:a[12]},e.prototype.closest=function(b){var c=-1,d=30,e=this.width(),f=this.coordinates();return this.settings.freeDrag||a.each(f,a.proxy(function(a,g){return b>g-d&&g+d>b?c=a:this.op(b,"<",g)&&this.op(b,">",f[a+1]||g-e)&&(c="left"===this.state.direction?a+1:a),-1===c},this)),this.settings.loop||(this.op(b,">",f[this.minimum()])?c=b=this.minimum():this.op(b,"<",f[this.maximum()])&&(c=b=this.maximum())),c},e.prototype.animate=function(b){this.trigger("translate"),this.state.inMotion=this.speed()>0,this.support3d?this.$stage.css({transform:"translate3d("+b+"px,0px, 0px)",transition:this.speed()/1e3+"s"}):this.state.isTouch?this.$stage.css({left:b+"px"}):this.$stage.animate({left:b},this.speed()/1e3,this.settings.fallbackEasing,a.proxy(function(){this.state.inMotion&&this.transitionEnd()},this))},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(a){this._invalidated[a]=!0},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(b,c){var e=c?this._items.length:this._items.length+this._clones.length;return!a.isNumeric(b)||1>e?d:b=this._clones.length?(b%e+e)%e:Math.max(this.minimum(c),Math.min(this.maximum(c),b))},e.prototype.relative=function(a){return a=this.normalize(a),a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=0,f=this.settings;if(a)return this._items.length-1;if(!f.loop&&f.center)b=this._items.length-1;else if(f.loop||f.center)if(f.loop||f.center)b=this._items.length+f.items;else{if(!f.autoWidth&&!f.merge)throw"Can not detect maximum absolute position.";for(revert=f.rtl?1:-1,c=this.$stage.width()-this.$element.width();(d=this.coordinates(e))&&!(d*revert>=c);)b=++e}else b=this._items.length-f.items;return b},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c=null;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[b-1]||0))/2*(this.settings.rtl?-1:1)):c=this._coordinates[b-1]||0,c)},e.prototype.duration=function(a,b,c){return Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(c,d){if(this.settings.loop){var e=c-this.relative(this.current()),f=this.current(),g=this.current(),h=this.current()+e,i=0>g-h?!0:!1,j=this._clones.length+this._items.length;h<this.settings.items&&i===!1?(f=g+this._items.length,this.reset(f)):h>=j-this.settings.items&&i===!0&&(f=g-this._items.length,this.reset(f)),b.clearTimeout(this.e._goToLoop),this.e._goToLoop=b.setTimeout(a.proxy(function(){this.speed(this.duration(this.current(),f+e,d)),this.current(f+e),this.update()},this),30)}else this.speed(this.duration(this.current(),c,d)),this.current(c),this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.transitionEnd=function(a){return a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0))?!1:(this.state.inMotion=!1,void this.trigger("translated"))},e.prototype.viewport=function(){var d;if(this.options.responsiveBaseElement!==b)d=a(this.options.responsiveBaseElement).width();else if(b.innerWidth)d=b.innerWidth;else{if(!c.documentElement||!c.documentElement.clientWidth)throw"Can not detect viewport width.";d=c.documentElement.clientWidth}return d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)},this)),this.reset(a.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(a,b){b=b===d?this._items.length:this.normalize(b,!0),this.trigger("add",{content:a,position:b}),0===this._items.length||b===this._items.length?(this.$stage.append(a),this._items.push(a),this._mergers.push(1*a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)):(this._items[b].before(a),this._items.splice(b,0,a),this._mergers.splice(b,0,1*a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)),this.invalidate("items"),this.trigger("added",{content:a,position:b})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.addTriggerableEvents=function(){var b=a.proxy(function(b,c){return a.proxy(function(a){a.relatedTarget!==this&&(this.suppress([c]),b.apply(this,[].slice.call(arguments,1)),this.release([c]))},this)},this);a.each({next:this.next,prev:this.prev,to:this.to,destroy:this.destroy,refresh:this.refresh,replace:this.replace,add:this.add,remove:this.remove},a.proxy(function(a,c){this.$element.on(a+".owl.carousel",b(c,a+".owl.carousel"))},this))},e.prototype.watchVisibility=function(){function c(a){return a.offsetWidth>0&&a.offsetHeight>0}function d(){c(this.$element.get(0))&&(this.$element.removeClass("owl-hidden"),this.refresh(),b.clearInterval(this.e._checkVisibile))}c(this.$element.get(0))||(this.$element.addClass("owl-hidden"),b.clearInterval(this.e._checkVisibile),this.e._checkVisibile=b.setInterval(a.proxy(d,this),500))},e.prototype.preloadAutoWidthImages=function(b){var c,d,e,f;c=0,d=this,b.each(function(g,h){e=a(h),f=new Image,f.onload=function(){c++,e.attr("src",f.src),e.css("opacity",1),c>=b.length&&(d.state.imagesLoaded=!0,d.initialize())},f.src=e.attr("src")||e.attr("data-src")||e.attr("data-src-retina")})},e.prototype.destroy=function(){this.$element.hasClass(this.settings.themeClass)&&this.$element.removeClass(this.settings.themeClass),this.settings.responsive!==!1&&a(b).off("resize.owl.carousel"),this.transitionEndVendor&&this.off(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd);for(var d in this._plugins)this._plugins[d].destroy();(this.settings.mouseDrag||this.settings.touchDrag)&&(this.$stage.off("mousedown touchstart touchcancel"),a(c).off(".owl.dragEvents"),this.$stage.get(0).onselectstart=function(){},this.$stage.off("dragstart",function(){return!1})),this.$element.off(".owl"),this.$stage.children(".cloned").remove(),this.e=null,this.$element.removeData("owlCarousel"),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.unwrap()},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:c>a;case">":return d?c>a:a>c;case">=":return d?c>=a:a>=c;case"<=":return d?a>=c:c>=a}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d){var e={item:{count:this._items.length,index:this.current()}},f=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),g=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},e,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(g)}),this.$element.trigger(g),this.settings&&"function"==typeof this.settings[f]&&this.settings[f].apply(this,g)),g},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.browserSupport=function(){if(this.support3d=j(),this.support3d){this.transformVendor=i();var a=["transitionend","webkitTransitionEnd","transitionend","oTransitionEnd"];this.transitionEndVendor=a[h()],this.vendorName=this.transformVendor.replace(/Transform/i,""),this.vendorName=""!==this.vendorName?"-"+this.vendorName.toLowerCase()+"-":""}this.state.orientation=b.orientation},a.fn.owlCarousel=function(b){return this.each(function(){a(this).data("owlCarousel")||a(this).data("owlCarousel",new e(this,b))})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b){var c=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,d=c.center&&Math.ceil(c.items/2)||c.items,e=c.center&&-1*d||0,f=(b.property&&b.property.value||this._core.current())+e,g=this._core.clones().length,h=a.proxy(function(a,b){this.load(b)},this);e++<d;)this.load(g/2+this._core.relative(f)),g&&a.each(this._core.clones(this._core.relative(f++)),h)},this)},this._core.options=a.extend({},c.Defaults,this._core.options),this._core.$element.on(this._handlers)};c.Defaults={lazyLoad:!1},c.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":"url("+g+")",opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},c.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=c}(window.Zepto||window.jQuery,window,document),function(a){var b=function(c){this._core=c,this._handlers={"initialized.owl.carousel":a.proxy(function(){this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass)===this._core.$stage.children().eq(this._core.current())&&this.update()},this)},this._core.options=a.extend({},b.Defaults,this._core.options),this._core.$element.on(this._handlers)};b.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},b.prototype.update=function(){this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)},b.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=b}(window.Zepto||window.jQuery,window,document),function(a,b,c){var d=function(b){this._core=b,this._videos={},this._playing=null,this._fullscreen=!1,this._handlers={"resize.owl.carousel":a.proxy(function(a){this._core.settings.video&&!this.isInFullScreen()&&a.preventDefault()},this),"refresh.owl.carousel changed.owl.carousel":a.proxy(function(){this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))},this)},this._core.options=a.extend({},d.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};d.Defaults={video:!1,videoHeight:!1,videoWidth:!1},d.prototype.fetch=function(a,b){var c=a.attr("data-vimeo-id")?"vimeo":"youtube",d=a.attr("data-vimeo-id")||a.attr("data-youtube-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else{if(!(d[3].indexOf("vimeo")>-1))throw new Error("Video URL not supported.");c="vimeo"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},d.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};return b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length?(l(h.attr(i)),h.remove(),!1):void("youtube"===c.type?(f="http://img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type&&a.ajax({type:"GET",url:"http://vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}))},d.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null},d.prototype.play=function(b){this._core.trigger("play",null,"video"),this._playing&&this.stop();var c,d,e=a(b.target||b.srcElement),f=e.closest("."+this._core.settings.itemClass),g=this._videos[f.attr("data-video")],h=g.width||"100%",i=g.height||this._core.$stage.height();"youtube"===g.type?c='<iframe width="'+h+'" height="'+i+'" src="http://www.youtube.com/embed/'+g.id+"?autoplay=1&v="+g.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===g.type&&(c='<iframe src="http://player.vimeo.com/video/'+g.id+'?autoplay=1" width="'+h+'" height="'+i+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),f.addClass("owl-video-playing"),this._playing=f,d=a('<div style="height:'+i+"px; width:"+h+'px" class="owl-video-frame">'+c+"</div>"),e.after(d)},d.prototype.isInFullScreen=function(){var d=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return d&&a(d).parent().hasClass("owl-video-frame")&&(this._core.speed(0),this._fullscreen=!0),d&&this._fullscreen&&this._playing?!1:this._fullscreen?(this._fullscreen=!1,!1):this._playing&&this._core.state.orientation!==b.orientation?(this._core.state.orientation=b.orientation,!1):!0},d.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=d}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){this.swapping="translated"==a.type},this),"translate.owl.carousel":a.proxy(function(){this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&this.core.support3d){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",c)),f&&e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",c))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.transitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c){var d=function(b){this.core=b,this.core.options=a.extend({},d.Defaults,this.core.options),this.handlers={"translated.owl.carousel refreshed.owl.carousel":a.proxy(function(){this.autoplay()},this),"play.owl.autoplay":a.proxy(function(a,b,c){this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(){this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this.core.settings.autoplayHoverPause&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this.core.settings.autoplayHoverPause&&this.autoplay()},this)},this.core.$element.on(this.handlers)};d.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},d.prototype.autoplay=function(){this.core.settings.autoplay&&!this.core.state.videoPlay?(b.clearInterval(this.interval),this.interval=b.setInterval(a.proxy(function(){this.play()},this),this.core.settings.autoplayTimeout)):b.clearInterval(this.interval)},d.prototype.play=function(){return c.hidden===!0||this.core.state.isTouch||this.core.state.isScrolling||this.core.state.isSwiping||this.core.state.inMotion?void 0:this.core.settings.autoplay===!1?void b.clearInterval(this.interval):void this.core.next(this.core.settings.autoplaySpeed)},d.prototype.stop=function(){b.clearInterval(this.interval)},d.prototype.pause=function(){b.clearInterval(this.interval)},d.prototype.destroy=function(){var a,c;b.clearInterval(this.interval);for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=d}(window.Zepto||window.jQuery,window,document),function(a){"use strict";var b=function(c){this._core=c,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){this._core.settings.dotsData&&this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))},this),"add.owl.carousel":a.proxy(function(b){this._core.settings.dotsData&&this._templates.splice(b.position,0,a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))},this),"remove.owl.carousel prepared.owl.carousel":a.proxy(function(a){this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"change.owl.carousel":a.proxy(function(a){if("position"==a.property.name&&!this._core.state.revert&&!this._core.settings.loop&&this._core.settings.navRewind){var b=this._core.current(),c=this._core.maximum(),d=this._core.minimum();a.data=a.property.value>c?b>=c?d:c:a.property.value<d?c:a.property.value}},this),"changed.owl.carousel":a.proxy(function(a){"position"==a.property.name&&this.draw()},this),"refreshed.owl.carousel":a.proxy(function(){this._initialized||(this.initialize(),this._initialized=!0),this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation")},this)},this._core.options=a.extend({},b.Defaults,this._core.options),this.$element.on(this._handlers)};b.Defaults={nav:!1,navRewind:!0,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotData:!1,dotsSpeed:!1,dotsContainer:!1,controlsClass:"owl-controls"},b.prototype.initialize=function(){var b,c,d=this._core.settings;d.dotsData||(this._templates=[a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]),d.navContainer&&d.dotsContainer||(this._controls.$container=a("<div>").addClass(d.controlsClass).appendTo(this.$element)),this._controls.$indicators=d.dotsContainer?a(d.dotsContainer):a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container),this._controls.$indicators.on("click","div",a.proxy(function(b){var c=a(b.target).parent().is(this._controls.$indicators)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(c,d.dotsSpeed)},this)),b=d.navContainer?a(d.navContainer):a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container),this._controls.$next=a("<"+d.navElement+">"),this._controls.$previous=this._controls.$next.clone(),this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click",a.proxy(function(){this.prev(d.navSpeed)},this)),this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click",a.proxy(function(){this.next(d.navSpeed)},this));for(c in this._overrides)this._core[c]=a.proxy(this[c],this)},b.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},b.prototype.update=function(){var a,b,c,d=this._core.settings,e=this._core.clones().length/2,f=e+this._core.items().length,g=d.center||d.autoWidth||d.dotData?1:d.dotsEach||d.items;if("page"!==d.slideBy&&(d.slideBy=Math.min(d.slideBy,d.items)),d.dots||"page"==d.slideBy)for(this._pages=[],a=e,b=0,c=0;f>a;a++)(b>=g||0===b)&&(this._pages.push({start:a-e,end:a-e+g-1}),b=0,++c),b+=this._core.mergers(this._core.relative(a))},b.prototype.draw=function(){var b,c,d="",e=this._core.settings,f=(this._core.$stage.children(),this._core.relative(this._core.current()));if(!e.nav||e.loop||e.navRewind||(this._controls.$previous.toggleClass("disabled",0>=f),this._controls.$next.toggleClass("disabled",f>=this._core.maximum())),this._controls.$previous.toggle(e.nav),this._controls.$next.toggle(e.nav),e.dots){if(b=this._pages.length-this._controls.$indicators.children().length,e.dotData&&0!==b){for(c=0;c<this._controls.$indicators.children().length;c++)d+=this._templates[this._core.relative(c)];this._controls.$indicators.html(d)}else b>0?(d=new Array(b+1).join(this._templates[0]),this._controls.$indicators.append(d)):0>b&&this._controls.$indicators.children().slice(b).remove();this._controls.$indicators.find(".active").removeClass("active"),this._controls.$indicators.children().eq(a.inArray(this.current(),this._pages)).addClass("active")}this._controls.$indicators.toggle(e.dots)},b.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotData?1:c.dotsEach||c.items)}},b.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,function(a){return a.start<=b&&a.end>=b}).pop()},b.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},b.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},b.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},b.prototype.to=function(b,c,d){var e;d?a.proxy(this._overrides.to,this._core)(b,c):(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c))},a.fn.owlCarousel.Constructor.Plugins.Navigation=b}(window.Zepto||window.jQuery,window,document),function(a,b){"use strict";var c=function(d){this._core=d,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(){"URLHash"==this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){var c=a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");this._hashes[c]=b.content},this)},this._core.options=a.extend({},c.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(){var a=b.location.hash.substring(1),c=this._core.$stage.children(),d=this._hashes[a]&&c.index(this._hashes[a])||0;return a?void this._core.to(d,!1,!0):!1},this))};c.Defaults={URLhashListener:!1},c.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=c}(window.Zepto||window.jQuery,window,document);;

/* /openschool_core/static/src/js/jquery.sticky.js defined in bundle 'website.assets_frontend' */
(function($){var defaults={topSpacing:0,bottomSpacing:0,className:'is-sticky',wrapperClassName:'sticky-wrapper',center:false,getWidthFrom:'',responsiveWidth:false},$window=$(window),$document=$(document),sticked=[],windowHeight=$window.height(),scroller=function(){var scrollTop=$window.scrollTop(),documentHeight=$document.height(),dwh=documentHeight-windowHeight,extra=(scrollTop>dwh)?dwh-scrollTop:0;for(var i=0;i<sticked.length;i++){var s=sticked[i],elementTop=s.stickyWrapper.offset().top,etse=elementTop-s.topSpacing-extra;if(scrollTop<=etse){if(s.currentTop!==null){s.stickyElement.css('position','').css('top','');s.stickyElement.trigger('sticky-end',[s]).parent().removeClass(s.className);s.currentTop=null;}}
else{var newTop=documentHeight-s.stickyElement.outerHeight()
-s.topSpacing-s.bottomSpacing-scrollTop-extra;if(newTop<0){newTop=newTop+s.topSpacing;}else{newTop=s.topSpacing;}
if(s.currentTop!=newTop){s.stickyElement.css('position','fixed').css('top',newTop);if(typeof s.getWidthFrom!=='undefined'){s.stickyElement.css('width',$(s.getWidthFrom).width());}
s.stickyElement.trigger('sticky-start',[s]).parent().addClass(s.className);s.currentTop=newTop;}}}},resizer=function(){windowHeight=$window.height();for(var i=0;i<sticked.length;i++){var s=sticked[i];if(typeof s.getWidthFrom!=='undefined'&&s.responsiveWidth===true){s.stickyElement.css('width',$(s.getWidthFrom).width());}}},methods={init:function(options){var o=$.extend({},defaults,options);return this.each(function(){var stickyElement=$(this);var stickyId=stickyElement.attr('id');var wrapperId=stickyId?stickyId+'-'+defaults.wrapperClassName:defaults.wrapperClassName
var wrapper=$('<div></div>').attr('id',stickyId+'-sticky-wrapper').addClass(o.wrapperClassName);stickyElement.wrapAll(wrapper);if(o.center){stickyElement.parent().css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});}
if(stickyElement.css("float")=="right"){stickyElement.css({"float":"none"}).parent().css({"float":"right"});}
var stickyWrapper=stickyElement.parent();stickyWrapper.css('height',stickyElement.outerHeight());sticked.push({topSpacing:o.topSpacing,bottomSpacing:o.bottomSpacing,stickyElement:stickyElement,currentTop:null,stickyWrapper:stickyWrapper,className:o.className,getWidthFrom:o.getWidthFrom,responsiveWidth:o.responsiveWidth});});},update:scroller,unstick:function(options){return this.each(function(){var unstickyElement=$(this);var removeIdx=-1;for(var i=0;i<sticked.length;i++)
{if(sticked[i].stickyElement.get(0)==unstickyElement.get(0))
{removeIdx=i;}}
if(removeIdx!=-1)
{sticked.splice(removeIdx,1);unstickyElement.unwrap();unstickyElement.removeAttr('style');}});}};if(window.addEventListener){window.addEventListener('scroll',scroller,false);window.addEventListener('resize',resizer,false);}else if(window.attachEvent){window.attachEvent('onscroll',scroller);window.attachEvent('onresize',resizer);}
$.fn.sticky=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+method+' does not exist on jQuery.sticky');}};$.fn.unstick=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.unstick.apply(this,arguments);}else{$.error('Method '+method+' does not exist on jQuery.sticky');}};$(function(){setTimeout(scroller,0);});})(jQuery);;

/* /openschool_core/static/src/js/jquery.easing.1.3.min.js defined in bundle 'website.assets_frontend' */
jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return jQuery.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return jQuery.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}});

/* /openschool_core/static/src/js/main.js defined in bundle 'website.assets_frontend' */
jQuery(document).ready(function($){$(".mainmenu-area").sticky({topSpacing:0});$('.product-carousel').owlCarousel({loop:true,nav:true,margin:20,responsiveClass:true,responsive:{0:{items:1,},600:{items:3,},1000:{items:5,}}});$('.related-products-carousel').owlCarousel({loop:true,nav:true,margin:20,responsiveClass:true,responsive:{0:{items:1,},600:{items:2,},1000:{items:2,},1200:{items:3,}}});$('.brand-list').owlCarousel({loop:true,nav:true,margin:20,responsiveClass:true,responsive:{0:{items:1,},600:{items:3,},1000:{items:4,}}});$(".navbar-nav li a").click(function(){$(".navbar-collapse").removeClass('in');});$('.navbar-nav li a, .scroll-to-up').bind('click',function(event){var $anchor=$(this);var headerH=$('.header-area').outerHeight();$('html, body').stop().animate({scrollTop:$($anchor.attr('href')).offset().top-headerH+"px"},1200,'easeInOutExpo');event.preventDefault();});$('body').scrollspy({target:'.navbar-collapse',offset:95})});;

/* /website_portal/static/src/js/website_portal.js defined in bundle 'website.assets_frontend' */
odoo.define('website_portal',function(require){'use strict';require('website.website');if(!$('.o_website_portal_details, .o_my_show_more').length){return $.Deferred().reject("DOM doesn't contain '.o_website_portal_details' or '.o_my_show_more'");}
var state_options=$("select[name='state_id']:enabled option:not(:first)");$('.o_website_portal_details').on('change',"select[name='country_id']",function(){var select=$("select[name='state_id']");state_options.detach();var displayed_state=state_options.filter("[data-country_id="+($(this).val()||0)+"]");var nb=displayed_state.appendTo(select).show().size();select.parent().toggle(nb>=1);});$('.o_website_portal_details').find("select[name='country_id']").change();$('.o_my_show_more').on('click',function(ev){ev.preventDefault();$(this).parents('table').find(".to_hide").toggleClass('hidden');$(this).find('span').toggleClass('hidden');});});;

/* /website_cookie_notice/static/src/js/accept_cookies.js defined in bundle 'website.assets_frontend' */
odoo.define('website_cookie_notice.cookie_notice',function(require){"use strict";var ajax=require('web.ajax');var base=require('web_editor.base');base.ready().done(function(){$(".cc-cookies .btn-primary").click(function(e){e.preventDefault();ajax.jsonRpc('/website_cookie_notice/ok','call').then(function(data){if(data.result=='ok'){$(e.target).closest(".cc-cookies").hide("fast");}});});});});;

/* /web/static/lib/zeroclipboard/ZeroClipboard.js defined in bundle 'website.assets_frontend' */
(function(window,undefined){"use strict";var _window=window,_document=_window.document,_navigator=_window.navigator,_setTimeout=_window.setTimeout,_encodeURIComponent=_window.encodeURIComponent,_ActiveXObject=_window.ActiveXObject,_Error=_window.Error,_parseInt=_window.Number.parseInt||_window.parseInt,_parseFloat=_window.Number.parseFloat||_window.parseFloat,_isNaN=_window.Number.isNaN||_window.isNaN,_round=_window.Math.round,_now=_window.Date.now,_keys=_window.Object.keys,_defineProperty=_window.Object.defineProperty,_hasOwn=_window.Object.prototype.hasOwnProperty,_slice=_window.Array.prototype.slice,_unwrap=function(){var unwrapper=function(el){return el;};if(typeof _window.wrap==="function"&&typeof _window.unwrap==="function"){try{var div=_document.createElement("div");var unwrappedDiv=_window.unwrap(div);if(div.nodeType===1&&unwrappedDiv&&unwrappedDiv.nodeType===1){unwrapper=_window.unwrap;}}catch(e){}}
return unwrapper;}();var _args=function(argumentsObj){return _slice.call(argumentsObj,0);};var _extend=function(){var i,len,arg,prop,src,copy,args=_args(arguments),target=args[0]||{};for(i=1,len=args.length;i<len;i++){if((arg=args[i])!=null){for(prop in arg){if(_hasOwn.call(arg,prop)){src=target[prop];copy=arg[prop];if(target!==copy&&copy!==undefined){target[prop]=copy;}}}}}
return target;};var _deepCopy=function(source){var copy,i,len,prop;if(typeof source!=="object"||source==null){copy=source;}else if(typeof source.length==="number"){copy=[];for(i=0,len=source.length;i<len;i++){if(_hasOwn.call(source,i)){copy[i]=_deepCopy(source[i]);}}}else{copy={};for(prop in source){if(_hasOwn.call(source,prop)){copy[prop]=_deepCopy(source[prop]);}}}
return copy;};var _pick=function(obj,keys){var newObj={};for(var i=0,len=keys.length;i<len;i++){if(keys[i]in obj){newObj[keys[i]]=obj[keys[i]];}}
return newObj;};var _omit=function(obj,keys){var newObj={};for(var prop in obj){if(keys.indexOf(prop)===-1){newObj[prop]=obj[prop];}}
return newObj;};var _deleteOwnProperties=function(obj){if(obj){for(var prop in obj){if(_hasOwn.call(obj,prop)){delete obj[prop];}}}
return obj;};var _containedBy=function(el,ancestorEl){if(el&&el.nodeType===1&&el.ownerDocument&&ancestorEl&&(ancestorEl.nodeType===1&&ancestorEl.ownerDocument&&ancestorEl.ownerDocument===el.ownerDocument||ancestorEl.nodeType===9&&!ancestorEl.ownerDocument&&ancestorEl===el.ownerDocument)){do{if(el===ancestorEl){return true;}
el=el.parentNode;}while(el);}
return false;};var _getDirPathOfUrl=function(url){var dir;if(typeof url==="string"&&url){dir=url.split("#")[0].split("?")[0];dir=url.slice(0,url.lastIndexOf("/")+1);}
return dir;};var _getCurrentScriptUrlFromErrorStack=function(stack){var url,matches;if(typeof stack==="string"&&stack){matches=stack.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/);if(matches&&matches[1]){url=matches[1];}else{matches=stack.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/);if(matches&&matches[1]){url=matches[1];}}}
return url;};var _getCurrentScriptUrlFromError=function(){var url,err;try{throw new _Error();}catch(e){err=e;}
if(err){url=err.sourceURL||err.fileName||_getCurrentScriptUrlFromErrorStack(err.stack);}
return url;};var _getCurrentScriptUrl=function(){var jsPath,scripts,i;if(_document.currentScript&&(jsPath=_document.currentScript.src)){return jsPath;}
scripts=_document.getElementsByTagName("script");if(scripts.length===1){return scripts[0].src||undefined;}
if("readyState"in scripts[0]){for(i=scripts.length;i--;){if(scripts[i].readyState==="interactive"&&(jsPath=scripts[i].src)){return jsPath;}}}
if(_document.readyState==="loading"&&(jsPath=scripts[scripts.length-1].src)){return jsPath;}
if(jsPath=_getCurrentScriptUrlFromError()){return jsPath;}
return undefined;};var _getUnanimousScriptParentDir=function(){var i,jsDir,jsPath,scripts=_document.getElementsByTagName("script");for(i=scripts.length;i--;){if(!(jsPath=scripts[i].src)){jsDir=null;break;}
jsPath=_getDirPathOfUrl(jsPath);if(jsDir==null){jsDir=jsPath;}else if(jsDir!==jsPath){jsDir=null;break;}}
return jsDir||undefined;};var _getDefaultSwfPath=function(){var jsDir=_getDirPathOfUrl(_getCurrentScriptUrl())||_getUnanimousScriptParentDir()||"";return jsDir+"ZeroClipboard.swf";};var _flashState={bridge:null,version:"0.0.0",pluginType:"unknown",disabled:null,outdated:null,unavailable:null,deactivated:null,overdue:null,ready:null};var _minimumFlashVersion="11.0.0";var _handlers={};var _currentElement;var _copyTarget;var _clipData={};var _clipDataFormatMap=null;var _eventMessages={ready:"Flash communication is established",error:{"flash-disabled":"Flash is disabled or not installed","flash-outdated":"Flash is too outdated to support ZeroClipboard","flash-unavailable":"Flash is unable to communicate bidirectionally with JavaScript","flash-deactivated":"Flash is too outdated for your browser and/or is configured as click-to-activate","flash-overdue":"Flash communication was established but NOT within the acceptable time limit"}};var _globalConfig={swfPath:_getDefaultSwfPath(),trustedDomains:window.location.host?[window.location.host]:[],cacheBust:true,forceEnhancedClipboard:false,flashLoadTimeout:3e4,autoActivate:true,bubbleEvents:true,containerId:"global-zeroclipboard-html-bridge",containerClass:"global-zeroclipboard-container",swfObjectId:"global-zeroclipboard-flash-bridge",hoverClass:"zeroclipboard-is-hover",activeClass:"zeroclipboard-is-active",forceHandCursor:false,title:null,zIndex:999999999};var _config=function(options){if(typeof options==="object"&&options!==null){for(var prop in options){if(_hasOwn.call(options,prop)){if(/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(prop)){_globalConfig[prop]=options[prop];}else if(_flashState.bridge==null){if(prop==="containerId"||prop==="swfObjectId"){if(_isValidHtml4Id(options[prop])){_globalConfig[prop]=options[prop];}else{throw new Error("The specified `"+prop+"` value is not valid as an HTML4 Element ID");}}else{_globalConfig[prop]=options[prop];}}}}}
if(typeof options==="string"&&options){if(_hasOwn.call(_globalConfig,options)){return _globalConfig[options];}
return;}
return _deepCopy(_globalConfig);};var _state=function(){return{browser:_pick(_navigator,["userAgent","platform","appName"]),flash:_omit(_flashState,["bridge"]),zeroclipboard:{version:ZeroClipboard.version,config:ZeroClipboard.config()}};};var _isFlashUnusable=function(){return!!(_flashState.disabled||_flashState.outdated||_flashState.unavailable||_flashState.deactivated);};var _on=function(eventType,listener){var i,len,events,added={};if(typeof eventType==="string"&&eventType){events=eventType.toLowerCase().split(/\s+/);}else if(typeof eventType==="object"&&eventType&&typeof listener==="undefined"){for(i in eventType){if(_hasOwn.call(eventType,i)&&typeof i==="string"&&i&&typeof eventType[i]==="function"){ZeroClipboard.on(i,eventType[i]);}}}
if(events&&events.length){for(i=0,len=events.length;i<len;i++){eventType=events[i].replace(/^on/,"");added[eventType]=true;if(!_handlers[eventType]){_handlers[eventType]=[];}
_handlers[eventType].push(listener);}
if(added.ready&&_flashState.ready){ZeroClipboard.emit({type:"ready"});}
if(added.error){var errorTypes=["disabled","outdated","unavailable","deactivated","overdue"];for(i=0,len=errorTypes.length;i<len;i++){if(_flashState[errorTypes[i]]===true){ZeroClipboard.emit({type:"error",name:"flash-"+errorTypes[i]});break;}}}}
return ZeroClipboard;};var _off=function(eventType,listener){var i,len,foundIndex,events,perEventHandlers;if(arguments.length===0){events=_keys(_handlers);}else if(typeof eventType==="string"&&eventType){events=eventType.split(/\s+/);}else if(typeof eventType==="object"&&eventType&&typeof listener==="undefined"){for(i in eventType){if(_hasOwn.call(eventType,i)&&typeof i==="string"&&i&&typeof eventType[i]==="function"){ZeroClipboard.off(i,eventType[i]);}}}
if(events&&events.length){for(i=0,len=events.length;i<len;i++){eventType=events[i].toLowerCase().replace(/^on/,"");perEventHandlers=_handlers[eventType];if(perEventHandlers&&perEventHandlers.length){if(listener){foundIndex=perEventHandlers.indexOf(listener);while(foundIndex!==-1){perEventHandlers.splice(foundIndex,1);foundIndex=perEventHandlers.indexOf(listener,foundIndex);}}else{perEventHandlers.length=0;}}}}
return ZeroClipboard;};var _listeners=function(eventType){var copy;if(typeof eventType==="string"&&eventType){copy=_deepCopy(_handlers[eventType])||null;}else{copy=_deepCopy(_handlers);}
return copy;};var _emit=function(event){var eventCopy,returnVal,tmp;event=_createEvent(event);if(!event){return;}
if(_preprocessEvent(event)){return;}
if(event.type==="ready"&&_flashState.overdue===true){return ZeroClipboard.emit({type:"error",name:"flash-overdue"});}
eventCopy=_extend({},event);_dispatchCallbacks.call(this,eventCopy);if(event.type==="copy"){tmp=_mapClipDataToFlash(_clipData);returnVal=tmp.data;_clipDataFormatMap=tmp.formatMap;}
return returnVal;};var _create=function(){if(typeof _flashState.ready!=="boolean"){_flashState.ready=false;}
if(!ZeroClipboard.isFlashUnusable()&&_flashState.bridge===null){var maxWait=_globalConfig.flashLoadTimeout;if(typeof maxWait==="number"&&maxWait>=0){_setTimeout(function(){if(typeof _flashState.deactivated!=="boolean"){_flashState.deactivated=true;}
if(_flashState.deactivated===true){ZeroClipboard.emit({type:"error",name:"flash-deactivated"});}},maxWait);}
_flashState.overdue=false;_embedSwf();}};var _destroy=function(){ZeroClipboard.clearData();ZeroClipboard.blur();ZeroClipboard.emit("destroy");_unembedSwf();ZeroClipboard.off();};var _setData=function(format,data){var dataObj;if(typeof format==="object"&&format&&typeof data==="undefined"){dataObj=format;ZeroClipboard.clearData();}else if(typeof format==="string"&&format){dataObj={};dataObj[format]=data;}else{return;}
for(var dataFormat in dataObj){if(typeof dataFormat==="string"&&dataFormat&&_hasOwn.call(dataObj,dataFormat)&&typeof dataObj[dataFormat]==="string"&&dataObj[dataFormat]){_clipData[dataFormat]=dataObj[dataFormat];}}};var _clearData=function(format){if(typeof format==="undefined"){_deleteOwnProperties(_clipData);_clipDataFormatMap=null;}else if(typeof format==="string"&&_hasOwn.call(_clipData,format)){delete _clipData[format];}};var _getData=function(format){if(typeof format==="undefined"){return _deepCopy(_clipData);}else if(typeof format==="string"&&_hasOwn.call(_clipData,format)){return _clipData[format];}};var _focus=function(element){if(!(element&&element.nodeType===1)){return;}
if(_currentElement){_removeClass(_currentElement,_globalConfig.activeClass);if(_currentElement!==element){_removeClass(_currentElement,_globalConfig.hoverClass);}}
_currentElement=element;_addClass(element,_globalConfig.hoverClass);var newTitle=element.getAttribute("title")||_globalConfig.title;if(typeof newTitle==="string"&&newTitle){var htmlBridge=_getHtmlBridge(_flashState.bridge);if(htmlBridge){htmlBridge.setAttribute("title",newTitle);}}
var useHandCursor=_globalConfig.forceHandCursor===true||_getStyle(element,"cursor")==="pointer";_setHandCursor(useHandCursor);_reposition();};var _blur=function(){var htmlBridge=_getHtmlBridge(_flashState.bridge);if(htmlBridge){htmlBridge.removeAttribute("title");htmlBridge.style.left="0px";htmlBridge.style.top="-9999px";htmlBridge.style.width="1px";htmlBridge.style.top="1px";}
if(_currentElement){_removeClass(_currentElement,_globalConfig.hoverClass);_removeClass(_currentElement,_globalConfig.activeClass);_currentElement=null;}};var _activeElement=function(){return _currentElement||null;};var _isValidHtml4Id=function(id){return typeof id==="string"&&id&&/^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(id);};var _createEvent=function(event){var eventType;if(typeof event==="string"&&event){eventType=event;event={};}else if(typeof event==="object"&&event&&typeof event.type==="string"&&event.type){eventType=event.type;}
if(!eventType){return;}
if(!event.target&&/^(copy|aftercopy|_click)$/.test(eventType.toLowerCase())){event.target=_copyTarget;}
_extend(event,{type:eventType.toLowerCase(),target:event.target||_currentElement||null,relatedTarget:event.relatedTarget||null,currentTarget:_flashState&&_flashState.bridge||null,timeStamp:event.timeStamp||_now()||null});var msg=_eventMessages[event.type];if(event.type==="error"&&event.name&&msg){msg=msg[event.name];}
if(msg){event.message=msg;}
if(event.type==="ready"){_extend(event,{target:null,version:_flashState.version});}
if(event.type==="error"){if(/^flash-(disabled|outdated|unavailable|deactivated|overdue)$/.test(event.name)){_extend(event,{target:null,minimumVersion:_minimumFlashVersion});}
if(/^flash-(outdated|unavailable|deactivated|overdue)$/.test(event.name)){_extend(event,{version:_flashState.version});}}
if(event.type==="copy"){event.clipboardData={setData:ZeroClipboard.setData,clearData:ZeroClipboard.clearData};}
if(event.type==="aftercopy"){event=_mapClipResultsFromFlash(event,_clipDataFormatMap);}
if(event.target&&!event.relatedTarget){event.relatedTarget=_getRelatedTarget(event.target);}
event=_addMouseData(event);return event;};var _getRelatedTarget=function(targetEl){var relatedTargetId=targetEl&&targetEl.getAttribute&&targetEl.getAttribute("data-clipboard-target");return relatedTargetId?_document.getElementById(relatedTargetId):null;};var _addMouseData=function(event){if(event&&/^_(?:click|mouse(?:over|out|down|up|move))$/.test(event.type)){var srcElement=event.target;var fromElement=event.type==="_mouseover"&&event.relatedTarget?event.relatedTarget:undefined;var toElement=event.type==="_mouseout"&&event.relatedTarget?event.relatedTarget:undefined;var pos=_getDOMObjectPosition(srcElement);var screenLeft=_window.screenLeft||_window.screenX||0;var screenTop=_window.screenTop||_window.screenY||0;var scrollLeft=_document.body.scrollLeft+_document.documentElement.scrollLeft;var scrollTop=_document.body.scrollTop+_document.documentElement.scrollTop;var pageX=pos.left+(typeof event._stageX==="number"?event._stageX:0);var pageY=pos.top+(typeof event._stageY==="number"?event._stageY:0);var clientX=pageX-scrollLeft;var clientY=pageY-scrollTop;var screenX=screenLeft+clientX;var screenY=screenTop+clientY;var moveX=typeof event.movementX==="number"?event.movementX:0;var moveY=typeof event.movementY==="number"?event.movementY:0;delete event._stageX;delete event._stageY;_extend(event,{srcElement:srcElement,fromElement:fromElement,toElement:toElement,screenX:screenX,screenY:screenY,pageX:pageX,pageY:pageY,clientX:clientX,clientY:clientY,x:clientX,y:clientY,movementX:moveX,movementY:moveY,offsetX:0,offsetY:0,layerX:0,layerY:0});}
return event;};var _shouldPerformAsync=function(event){var eventType=event&&typeof event.type==="string"&&event.type||"";return!/^(?:(?:before)?copy|destroy)$/.test(eventType);};var _dispatchCallback=function(func,context,args,async){if(async){_setTimeout(function(){func.apply(context,args);},0);}else{func.apply(context,args);}};var _dispatchCallbacks=function(event){if(!(typeof event==="object"&&event&&event.type)){return;}
var async=_shouldPerformAsync(event);var wildcardTypeHandlers=_handlers["*"]||[];var specificTypeHandlers=_handlers[event.type]||[];var handlers=wildcardTypeHandlers.concat(specificTypeHandlers);if(handlers&&handlers.length){var i,len,func,context,eventCopy,originalContext=this;for(i=0,len=handlers.length;i<len;i++){func=handlers[i];context=originalContext;if(typeof func==="string"&&typeof _window[func]==="function"){func=_window[func];}
if(typeof func==="object"&&func&&typeof func.handleEvent==="function"){context=func;func=func.handleEvent;}
if(typeof func==="function"){eventCopy=_extend({},event);_dispatchCallback(func,context,[eventCopy],async);}}}
return this;};var _preprocessEvent=function(event){var element=event.target||_currentElement||null;var sourceIsSwf=event._source==="swf";delete event._source;var flashErrorNames=["flash-disabled","flash-outdated","flash-unavailable","flash-deactivated","flash-overdue"];switch(event.type){case"error":if(flashErrorNames.indexOf(event.name)!==-1){_extend(_flashState,{disabled:event.name==="flash-disabled",outdated:event.name==="flash-outdated",unavailable:event.name==="flash-unavailable",deactivated:event.name==="flash-deactivated",overdue:event.name==="flash-overdue",ready:false});}
break;case"ready":var wasDeactivated=_flashState.deactivated===true;_extend(_flashState,{disabled:false,outdated:false,unavailable:false,deactivated:false,overdue:wasDeactivated,ready:!wasDeactivated});break;case"beforecopy":_copyTarget=element;break;case"copy":var textContent,htmlContent,targetEl=event.relatedTarget;if(!(_clipData["text/html"]||_clipData["text/plain"])&&targetEl&&(htmlContent=targetEl.value||targetEl.outerHTML||targetEl.innerHTML)&&(textContent=targetEl.value||targetEl.textContent||targetEl.innerText)){event.clipboardData.clearData();event.clipboardData.setData("text/plain",textContent);if(htmlContent!==textContent){event.clipboardData.setData("text/html",htmlContent);}}else if(!_clipData["text/plain"]&&event.target&&(textContent=event.target.getAttribute("data-clipboard-text"))){event.clipboardData.clearData();event.clipboardData.setData("text/plain",textContent);}
break;case"aftercopy":ZeroClipboard.clearData();if(element&&element!==_safeActiveElement()&&element.focus){element.focus();}
break;case"_mouseover":ZeroClipboard.focus(element);if(_globalConfig.bubbleEvents===true&&sourceIsSwf){if(element&&element!==event.relatedTarget&&!_containedBy(event.relatedTarget,element)){_fireMouseEvent(_extend({},event,{type:"mouseenter",bubbles:false,cancelable:false}));}
_fireMouseEvent(_extend({},event,{type:"mouseover"}));}
break;case"_mouseout":ZeroClipboard.blur();if(_globalConfig.bubbleEvents===true&&sourceIsSwf){if(element&&element!==event.relatedTarget&&!_containedBy(event.relatedTarget,element)){_fireMouseEvent(_extend({},event,{type:"mouseleave",bubbles:false,cancelable:false}));}
_fireMouseEvent(_extend({},event,{type:"mouseout"}));}
break;case"_mousedown":_addClass(element,_globalConfig.activeClass);if(_globalConfig.bubbleEvents===true&&sourceIsSwf){_fireMouseEvent(_extend({},event,{type:event.type.slice(1)}));}
break;case"_mouseup":_removeClass(element,_globalConfig.activeClass);if(_globalConfig.bubbleEvents===true&&sourceIsSwf){_fireMouseEvent(_extend({},event,{type:event.type.slice(1)}));}
break;case"_click":_copyTarget=null;if(_globalConfig.bubbleEvents===true&&sourceIsSwf){_fireMouseEvent(_extend({},event,{type:event.type.slice(1)}));}
break;case"_mousemove":if(_globalConfig.bubbleEvents===true&&sourceIsSwf){_fireMouseEvent(_extend({},event,{type:event.type.slice(1)}));}
break;}
if(/^_(?:click|mouse(?:over|out|down|up|move))$/.test(event.type)){return true;}};var _fireMouseEvent=function(event){if(!(event&&typeof event.type==="string"&&event)){return;}
var e,target=event.target||null,doc=target&&target.ownerDocument||_document,defaults={view:doc.defaultView||_window,canBubble:true,cancelable:true,detail:event.type==="click"?1:0,button:typeof event.which==="number"?event.which-1:typeof event.button==="number"?event.button:doc.createEvent?0:1},args=_extend(defaults,event);if(!target){return;}
if(doc.createEvent&&target.dispatchEvent){args=[args.type,args.canBubble,args.cancelable,args.view,args.detail,args.screenX,args.screenY,args.clientX,args.clientY,args.ctrlKey,args.altKey,args.shiftKey,args.metaKey,args.button,args.relatedTarget];e=doc.createEvent("MouseEvents");if(e.initMouseEvent){e.initMouseEvent.apply(e,args);e._source="js";target.dispatchEvent(e);}}};var _createHtmlBridge=function(){var container=_document.createElement("div");container.id=_globalConfig.containerId;container.className=_globalConfig.containerClass;container.style.position="absolute";container.style.left="0px";container.style.top="-9999px";container.style.width="1px";container.style.height="1px";container.style.zIndex=""+_getSafeZIndex(_globalConfig.zIndex);return container;};var _getHtmlBridge=function(flashBridge){var htmlBridge=flashBridge&&flashBridge.parentNode;while(htmlBridge&&htmlBridge.nodeName==="OBJECT"&&htmlBridge.parentNode){htmlBridge=htmlBridge.parentNode;}
return htmlBridge||null;};var _embedSwf=function(){var len,flashBridge=_flashState.bridge,container=_getHtmlBridge(flashBridge);if(!flashBridge){var allowScriptAccess=_determineScriptAccess(_window.location.host,_globalConfig);var allowNetworking=allowScriptAccess==="never"?"none":"all";var flashvars=_vars(_globalConfig);var swfUrl=_globalConfig.swfPath+_cacheBust(_globalConfig.swfPath,_globalConfig);container=_createHtmlBridge();var divToBeReplaced=_document.createElement("div");container.appendChild(divToBeReplaced);_document.body.appendChild(container);var tmpDiv=_document.createElement("div");var oldIE=_flashState.pluginType==="activex";tmpDiv.innerHTML='<object id="'+_globalConfig.swfObjectId+'" name="'+_globalConfig.swfObjectId+'" '+'width="100%" height="100%" '+(oldIE?'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"':'type="application/x-shockwave-flash" data="'+swfUrl+'"')+">"+(oldIE?'<param name="movie" value="'+swfUrl+'"/>':"")+'<param name="allowScriptAccess" value="'+allowScriptAccess+'"/>'+'<param name="allowNetworking" value="'+allowNetworking+'"/>'+'<param name="menu" value="false"/>'+'<param name="wmode" value="transparent"/>'+'<param name="flashvars" value="'+flashvars+'"/>'+"</object>";flashBridge=tmpDiv.firstChild;tmpDiv=null;_unwrap(flashBridge).ZeroClipboard=ZeroClipboard;container.replaceChild(flashBridge,divToBeReplaced);}
if(!flashBridge){flashBridge=_document[_globalConfig.swfObjectId];if(flashBridge&&(len=flashBridge.length)){flashBridge=flashBridge[len-1];}
if(!flashBridge&&container){flashBridge=container.firstChild;}}
_flashState.bridge=flashBridge||null;return flashBridge;};var _unembedSwf=function(){var flashBridge=_flashState.bridge;if(flashBridge){var htmlBridge=_getHtmlBridge(flashBridge);if(htmlBridge){if(_flashState.pluginType==="activex"&&"readyState"in flashBridge){flashBridge.style.display="none";(function removeSwfFromIE(){if(flashBridge.readyState===4){for(var prop in flashBridge){if(typeof flashBridge[prop]==="function"){flashBridge[prop]=null;}}
if(flashBridge.parentNode){flashBridge.parentNode.removeChild(flashBridge);}
if(htmlBridge.parentNode){htmlBridge.parentNode.removeChild(htmlBridge);}}else{_setTimeout(removeSwfFromIE,10);}})();}else{if(flashBridge.parentNode){flashBridge.parentNode.removeChild(flashBridge);}
if(htmlBridge.parentNode){htmlBridge.parentNode.removeChild(htmlBridge);}}}
_flashState.ready=null;_flashState.bridge=null;_flashState.deactivated=null;}};var _mapClipDataToFlash=function(clipData){var newClipData={},formatMap={};if(!(typeof clipData==="object"&&clipData)){return;}
for(var dataFormat in clipData){if(dataFormat&&_hasOwn.call(clipData,dataFormat)&&typeof clipData[dataFormat]==="string"&&clipData[dataFormat]){switch(dataFormat.toLowerCase()){case"text/plain":case"text":case"air:text":case"flash:text":newClipData.text=clipData[dataFormat];formatMap.text=dataFormat;break;case"text/html":case"html":case"air:html":case"flash:html":newClipData.html=clipData[dataFormat];formatMap.html=dataFormat;break;case"application/rtf":case"text/rtf":case"rtf":case"richtext":case"air:rtf":case"flash:rtf":newClipData.rtf=clipData[dataFormat];formatMap.rtf=dataFormat;break;default:break;}}}
return{data:newClipData,formatMap:formatMap};};var _mapClipResultsFromFlash=function(clipResults,formatMap){if(!(typeof clipResults==="object"&&clipResults&&typeof formatMap==="object"&&formatMap)){return clipResults;}
var newResults={};for(var prop in clipResults){if(_hasOwn.call(clipResults,prop)){if(prop!=="success"&&prop!=="data"){newResults[prop]=clipResults[prop];continue;}
newResults[prop]={};var tmpHash=clipResults[prop];for(var dataFormat in tmpHash){if(dataFormat&&_hasOwn.call(tmpHash,dataFormat)&&_hasOwn.call(formatMap,dataFormat)){newResults[prop][formatMap[dataFormat]]=tmpHash[dataFormat];}}}}
return newResults;};var _cacheBust=function(path,options){var cacheBust=options==null||options&&options.cacheBust===true;if(cacheBust){return(path.indexOf("?")===-1?"?":"&")+"noCache="+_now();}else{return"";}};var _vars=function(options){var i,len,domain,domains,str="",trustedOriginsExpanded=[];if(options.trustedDomains){if(typeof options.trustedDomains==="string"){domains=[options.trustedDomains];}else if(typeof options.trustedDomains==="object"&&"length"in options.trustedDomains){domains=options.trustedDomains;}}
if(domains&&domains.length){for(i=0,len=domains.length;i<len;i++){if(_hasOwn.call(domains,i)&&domains[i]&&typeof domains[i]==="string"){domain=_extractDomain(domains[i]);if(!domain){continue;}
if(domain==="*"){trustedOriginsExpanded.length=0;trustedOriginsExpanded.push(domain);break;}
trustedOriginsExpanded.push.apply(trustedOriginsExpanded,[domain,"//"+domain,_window.location.protocol+"//"+domain]);}}}
if(trustedOriginsExpanded.length){str+="trustedOrigins="+_encodeURIComponent(trustedOriginsExpanded.join(","));}
if(options.forceEnhancedClipboard===true){str+=(str?"&":"")+"forceEnhancedClipboard=true";}
if(typeof options.swfObjectId==="string"&&options.swfObjectId){str+=(str?"&":"")+"swfObjectId="+_encodeURIComponent(options.swfObjectId);}
return str;};var _extractDomain=function(originOrUrl){if(originOrUrl==null||originOrUrl===""){return null;}
originOrUrl=originOrUrl.replace(/^\s+|\s+$/g,"");if(originOrUrl===""){return null;}
var protocolIndex=originOrUrl.indexOf("//");originOrUrl=protocolIndex===-1?originOrUrl:originOrUrl.slice(protocolIndex+2);var pathIndex=originOrUrl.indexOf("/");originOrUrl=pathIndex===-1?originOrUrl:protocolIndex===-1||pathIndex===0?null:originOrUrl.slice(0,pathIndex);if(originOrUrl&&originOrUrl.slice(-4).toLowerCase()===".swf"){return null;}
return originOrUrl||null;};var _determineScriptAccess=function(){var _extractAllDomains=function(origins){var i,len,tmp,resultsArray=[];if(typeof origins==="string"){origins=[origins];}
if(!(typeof origins==="object"&&origins&&typeof origins.length==="number")){return resultsArray;}
for(i=0,len=origins.length;i<len;i++){if(_hasOwn.call(origins,i)&&(tmp=_extractDomain(origins[i]))){if(tmp==="*"){resultsArray.length=0;resultsArray.push("*");break;}
if(resultsArray.indexOf(tmp)===-1){resultsArray.push(tmp);}}}
return resultsArray;};return function(currentDomain,configOptions){var swfDomain=_extractDomain(configOptions.swfPath);if(swfDomain===null){swfDomain=currentDomain;}
var trustedDomains=_extractAllDomains(configOptions.trustedDomains);var len=trustedDomains.length;if(len>0){if(len===1&&trustedDomains[0]==="*"){return"always";}
if(trustedDomains.indexOf(currentDomain)!==-1){if(len===1&&currentDomain===swfDomain){return"sameDomain";}
return"always";}}
return"never";};}();var _safeActiveElement=function(){try{return _document.activeElement;}catch(err){return null;}};var _addClass=function(element,value){if(!element||element.nodeType!==1){return element;}
if(element.classList){if(!element.classList.contains(value)){element.classList.add(value);}
return element;}
if(value&&typeof value==="string"){var classNames=(value||"").split(/\s+/);if(element.nodeType===1){if(!element.className){element.className=value;}else{var className=" "+element.className+" ",setClass=element.className;for(var c=0,cl=classNames.length;c<cl;c++){if(className.indexOf(" "+classNames[c]+" ")<0){setClass+=" "+classNames[c];}}
element.className=setClass.replace(/^\s+|\s+$/g,"");}}}
return element;};var _removeClass=function(element,value){if(!element||element.nodeType!==1){return element;}
if(element.classList){if(element.classList.contains(value)){element.classList.remove(value);}
return element;}
if(typeof value==="string"&&value){var classNames=value.split(/\s+/);if(element.nodeType===1&&element.className){var className=(" "+element.className+" ").replace(/[\n\t]/g," ");for(var c=0,cl=classNames.length;c<cl;c++){className=className.replace(" "+classNames[c]+" "," ");}
element.className=className.replace(/^\s+|\s+$/g,"");}}
return element;};var _getStyle=function(el,prop){var value=_window.getComputedStyle(el,null).getPropertyValue(prop);if(prop==="cursor"){if(!value||value==="auto"){if(el.nodeName==="A"){return"pointer";}}}
return value;};var _getZoomFactor=function(){var rect,physicalWidth,logicalWidth,zoomFactor=1;if(typeof _document.body.getBoundingClientRect==="function"){rect=_document.body.getBoundingClientRect();physicalWidth=rect.right-rect.left;logicalWidth=_document.body.offsetWidth;zoomFactor=_round(physicalWidth/logicalWidth*100)/100;}
return zoomFactor;};var _getDOMObjectPosition=function(obj){var info={left:0,top:0,width:0,height:0};if(obj.getBoundingClientRect){var rect=obj.getBoundingClientRect();var pageXOffset,pageYOffset,zoomFactor;if("pageXOffset"in _window&&"pageYOffset"in _window){pageXOffset=_window.pageXOffset;pageYOffset=_window.pageYOffset;}else{zoomFactor=_getZoomFactor();pageXOffset=_round(_document.documentElement.scrollLeft/zoomFactor);pageYOffset=_round(_document.documentElement.scrollTop/zoomFactor);}
var leftBorderWidth=_document.documentElement.clientLeft||0;var topBorderWidth=_document.documentElement.clientTop||0;info.left=rect.left+pageXOffset-leftBorderWidth;info.top=rect.top+pageYOffset-topBorderWidth;info.width="width"in rect?rect.width:rect.right-rect.left;info.height="height"in rect?rect.height:rect.bottom-rect.top;}
return info;};var _reposition=function(){var htmlBridge;if(_currentElement&&(htmlBridge=_getHtmlBridge(_flashState.bridge))){var pos=_getDOMObjectPosition(_currentElement);_extend(htmlBridge.style,{width:pos.width+"px",height:pos.height+"px",top:pos.top+"px",left:pos.left+"px",zIndex:""+_getSafeZIndex(_globalConfig.zIndex)});}};var _setHandCursor=function(enabled){if(_flashState.ready===true){if(_flashState.bridge&&typeof _flashState.bridge.setHandCursor==="function"){_flashState.bridge.setHandCursor(enabled);}else{_flashState.ready=false;}}};var _getSafeZIndex=function(val){if(/^(?:auto|inherit)$/.test(val)){return val;}
var zIndex;if(typeof val==="number"&&!_isNaN(val)){zIndex=val;}else if(typeof val==="string"){zIndex=_getSafeZIndex(_parseInt(val,10));}
return typeof zIndex==="number"?zIndex:"auto";};var _detectFlashSupport=function(ActiveXObject){var plugin,ax,mimeType,hasFlash=false,isActiveX=false,isPPAPI=false,flashVersion="";function parseFlashVersion(desc){var matches=desc.match(/[\d]+/g);matches.length=3;return matches.join(".");}
function isPepperFlash(flashPlayerFileName){return!!flashPlayerFileName&&(flashPlayerFileName=flashPlayerFileName.toLowerCase())&&(/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(flashPlayerFileName)||flashPlayerFileName.slice(-13)==="chrome.plugin");}
function inspectPlugin(plugin){if(plugin){hasFlash=true;if(plugin.version){flashVersion=parseFlashVersion(plugin.version);}
if(!flashVersion&&plugin.description){flashVersion=parseFlashVersion(plugin.description);}
if(plugin.filename){isPPAPI=isPepperFlash(plugin.filename);}}}
if(_navigator.plugins&&_navigator.plugins.length){plugin=_navigator.plugins["Shockwave Flash"];inspectPlugin(plugin);if(_navigator.plugins["Shockwave Flash 2.0"]){hasFlash=true;flashVersion="2.0.0.11";}}else if(_navigator.mimeTypes&&_navigator.mimeTypes.length){mimeType=_navigator.mimeTypes["application/x-shockwave-flash"];plugin=mimeType&&mimeType.enabledPlugin;inspectPlugin(plugin);}else if(typeof ActiveXObject!=="undefined"){isActiveX=true;try{ax=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");hasFlash=true;flashVersion=parseFlashVersion(ax.GetVariable("$version"));}catch(e1){try{ax=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");hasFlash=true;flashVersion="6.0.21";}catch(e2){try{ax=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");hasFlash=true;flashVersion=parseFlashVersion(ax.GetVariable("$version"));}catch(e3){isActiveX=false;}}}}
_flashState.disabled=hasFlash!==true;_flashState.outdated=flashVersion&&_parseFloat(flashVersion)<_parseFloat(_minimumFlashVersion);_flashState.version=flashVersion||"0.0.0";_flashState.pluginType=isPPAPI?"pepper":isActiveX?"activex":hasFlash?"netscape":"unknown";};_detectFlashSupport(_ActiveXObject);var ZeroClipboard=function(){if(!(this instanceof ZeroClipboard)){return new ZeroClipboard();}
if(typeof ZeroClipboard._createClient==="function"){ZeroClipboard._createClient.apply(this,_args(arguments));}};_defineProperty(ZeroClipboard,"version",{value:"2.1.6",writable:false,configurable:true,enumerable:true});ZeroClipboard.config=function(){return _config.apply(this,_args(arguments));};ZeroClipboard.state=function(){return _state.apply(this,_args(arguments));};ZeroClipboard.isFlashUnusable=function(){return _isFlashUnusable.apply(this,_args(arguments));};ZeroClipboard.on=function(){return _on.apply(this,_args(arguments));};ZeroClipboard.off=function(){return _off.apply(this,_args(arguments));};ZeroClipboard.handlers=function(){return _listeners.apply(this,_args(arguments));};ZeroClipboard.emit=function(){return _emit.apply(this,_args(arguments));};ZeroClipboard.create=function(){return _create.apply(this,_args(arguments));};ZeroClipboard.destroy=function(){return _destroy.apply(this,_args(arguments));};ZeroClipboard.setData=function(){return _setData.apply(this,_args(arguments));};ZeroClipboard.clearData=function(){return _clearData.apply(this,_args(arguments));};ZeroClipboard.getData=function(){return _getData.apply(this,_args(arguments));};ZeroClipboard.focus=ZeroClipboard.activate=function(){return _focus.apply(this,_args(arguments));};ZeroClipboard.blur=ZeroClipboard.deactivate=function(){return _blur.apply(this,_args(arguments));};ZeroClipboard.activeElement=function(){return _activeElement.apply(this,_args(arguments));};var _clientIdCounter=0;var _clientMeta={};var _elementIdCounter=0;var _elementMeta={};var _mouseHandlers={};_extend(_globalConfig,{autoActivate:true});var _clientConstructor=function(elements){var client=this;client.id=""+_clientIdCounter++;_clientMeta[client.id]={instance:client,elements:[],handlers:{}};if(elements){client.clip(elements);}
ZeroClipboard.on("*",function(event){return client.emit(event);});ZeroClipboard.on("destroy",function(){client.destroy();});ZeroClipboard.create();};var _clientOn=function(eventType,listener){var i,len,events,added={},handlers=_clientMeta[this.id]&&_clientMeta[this.id].handlers;if(typeof eventType==="string"&&eventType){events=eventType.toLowerCase().split(/\s+/);}else if(typeof eventType==="object"&&eventType&&typeof listener==="undefined"){for(i in eventType){if(_hasOwn.call(eventType,i)&&typeof i==="string"&&i&&typeof eventType[i]==="function"){this.on(i,eventType[i]);}}}
if(events&&events.length){for(i=0,len=events.length;i<len;i++){eventType=events[i].replace(/^on/,"");added[eventType]=true;if(!handlers[eventType]){handlers[eventType]=[];}
handlers[eventType].push(listener);}
if(added.ready&&_flashState.ready){this.emit({type:"ready",client:this});}
if(added.error){var errorTypes=["disabled","outdated","unavailable","deactivated","overdue"];for(i=0,len=errorTypes.length;i<len;i++){if(_flashState[errorTypes[i]]){this.emit({type:"error",name:"flash-"+errorTypes[i],client:this});break;}}}}
return this;};var _clientOff=function(eventType,listener){var i,len,foundIndex,events,perEventHandlers,handlers=_clientMeta[this.id]&&_clientMeta[this.id].handlers;if(arguments.length===0){events=_keys(handlers);}else if(typeof eventType==="string"&&eventType){events=eventType.split(/\s+/);}else if(typeof eventType==="object"&&eventType&&typeof listener==="undefined"){for(i in eventType){if(_hasOwn.call(eventType,i)&&typeof i==="string"&&i&&typeof eventType[i]==="function"){this.off(i,eventType[i]);}}}
if(events&&events.length){for(i=0,len=events.length;i<len;i++){eventType=events[i].toLowerCase().replace(/^on/,"");perEventHandlers=handlers[eventType];if(perEventHandlers&&perEventHandlers.length){if(listener){foundIndex=perEventHandlers.indexOf(listener);while(foundIndex!==-1){perEventHandlers.splice(foundIndex,1);foundIndex=perEventHandlers.indexOf(listener,foundIndex);}}else{perEventHandlers.length=0;}}}}
return this;};var _clientListeners=function(eventType){var copy=null,handlers=_clientMeta[this.id]&&_clientMeta[this.id].handlers;if(handlers){if(typeof eventType==="string"&&eventType){copy=handlers[eventType]?handlers[eventType].slice(0):[];}else{copy=_deepCopy(handlers);}}
return copy;};var _clientEmit=function(event){if(_clientShouldEmit.call(this,event)){if(typeof event==="object"&&event&&typeof event.type==="string"&&event.type){event=_extend({},event);}
var eventCopy=_extend({},_createEvent(event),{client:this});_clientDispatchCallbacks.call(this,eventCopy);}
return this;};var _clientClip=function(elements){elements=_prepClip(elements);for(var i=0;i<elements.length;i++){if(_hasOwn.call(elements,i)&&elements[i]&&elements[i].nodeType===1){if(!elements[i].zcClippingId){elements[i].zcClippingId="zcClippingId_"+_elementIdCounter++;_elementMeta[elements[i].zcClippingId]=[this.id];if(_globalConfig.autoActivate===true){_addMouseHandlers(elements[i]);}}else if(_elementMeta[elements[i].zcClippingId].indexOf(this.id)===-1){_elementMeta[elements[i].zcClippingId].push(this.id);}
var clippedElements=_clientMeta[this.id]&&_clientMeta[this.id].elements;if(clippedElements.indexOf(elements[i])===-1){clippedElements.push(elements[i]);}}}
return this;};var _clientUnclip=function(elements){var meta=_clientMeta[this.id];if(!meta){return this;}
var clippedElements=meta.elements;var arrayIndex;if(typeof elements==="undefined"){elements=clippedElements.slice(0);}else{elements=_prepClip(elements);}
for(var i=elements.length;i--;){if(_hasOwn.call(elements,i)&&elements[i]&&elements[i].nodeType===1){arrayIndex=0;while((arrayIndex=clippedElements.indexOf(elements[i],arrayIndex))!==-1){clippedElements.splice(arrayIndex,1);}
var clientIds=_elementMeta[elements[i].zcClippingId];if(clientIds){arrayIndex=0;while((arrayIndex=clientIds.indexOf(this.id,arrayIndex))!==-1){clientIds.splice(arrayIndex,1);}
if(clientIds.length===0){if(_globalConfig.autoActivate===true){_removeMouseHandlers(elements[i]);}
delete elements[i].zcClippingId;}}}}
return this;};var _clientElements=function(){var meta=_clientMeta[this.id];return meta&&meta.elements?meta.elements.slice(0):[];};var _clientDestroy=function(){this.unclip();this.off();delete _clientMeta[this.id];};var _clientShouldEmit=function(event){if(!(event&&event.type)){return false;}
if(event.client&&event.client!==this){return false;}
var clippedEls=_clientMeta[this.id]&&_clientMeta[this.id].elements;var hasClippedEls=!!clippedEls&&clippedEls.length>0;var goodTarget=!event.target||hasClippedEls&&clippedEls.indexOf(event.target)!==-1;var goodRelTarget=event.relatedTarget&&hasClippedEls&&clippedEls.indexOf(event.relatedTarget)!==-1;var goodClient=event.client&&event.client===this;if(!(goodTarget||goodRelTarget||goodClient)){return false;}
return true;};var _clientDispatchCallbacks=function(event){if(!(typeof event==="object"&&event&&event.type)){return;}
var async=_shouldPerformAsync(event);var wildcardTypeHandlers=_clientMeta[this.id]&&_clientMeta[this.id].handlers["*"]||[];var specificTypeHandlers=_clientMeta[this.id]&&_clientMeta[this.id].handlers[event.type]||[];var handlers=wildcardTypeHandlers.concat(specificTypeHandlers);if(handlers&&handlers.length){var i,len,func,context,eventCopy,originalContext=this;for(i=0,len=handlers.length;i<len;i++){func=handlers[i];context=originalContext;if(typeof func==="string"&&typeof _window[func]==="function"){func=_window[func];}
if(typeof func==="object"&&func&&typeof func.handleEvent==="function"){context=func;func=func.handleEvent;}
if(typeof func==="function"){eventCopy=_extend({},event);_dispatchCallback(func,context,[eventCopy],async);}}}
return this;};var _prepClip=function(elements){if(typeof elements==="string"){elements=[];}
return typeof elements.length!=="number"?[elements]:elements;};var _addMouseHandlers=function(element){if(!(element&&element.nodeType===1)){return;}
var _suppressMouseEvents=function(event){if(!(event||(event=_window.event))){return;}
if(event._source!=="js"){event.stopImmediatePropagation();event.preventDefault();}
delete event._source;};var _elementMouseOver=function(event){if(!(event||(event=_window.event))){return;}
_suppressMouseEvents(event);ZeroClipboard.focus(element);};element.addEventListener("mouseover",_elementMouseOver,false);element.addEventListener("mouseout",_suppressMouseEvents,false);element.addEventListener("mouseenter",_suppressMouseEvents,false);element.addEventListener("mouseleave",_suppressMouseEvents,false);element.addEventListener("mousemove",_suppressMouseEvents,false);_mouseHandlers[element.zcClippingId]={mouseover:_elementMouseOver,mouseout:_suppressMouseEvents,mouseenter:_suppressMouseEvents,mouseleave:_suppressMouseEvents,mousemove:_suppressMouseEvents};};var _removeMouseHandlers=function(element){if(!(element&&element.nodeType===1)){return;}
var mouseHandlers=_mouseHandlers[element.zcClippingId];if(!(typeof mouseHandlers==="object"&&mouseHandlers)){return;}
var key,val,mouseEvents=["move","leave","enter","out","over"];for(var i=0,len=mouseEvents.length;i<len;i++){key="mouse"+mouseEvents[i];val=mouseHandlers[key];if(typeof val==="function"){element.removeEventListener(key,val,false);}}
delete _mouseHandlers[element.zcClippingId];};ZeroClipboard._createClient=function(){_clientConstructor.apply(this,_args(arguments));};ZeroClipboard.prototype.on=function(){return _clientOn.apply(this,_args(arguments));};ZeroClipboard.prototype.off=function(){return _clientOff.apply(this,_args(arguments));};ZeroClipboard.prototype.handlers=function(){return _clientListeners.apply(this,_args(arguments));};ZeroClipboard.prototype.emit=function(){return _clientEmit.apply(this,_args(arguments));};ZeroClipboard.prototype.clip=function(){return _clientClip.apply(this,_args(arguments));};ZeroClipboard.prototype.unclip=function(){return _clientUnclip.apply(this,_args(arguments));};ZeroClipboard.prototype.elements=function(){return _clientElements.apply(this,_args(arguments));};ZeroClipboard.prototype.destroy=function(){return _clientDestroy.apply(this,_args(arguments));};ZeroClipboard.prototype.setText=function(text){ZeroClipboard.setData("text/plain",text);return this;};ZeroClipboard.prototype.setHtml=function(html){ZeroClipboard.setData("text/html",html);return this;};ZeroClipboard.prototype.setRichText=function(richText){ZeroClipboard.setData("application/rtf",richText);return this;};ZeroClipboard.prototype.setData=function(){ZeroClipboard.setData.apply(this,_args(arguments));return this;};ZeroClipboard.prototype.clearData=function(){ZeroClipboard.clearData.apply(this,_args(arguments));return this;};ZeroClipboard.prototype.getData=function(){return ZeroClipboard.getData.apply(this,_args(arguments));};if(typeof define==="function"&&define.amd){define(function(){return ZeroClipboard;});}else if(typeof module==="object"&&module&&typeof module.exports==="object"&&module.exports){module.exports=ZeroClipboard;}else{window.ZeroClipboard=ZeroClipboard;}})(function(){return this||window;}());;

/* /website_links/static/src/js/website_links.js defined in bundle 'website.assets_frontend' */
odoo.define('website_links.website_links',function(require){'use strict';var ajax=require('web.ajax');var core=require('web.core');var Widget=require('web.Widget');var base=require('web_editor.base');var website=require('website.website');var Model=require('web.Model');var qweb=core.qweb;var _t=core._t;var ZeroClipboard=window.ZeroClipboard;var exports={};if(!$('.o_website_links_create_tracked_url').length){return $.Deferred().reject("DOM doesn't contain '.o_website_links_create_tracked_url'");}
var SelectBox=Widget.extend({init:function(obj){this.obj=new Model(obj);},start:function(element,placeholder){var self=this;this.element=element;this.placeholder=placeholder;this.fetch_objects().then(function(results){self.objects=results;element.select2({placeholder:self.placeholder,allowClear:true,createSearchChoice:function(term){if(self.object_exists(term)){return null;}
return{id:term,text:_.str.sprintf("Create '%s'",term)};},createSearchChoicePosition:'bottom',multiple:false,data:self.objects,});element.on('change',function(e){self.on_change(e);});});},fetch_objects:function(){return this.obj.call('search_read',[[]]).then(function(result){return _.map(result,function(val){return{id:val.id,text:val.name};});});},object_exists:function(query){return _.find(this.objects,function(val){return val.text.toLowerCase()===query.toLowerCase();})!==undefined;},on_change:function(e){if(e.added&&_.isString(e.added.id)){this.create_object(e.added.id);}},create_object:function(name){var self=this;return this.obj.call('create',[{name:name}]).then(function(record){self.element.attr('value',record);self.objects.push({'id':record,'text':name});});},});var RecentLinkBox=Widget.extend({template:'website_links.RecentLink',events:{'click .btn_shorten_url_clipboard':'toggle_copy_button','click .o_website_links_edit_code':'edit_code','click .o_website_links_ok_edit':function(e){e.preventDefault();this.submit_code();},'click .o_website_links_cancel_edit':function(e){e.preventDefault();this.cancel_edit();},'submit #o_website_links_edit_code_form':function(e){e.preventDefault();this.submit_code();},},init:function(parent,link_obj){this._super(parent);this.link_obj=link_obj;this.animating_copy=false;},start:function(){new ZeroClipboard(this.$('.btn_shorten_url_clipboard'));},toggle_copy_button:function(){var self=this;if(!this.animating_copy){this.animating_copy=true;var top=this.$('.o_website_links_short_url').position().top;this.$('.o_website_links_short_url').clone().css('position','absolute').css('left',15).css('top',top-2).css('z-index',2).removeClass('o_website_links_short_url').addClass('animated-link').insertAfter(this.$('.o_website_links_short_url')).animate({opacity:0,top:"-=20",},500,function(){self.$('.animated-link').remove();self.animating_copy=false;});}},remove:function(){this.getParent().remove_link(this);},notification:function(message){this.$('.notification').append('<strong>'+message+'</strong>');},edit_code:function(){var init_code=this.$('#o_website_links_code').html();this.$('#o_website_links_code').html("<form style='display:inline;' id='o_website_links_edit_code_form'><input type='hidden' id='init_code' value='"+init_code+"'/><input type='text' id='new_code' value='"+init_code+"'/></form>");this.$('.o_website_links_edit_code').hide();this.$('.copy-to-clipboard').hide();this.$('.o_website_links_edit_tools').show();},cancel_edit:function(){this.$('.o_website_links_edit_code').show();this.$('.copy-to-clipboard').show();this.$('.o_website_links_edit_tools').hide();this.$('.o_website_links_code_error').hide();var old_code=this.$('#o_website_links_edit_code_form #init_code').val();this.$('#o_website_links_code').html(old_code);this.$('#code-error').remove();this.$('#o_website_links_code form').remove();},submit_code:function() {var self=this;var init_code=this.$('#o_website_links_edit_code_form #init_code').val();var new_code=this.$('#o_website_links_edit_code_form #new_code').val();if(new_code===''){self.$('.o_website_links_code_error').html("The code cannot be left empty");self.$('.o_website_links_code_error').show();return;}
function show_new_code(new_code){self.$('.o_website_links_code_error').html('');self.$('.o_website_links_code_error').hide();self.$('#o_website_links_code form').remove();var host=self.$('#o_website_links_host').html();self.$('#o_website_links_code').html(new_code);self.$('.btn_shorten_url_clipboard').attr('data-clipboard-text',host+new_code);self.$('.o_website_links_edit_code').show();self.$('.copy-to-clipboard').show();self.$('.o_website_links_edit_tools').hide();}
if(init_code==new_code){show_new_code(new_code);}
else{ajax.jsonRpc('/website_links/add_code','call',{'init_code':init_code,'new_code':new_code}).then(function(result){show_new_code(result[0].code);}).fail(function(){self.$('.o_website_links_code_error').show();self.$('.o_website_links_code_error').html("This code is already taken");});}},});var RecentLinks=Widget.extend({init:function(){this._super();},get_recent_links:function(filter){var self=this;ajax.jsonRpc('/website_links/recent_links','call',{'filter':filter,'limit':20}).then(function(result){_.each(result.reverse(),function(link){self.add_link(link);});self.update_notification();}).fail(function(){var message=_t("Unable to get recent links");self.$el.append("<div class='alert alert-danger'>"+message+"</div>");});},add_link:function(link){var nb_links=this.getChildren().length;var recent_link_box=new RecentLinkBox(this,link);recent_link_box.prependTo(this.$el);$('.link-tooltip').tooltip();if(nb_links===0){this.update_notification();}},remove_links:function(){_.invoke(this.getChildren(),'remove');},remove_link:function(link){link.destroy();},update_notification:function(){if(this.getChildren().length===0){var message=_t("You don't have any recent links.");$('.o_website_links_recent_links_notification').html("<div class='alert alert-info'>"+message+"</div>");}
else{$('.o_website_links_recent_links_notification').empty();}},});ajax.loadXML('/website_links/static/src/xml/recent_link.xml',qweb);base.ready().done(function(){ZeroClipboard.config({swfPath:location.origin+"/web/static/lib/zeroclipboard/ZeroClipboard.swf"});var campaign_select=new SelectBox('utm.campaign');campaign_select.start($("#campaign-select"),_t('e.g. Promotion of June, Winter Newsletter, ..'));var medium_select=new SelectBox('utm.medium');medium_select.start($("#channel-select"),_t('e.g. Newsletter, Social Network, ..'));var source_select=new SelectBox('utm.source');source_select.start($("#source-select"),_t('e.g. Search Engine, Website page, ..'));var recent_links=new RecentLinks();recent_links.appendTo($("#o_website_links_recent_links"));recent_links.get_recent_links('newest');$('#filter-newest-links').click(function(){recent_links.remove_links();recent_links.get_recent_links('newest');});$('#filter-most-clicked-links').click(function(){recent_links.remove_links();recent_links.get_recent_links('most-clicked');});$('#filter-recently-used-links').click(function(){recent_links.remove_links();recent_links.get_recent_links('recently-used');});var client=new ZeroClipboard($("#btn_shorten_url"));$("#generated_tracked_link a").click(function(){$("#generated_tracked_link a").text("Copied").removeClass("btn-primary").addClass("btn-success");setTimeout(function(){$("#generated_tracked_link a").text("Copy").removeClass("btn-success").addClass("btn-primary");},'5000');});$('#url').on('keyup',function(e){if($('#btn_shorten_url').hasClass('btn-copy')&&e.which!=13){$('#btn_shorten_url').removeClass('btn-success btn-copy').addClass('btn-primary').html('Get tracked link');$('#generated_tracked_link').css('display','none');$('.o_website_links_utm_forms').show();}});var url_copy_animating=false;$('#btn_shorten_url').click(function(){if($('#btn_shorten_url').hasClass('btn-copy')){if(!url_copy_animating){url_copy_animating=true;$('#generated_tracked_link').clone().css('position','absolute').css('left','78px').css('bottom','8px').css('z-index',2).removeClass('#generated_tracked_link').addClass('url-animated-link').appendTo($('#generated_tracked_link')).animate({opacity:0,bottom:"+=20",},500,function(){$('.url-animated-link').remove();url_copy_animating=false;});}}});$("#o_website_links_link_tracker_form").submit(function(event){if($('#btn_shorten_url').hasClass('btn-copy')){event.preventDefault();return;}
event.preventDefault();event.stopPropagation();var url=$("#url").val();var campaign_id=$('#campaign-select').attr('value');var medium_id=$('#channel-select').attr('value');var source_id=$('#source-select').attr('value');var params={};params.url=$("#url").val();if(campaign_id!==''){params.campaign_id=parseInt(campaign_id);}
if(medium_id!==''){params.medium_id=parseInt(medium_id);}
if(source_id!==''){params.source_id=parseInt(source_id);}
$('#btn_shorten_url').text(_t('Generating link...'));ajax.jsonRpc("/website_links/new",'call',params).then(function(result){if('error'in result){if(result.error==='empty_url'){$('.notification').html("<div class='alert alert-danger'>The URL is empty.</div>");}
else if(result.error=='url_not_found'){$('.notification').html("<div class='alert alert-danger'>URL not found (404)</div>");}
else{$('.notification').html("<div class='alert alert-danger'>An error occur while trying to generate your link. Try again later.</div>");}}
else{var link=result[0];$('#btn_shorten_url').removeClass('btn-primary').addClass('btn-success btn-copy').html('Copy');$('#btn_shorten_url').attr('data-clipboard-text',link.short_url);$('.notification').html('');$('#generated_tracked_link').html(link.short_url);$('#generated_tracked_link').css('display','inline');recent_links.add_link(link);$('#campaign-select').select2('val','');$('#channel-select').select2('val','');$('#source-select').select2('val','');$('.o_website_links_utm_forms').hide();}});});$(function(){$('[data-toggle="tooltip"]').tooltip();});});exports.SelectBox=SelectBox;exports.RecentLinkBox=RecentLinkBox;exports.RecentLinks=RecentLinks;return exports;});;

/* /website_links/static/src/js/website_links_code_editor.js defined in bundle 'website.assets_frontend' */
odoo.define('website_links.code_editor',function(require){'use strict';var ajax=require('web.ajax');var base=require('web_editor.base');var website=require('website.website');if(!$('.o_website_links_edit_code').length){return $.Deferred().reject("DOM doesn't contain '.o_website_links_edit_code'");}
$('.o_website_links_edit_code').on('click',function(e){e.preventDefault();var init_code=$('#o_website_links_code').html();$('#o_website_links_code').html("<form style='display:inline;' id='edit-code-form'><input type='hidden' id='init_code' value='"+init_code+"'/><input type='text' id='new_code' value='"+init_code+"'/></form>");$('.o_website_links_edit_code').hide();$('.copy-to-clipboard').hide();$('.o_website_links_edit_tools').show();$('.o_website_links_cancel_edit').on('click',function(e){e.preventDefault();$('.o_website_links_edit_code').show();$('.copy-to-clipboard').show();$('.o_website_links_edit_tools').hide();$('.o_website_links_code_error').hide();var old_code=$('#edit-code-form #init_code').val();$('#o_website_links_code').html(old_code);$('#code-error').remove();$('#o_website_links_code form').remove();});function submit_code(){var init_code=$('#edit-code-form #init_code').val();var new_code=$('#edit-code-form #new_code').val();if(new_code===''){self.$('.o_website_links_code_error').html("The code cannot be left empty");self.$('.o_website_links_code_error').show();return;}
function show_new_code(new_code){$('.o_website_links_code_error').html('');$('.o_website_links_code_error').hide();$('#o_website_links_code form').remove();var host=$('#short-url-host').html();$('#o_website_links_code').html(new_code);$('.copy-to-clipboard').attr('data-clipboard-text',host+new_code);$('.o_website_links_edit_code').show();$('.copy-to-clipboard').show();$('.o_website_links_edit_tools').hide();}
if(init_code==new_code){show_new_code(new_code);}
else{ajax.jsonRpc('/website_links/add_code','call',{'init_code':init_code,'new_code':new_code}).then(function(result){show_new_code(result[0].code);}).fail(function(){$('.o_website_links_code_error').show();$('.o_website_links_code_error').html("This code is already taken");});}}
$('#edit-code-form').submit(function(e){e.preventDefault();submit_code();});$('.o_website_links_ok_edit').click(function(e){e.preventDefault();submit_code();});});});;

/* /website_links/static/src/js/website_links_charts.js defined in bundle 'website.assets_frontend' */
odoo.define('website_links.charts',function(require){'use strict';var Widget=require('web.Widget');var base=require('web_editor.base');var website=require('website.website');var Model=require('web.Model');var exports={};if(!$('.o_website_links_chart').length){return $.Deferred().reject("DOM doesn't contain '.o_website_links_chart'");}
var BarChart=Widget.extend({init:function($element,begin_date,end_date,dates){this.$element=$element;this.begin_date=begin_date;this.end_date=end_date;this.number_of_days=this.end_date.diff(this.begin_date,'days')+2;this.dates=dates;},start:function(){var self=this;function getDate(d){return new Date(d[0]);}
function getNbClicks(d){return d[1];}
function getPrunedTickValues(ticks,nb_desired_ticks){var nb_values=ticks.length;var keep_one_of=Math.max(1,Math.floor(nb_values/nb_desired_ticks));return _.filter(ticks,function(d,i){return i%keep_one_of===0;});}
var clicks_array=[];var begin_date_copy=this.begin_date;for(var i=0;i<this.number_of_days;i++){var date_key=begin_date_copy.format('YYYY-MM-DD');clicks_array.push([date_key,(date_key in this.dates)?this.dates[date_key]:0]);begin_date_copy.add(1,'days');}
var nb_clicks=_.reduce(clicks_array,function(total,val){return total+val[1];},0);$(this.$element+' .title').html(nb_clicks+' clicks');var chart_data=[{}];chart_data[0]['key']='# of clicks';chart_data[0]['values']=clicks_array;nv.addGraph(function(){var chart=nv.models.lineChart().x(function(d){return getDate(d);}).y(function(d){return getNbClicks(d);}).showYAxis(true).showXAxis(true);var tick_values=getPrunedTickValues(chart_data[0]['values'],10);chart.xAxis.tickFormat(function(d){return d3.time.format("%d/%m/%y")(new Date(d));}).tickValues(_.map(tick_values,function(d){return getDate(d).getTime();})).rotateLabels(55);chart.yAxis.tickFormat(d3.format("d")).ticks(chart_data[0]['values'].length-1);d3.select(self.$element+' svg').datum(chart_data).call(chart);return self.chart=chart;});},});var PieChart=Widget.extend({init:function($element,data){this.data=data;this.$element=$element;},start:function(){var self=this;var processed_data=[];for(var i=0;i<this.data.length;i++){var country_name=this.data[i]['country_id']?this.data[i]['country_id'][1]:'Undefined';processed_data.push({'label':country_name+' ('+this.data[i]['country_id_count']+')','value':this.data[i]['country_id_count']});}
$(this.$element+' .title').html(this.data.length+' countries');nv.addGraph(function(){var chart=nv.models.pieChart().x(function(d){return d.label;}).y(function(d){return d.value;}).showLabels(false);d3.select(self.$element+' svg').datum(processed_data).transition().duration(1200).call(chart);return self.chart=chart;});},});base.ready().done(function(){var charts={};$(".graph-tabs li a").click(function(e){e.preventDefault();$(this).tab('show');_.chain(charts).pluck('chart').invoke('update');});var link_id=$('#link_id').val();var clicks=new Model('link.tracker.click');var links_domain=['link_id','=',parseInt(link_id)];var total_clicks=function(){return clicks.call('search_count',[[links_domain]]);};var clicks_by_day=function(){return clicks.call('read_group',[[links_domain],['create_date']],{'groupby':'create_date:day'});};var clicks_by_country=function(){return clicks.call('read_group',[[links_domain],['country_id']],{'groupby':'country_id'});};var last_week_clicks_by_country=function(){var interval=moment().subtract(7,'days').format("YYYY-MM-DD");return clicks.call('read_group',[[links_domain,['create_date','>',interval]],['country_id']],{'groupby':'country_id'});};var last_month_clicks_by_country=function(){var interval=moment().subtract(30,'days').format("YYYY-MM-DD");return clicks.call('read_group',[[links_domain,['create_date','>',interval]],['country_id']],{'groupby':'country_id'});};$.when(total_clicks(),clicks_by_day(),clicks_by_country(),last_week_clicks_by_country(),last_month_clicks_by_country()).done(function(total_clicks,clicks_by_day,clicks_by_country,last_week_clicks_by_country,last_month_clicks_by_country){if(total_clicks){var formatted_clicks_by_day={};var begin_date,end_date;for(var i=0;i<clicks_by_day.length;i++){var date=moment(clicks_by_day[i]['create_date:day'],"DD MMMM YYYY");if(i===0){begin_date=date;}
if(i==clicks_by_day.length-1){end_date=date;}
formatted_clicks_by_day[date.format("YYYY-MM-DD")]=clicks_by_day[i]['create_date_count'];}
var now=moment();charts.all_time_bar=new BarChart('#all_time_clicks_chart',begin_date,now,formatted_clicks_by_day);begin_date=moment().subtract(30,'days');charts.last_month_bar=new BarChart('#last_month_clicks_chart',begin_date,now,formatted_clicks_by_day);begin_date=moment().subtract(7,'days');charts.last_week_bar=new BarChart('#last_week_clicks_chart',begin_date,now,formatted_clicks_by_day);charts.all_time_pie=new PieChart('#all_time_countries_charts',clicks_by_country);charts.last_month_pie=new PieChart('#last_month_countries_charts',last_month_clicks_by_country);charts.last_week_pie=new PieChart('#last_week_countries_charts',last_week_clicks_by_country);var row_width=$('#all_time_countries_charts').parent().width();var charts_svg=$('#all_time_countries_charts,last_month_countries_charts,last_week_countries_charts').find('svg');charts_svg.css('height',Math.max(clicks_by_country.length*(row_width>750?1:2),20)+'em');_.invoke(charts,'start');nv.utils.windowResize(function(){_.chain(charts).pluck('chart').invoke('update');});}
else{$('#all_time_charts').prepend('There is no data to show');$('#last_month_charts').prepend('There is no data to show');$('#last_week_charts').prepend('There is no data to show');}});ZeroClipboard.config({swfPath:location.origin+"/web/static/lib/zeroclipboard/ZeroClipboard.swf"});new ZeroClipboard($('.copy-to-clipboard'));var animating_copy=false;$('.copy-to-clipboard').on('click',function(e){e.preventDefault();if(!animating_copy){animating_copy=true;$('.o_website_links_short_url').clone().css('position','absolute').css('left','15px').css('bottom','10px').css('z-index',2).removeClass('.o_website_links_short_url').addClass('animated-link').appendTo($('.o_website_links_short_url')).animate({opacity:0,bottom:"+=20",},500,function(){$('.animated-link').remove();animating_copy=false;});}});});exports.BarChart=BarChart;exports.PieChart=PieChart;return exports;});;

/* /website_blog/static/lib/contentshare.js defined in bundle 'website.assets_frontend' */
(function(){$.fn.share=function(options){var option=$.extend($.fn.share.defaults,options);$.extend($.fn.share,{init:function(shareable){var self=this;$.fn.share.defaults.shareable=shareable;$.fn.share.defaults.shareable.on('mouseup',function(){if($(this).parents('body.editor_enable').length===0){self.popOver();}});$.fn.share.defaults.shareable.on('mousedown',function(){self.destroy();});},getContent:function(){var current_url=window.location.href
var selected_text=this.getSelection('string').substring(0,option.maxLength-(current_url.length+option.author_name.length+7));var text=encodeURIComponent('\"'+selected_text+'\" '+'--@'+option.author_name+' '+current_url)
return'<a onclick="window.open(\''+option.shareLink+text+'\',\'_'+option.target+'\',\'location=yes,height=570,width=520,scrollbars=yes,status=yes\')"><i class="fa fa-twitter fa-lg"/></a>';},getSelection:function(share){if(window.getSelection){return(share=='string')?String(window.getSelection().getRangeAt(0)).replace(/\s{2,}/g,' '):window.getSelection().getRangeAt(0);}
else if(document.selection){return(share=='string')?document.selection.createRange().text.replace(/\s{2,}/g,' '):document.selection.createRange();}},popOver:function(){this.destroy();if(this.getSelection('string').length<option.minLength)
return;var data=this.getContent();var range=this.getSelection();var newNode=document.createElement("mark");range.surroundContents(newNode);$('mark').addClass(option.className);$('.'+option.className).popover({trigger:'manual',placement:option.placement,html:true,content:function(){return data;}});$('.'+option.className).popover('show');},destroy:function(){$('.'+option.className).popover('hide');$('mark').contents().unwrap();$('mark').remove();}});$.fn.share.init(this);};$.fn.share.defaults={shareLink:"http://twitter.com/intent/tweet?text=",minLength:5,maxLength:140,target:"blank",className:"share",placement:"top",};}());;

/* /website_blog/static/src/js/website_blog.inline.discussion.js defined in bundle 'website.assets_frontend' */
odoo.define('website_blog.InlineDiscussion',function(require){'use strict';var ajax=require('web.ajax');var core=require('web.core');var base=require('web_editor.base');var qweb=core.qweb;ajax.loadXML('/website_blog/static/src/xml/website_blog.inline.discussion.xml',qweb);var InlineDiscussion=core.Class.extend({init:function(options){var defaults={position:'right',post_id:$('#blog_post_name').attr('data-blog-id'),content:false,public_user:false,};this.settings=$.extend({},defaults,options);},start:function(){var self=this;if($('#discussions_wrapper').length===0&&this.settings.content.length>0){$('<div id="discussions_wrapper"></div>').insertAfter($('#blog_content'));}
this.discussions_handler(this.settings.content);$('html').click(function(event){if($(event.target).parents('#discussions_wrapper, .main-discussion-link-wrp').length===0){self.hide_discussion();}
if(!$(event.target).hasClass('discussion-link')&&!$(event.target).parents('.popover').length){if($('.move_discuss').length){$('[enable_chatter_discuss=True]').removeClass('move_discuss');$('[enable_chatter_discuss=True]').animate({'marginLeft':"+=40%"});$('#discussions_wrapper').animate({'marginLeft':"+=250px"});}}});},prepare_data:function(identifier,comment_count){var self=this;return ajax.jsonRpc("/blog/post_get_discussion/",'call',{'post_id':self.settings.post_id,'path':identifier,'count':comment_count,});},prepare_multi_data:function(identifiers,comment_count){var self=this;return ajax.jsonRpc("/blog/post_get_discussions/",'call',{'post_id':self.settings.post_id,'paths':identifiers,'count':comment_count,});},discussions_handler:function(){var self=this;var node_by_id={};$(self.settings.content).each(function(){var node=$(this);var identifier=node.attr('data-chatter-id');if(identifier){node_by_id[identifier]=node;}});self.prepare_multi_data(_.keys(node_by_id),true).then(function(multi_data){_.forEach(multi_data,function(data){self.prepare_discuss_link(data.val,data.path,node_by_id[data.path]);});});},prepare_discuss_link:function(data,identifier,node){var self=this;var cls=data>0?'discussion-link has-comments':'discussion-link';var a=$('<a class="'+cls+' css_editable_mode_hidden" />').attr('data-discus-identifier',identifier).attr('data-discus-position',self.settings.position).text(data>0?data:'+').attr('data-contentwrapper','.mycontent').wrap('<div class="discussion" />').parent().appendTo('#discussions_wrapper');a.css({'top':node.offset().top,'left':self.settings.position=='right'?node.outerWidth()+node.offset().left:node.offset().left-a.outerWidth()});node.mouseover(function(){a.addClass("hovered");}).mouseout(function(){a.removeClass("hovered");});a.delegate('a.discussion-link',"click",function(e){e.preventDefault();if(!$('.move_discuss').length){$('[enable_chatter_discuss=True]').addClass('move_discuss');$('[enable_chatter_discuss=True]').animate({'marginLeft':"-=40%"});$('#discussions_wrapper').animate({'marginLeft':"-=250px"});}
if($(this).is('.active')){e.stopPropagation();self.hide_discussion();}
else{self.get_discussion($(this),function(){});}});},get_discussion:function(source,callback){var self=this;var identifier=source.attr('data-discus-identifier');self.hide_discussion();self.discus_identifier=identifier;var elt=$('a[data-discus-identifier="'+identifier+'"]');self.settings.current_url=window.location;elt.append(qweb.render("website.blog_discussion.popover",{'identifier':identifier,'options':self.settings}));var comment='';self.prepare_data(identifier,false).then(function(data){_.each(data,function(res){comment+=qweb.render("website.blog_discussion.comment",{'res':res});});$('.discussion_history').html('<ul class="media-list mt8">'+comment+'</ul>');self.create_popover(elt,identifier);$('a.discussion-link, a.main-discussion-link').removeClass('active').filter(source).addClass('active');elt.popover('hide').filter(source).popover('show');callback(source);});},create_popover:function(elt,identifier){var self=this;elt.popover({placement:'right',trigger:'manual',html:true,content:function(){return $($(this).data('contentwrapper')).html();}}).parent().delegate(self).on('click','button#comment_post',function(e){e.stopImmediatePropagation();self.post_discussion(identifier);});},validate:function(public_user){var comment=$(".popover textarea#inline_comment").val();if(!comment){$('div#inline_comment').addClass('has-error');return false;}
$("div#inline_comment").removeClass('has-error');$(".popover textarea#inline_comment").val('');return[comment];},post_discussion:function(){var self=this;var val=self.validate(self.settings.public_user);if(!val)return;ajax.jsonRpc("/blog/post_discussion",'call',{'blog_post_id':self.settings.post_id,'path':self.discus_identifier,'comment':val[0],}).then(function(res){$(".popover ul.media-list").prepend(qweb.render("website.blog_discussion.comment",{'res':res[0]}));var ele=$('a[data-discus-identifier="'+self.discus_identifier+'"]');ele.text(_.isNaN(parseInt(ele.text()))?1:parseInt(ele.text())+1);ele.addClass('has-comments');});},hide_discussion:function(){var self=this;$('a[data-discus-identifier="'+self.discus_identifier+'"]').popover('destroy');$('a.discussion-link').removeClass('active');}});return InlineDiscussion;});;

/* /website_blog/static/src/js/website_blog.js defined in bundle 'website.assets_frontend' */
odoo.define('website_blog.website_blog',function(require){"use strict";var ajax=require('web.ajax');var InlineDiscussion=require('website_blog.InlineDiscussion');function page_transist(event){event.preventDefault();var newLocation=$('.js_next')[0].href;var top=$('.cover_footer').offset().top;$('.cover_footer').animate({height:$(window).height()+'px'},300);$('html, body').animate({scrollTop:top},300,'swing',function(){window.location.href=newLocation;});}
function animate(event){event.preventDefault();event.stopImmediatePropagation();var target=$(this.hash);$('html, body').stop().animate({'scrollTop':target.offset().top-32},500,'swing',function(){window.location.hash='blog_content';});}
$(document).ready(function(){if($('.website_blog').length){var content=$("div[enable_chatter_discuss='True']").find('p[data-chatter-id]');if(content){ajax.jsonRpc("/blog/get_user/",'call',{}).then(function(data){$('#discussions_wrapper').empty();new InlineDiscussion({'content':content,'public_user':data[0]}).start();});}
$(".js_tweet").share({'author_name':$('#blog_author').text()});$('.cover_footer').on('click',page_transist);$('a[href^="#blog_content"]').on('click',animate);if($('#js_blogcover').length){$('#js_blogcover[style*="background-image: url"]').css('min-height',$(window).height()-$('#js_blogcover').offset().top);}}});});;

/* /snippet_latest_posts/static/src/js/s_latest_posts_frontend.js defined in bundle 'website.assets_frontend' */
odoo.define('snippet_latest_posts.s_latest_posts_frontend',function(require){'use strict';var ajax=require('web.ajax');var s_animation=require('web_editor.snippets.animation');s_animation.registry.js_get_posts=s_animation.Class.extend({selector:".js_get_posts",start:function(){this.redrow();},stop:function(){this.clean();},redrow:function(debug){this.clean(debug);this.build(debug);},clean:function(debug){this.$target.empty();},build:function(debug){var self=this,limit=self.$target.data("posts_limit"),blog_id=self.$target.data("filter_by_blog_id"),template=self.$target.data("template"),loading=self.$target.data("loading");self.$target.attr("contenteditable","False");if(!limit)limit=3;if(!template)template='snippet_latest_posts.media_list_template';var domain=[['website_published','=',true]]
if(blog_id){domain.push(['blog_id','=',parseInt(blog_id)]);}
ajax.jsonRpc('/snippet_latest_posts/render','call',{'template':template,'domain':domain,'limit':limit,}).then(function(posts){if(loading&&loading==true){self.loading(posts,debug);}else{$(posts).appendTo(self.$target);}}).fail(function(e){return;});},loading:function(posts,debug){var self=this,$posts=$(posts);if(!$posts.first().find(".loading_container")&&!$posts.first().is(".loading_container")){console.log("loading_container dont exist??")
if(debug){console.info("No '.loading_container' defined \n Please, add a 'loading_container' class to the element that must be filled by the loading bar");}}else if(!$posts.first().is(".thumb")&&!$posts.first().find(".thumb")){console.log("thumb dont exist??")
if(debug){console.info("No '.thumb' defined \n Please, add a 'thumb' class to your thumbnail div");}}else{$posts.each(function(){var $post=$(this),$load_c=$post.find(".loading_container"),$thumb=$post.find(".thumb"),$progress=$('<div class="progress js-loading"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0;" /></div>')
if($post.html()==undefined){return;}
if($load_c.length==0){$load_c=$post}
if($thumb.length==0){$thumb=$post}
$post.addClass("js-loading");$progress.appendTo($load_c);$post.appendTo(self.$target);var bg=$thumb.css('background-image').replace('url(','').replace(')',''),loaded=false;$progress.find(".progress-bar").css("width","50%").attr("aria-valuenow","50");var dummyImg=$('<img/>').attr('src',bg).load(function(){$progress.find(".progress-bar").find(".progress-bar").css("width","100%").attr("aria-valuenow","100");setTimeout(function(){self.showPost($post,$progress);},500);$(this).remove();loaded=true;});setTimeout(function(){if(loaded==false){dummyImg.remove();self.showPost($post,$progress)}},500);})}},showPost:function($post,$progress){$post.removeClass("js-loading");$progress.fadeOut(500);},});});;

/* /website_mail/static/src/js/follow.js defined in bundle 'website.assets_frontend' */
odoo.define('website_mail.follow',function(require){'use strict';var ajax=require('web.ajax');var animation=require('web_editor.snippets.animation');animation.registry.follow=animation.Class.extend({selector:".js_follow",start:function(editable_mode){var self=this;this.is_user=false;ajax.jsonRpc('/website_mail/is_follower','call',{model:this.$target.data('object'),id:this.$target.data('id'),}).always(function(data){self.is_user=data.is_user;self.email=data.email;self.toggle_subscription(data.is_follower,data.email);self.$target.removeClass("hidden");});if(!editable_mode){$('.js_follow > .input-group-btn.hidden').removeClass("hidden");this.$target.find('.js_follow_btn, .js_unfollow_btn').on('click',function(event){event.preventDefault();self.on_click();});}
return;},on_click:function(){var self=this;var $email=this.$target.find(".js_follow_email");if($email.length&&!$email.val().match(/.+@.+/)){this.$target.addClass('has-error');return false;}
this.$target.removeClass('has-error');var email=$email.length?$email.val():false;if(email||this.is_user){ajax.jsonRpc('/website_mail/follow','call',{'id':+this.$target.data('id'),'object':this.$target.data('object'),'message_is_follower':this.$target.attr("data-follow")||"off",'email':email,}).then(function(follow){self.toggle_subscription(follow,email);});}},toggle_subscription:function(follow,email){follow=follow||(!email&&this.$target.attr('data-unsubscribe'));if(follow){this.$target.find(".js_follow_btn").addClass("hidden");this.$target.find(".js_unfollow_btn").removeClass("hidden");}
else{this.$target.find(".js_follow_btn").removeClass("hidden");this.$target.find(".js_unfollow_btn").addClass("hidden");}
this.$target.find('input.js_follow_email').val(email||"").attr("disabled",email&&(follow||this.is_user)?"disabled":false);this.$target.attr("data-follow",follow?'on':'off');},});});;

/* /website_mail/static/src/js/message_post.js defined in bundle 'website.assets_frontend' */
odoo.define('website_mail.thread',function(require){'use strict';var web_editor_base=require('web_editor.base')
var qweb=require('qweb');var ajax=require('web.ajax');var Widget=require('web.Widget');ajax.loadXML('/website_mail/static/src/xml/chatter_message.xml',qweb);var WebsiteMailThread=Widget.extend({events:{"click .o_website_chatter_json":"on_click",},on_click:function(e){var self=this;e.preventDefault();var $button=this.$(e.currentTarget);var $form=this.$('.o_website_chatter_form');var $error=this.$('.o_website_chatter_error');var action=$form.attr('action');var data=this._get_form_data($form);data.message=data.message.replace(/\n/g,"<br/>");if(data.message){$button.attr('disabled',true);var button_bk=$button.html();$button.prepend('<i class="fa fa-refresh fa-spin"></i> ');ajax.jsonRpc(action,'call',data).then(function(result){if(result){$error.fadeOut();self.prepend_message(result);$form.find('textarea').val('');}else{$error.fadeIn();}
$button.html(button_bk);$button.attr('disabled',false);});}},prepend_message:function(message_data){var msg=qweb.render('website_mail.thread_message',message_data);var elem=$(msg).hide().prependTo(this.$('.o_website_comments'));elem.slideToggle();return elem;},_get_form_data:function($form){var unindexed_array=$form.serializeArray();var indexed_array={};$.map(unindexed_array,function(n,i){indexed_array[n.name]=n.value;});return indexed_array;},});web_editor_base.ready().then(function(){if($('.o_website_mail_thread').length){var mail_thread=new WebsiteMailThread($('body')).setElement($('.o_website_mail_thread'));}});return{WebsiteMailThread:WebsiteMailThread,}});;

/* /website_mass_mailing/static/src/js/website_mass_mailing.js defined in bundle 'website.assets_frontend' */
odoo.define('mass_mailing.website_integration',function(require){"use strict";var ajax=require('web.ajax');var utils=require('web.utils');var animation=require('web_editor.snippets.animation');var website=require('website.website');animation.registry.subscribe=animation.Class.extend({selector:".js_subscribe",start:function(editable_mode){var self=this;self.$target.find("input").removeClass("hidden");ajax.jsonRpc('/website_mass_mailing/is_subscriber','call',{list_id:this.$target.data('list-id'),}).always(function(data){self.$target.find('input.js_subscribe_email').val(data.email?data.email:"").attr("disabled",data.is_subscriber&&data.email.length?"disabled":false);self.$target.attr("data-subscribe",data.is_subscriber?'on':'off');self.$target.find('a.js_subscribe_btn').attr("disabled",data.is_subscriber&&data.email.length?"disabled":false);self.$target.removeClass("hidden");self.$target.find('.js_subscribe_btn').toggleClass('hidden',!!data.is_subscriber);self.$target.find('.js_subscribed_btn').toggleClass('hidden',!data.is_subscriber);});if(!editable_mode){$('.js_subscribe > .alert').addClass("hidden");$('.js_subscribe > .input-group-btn.hidden').removeClass("hidden");this.$target.find('.js_subscribe_btn').on('click',function(event){event.preventDefault();self.on_click();});}},on_click:function(){var self=this;var $email=this.$target.find(".js_subscribe_email:visible");if($email.length&&!$email.val().match(/.+@.+/)){this.$target.addClass('has-error');return false;}
this.$target.removeClass('has-error');ajax.jsonRpc('/website_mass_mailing/subscribe','call',{'list_id':this.$target.data('list-id'),'email':$email.length?$email.val():false,}).then(function(subscribe){self.$target.find(".js_subscribe_email, .input-group-btn").addClass("hidden");self.$target.find(".alert").removeClass("hidden");self.$target.find('input.js_subscribe_email').attr("disabled",subscribe?"disabled":false);self.$target.attr("data-subscribe",subscribe?'on':'off');});},});animation.registry.newsletter_popup=animation.Class.extend({selector:".o_newsletter_popup",start:function(editable_mode){var self=this;var popupcontent=self.$target.find(".o_popup_content_dev").empty();if(!self.$target.data('list-id'))return;ajax.jsonRpc('/website_mass_mailing/get_content','call',{newsletter_id:self.$target.data('list-id')}).then(function(data){if(data.content){$('<div></div>').append(data.content).appendTo(popupcontent);}
self.$target.find('input.popup_subscribe_email').val(data.email||"");self.redirect_url=data.redirect_url;if(!editable_mode&&!data.is_subscriber){$(document).on('mouseleave',_.bind(self.show_banner,self));self.$target.find('.popup_subscribe_btn').on('click',function(event){event.preventDefault();self.on_click_subscribe();});}else{$(document).off('mouseleave');}});},on_click_subscribe:function(){var self=this;var $email=self.$target.find(".popup_subscribe_email:visible");if($email.length&&!$email.val().match(/.+@.+/)){self.$target.addClass('has-error');return false;}
self.$target.removeClass('has-error');ajax.jsonRpc('/website_mass_mailing/subscribe','call',{'list_id':self.$target.data('list-id'),'email':$email.length?$email.val():false}).then(function(subscribe){self.$target.find('#o_newsletter_popup').modal('hide');$(document).off('mouseleave');if(self.redirect_url){if(_.contains(self.redirect_url.split('/'),window.location.host)||self.redirect_url.indexOf('/')==0){window.location.href=self.redirect_url;}else{window.open(self.redirect_url,'_blank');}}});},show_banner:function(){var self=this;if(!utils.get_cookie("newsletter-popup-"+self.$target.data('list-id'))&&self.$target){$('#o_newsletter_popup:first').modal('show').css({'margin-top':'70px','position':'fixed'});document.cookie="newsletter-popup-"+self.$target.data('list-id')+"="+true+";path=/";}}});});odoo.define('mass_mailing.unsubscribe',function(require){var ajax=require('web.ajax');var core=require('web.core');require('web_editor.base');var _t=core._t;if(!$('.o_unsubscribe_form').length){return $.Deferred().reject("DOM doesn't contain '.o_unsubscribe_form'");}
$('#unsubscribe_form').on('submit',function(e){e.preventDefault();var email=$("input[name='email']").val();var mailing_id=parseInt($("input[name='mailing_id']").val());var checked_ids=[];$("input[type='checkbox']:checked").each(function(i){checked_ids[i]=parseInt($(this).val());});var unchecked_ids=[];$("input[type='checkbox']:not(:checked)").each(function(i){unchecked_ids[i]=parseInt($(this).val());});ajax.jsonRpc('/mail/mailing/unsubscribe','call',{'opt_in_ids':checked_ids,'opt_out_ids':unchecked_ids,'email':email,'mailing_id':mailing_id}).then(function(result){$('.alert-info').html(_t('Your changes have been saved.')).removeClass('alert-info').addClass('alert-success');}).fail(function(){$('.alert-info').html(_t('Your changes have not been saved, try again later.')).removeClass('alert-info').addClass('alert-warning');});});});;

/* /website_form/static/src/js/website_form.js defined in bundle 'website.assets_frontend' */
odoo.define('website_form.animation',function(require){'use strict';var core=require('web.core');var time=require('web.time');var ajax=require('web.ajax');var snippet_animation=require('web_editor.snippets.animation');var _t=core._t;var qweb=core.qweb;snippet_animation.registry.form_builder_send=snippet_animation.Class.extend({selector:'.s_website_form',start:function(){var self=this;qweb.add_template('/website_form/static/src/xml/website_form.xml');this.$target.find('.o_website_form_send').on('click',function(e){self.send(e);});var l10n=_t.database.parameters;var datepickers_options={startDate:moment({y:1900}),endDate:moment().add(200,"y"),calendarWeeks:true,icons:{time:'fa fa-clock-o',date:'fa fa-calendar',up:'fa fa-chevron-up',down:'fa fa-chevron-down'},language:moment.locale(),format:time.strftime_to_moment_format(l10n.date_format+' '+l10n.time_format),}
this.$target.find('.o_website_form_datetime').datetimepicker(datepickers_options);datepickers_options.pickTime=false;datepickers_options.format=time.strftime_to_moment_format(l10n.date_format);this.$target.find('.o_website_form_date').datetimepicker(datepickers_options);},stop:function(){this.$target.find('button').off('click');},send:function(e){e.preventDefault();this.$target.find('.o_website_form_send').off();var self=this;self.$target.find('#o_website_form_result').empty();if(!self.check_error_fields([])){self.update_status('invalid');return false;}
this.form_fields=this.$target.serializeArray();_.each(this.$target.find('input[type=file]'),function(input){$.each($(input).prop('files'),function(index,file){self.form_fields.push({name:input.name+'['+index+']',value:file});});});var form_values={};_.each(this.form_fields,function(input){if(input.name in form_values){if(Array.isArray(form_values[input.name])){form_values[input.name].push(input.value);}else{form_values[input.name]=[form_values[input.name],input.value];}}else{if(input.value!=''){form_values[input.name]=input.value;}}});for(var key in this.$target.data()){if(_.str.startsWith(key,'form_field_')){form_values[key.replace('form_field_','')]=this.$target.data(key);}}
ajax.post(this.$target.attr('action')+this.$target.data('model_name'),form_values).then(function(result_data){result_data=$.parseJSON(result_data);if(!result_data.id){self.update_status('error');if(result_data.error_fields&&result_data.error_fields.length){self.check_error_fields(result_data.error_fields);}}else{var success_page=self.$target.attr('data-success_page');if(success_page){$(location).attr('href',success_page);}
else{self.update_status('success');}
self.$target[0].reset();}}).fail(function(result_data){self.update_status('error');});},check_error_fields:function(error_fields){var self=this;var form_valid=true;this.$target.find('.form-field').each(function(k,field){var $field=$(field);var $fields=self.$fields;var field_name=$field.find('.control-label').attr('for')
var field_valid=true;var inputs=$field.find('.o_website_form_input:not(#editable_select)');var invalid_inputs=inputs.toArray().filter(function(input,k,inputs){if(input.required&&input.type=='checkbox'){var checkboxes=_.filter(inputs,function(input){return input.required&&input.type=='checkbox'})
return!_.any(checkboxes,function(checkbox){return checkbox.checked})}else if($(input).hasClass('o_website_form_date')){if(!self.is_datetime_valid(input.value,'date')){return true;}}else if($(input).hasClass('o_website_form_datetime')){if(!self.is_datetime_valid(input.value,'datetime')){return true;}}
return!input.checkValidity();})
$field.removeClass('has-error');if(invalid_inputs.length||error_fields.indexOf(field_name)>=0){$field.addClass('has-error');form_valid=false;}});return form_valid;},is_datetime_valid:function(value,type_of_date){if(value===""){return true;}else{try{this.parse_date(value,type_of_date);return true;}catch(e){return false;}}},parse_date:function(value,type_of_date,value_if_empty){var date_pattern=time.strftime_to_moment_format(_t.database.parameters.date_format),time_pattern=time.strftime_to_moment_format(_t.database.parameters.time_format);var date_pattern_wo_zero=date_pattern.replace('MM','M').replace('DD','D'),time_pattern_wo_zero=time_pattern.replace('HH','H').replace('mm','m').replace('ss','s');switch(type_of_date){case'datetime':var datetime=moment(value,[date_pattern+' '+time_pattern,date_pattern_wo_zero+' '+time_pattern_wo_zero],true);if(datetime.isValid())
return time.datetime_to_str(datetime.toDate());throw new Error(_.str.sprintf(_t("'%s' is not a correct datetime"),value));case'date':var date=moment(value,[date_pattern,date_pattern_wo_zero],true);if(date.isValid())
return time.date_to_str(date.toDate());throw new Error(_.str.sprintf(_t("'%s' is not a correct date"),value));}
return value;},update_status:function(status){var self=this;if(status!='success'){this.$target.find('.o_website_form_send').on('click',function(e){self.send(e);});}
this.$target.find('#o_website_form_result').replaceWith(qweb.render("website_form.status_"+status))},});});;

/* /web/static/lib/bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js defined in bundle 'website.assets_frontend' */
;(function(root,factory){'use strict';if(typeof define==='function'&&define.amd){define(['jquery','moment'],factory);}else{if(!jQuery){throw new Error('bootstrap-datetimepicker requires jQuery to be loaded first');}
if(!moment){throw new Error('bootstrap-datetimepicker requires moment.js to be loaded first');}
factory(root.jQuery,moment);}}(this,function($,moment){'use strict';if(typeof moment==='undefined'){throw new Error('momentjs is required');}
var dpgId=0,DateTimePicker=function(element,options){var defaults=$.fn.datetimepicker.defaults,icons={time:'glyphicon glyphicon-time',date:'glyphicon glyphicon-calendar',up:'glyphicon glyphicon-chevron-up',down:'glyphicon glyphicon-chevron-down'},picker=this,dDate,init=function(){var icon=false,localeData,rInterval;picker.options=$.extend({},defaults,options);picker.options.icons=$.extend({},icons,picker.options.icons);picker.element=$(element);dataToOptions();if(!(picker.options.pickTime||picker.options.pickDate)){throw new Error('Must choose at least one picker');}
picker.id=dpgId++;moment.locale(picker.options.language);picker.date=moment();picker.unset=false;picker.isInput=picker.element.is('input');picker.component=false;if(picker.element.hasClass('input-group')){if(picker.element.find('.datepickerbutton').size()===0){picker.component=picker.element.find('[class^="input-group-"]');}
else{picker.component=picker.element.find('.datepickerbutton');}}
picker.format=picker.options.format;localeData=moment().localeData();if(!picker.format){picker.format=(picker.options.pickDate?localeData.longDateFormat('L'):'');if(picker.options.pickDate&&picker.options.pickTime){picker.format+=' ';}
picker.format+=(picker.options.pickTime?localeData.longDateFormat('LT'):'');if(picker.options.useSeconds){if(localeData.longDateFormat('LT').indexOf(' A')!==-1){picker.format=picker.format.split(' A')[0]+':ss A';}
else{picker.format+=':ss';}}}
picker.use24hours=picker.format.toLowerCase().indexOf('a')<1;if(picker.component){icon=picker.component.find('span');}
if(picker.options.pickTime){if(icon){icon.addClass(picker.options.icons.time);}}
if(picker.options.pickDate){if(icon){icon.removeClass(picker.options.icons.time);icon.addClass(picker.options.icons.date);}}
picker.options.widgetParent=typeof picker.options.widgetParent==='string'&&picker.options.widgetParent||picker.element.parents().filter(function(){return'scroll'===$(this).css('overflow-y');}).get(0)||'body';picker.widget=$(getTemplate()).appendTo(picker.options.widgetParent);picker.minViewMode=picker.options.minViewMode||0;if(typeof picker.minViewMode==='string'){switch(picker.minViewMode){case'months':picker.minViewMode=1;break;case'years':picker.minViewMode=2;break;default:picker.minViewMode=0;break;}}
picker.viewMode=picker.options.viewMode||0;if(typeof picker.viewMode==='string'){switch(picker.viewMode){case'months':picker.viewMode=1;break;case'years':picker.viewMode=2;break;default:picker.viewMode=0;break;}}
picker.viewMode=Math.max(picker.viewMode,picker.minViewMode);picker.options.disabledDates=indexGivenDates(picker.options.disabledDates);picker.options.enabledDates=indexGivenDates(picker.options.enabledDates);picker.startViewMode=picker.viewMode;picker.setMinDate(picker.options.minDate);picker.setMaxDate(picker.options.maxDate);fillDow();fillMonths();fillHours();fillMinutes();fillSeconds();update();showMode();attachDatePickerEvents();if(picker.options.defaultDate!==''&&getPickerInput().val()===''){picker.setValue(picker.options.defaultDate);}
if(picker.options.minuteStepping!==1){rInterval=picker.options.minuteStepping;picker.date.minutes((Math.round(picker.date.minutes()/rInterval)*rInterval)%60).seconds(0);}},getPickerInput=function(){var input;if(picker.isInput){return picker.element;}
input=picker.element.find('.datepickerinput');if(input.size()===0){input=picker.element.find('input');}
else if(!input.is('input')){throw new Error('CSS class "datepickerinput" cannot be applied to non input element');}
return input;},dataToOptions=function(){var eData;if(picker.element.is('input')){eData=picker.element.data();}
else{eData=picker.element.find('input').data();}
if(eData.dateFormat!==undefined){picker.options.format=eData.dateFormat;}
if(eData.datePickdate!==undefined){picker.options.pickDate=eData.datePickdate;}
if(eData.datePicktime!==undefined){picker.options.pickTime=eData.datePicktime;}
if(eData.dateUseminutes!==undefined){picker.options.useMinutes=eData.dateUseminutes;}
if(eData.dateUseseconds!==undefined){picker.options.useSeconds=eData.dateUseseconds;}
if(eData.dateUsecurrent!==undefined){picker.options.useCurrent=eData.dateUsecurrent;}
if(eData.calendarWeeks!==undefined){picker.options.calendarWeeks=eData.calendarWeeks;}
if(eData.dateMinutestepping!==undefined){picker.options.minuteStepping=eData.dateMinutestepping;}
if(eData.dateMindate!==undefined){picker.options.minDate=eData.dateMindate;}
if(eData.dateMaxdate!==undefined){picker.options.maxDate=eData.dateMaxdate;}
if(eData.dateShowtoday!==undefined){picker.options.showToday=eData.dateShowtoday;}
if(eData.dateCollapse!==undefined){picker.options.collapse=eData.dateCollapse;}
if(eData.dateLanguage!==undefined){picker.options.language=eData.dateLanguage;}
if(eData.dateDefaultdate!==undefined){picker.options.defaultDate=eData.dateDefaultdate;}
if(eData.dateDisableddates!==undefined){picker.options.disabledDates=eData.dateDisableddates;}
if(eData.dateEnableddates!==undefined){picker.options.enabledDates=eData.dateEnableddates;}
if(eData.dateIcons!==undefined){picker.options.icons=eData.dateIcons;}
if(eData.dateUsestrict!==undefined){picker.options.useStrict=eData.dateUsestrict;}
if(eData.dateDirection!==undefined){picker.options.direction=eData.dateDirection;}
if(eData.dateSidebyside!==undefined){picker.options.sideBySide=eData.dateSidebyside;}
if(eData.dateDaysofweekdisabled!==undefined){picker.options.daysOfWeekDisabled=eData.dateDaysofweekdisabled;}},place=function(){var position='absolute',offset=picker.component?picker.component.offset():picker.element.offset(),$window=$(window),placePosition;picker.width=picker.component?picker.component.outerWidth():picker.element.outerWidth();offset.top=offset.top+picker.element.outerHeight();if(picker.options.direction==='up'){placePosition='top';}else if(picker.options.direction==='bottom'){placePosition='bottom';}else if(picker.options.direction==='auto'){if(offset.top+picker.widget.height()>$window.height()+$window.scrollTop()&&picker.widget.height()+picker.element.outerHeight()<offset.top){placePosition='top';}else{placePosition='bottom';}}
if(placePosition==='top'){offset.top-=picker.widget.height()+picker.element.outerHeight()+15;picker.widget.addClass('top').removeClass('bottom');}else{offset.top+=1;picker.widget.addClass('bottom').removeClass('top');}
if(picker.options.width!==undefined){picker.widget.width(picker.options.width);}
if(picker.options.orientation==='left'){picker.widget.addClass('left-oriented');offset.left=offset.left-picker.widget.width()+20;}
if(isInFixed()){position='fixed';offset.top-=$window.scrollTop();offset.left-=$window.scrollLeft();}
if($window.width()<offset.left+picker.widget.outerWidth()){offset.right=$window.width()-offset.left-picker.width;offset.left='auto';picker.widget.addClass('pull-right');}else{offset.right='auto';picker.widget.removeClass('pull-right');}
picker.widget.css({position:position,top:offset.top,left:offset.left,right:offset.right});},notifyChange=function(oldDate,eventType){if(moment(picker.date).isSame(moment(oldDate))){return;}
picker.element.trigger({type:'dp.change',date:moment(picker.date),oldDate:moment(oldDate)});if(eventType!=='change'){picker.element.change();}},notifyError=function(date){picker.element.trigger({type:'dp.error',date:moment(date,picker.format,picker.options.useStrict)});},update=function(newDate){moment.locale(picker.options.language);var dateStr=newDate;if(!dateStr){dateStr=getPickerInput().val();if(dateStr){picker.date=moment(dateStr,picker.format,picker.options.useStrict);}
if(!picker.date){picker.date=moment();}}
picker.viewDate=moment(picker.date).startOf('month');fillDate();fillTime();},fillDow=function(){moment.locale(picker.options.language);var html=$('<tr>'),weekdaysMin=moment.weekdaysMin(),i;if(picker.options.calendarWeeks===true){html.append('<th class="cw">#</th>');}
if(moment().localeData()._week.dow===0){for(i=0;i<7;i++){html.append('<th class="dow">'+weekdaysMin[i]+'</th>');}}else{for(i=1;i<8;i++){if(i===7){html.append('<th class="dow">'+weekdaysMin[0]+'</th>');}else{html.append('<th class="dow">'+weekdaysMin[i]+'</th>');}}}
picker.widget.find('.datepicker-days thead').append(html);},fillMonths=function(){moment.locale(picker.options.language);var html='',i,monthsShort=moment.monthsShort();for(i=0;i<12;i++){html+='<span class="month">'+monthsShort[i]+'</span>';}
picker.widget.find('.datepicker-months td').append(html);},fillDate=function(){if(!picker.options.pickDate){return;}
moment.locale(picker.options.language);var year=picker.viewDate.year(),month=picker.viewDate.month(),startYear=picker.options.minDate.year(),startMonth=picker.options.minDate.month(),endYear=picker.options.maxDate.year(),endMonth=picker.options.maxDate.month(),currentDate,prevMonth,nextMonth,html=[],row,clsName,i,days,yearCont,currentYear,months=moment.months();picker.widget.find('.datepicker-days').find('.disabled').removeClass('disabled');picker.widget.find('.datepicker-months').find('.disabled').removeClass('disabled');picker.widget.find('.datepicker-years').find('.disabled').removeClass('disabled');picker.widget.find('.datepicker-days th:eq(1)').text(months[month]+' '+year);prevMonth=moment(picker.viewDate,picker.format,picker.options.useStrict).subtract(1,'months');days=prevMonth.daysInMonth();prevMonth.date(days).startOf('week');if((year===startYear&&month<=startMonth)||year<startYear){picker.widget.find('.datepicker-days th:eq(0)').addClass('disabled');}
if((year===endYear&&month>=endMonth)||year>endYear){picker.widget.find('.datepicker-days th:eq(2)').addClass('disabled');}
nextMonth=moment(prevMonth).add(42,'d');while(prevMonth.isBefore(nextMonth)){if(prevMonth.weekday()===moment().startOf('week').weekday()){row=$('<tr>');html.push(row);if(picker.options.calendarWeeks===true){row.append('<td class="cw">'+prevMonth.week()+'</td>');}}
clsName='';if(prevMonth.year()<year||(prevMonth.year()===year&&prevMonth.month()<month)){clsName+=' old';}else if(prevMonth.year()>year||(prevMonth.year()===year&&prevMonth.month()>month)){clsName+=' new';}
if(prevMonth.isSame(moment({y:picker.date.year(),M:picker.date.month(),d:picker.date.date()}))){clsName+=' active';}
if(isInDisableDates(prevMonth,'day')||!isInEnableDates(prevMonth)){clsName+=' disabled';}
if(picker.options.showToday===true){if(prevMonth.isSame(moment(),'day')){clsName+=' today';}}
if(picker.options.daysOfWeekDisabled){for(i=0;i<picker.options.daysOfWeekDisabled.length;i++){if(prevMonth.day()===picker.options.daysOfWeekDisabled[i]){clsName+=' disabled';break;}}}
row.append('<td class="day'+clsName+'">'+prevMonth.date()+'</td>');currentDate=prevMonth.date();prevMonth.add(1,'d');if(currentDate===prevMonth.date()){prevMonth.add(1,'d');}}
picker.widget.find('.datepicker-days tbody').empty().append(html);currentYear=picker.date.year();months=picker.widget.find('.datepicker-months').find('th:eq(1)').text(year).end().find('span').removeClass('active');if(currentYear===year){months.eq(picker.date.month()).addClass('active');}
if(year-1<startYear){picker.widget.find('.datepicker-months th:eq(0)').addClass('disabled');}
if(year+1>endYear){picker.widget.find('.datepicker-months th:eq(2)').addClass('disabled');}
for(i=0;i<12;i++){if((year===startYear&&startMonth>i)||(year<startYear)){$(months[i]).addClass('disabled');}else if((year===endYear&&endMonth<i)||(year>endYear)){$(months[i]).addClass('disabled');}}
html='';year=parseInt(year/10,10)*10;yearCont=picker.widget.find('.datepicker-years').find('th:eq(1)').text(year+'-'+(year+9)).parents('table').find('td');picker.widget.find('.datepicker-years').find('th').removeClass('disabled');if(startYear>year){picker.widget.find('.datepicker-years').find('th:eq(0)').addClass('disabled');}
if(endYear<year+9){picker.widget.find('.datepicker-years').find('th:eq(2)').addClass('disabled');}
year-=1;for(i=-1;i<11;i++){html+='<span class="year'+(i===-1||i===10?' old':'')+(currentYear===year?' active':'')+((year<startYear||year>endYear)?' disabled':'')+'">'+year+'</span>';year+=1;}
yearCont.html(html);},fillHours=function(){moment.locale(picker.options.language);var table=picker.widget.find('.timepicker .timepicker-hours table'),html='',current,i,j;table.parent().hide();if(picker.use24hours){current=0;for(i=0;i<6;i+=1){html+='<tr>';for(j=0;j<4;j+=1){html+='<td class="hour">'+padLeft(current.toString())+'</td>';current++;}
html+='</tr>';}}
else{current=1;for(i=0;i<3;i+=1){html+='<tr>';for(j=0;j<4;j+=1){html+='<td class="hour">'+padLeft(current.toString())+'</td>';current++;}
html+='</tr>';}}
table.html(html);},fillMinutes=function(){var table=picker.widget.find('.timepicker .timepicker-minutes table'),html='',current=0,i,j,step=picker.options.minuteStepping;table.parent().hide();if(step===1){step=5;}
for(i=0;i<Math.ceil(60/step/4);i++){html+='<tr>';for(j=0;j<4;j+=1){if(current<60){html+='<td class="minute">'+padLeft(current.toString())+'</td>';current+=step;}else{html+='<td></td>';}}
html+='</tr>';}
table.html(html);},fillSeconds=function(){var table=picker.widget.find('.timepicker .timepicker-seconds table'),html='',current=0,i,j;table.parent().hide();for(i=0;i<3;i++){html+='<tr>';for(j=0;j<4;j+=1){html+='<td class="second">'+padLeft(current.toString())+'</td>';current+=5;}
html+='</tr>';}
table.html(html);},fillTime=function(){if(!picker.date){return;}
var timeComponents=picker.widget.find('.timepicker span[data-time-component]'),hour=picker.date.hours(),period=picker.date.format('A');if(!picker.use24hours){if(hour===0){hour=12;}else if(hour!==12){hour=hour%12;}
picker.widget.find('.timepicker [data-action=togglePeriod]').text(period);}
timeComponents.filter('[data-time-component=hours]').text(padLeft(hour));timeComponents.filter('[data-time-component=minutes]').text(padLeft(picker.date.minutes()));timeComponents.filter('[data-time-component=seconds]').text(padLeft(picker.date.second()));},click=function(e){e.stopPropagation();e.preventDefault();picker.unset=false;var target=$(e.target).closest('span, td, th'),month,year,step,day,oldDate=moment(picker.date);if(target.length===1){if(!target.is('.disabled')){switch(target[0].nodeName.toLowerCase()){case'th':switch(target[0].className){case'picker-switch':showMode(1);break;case'prev':case'next':step=dpGlobal.modes[picker.viewMode].navStep;if(target[0].className==='prev'){step=step*-1;}
picker.viewDate.add(step,dpGlobal.modes[picker.viewMode].navFnc);fillDate();break;}
break;case'span':if(target.is('.month')){month=target.parent().find('span').index(target);picker.viewDate.month(month);}else{year=parseInt(target.text(),10)||0;picker.viewDate.year(year);}
if(picker.viewMode===picker.minViewMode){picker.date=moment({y:picker.viewDate.year(),M:picker.viewDate.month(),d:picker.viewDate.date(),h:picker.date.hours(),m:picker.date.minutes(),s:picker.date.seconds()});set();notifyChange(oldDate,e.type);}
showMode(-1);fillDate();break;case'td':if(target.is('.day')){day=parseInt(target.text(),10)||1;month=picker.viewDate.month();year=picker.viewDate.year();if(target.is('.old')){if(month===0){month=11;year-=1;}else{month-=1;}}else if(target.is('.new')){if(month===11){month=0;year+=1;}else{month+=1;}}
picker.date=moment({y:year,M:month,d:day,h:picker.date.hours(),m:picker.date.minutes(),s:picker.date.seconds()});picker.viewDate=moment({y:year,M:month,d:Math.min(28,day)});fillDate();set();notifyChange(oldDate,e.type);}
break;}}}},actions={incrementHours:function(){checkDate('add','hours',1);},incrementMinutes:function(){checkDate('add','minutes',picker.options.minuteStepping);},incrementSeconds:function(){checkDate('add','seconds',1);},decrementHours:function(){checkDate('subtract','hours',1);},decrementMinutes:function(){checkDate('subtract','minutes',picker.options.minuteStepping);},decrementSeconds:function(){checkDate('subtract','seconds',1);},togglePeriod:function(){var hour=picker.date.hours();if(hour>=12){hour-=12;}else{hour+=12;}
picker.date.hours(hour);},showPicker:function(){picker.widget.find('.timepicker > div:not(.timepicker-picker)').hide();picker.widget.find('.timepicker .timepicker-picker').show();},showHours:function(){picker.widget.find('.timepicker .timepicker-picker').hide();picker.widget.find('.timepicker .timepicker-hours').show();},showMinutes:function(){picker.widget.find('.timepicker .timepicker-picker').hide();picker.widget.find('.timepicker .timepicker-minutes').show();},showSeconds:function(){picker.widget.find('.timepicker .timepicker-picker').hide();picker.widget.find('.timepicker .timepicker-seconds').show();},selectHour:function(e){var hour=parseInt($(e.target).text(),10);if(!picker.use24hours){if(picker.date.hours()>=12){if(hour!==12){hour+=12;}}else{if(hour===12){hour=0;}}}
picker.date.hours(hour);actions.showPicker.call(picker);},selectMinute:function(e){picker.date.minutes(parseInt($(e.target).text(),10));actions.showPicker.call(picker);},selectSecond:function(e){picker.date.seconds(parseInt($(e.target).text(),10));actions.showPicker.call(picker);}},doAction=function(e){var oldDate=moment(picker.date),action=$(e.currentTarget).data('action'),rv=actions[action].apply(picker,arguments);stopEvent(e);if(!picker.date){picker.date=moment({y:1970});}
set();fillTime();notifyChange(oldDate,e.type);return rv;},stopEvent=function(e){e.stopPropagation();e.preventDefault();},keydown=function(e){if(e.keyCode===27){picker.hide();}},change=function(e){moment.locale(picker.options.language);var input=$(e.target),oldDate=moment(picker.date),newDate=moment(input.val(),picker.format,picker.options.useStrict);if(newDate.isValid()&&!isInDisableDates(newDate)&&isInEnableDates(newDate)){update();picker.setValue(newDate);notifyChange(oldDate,e.type);set();}
else{picker.viewDate=oldDate;picker.unset=true;notifyChange(oldDate,e.type);notifyError(newDate);}},showMode=function(dir){if(dir){picker.viewMode=Math.max(picker.minViewMode,Math.min(2,picker.viewMode+dir));}
picker.widget.find('.datepicker > div').hide().filter('.datepicker-'+dpGlobal.modes[picker.viewMode].clsName).show();},attachDatePickerEvents=function(){var $this,$parent,expanded,closed,collapseData;picker.widget.on('click','.datepicker *',$.proxy(click,this));picker.widget.on('click','[data-action]',$.proxy(doAction,this));picker.widget.on('mousedown',$.proxy(stopEvent,this));picker.element.on('keydown',$.proxy(keydown,this));if(picker.options.pickDate&&picker.options.pickTime){picker.widget.on('click.togglePicker','.accordion-toggle',function(e){e.stopPropagation();$this=$(this);$parent=$this.closest('ul');expanded=$parent.find('.in');closed=$parent.find('.collapse:not(.in)');if(expanded&&expanded.length){collapseData=expanded.data('collapse');if(collapseData&&collapseData.transitioning){return;}
expanded.collapse('hide');closed.collapse('show');$this.find('span').toggleClass(picker.options.icons.time+' '+picker.options.icons.date);if(picker.component){picker.component.find('span').toggleClass(picker.options.icons.time+' '+picker.options.icons.date);}}});}
if(picker.isInput){picker.element.on({'click':$.proxy(picker.show,this),'focus':$.proxy(picker.show,this),'change':$.proxy(change,this),'blur':$.proxy(picker.hide,this)});}else{picker.element.on({'change':$.proxy(change,this)},'input');if(picker.component){picker.component.on('click',$.proxy(picker.show,this));picker.component.on('mousedown',$.proxy(stopEvent,this));}else{picker.element.on('click',$.proxy(picker.show,this));}}},attachDatePickerGlobalEvents=function(){$(window).on('resize.datetimepicker'+picker.id,$.proxy(place,this));if(!picker.isInput){$(document).on('mousedown.datetimepicker'+picker.id,$.proxy(picker.hide,this));}},detachDatePickerEvents=function(){picker.widget.off('click','.datepicker *',picker.click);picker.widget.off('click','[data-action]');picker.widget.off('mousedown',picker.stopEvent);if(picker.options.pickDate&&picker.options.pickTime){picker.widget.off('click.togglePicker');}
if(picker.isInput){picker.element.off({'focus':picker.show,'change':picker.change,'click':picker.show,'blur':picker.hide});}else{picker.element.off({'change':picker.change},'input');if(picker.component){picker.component.off('click',picker.show);picker.component.off('mousedown',picker.stopEvent);}else{picker.element.off('click',picker.show);}}},detachDatePickerGlobalEvents=function(){$(window).off('resize.datetimepicker'+picker.id);if(!picker.isInput){$(document).off('mousedown.datetimepicker'+picker.id);}},isInFixed=function(){if(picker.element){var parents=picker.element.parents(),inFixed=false,i;for(i=0;i<parents.length;i++){if($(parents[i]).css('position')==='fixed'){inFixed=true;break;}}
return inFixed;}else{return false;}},set=function(){moment.locale(picker.options.language);var formatted='';if(!picker.unset){formatted=moment(picker.date).format(picker.format);}
getPickerInput().val(formatted);picker.element.data('date',formatted);if(!picker.options.pickTime){picker.hide();}},checkDate=function(direction,unit,amount){moment.locale(picker.options.language);var newDate;if(direction==='add'){newDate=moment(picker.date);if(newDate.hours()===23){newDate.add(amount,unit);}
newDate.add(amount,unit);}
else{newDate=moment(picker.date).subtract(amount,unit);}
if(isInDisableDates(moment(newDate.subtract(amount,unit)))||isInDisableDates(newDate)){notifyError(newDate.format(picker.format));return;}
if(direction==='add'){picker.date.add(amount,unit);}
else{picker.date.subtract(amount,unit);}
picker.unset=false;},isInDisableDates=function(date,timeUnit){moment.locale(picker.options.language);var maxDate=moment(picker.options.maxDate,picker.format,picker.options.useStrict),minDate=moment(picker.options.minDate,picker.format,picker.options.useStrict);if(timeUnit){maxDate=maxDate.endOf(timeUnit);minDate=minDate.startOf(timeUnit);}
if(date.isAfter(maxDate)||date.isBefore(minDate)){return true;}
if(picker.options.disabledDates===false){return false;}
return picker.options.disabledDates[date.format('YYYY-MM-DD')]===true;},isInEnableDates=function(date){moment.locale(picker.options.language);if(picker.options.enabledDates===false){return true;}
return picker.options.enabledDates[date.format('YYYY-MM-DD')]===true;},indexGivenDates=function(givenDatesArray){var givenDatesIndexed={},givenDatesCount=0,i;for(i=0;i<givenDatesArray.length;i++){if(moment.isMoment(givenDatesArray[i])||givenDatesArray[i]instanceof Date){dDate=moment(givenDatesArray[i]);}else{dDate=moment(givenDatesArray[i],picker.format,picker.options.useStrict);}
if(dDate.isValid()){givenDatesIndexed[dDate.format('YYYY-MM-DD')]=true;givenDatesCount++;}}
if(givenDatesCount>0){return givenDatesIndexed;}
return false;},padLeft=function(string){string=string.toString();if(string.length>=2){return string;}
return'0'+string;},getTemplate=function(){if(picker.options.pickDate&&picker.options.pickTime){var ret='';ret='<div class="bootstrap-datetimepicker-widget'+(picker.options.sideBySide?' timepicker-sbs':'')+(picker.use24hours?' usetwentyfour':'')+' dropdown-menu" style="z-index:9999 !important;">';if(picker.options.sideBySide){ret+='<div class="row">'+'<div class="col-sm-6 datepicker">'+dpGlobal.template+'</div>'+'<div class="col-sm-6 timepicker">'+tpGlobal.getTemplate()+'</div>'+'</div>';}else{ret+='<ul class="list-unstyled">'+'<li'+(picker.options.collapse?' class="collapse in"':'')+'>'+'<div class="datepicker">'+dpGlobal.template+'</div>'+'</li>'+'<li class="picker-switch accordion-toggle"><a class="btn" style="width:100%"><span class="'+picker.options.icons.time+'"></span></a></li>'+'<li'+(picker.options.collapse?' class="collapse"':'')+'>'+'<div class="timepicker">'+tpGlobal.getTemplate()+'</div>'+'</li>'+'</ul>';}
ret+='</div>';return ret;}
if(picker.options.pickTime){return('<div class="bootstrap-datetimepicker-widget dropdown-menu">'+'<div class="timepicker">'+tpGlobal.getTemplate()+'</div>'+'</div>');}
return('<div class="bootstrap-datetimepicker-widget dropdown-menu">'+'<div class="datepicker">'+dpGlobal.template+'</div>'+'</div>');},dpGlobal={modes:[{clsName:'days',navFnc:'month',navStep:1},{clsName:'months',navFnc:'year',navStep:1},{clsName:'years',navFnc:'year',navStep:10}],headTemplate:'<thead>'+'<tr>'+'<th class="prev">&lsaquo;</th><th colspan="'+(options.calendarWeeks?'6':'5')+'" class="picker-switch"></th><th class="next">&rsaquo;</th>'+'</tr>'+'</thead>',contTemplate:'<tbody><tr><td colspan="'+(options.calendarWeeks?'8':'7')+'"></td></tr></tbody>'},tpGlobal={hourTemplate:'<span data-action="showHours"   data-time-component="hours"   class="timepicker-hour"></span>',minuteTemplate:'<span data-action="showMinutes" data-time-component="minutes" class="timepicker-minute"></span>',secondTemplate:'<span data-action="showSeconds"  data-time-component="seconds" class="timepicker-second"></span>'};dpGlobal.template='<div class="datepicker-days">'+'<table class="table-condensed">'+dpGlobal.headTemplate+'<tbody></tbody></table>'+'</div>'+'<div class="datepicker-months">'+'<table class="table-condensed">'+dpGlobal.headTemplate+dpGlobal.contTemplate+'</table>'+'</div>'+'<div class="datepicker-years">'+'<table class="table-condensed">'+dpGlobal.headTemplate+dpGlobal.contTemplate+'</table>'+'</div>';tpGlobal.getTemplate=function(){return('<div class="timepicker-picker">'+'<table class="table-condensed">'+'<tr>'+'<td><a href="#" class="btn" data-action="incrementHours"><span class="'+picker.options.icons.up+'"></span></a></td>'+'<td class="separator"></td>'+'<td>'+(picker.options.useMinutes?'<a href="#" class="btn" data-action="incrementMinutes"><span class="'+picker.options.icons.up+'"></span></a>':'')+'</td>'+
(picker.options.useSeconds?'<td class="separator"></td><td><a href="#" class="btn" data-action="incrementSeconds"><span class="'+picker.options.icons.up+'"></span></a></td>':'')+
(picker.use24hours?'':'<td class="separator"></td>')+'</tr>'+'<tr>'+'<td>'+tpGlobal.hourTemplate+'</td> '+'<td class="separator">:</td>'+'<td>'+(picker.options.useMinutes?tpGlobal.minuteTemplate:'<span class="timepicker-minute">00</span>')+'</td> '+
(picker.options.useSeconds?'<td class="separator">:</td><td>'+tpGlobal.secondTemplate+'</td>':'')+
(picker.use24hours?'':'<td class="separator"></td>'+'<td><button type="button" class="btn btn-primary" data-action="togglePeriod"></button></td>')+'</tr>'+'<tr>'+'<td><a href="#" class="btn" data-action="decrementHours"><span class="'+picker.options.icons.down+'"></span></a></td>'+'<td class="separator"></td>'+'<td>'+(picker.options.useMinutes?'<a href="#" class="btn" data-action="decrementMinutes"><span class="'+picker.options.icons.down+'"></span></a>':'')+'</td>'+
(picker.options.useSeconds?'<td class="separator"></td><td><a href="#" class="btn" data-action="decrementSeconds"><span class="'+picker.options.icons.down+'"></span></a></td>':'')+
(picker.use24hours?'':'<td class="separator"></td>')+'</tr>'+'</table>'+'</div>'+'<div class="timepicker-hours" data-action="selectHour">'+'<table class="table-condensed"></table>'+'</div>'+'<div class="timepicker-minutes" data-action="selectMinute">'+'<table class="table-condensed"></table>'+'</div>'+
(picker.options.useSeconds?'<div class="timepicker-seconds" data-action="selectSecond"><table class="table-condensed"></table></div>':''));};picker.destroy=function(){detachDatePickerEvents();detachDatePickerGlobalEvents();picker.widget.remove();picker.element.removeData('DateTimePicker');if(picker.component){picker.component.removeData('DateTimePicker');}};picker.show=function(e){if(picker.options.useCurrent){if(getPickerInput().val()===''){if(picker.options.minuteStepping!==1){var mDate=moment(),rInterval=picker.options.minuteStepping;mDate.minutes((Math.round(mDate.minutes()/rInterval)*rInterval)%60).seconds(0);picker.setValue(mDate.format(picker.format));}else{picker.setValue(moment().format(picker.format));}
notifyChange('',e.type);}}
if(e&&e.type==='click'&&picker.isInput&&picker.widget.hasClass('picker-open')){return;}
if(picker.widget.hasClass('picker-open')){picker.widget.hide();picker.widget.removeClass('picker-open');}
else{picker.widget.show();picker.widget.addClass('picker-open');}
picker.height=picker.component?picker.component.outerHeight():picker.element.outerHeight();place();picker.element.trigger({type:'dp.show',date:moment(picker.date)});attachDatePickerGlobalEvents();if(e){stopEvent(e);}};picker.disable=function(){var input=picker.element.find('input');if(input.prop('disabled')){return;}
input.prop('disabled',true);detachDatePickerEvents();};picker.enable=function(){var input=picker.element.find('input');if(!input.prop('disabled')){return;}
input.prop('disabled',false);attachDatePickerEvents();};picker.hide=function(){var collapse=picker.widget.find('.collapse'),i,collapseData;for(i=0;i<collapse.length;i++){collapseData=collapse.eq(i).data('collapse');if(collapseData&&collapseData.transitioning){return;}}
picker.widget.hide();picker.widget.removeClass('picker-open');picker.viewMode=picker.startViewMode;showMode();picker.element.trigger({type:'dp.hide',date:moment(picker.date)});detachDatePickerGlobalEvents();};picker.setValue=function(newDate){moment.locale(picker.options.language);if(!newDate){picker.unset=true;set();}else{picker.unset=false;}
if(!moment.isMoment(newDate)){newDate=(newDate instanceof Date)?moment(newDate):moment(newDate,picker.format,picker.options.useStrict);}else{newDate=newDate.locale(picker.options.language);}
if(newDate.isValid()){picker.date=newDate;set();picker.viewDate=moment({y:picker.date.year(),M:picker.date.month()});fillDate();fillTime();}
else{notifyError(newDate);}};picker.getDate=function(){if(picker.unset){return null;}
return moment(picker.date);};picker.setDate=function(date){var oldDate=moment(picker.date);if(!date){picker.setValue(null);}else{picker.setValue(date);}
notifyChange(oldDate,'function');};picker.setDisabledDates=function(dates){picker.options.disabledDates=indexGivenDates(dates);if(picker.viewDate){update();}};picker.setEnabledDates=function(dates){picker.options.enabledDates=indexGivenDates(dates);if(picker.viewDate){update();}};picker.setMaxDate=function(date){if(date===undefined){return;}
if(moment.isMoment(date)||date instanceof Date){picker.options.maxDate=moment(date);}else{picker.options.maxDate=moment(date,picker.format,picker.options.useStrict);}
if(picker.viewDate){update();}};picker.setMinDate=function(date){if(date===undefined){return;}
if(moment.isMoment(date)||date instanceof Date){picker.options.minDate=moment(date);}else{picker.options.minDate=moment(date,picker.format,picker.options.useStrict);}
if(picker.viewDate){update();}};init();};$.fn.datetimepicker=function(options){return this.each(function(){var $this=$(this),data=$this.data('DateTimePicker');if(!data){$this.data('DateTimePicker',new DateTimePicker(this,options));}});};$.fn.datetimepicker.defaults={format:false,pickDate:true,pickTime:true,useMinutes:true,useSeconds:false,useCurrent:true,calendarWeeks:false,minuteStepping:1,minDate:moment({y:1900}),maxDate:moment().add(100,'y'),showToday:true,collapse:true,language:moment.locale(),defaultDate:'',disabledDates:false,enabledDates:false,icons:{},useStrict:false,direction:'auto',sideBySide:false,daysOfWeekDisabled:[],widgetParent:false};}));