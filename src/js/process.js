//渲染进度条
(function($,root){
    var $scope = $(document.body),
        curDuration ,
        frameID,
        lastper = 0,
        startTime;
    //秒转换分钟 方案一：
    function formatTime(time){
        time = Math.round(time);
        var minute = Math.floor(time/60),
            second = time-minute*60;
            if(minute < 10){
                minute = "0"+ minute;
            }
            if(second < 10){
                second = "0" + second;
            }
            return minute+':'+ second;
    }
    //渲染当前时间和总时间  方案二：
    // function conversion (value) {
    //     let minute = Math.floor(value / 60)
    //     minute = minute.toString().length === 1 ? ('0' + minute) : minute
    //     let second = Math.round(value % 60)
    //     second = second.toString().length === 1 ? ('0' + second) : second
    //     return `${minute}:${second}`
    // }

    // audio.onloadedmetadata = function () {
    //     end.innerHTML = conversion(audio.duration)
    //     start.innerHTML = conversion(audio.currentTime)
    // }
    //渲染歌曲总时间
    function renderAllTime(duration){
        lastper = 0;
        curDuration = duration;
        
        var allTime = formatTime(duration);
        $scope.find('.all-time').html(allTime);
    }
   
    //时间进度条的移动
    function start(per){
        lastper = per === undefined ? lastper:per;
        cancelAnimationFrame(frameID);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime(),
                percent = lastper + (curTime-startTime)/(curDuration*1000); 
            percent.toFixed(3);
            if(percent<0.999){
                console.log(percent)
                frameID = requestAnimationFrame(frame);
                update(percent);
            }
            
        }
        frame();
    }
    function stop(){
        var stopTime = new Date().getTime();
        lastper = lastper+(stopTime - startTime)/(curDuration*1000);
        cancelAnimationFrame(frameID);
    }
    function update(percent){
        var curTime = percent *curDuration;
        curTime = formatTime(curTime);
        $scope.find(".cur-time").html(curTime);
        //渲染进度条
        var percentage = (percent - 1)*100 + "%";
        
        $scope.find(".pro-top").css({
            'transform':'translateX('+ percentage + ')'
        })
    }

    root.process = {
        renderAllTime: renderAllTime,
        start:start,
        stop: stop,
        update:update
    }

}(window.Zepto,window.player||(window.player = {})));