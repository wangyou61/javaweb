
// 获取第一个 video 元素
var video = $("video").get(0);

// 格式化时间的函数
function formatTime(time) {
    var h = Math.floor(time / 3600);
    var m = Math.floor(time % 3600 / 60);
    var s = Math.floor(time % 60);
    
    // 修改了字符串的拼接部分
    return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

// 当视频可以播放时执行的回调函数
video.oncanplay = function() {
    $("video").show();
    
    // 修正了函数名的拼写错误，从 "formaTime" 修正为 "formatTime"
    var totalTime = formatTime(video.duration);
    
    // 修改了类选择器 ".total" 用于选择 HTML 元素
    $(".total").html(totalTime);
};
$(".switch").on("click",function(){
    if($(this).hasClass("fa-play")){
        video.play();
        $(this).addClass("fa-pause").removeClass("fa-play");
    }else{
        video.pause();
        $(this).addClass("fa-play").removeClass("fa-pause")
    }
});
video.ontimeupdate=function(){
    var w=video.currentTime/video.duration * 100+"%";
    $(".line").css("width",w);
    $(".current").html(formatTime(video.currentTime));
}   
$(".expand").on("click",function(){
    if($(this).hasClass("fa-arrows-alt")){
        video.webkitRequestFullScreen();
        $(this).addClass("fa-compress").removeClass("fa-arrows-alt");
    }else{
            document.webkitCancelFullScreen();
            $(this).addClass("fa-arrows-alt").removeClass("fa-compress");
        }
    
});
video.onended=function(){
    video.currentTime=0;
    $(".switch").addClass("fa-play").removeClass("fa-pause");
};
$(".bar").on("click", function (event) {
    var offsetX = event.offsetX;
    var current = offsetX / $(this).width() * video.duration;
    video.currentTime = current;
});
function checkFull(){
    var isFull=document.webkitIsFullScreen;
    if(isFull===undefined){
        isFull=false;
    }
    return isFull;
}
$(window).resize(function(){
    if(!checkFull()){
        $(".expand").addClass("fa-arrows-alt").removeClass("fa-compress")
    }
});
$(document).keypress(function(event){
    var code=(event.keyCode ? event.keyCode : event.which);
    if(video!="" && (code==13|| code||code==32)){
        if(video.paused){
            video.play();
            $(".switch").addClass("fa-pause").removeClass("fa-play");
        }else{
            video.pause();
            $(".switch").addClass("fa-play").removeClass("fa-pause")
        }
        }
    
})