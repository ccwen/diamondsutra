var indexer=require("ksana-indexer");

var lst="dsl_jwn.xml"

var warning=function() {
	console.log.apply(console,arguments);
}
var onFile=function(fn) {
	console.log("indexing "+fn);
}

var config={
	name:"dsl_jwn"
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
		"kepan_jwn":{"tag":"江味農居士科判","toc":require("./kepan_jwn.json")}
		,"kepan_huiping":{"tag":"李慧萍科判","toc":require("./kepan_huiping_jwn.json")}
	}	
}
require("ksana-indexer").build(config);
module.exports=config;

