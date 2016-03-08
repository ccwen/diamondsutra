var indexer=require("ksana-indexer");

var lst="dsl_jwn.xml"

var warning=function() {
	console.log.apply(console,arguments);
}
var onFile=function(fn) {
	console.log("indexing "+fn);
}

var do_head=function(text,tag,attributes,status){
	var depth=parseInt(tag.substr(2));
	return [{path:["head"],value:text},
		      {path:["head_depth"],value:depth},
		      {path:["head_vpos"],value:status.vposstart},
		      {path:["head_len"],value:status.vpos-status.vposstart}
		    ]
}
var captureTags={
	"h1":do_head,"h2":do_head,"h3":do_head,"h4":do_head,"h5":do_head,"h6":do_head,"h7":do_head,
	"h8":do_head,"h9":do_head,"h10":do_head,"h11":do_head,"h12":do_head,"h13":do_head,"h14":do_head,
	"h15":do_head,"h16":do_head,"h17":do_head,"h18":do_head
};

var config={
	name:"dsl_jwn"
	,meta:{
		config:"simple1",
		toc:"head",
		title:"金剛般若波羅蜜經講義 江味農居士"
	}
	,glob:lst
	,filesep:"filebreak"
	,segsep:"p.id"
	,warning:warning
	,captureTags:captureTags
	,norawtag:true
	,callbacks: {
		onFile:onFile
		,onSegName:"autoincrement"
	}
	,extra: {
		"kepan_huiping":{"tag":"李慧萍科判","toc":require("./kepan_huiping_jwn.json")}
	}	
}
require("ksana-indexer").build(config);
module.exports=config;

