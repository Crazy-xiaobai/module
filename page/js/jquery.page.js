//分页插件
/**
2016-08-05 ch
**/
(function($){
	var ms = {
		//初始化
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();

				//文字说明
				if(args.decpt){
					obj.prepend('<p class="pageTxt">显示第<span class="pageStar"></span>至第<span class="pageEnd"></span>项结果，共<span class="pageTotle"></span>项</p>')
				}
				//首页
				if(args.current == 1){
					obj.remove('.homePage');
					obj.append('<span class="disabled">首页</span>');

				}else{
					obj.append('<a href="javascript:;" class="homePage">首页</a>');
				}

				//上一页
				if(args.current > 1){
					obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled">上一页</span>');
				}
				//中间页码
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span class="ellipsis">&#x2026;</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<span class="ellipsis">&#x2026;</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled">下一页</span>');
				}
                //末页
				if(args.current==args.pageCount){
					obj.remove('.lastPage');
					obj.append('<span class="disabled">末页</span>');
				}else{
					obj.append('<a href="javascript:;" class="lastPage">末页</a>');
				}
				//跳转页码
				if(args.goTo){
					obj.append('<p class="pageSet"><span>跳到</span><input type="text" id="pageGo" /><span>页</span><a href="javascript:;" id="pageGoTo">跳转</a>');
				}
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				//首页
				obj.on("click","a.homePage",function(){
					var current = 1;
					ms.fillHtml(obj,{"current":current,"decpt":args.decpt,"goTo":args.goTo,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
				});
				//每一页
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).text());

					ms.fillHtml(obj,{"current":current,"decpt":args.decpt,"goTo":args.goTo,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
				});
				//上一页
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current-1,"decpt":args.decpt,"goTo":args.goTo,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1);
					}
				});
				//下一页
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current+1,"decpt":args.decpt,"goTo":args.goTo,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
				});
				//末页
				obj.on("click","a.lastPage",function(){
					ms.fillHtml(obj,{"current":args.pageCount,"decpt":args.decpt,"goTo":args.goTo,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(args.pageCount);
					}
				});
				//跳转页
				obj.on("click","#pageGoTo",function(){
					var current = parseInt($('#pageGo').val())
					if($('#pageGo').val()===''){
						alert('请输入页码');
						$('#pageGo').val('');
						return;
					};
					if(current>args.pageCount){
						alert('该页内容不存在');
						$('#pageGo').val('');
						return;
					}
					ms.fillHtml(obj,{"current":current,"decpt":args.decpt,"goTo":args.goTo,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
				});
			})();
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
						pageCount : 10,
						current : 1,
						decpt: true,
						goTo: true,
						backFn : function(){}
					},options);
		ms.init(this,args);
	}
})(jQuery);
