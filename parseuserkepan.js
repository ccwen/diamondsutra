//parse_userkepan.js
//convert huipin kepan in xml into external format
//before passing to ks mkdb
var fs=require("fs");
var fn=process.argv[2]||"dsl_jwn.xml";
var content=fs.readFileSync(fn,"utf8");
var kepancount=0,lastdepth=0;
var kepan=[];

var pat=/<(\d)(.*?)>/g
content=content.replace(pat,function(m,m1,m2){
	kepancount++;
	var depth=parseInt(m1);
	if (isNaN(depth)){
		console.log("invalid",m2);
		throw "";
	}

	if (depth-lastdepth>1){
		console.log("kepan depth error",m2);
	}
	kepan.push((depth)+"."+m2);
	lastdepth=depth;
	return '<kw2 n="'+kepancount+'"/>'
});

fs.writeFileSync("kepan_huipin_jwn.json",JSON.stringify(kepan,""," "),"utf8");
fs.writeFileSync(fn+"_extracted",content,"utf8");
