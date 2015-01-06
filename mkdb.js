var fs=require("fs");
var indexer=require("ksana-indexer");

var lst=fs.readFileSync(process.argv[2]||"diamondsutralecture.lst",'utf8')
	      .replace(/\r\n/g,"\n").split("\n");


var warning=function() {
	console.log.apply(console,arguments);
}
var do_head=function(text,tag,attributes,status) {
	var level=parseInt(tag[2]);
	return [
		{path:["head_depth"], value:level }
		,{path:["head"], value:text  }
		,{path:["head_voff"], value: status.vpos }
	];
}
var beforeFile=function(content) {
	return content.replace(/~p(\d+)/g,function(m,m1){
		return '<pb n="'+m1+'"/>';
	});
}
var captureTags={
	"h1":do_head,
	"h2":do_head,
	"h3":do_head,
	"h4":do_head,
	"h5":do_head,
	"h6":do_head,
}
var onFile=function(fn) {
	console.log("indexing "+fn);
}
var config={
	name:"diamondsutralecture"
	,meta:{
		config:"simple1"	
	}
	,glob:lst
	,pageSeparator:"pb.n"
	//,finalized:finalized
	,warning:warning
	,captureTags:captureTags
	,callbacks: {
		beforeFile:beforeFile
		,onFile:onFile
	}
}
setTimeout(function(){
	indexer.build(config);	
},100);

module.exports=config;