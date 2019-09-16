var $ = window.Zepto,
    root = window.player,
    $scope = $(document.body),
    index = 0,
    songList,
    audio = new root.audioControl();

function bindEvent(){
    var _this = this;
    //歌曲切换时
    $scope.on('play-change',function(event,index){
        audio.getAudio(songList[index].audio);
        if(audio.status == "play"){
            audio.play();
            root.process.start();
        }
        root.process.renderAllTime(songList[index].duration);
    })
    //上一首
    $scope.on("click",".prev-btn",function(){
        control = new root.control(index,songList.length);
        index =control.prev();
        root.render(songList[index]);
        $scope.trigger('play-change',index);
        root.process.update(0);
        $('ul .active').removeClass('active');
        $('li').eq(index).addClass('active');
        console.log("last:" + index)
    })
    //下一首
    $scope.on("click",".next-btn",function(){
        control = new root.control(index,songList.length);
        index = control.next();
        root.render(songList[index]);
        $scope.trigger('play-change',index);
        root.process.update(0);
        $('ul .active').removeClass('active');
        $('li').eq(index).addClass('active');
        console.log("next:" + index)
    })
    //播放点停按钮切换，转盘转动停止切换
    $scope.on("click",".play-btn",function(){
        if(audio.status == "play"){ 
            audio.pause();
            root.process.stop();
        }else{
            audio.play();
            root.process.start();
        }
        $(this).toggleClass("pause");
        $('.img-wrapper').toggleClass('active');
    })
    //喜欢按钮点击
    $scope.on("click",".like-btn",function(){
        $('.like-btn').toggleClass('liking-btn');
    })
    
    //点击列表，被点击的歌曲播放
    $scope.on("click",".list-btn",function(){
        $scope.find(".show-list").css('display','block');
        $scope.on('click',"li",function(){
            index = $('li').index($(this));
            $('ul .active').removeClass('active');
            $(this).addClass('active');
            root.render(songList[index]);
            $scope.trigger('play-change',index);
            $scope.find(".play-btn").addClass("pause");
            audio.play();
            $scope.find(".img-wrapper").addClass("active");
        })
        //收回列表
        $scope.on('click','.click',function(){
            $scope.find(".show-list").css('display','none');
        }) 
    })
    //监听音乐是否播放完，进行下一首播放
    audio.audio.addEventListener('ended',function(){
        console.log(index);
        control = new root.control(index,songList.length);
        index = control.next();
        root.render(songList[index]);
        $scope.trigger('play-change',index);
        // $scope.find(".play-btn").addClass("pause");
        root.process.update(0);
        $('ul .active').removeClass('active');
        $('li').eq(index).addClass('active');

      });    
}
function bindTouch(){
    var $slider = $scope.find(".slider-pointer"),
        offset = $scope.find('.pro-wrapper').offset(),
        left = offset.left,
        width = offset.width;
    // audio.getAudio(songList[index].audio);    
    $scope.trigger('play-change',index);
    $slider.on("touchstart",function(){
        root.process.stop();
    }).on("touchmove",function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left)/width;
        if(per<0||per>1){
            per = 0;
        }
        root.process.update(per);
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left)/width;
        if(per<0||per>1){
            per = 0;
        }
        var curDuration = songList[control.index].duration;
        var curTime = per*curDuration;
        audio.playTo(curTime);
        root.process.start(per);
        $scope.find(".play-btn").addClass("pause");
        $scope.find(".img-wrapper").addClass("active");
        

    })
}
function getData(url){
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            root.render(data[0]);
            songList = data;
            // console.log(songList);
            control = new root.control(index,data.length);
            $scope.trigger('play-change',index);
            // control.autoPlayNext(data[0].audio);
            root.list(songList);
            $('ul .active').removeClass('active');
            $('li').eq(index).addClass('active');
            console.log(index);
            bindEvent();
            bindTouch();
        },
        error:function(){
            console.log('error');
        }
    })
}

getData("../mock/data.json");

