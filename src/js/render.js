//实现渲染
(function ($,root){
    var $scope = $(document.body);
    function renderInfo(data){
        var str = '';
        str = '<div class="song-name">'+data.song+'</div>\
        <div class="singer-name">'+data.singer+'</div>\
        <div class="album-name">'+data.album+'</div>'
        $scope.find('.song-info').html(str);
    }
    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function (){
            root.blurImg(img,$scope);
            $scope.find('.song-img img').attr("src",src);
        }
    }
    function renderLike(bool){
        if(bool){
            $scope.find('.like-btn').addClass('liking-btn');
        }else{
            $scope.find('.like-btn').removeClass('liking-btn');
        }
    }
    root.render = function (data){
        renderInfo(data);
        renderImg(data.image);
        renderLike(data.isLike);

    };


}(window.Zepto,window.player||(window.player = {})))
//通过window.player暴露函数