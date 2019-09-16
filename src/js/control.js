(function($,root){
    function control(index,len){
        this.index = index;
        this.len = len;
    }
    control.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(val){
            var index = this.index,
                len = this.len,
                curIndex = (index + len + val)%len;
            this.index = curIndex;
            return curIndex;
        },
        // autoPlayNext: function(audio){
        //     if(audio.currentTime == audio.duration){
        //         return this.getIndex(1) ;
        //     }
        // }
        
    }
    root.control = control;
}(window.Zepto,window.player||{}))