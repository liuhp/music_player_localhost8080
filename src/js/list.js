(function ($, root){
    var $scope = $(document.body);
    function renderList(data){
        var str = '';
            
        data.forEach(function(ele,index){
            str += '<li><a href="#">'+ele.song+' - '+ele.singer+'</a></li>';
        });
            
        
        $scope.find('ul').html(str);
    }
   
    root.list = function(data){
        renderList(data);
       
    }
    


}(window.Zepto,(window.player||{})))