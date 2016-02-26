var indexer=require("ksana-indexer");

var lst="ds.xml";

var warning=function() {
	console.log.apply(console,arguments);
}
var onFile=function(fn) {
	console.log("indexing "+fn);
}

var config={
	name:"ds"
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
	,extra: {
		"kepan_yinshun":{"tag":"印順法師科判","toc":require("./kepan_yinshun.json")}
		,"kepan_jwn":{"tag":"江味農居士科判","toc":require("./kepan_jwn.json")}
	}		
}
require("ksana-indexer").build(config);
module.exports=config;

