!function(n,t){function e(n,t){this.index=n,this.len=t}e.prototype={prev:function(){return this.getIndex(-1)},next:function(){return this.getIndex(1)},getIndex:function(n){var t=this.index,e=this.len,i=(t+e+n)%e;return this.index=i}},t.control=e}(window.Zepto,window.player||{});