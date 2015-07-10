var fs=require("fs");

var jwn=fs.readFileSync("dsl_jwn.xml","utf8");

jwn=jwn.replace(/<seg id="(.+?)" name="(.+?)"/g,function(m,m1,m2){
	return "{"+m1+"_"+m2+"}";
});

jwn=jwn.replace(/<.+?>/g,"").replace(/\r?\n/g,"");

var defs=require("./readlinejson")(process.argv[2]);

var findDef=function(def) {
	var idx=jwn.indexOf(def.text);
	if (idx==-1)return;

	var seg=jwn.substr(0,idx).lastIndexOf("{");
	var segend=jwn.substr(0,idx).lastIndexOf("}");
	def.seg=jwn.substring(seg+1,segend);
	def.offset=idx-seg;
	//console.log(def.name,idx)
}

defs.map(findDef);
console.log(defs);