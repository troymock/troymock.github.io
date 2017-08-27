!function(t,n,e){"use strict";var o=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(n){return t.setTimeout(n,1e3/60)}}(),i=function(){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||function(n){t.clearTimeout(n)}}(),s=function(n){var e=[];n=n.originalEvent||n||t.e,n=n.touches&&n.touches.length?n.touches:n.changedTouches&&n.changedTouches.length?n.changedTouches:[n];for(var o in n)n[o].pageX?e.push({x:n[o].pageX,y:n[o].pageY}):n[o].clientX&&e.push({x:n[o].clientX,y:n[o].clientY});return e},a=function(t,n,e){return n&&t?"x"===e?t.x-n.x:"y"===e?t.y-n.y:Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2)):0},c=function(t){if(t.is("a,button,input,select,textarea")||e.isFunction(t.get(0).onclick))return!0;for(var n=0,o=t[0].attributes,i=o.length;i>n;n++)if("data-fancybox-"===o[n].nodeName.substr(0,14))return!0;return!1},r=function(n){var e=t.getComputedStyle(n)["overflow-y"],o=t.getComputedStyle(n)["overflow-x"],i=("scroll"===e||"auto"===e)&&n.scrollHeight>n.clientHeight,s=("scroll"===o||"auto"===o)&&n.scrollWidth>n.clientWidth;return i||s},l=function(t){for(var n=!1;;){if(n=r(t.get(0)))break;if(t=t.parent(),!t.length||t.hasClass("fancybox-stage")||t.is("body"))break}return n},u=function(t){var n=this;n.instance=t,n.$bg=t.$refs.bg,n.$stage=t.$refs.stage,n.$container=t.$refs.container,n.destroy(),n.$container.on("touchstart.fb.touch mousedown.fb.touch",e.proxy(n,"ontouchstart"))};u.prototype.destroy=function(){this.$container.off(".fb.touch")},u.prototype.ontouchstart=function(o){var i=this,r=e(o.target),u=i.instance,h=u.current,p=h.$content,d="touchstart"==o.type;if(d&&i.$container.off("mousedown.fb.touch"),!h||i.instance.isAnimating||i.instance.isClosing)return o.stopPropagation(),void o.preventDefault();if((!o.originalEvent||2!=o.originalEvent.button)&&r.length&&!c(r)&&!c(r.parent())&&!(o.originalEvent.clientX>r[0].clientWidth+r.offset().left)&&(i.startPoints=s(o),i.startPoints&&!(i.startPoints.length>1&&u.isSliding))){if(i.$target=r,i.$content=p,i.canTap=!0,e(n).off(".fb.touch"),e(n).on(d?"touchend.fb.touch touchcancel.fb.touch":"mouseup.fb.touch mouseleave.fb.touch",e.proxy(i,"ontouchend")),e(n).on(d?"touchmove.fb.touch":"mousemove.fb.touch",e.proxy(i,"ontouchmove")),o.stopPropagation(),!u.current.opts.touch&&!u.canPan()||!r.is(i.$stage)&&!i.$stage.find(r).length)return void(r.is("img")&&o.preventDefault());e.fancybox.isMobile&&(l(i.$target)||l(i.$target.parent()))||o.preventDefault(),i.canvasWidth=Math.round(h.$slide[0].clientWidth),i.canvasHeight=Math.round(h.$slide[0].clientHeight),i.startTime=(new Date).getTime(),i.distanceX=i.distanceY=i.distance=0,i.isPanning=!1,i.isSwiping=!1,i.isZooming=!1,i.sliderStartPos=i.sliderLastPos||{top:0,left:0},i.contentStartPos=e.fancybox.getTranslate(i.$content),i.contentLastPos=null,1!==i.startPoints.length||i.isZooming||(i.canTap=!u.isSliding,"image"===h.type&&(i.contentStartPos.width>i.canvasWidth+1||i.contentStartPos.height>i.canvasHeight+1)?(e.fancybox.stop(i.$content),i.$content.css("transition-duration","0ms"),i.isPanning=!0):i.isSwiping=!0,i.$container.addClass("fancybox-controls--isGrabbing")),2!==i.startPoints.length||u.isAnimating||h.hasError||"image"!==h.type||!h.isLoaded&&!h.$ghost||(i.isZooming=!0,i.isSwiping=!1,i.isPanning=!1,e.fancybox.stop(i.$content),i.$content.css("transition-duration","0ms"),i.centerPointStartX=.5*(i.startPoints[0].x+i.startPoints[1].x)-e(t).scrollLeft(),i.centerPointStartY=.5*(i.startPoints[0].y+i.startPoints[1].y)-e(t).scrollTop(),i.percentageOfImageAtPinchPointX=(i.centerPointStartX-i.contentStartPos.left)/i.contentStartPos.width,i.percentageOfImageAtPinchPointY=(i.centerPointStartY-i.contentStartPos.top)/i.contentStartPos.height,i.startDistanceBetweenFingers=a(i.startPoints[0],i.startPoints[1]))}},u.prototype.ontouchmove=function(t){var n=this;if(n.newPoints=s(t),e.fancybox.isMobile&&(l(n.$target)||l(n.$target.parent())))return t.stopPropagation(),void(n.canTap=!1);if((n.instance.current.opts.touch||n.instance.canPan())&&n.newPoints&&n.newPoints.length&&(n.distanceX=a(n.newPoints[0],n.startPoints[0],"x"),n.distanceY=a(n.newPoints[0],n.startPoints[0],"y"),n.distance=a(n.newPoints[0],n.startPoints[0]),n.distance>0)){if(!n.$target.is(n.$stage)&&!n.$stage.find(n.$target).length)return;t.stopPropagation(),t.preventDefault(),n.isSwiping?n.onSwipe():n.isPanning?n.onPan():n.isZooming&&n.onZoom()}},u.prototype.onSwipe=function(){var n,s=this,a=s.isSwiping,c=s.sliderStartPos.left||0;a===!0?Math.abs(s.distance)>10&&(s.canTap=!1,s.instance.group.length<2&&s.instance.opts.touch.vertical?s.isSwiping="y":s.instance.isSliding||s.instance.opts.touch.vertical===!1||"auto"===s.instance.opts.touch.vertical&&e(t).width()>800?s.isSwiping="x":(n=Math.abs(180*Math.atan2(s.distanceY,s.distanceX)/Math.PI),s.isSwiping=n>45&&135>n?"y":"x"),s.instance.isSliding=s.isSwiping,s.startPoints=s.newPoints,e.each(s.instance.slides,function(t,n){e.fancybox.stop(n.$slide),n.$slide.css("transition-duration","0ms"),n.inTransition=!1,n.pos===s.instance.current.pos&&(s.sliderStartPos.left=e.fancybox.getTranslate(n.$slide).left)}),s.instance.SlideShow&&s.instance.SlideShow.isActive&&s.instance.SlideShow.stop()):("x"==a&&(s.distanceX>0&&(s.instance.group.length<2||0===s.instance.current.index&&!s.instance.current.opts.loop)?c+=Math.pow(s.distanceX,.8):s.distanceX<0&&(s.instance.group.length<2||s.instance.current.index===s.instance.group.length-1&&!s.instance.current.opts.loop)?c-=Math.pow(-s.distanceX,.8):c+=s.distanceX),s.sliderLastPos={top:"x"==a?0:s.sliderStartPos.top+s.distanceY,left:c},s.requestId&&(i(s.requestId),s.requestId=null),s.requestId=o(function(){s.sliderLastPos&&(e.each(s.instance.slides,function(t,n){var o=n.pos-s.instance.currPos;e.fancybox.setTranslate(n.$slide,{top:s.sliderLastPos.top,left:s.sliderLastPos.left+o*s.canvasWidth+o*n.opts.gutter})}),s.$container.addClass("fancybox-is-sliding"))}))},u.prototype.onPan=function(){var t,n,s,a=this;a.canTap=!1,t=a.contentStartPos.width>a.canvasWidth?a.contentStartPos.left+a.distanceX:a.contentStartPos.left,n=a.contentStartPos.top+a.distanceY,s=a.limitMovement(t,n,a.contentStartPos.width,a.contentStartPos.height),s.scaleX=a.contentStartPos.scaleX,s.scaleY=a.contentStartPos.scaleY,a.contentLastPos=s,a.requestId&&(i(a.requestId),a.requestId=null),a.requestId=o(function(){e.fancybox.setTranslate(a.$content,a.contentLastPos)})},u.prototype.limitMovement=function(t,n,e,o){var i,s,a,c,r=this,l=r.canvasWidth,u=r.canvasHeight,h=r.contentStartPos.left,p=r.contentStartPos.top,d=r.distanceX,g=r.distanceY;return i=Math.max(0,.5*l-.5*e),s=Math.max(0,.5*u-.5*o),a=Math.min(l-e,.5*l-.5*e),c=Math.min(u-o,.5*u-.5*o),e>l&&(d>0&&t>i&&(t=i-1+Math.pow(-i+h+d,.8)||0),0>d&&a>t&&(t=a+1-Math.pow(a-h-d,.8)||0)),o>u&&(g>0&&n>s&&(n=s-1+Math.pow(-s+p+g,.8)||0),0>g&&c>n&&(n=c+1-Math.pow(c-p-g,.8)||0)),{top:n,left:t}},u.prototype.limitPosition=function(t,n,e,o){var i=this,s=i.canvasWidth,a=i.canvasHeight;return e>s?(t=t>0?0:t,t=s-e>t?s-e:t):t=Math.max(0,s/2-e/2),o>a?(n=n>0?0:n,n=a-o>n?a-o:n):n=Math.max(0,a/2-o/2),{top:n,left:t}},u.prototype.onZoom=function(){var n=this,s=n.contentStartPos.width,c=n.contentStartPos.height,r=n.contentStartPos.left,l=n.contentStartPos.top,u=a(n.newPoints[0],n.newPoints[1]),h=u/n.startDistanceBetweenFingers,p=Math.floor(s*h),d=Math.floor(c*h),g=(s-p)*n.percentageOfImageAtPinchPointX,f=(c-d)*n.percentageOfImageAtPinchPointY,P=(n.newPoints[0].x+n.newPoints[1].x)/2-e(t).scrollLeft(),m=(n.newPoints[0].y+n.newPoints[1].y)/2-e(t).scrollTop(),y=P-n.centerPointStartX,b=m-n.centerPointStartY,v=r+(g+y),S=l+(f+b),w={top:S,left:v,scaleX:n.contentStartPos.scaleX*h,scaleY:n.contentStartPos.scaleY*h};n.canTap=!1,n.newWidth=p,n.newHeight=d,n.contentLastPos=w,n.requestId&&(i(n.requestId),n.requestId=null),n.requestId=o(function(){e.fancybox.setTranslate(n.$content,n.contentLastPos)})},u.prototype.ontouchend=function(t){var o=this,a=Math.max((new Date).getTime()-o.startTime,1),c=o.isSwiping,r=o.isPanning,l=o.isZooming;return o.endPoints=s(t),o.$container.removeClass("fancybox-controls--isGrabbing"),e(n).off(".fb.touch"),o.requestId&&(i(o.requestId),o.requestId=null),o.isSwiping=!1,o.isPanning=!1,o.isZooming=!1,o.canTap?o.onTap(t):(o.speed=366,o.velocityX=o.distanceX/a*.5,o.velocityY=o.distanceY/a*.5,o.speedX=Math.max(.5*o.speed,Math.min(1.5*o.speed,1/Math.abs(o.velocityX)*o.speed)),void(r?o.endPanning():l?o.endZooming():o.endSwiping(c)))},u.prototype.endSwiping=function(t){var n=this,o=!1;n.instance.isSliding=!1,n.sliderLastPos=null,"y"==t&&Math.abs(n.distanceY)>50?(e.fancybox.animate(n.instance.current.$slide,{top:n.sliderStartPos.top+n.distanceY+150*n.velocityY,opacity:0},150),o=n.instance.close(!0,300)):"x"==t&&n.distanceX>50&&n.instance.group.length>1?o=n.instance.previous(n.speedX):"x"==t&&n.distanceX<-50&&n.instance.group.length>1&&(o=n.instance.next(n.speedX)),o!==!1||"x"!=t&&"y"!=t||n.instance.jumpTo(n.instance.current.index,150),n.$container.removeClass("fancybox-is-sliding")},u.prototype.endPanning=function(){var t,n,o,i=this;i.contentLastPos&&(i.instance.current.opts.touch.momentum===!1?(t=i.contentLastPos.left,n=i.contentLastPos.top):(t=i.contentLastPos.left+i.velocityX*i.speed,n=i.contentLastPos.top+i.velocityY*i.speed),o=i.limitPosition(t,n,i.contentStartPos.width,i.contentStartPos.height),o.width=i.contentStartPos.width,o.height=i.contentStartPos.height,e.fancybox.animate(i.$content,o,330))},u.prototype.endZooming=function(){var t,n,o,i,s=this,a=s.instance.current,c=s.newWidth,r=s.newHeight;s.contentLastPos&&(t=s.contentLastPos.left,n=s.contentLastPos.top,i={top:n,left:t,width:c,height:r,scaleX:1,scaleY:1},e.fancybox.setTranslate(s.$content,i),c<s.canvasWidth&&r<s.canvasHeight?s.instance.scaleToFit(150):c>a.width||r>a.height?s.instance.scaleToActual(s.centerPointStartX,s.centerPointStartY,150):(o=s.limitPosition(t,n,c,r),e.fancybox.setTranslate(s.content,e.fancybox.getTranslate(s.$content)),e.fancybox.animate(s.$content,o,150)))},u.prototype.onTap=function(t){var n,o=this,i=e(t.target),a=o.instance,c=a.current,r=t&&s(t)||o.startPoints,l=r[0]?r[0].x-o.$stage.offset().left:0,u=r[0]?r[0].y-o.$stage.offset().top:0,h=function(n){var i=c.opts[n];if(e.isFunction(i)&&(i=i.apply(a,[c,t])),i)switch(i){case"close":a.close(o.startEvent);break;case"toggleControls":a.toggleControls(!0);break;case"next":a.next();break;case"nextOrClose":a.group.length>1?a.next():a.close(o.startEvent);break;case"zoom":"image"==c.type&&(c.isLoaded||c.$ghost)&&(a.canPan()?a.scaleToFit():a.isScaledDown()?a.scaleToActual(l,u):a.group.length<2&&a.close(o.startEvent))}};if(!(t.originalEvent&&2==t.originalEvent.button||a.isSliding||l>i[0].clientWidth+i.offset().left)){if(i.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))n="Outside";else if(i.is(".fancybox-slide"))n="Slide";else{if(!a.current.$content||!a.current.$content.has(t.target).length)return;n="Content"}if(o.tapped){if(clearTimeout(o.tapped),o.tapped=null,Math.abs(l-o.tapX)>50||Math.abs(u-o.tapY)>50||a.isSliding)return this;h("dblclick"+n)}else o.tapX=l,o.tapY=u,c.opts["dblclick"+n]&&c.opts["dblclick"+n]!==c.opts["click"+n]?o.tapped=setTimeout(function(){o.tapped=null,h("click"+n)},300):h("click"+n);return this}},e(n).on("onActivate.fb",function(t,n){n&&!n.Guestures&&(n.Guestures=new u(n))}),e(n).on("beforeClose.fb",function(t,n){n&&n.Guestures&&n.Guestures.destroy()})}(window,document,window.jQuery);