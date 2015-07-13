var fs=require("fs");
var content=fs.readFileSync("diamond_multilingual.xml","utf8");

var trans={"tibetan":"","romanized":"","kumarajiva":"","yijing":"","xuanzang":"","gupta":""};
var transkey=Object.keys(trans);
var id="";
var normalize=function(t) {
	return t.replace(/\r?\n/g,"").replace(/\[[^\]]+?\]/g,"");
}
content.replace(/<(.+?)>([^<]+?)<\/(.+?)>/g,function(m,m1,m2){
	if (m1=="seg") {

	} else if (transkey.indexOf(m1)>-1) {
		if (m1==="romanized") {
			var dot=m2.indexOf(".");
			id=m2.substr(0,dot).replace("-",".");
			m2=m2.substr(dot+1);
		}
		trans[m1]+=id+"\t"+normalize(m2)+"\n";
	}
});

for (var key in trans) {
	var fn="ds_m_"+key+".tsv";
	fs.writeFileSync(fn,trans[key].trim(),"utf8");
}


//String.fromCharCode(0xFEFF)+

