var indexer=require("ksana-indexer");

var lst="mpps.xml";

var warning=function() {
	console.log.apply(console,arguments);
}
var onFile=function(fn) {
	console.log("indexing "+fn);
}

var config={
	name:"mpps"
	,mixin:"kepan"
	,meta:{
		config:"simple1"	
	}
	,glob:lst
	,filesep:"filebreak"
	,segsep:"p.id"
	,warning:warning
	,callbacks: {
		onFile:onFile
		,onSegName:"autoincrement"
	}
}
require("ksana-indexer").build(config);
module.exports=config;

