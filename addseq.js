var fs=require('fs');
var content=fs.readFileSync("dsl_jwn.xml","utf8").replace(/\r?\n/g,"\n");
var segcount=0;
content=content.replace(/<seg\/>\n/g,function(){
	return '<seg id="'+(++segcount)+'"/>\n';
})

fs.writeFileSync("dsl_jwn.xml",content,"utf8");