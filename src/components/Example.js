import React from 'react';

const Example = () => {
	return ( < div >
		< div class = "eqc-select ng-isolate-scope"
		ng - show = "comp.$$resize"
		comp - resize = "n,ne,e,se,s,sw,w,nw,r"
		comp - id = "9905949817"
		comp - rotate = "9905949817" > < div class = "rotate-circle"
		ng - show = "show.r &amp;&amp; !accessResizeRotate" > < /div><div class="rotate-line" ng-show="show.r &amp;&amp; !accessResizeRotate"></div > < div class = "bar bar-m-line" > < /div><div class="line-n line resizable" style="cursor: ns-resize;"><div class="circle" ng-show="show.n"></div > < /div><div class="line-e line resizable" style="cursor: ew-resize;"><div class="circle" ng-show="show.e"></div > < /div><div class="line-s line resizable" style="cursor: ns-resize;"><div class="circle" ng-show="show.s"></div > < /div><div class="line-w line resizable" style="cursor: ew-resize;"><div class="circle" ng-show="show.w"></div > < /div><div class="circle-nw circle resizable" ng-show="show.nw" style="cursor: nwse-resize;"></div > < div class = "circle-ne circle resizable"
		ng - show = "show.ne"
		style = "cursor: nesw-resize;" > < /div><div class="circle-se circle resizable" ng-show="show.se" style="cursor: nwse-resize; z-index: 5;"></div > < div class = "circle-sw circle resizable"
		ng - show = "show.sw"
		style = "cursor: nesw-resize;" > < /div></div >
		< /div>
	);
};

Example.propTypes = {};

export default Example;