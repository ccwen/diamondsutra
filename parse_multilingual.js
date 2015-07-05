var fs=require("fs");
var content=fs.readFileSync("diamond_multilingual.xml","utf8");

var trans={"tibetan":"","romanized":"","kumarajiva":"","yijing":"","xuanzang":"","gupta":"","gupta2":""};
var transkey=Object.keys(trans);
var id="";
content.replace(/<(.+?)>([^<]+?)<\/(.+?)>/g,function(m,m1,m2){
	if (m1=="seg") {

	} else if (transkey.indexOf(m1)>-1) {
		if (m1==="romanized") {
			var dot=m2.indexOf(".");
			id=m2.substr(0,dot).replace("-",".");
			m2=m2.substr(dot+1);
		}
		trans[m1]+=id+"\t"+m2.replace(/\r?\n/g,"")+"\n";
	}
});

for (var key in trans) {
	var fn="ds_"+key+".csv";
	fs.writeFileSync(fn,String.fromCharCode(0xFEFF)+trans[key],"utf8");
}