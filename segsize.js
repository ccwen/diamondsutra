var fs=require("fs");
var fn=process.argv[2]||"dsl_jwn.xml";

var doSeg=function(id,text,sz){
	sz.push([id,text.length]);
}

var doFile=function(content) {
	var ex=0, pbid="_", sizes=[] ; 
	content.replace(/<seg id=".+?" name="(.*?)"\/>/g,function(m,m1,at){
		doSeg(pbid,content.substring(ex,at-1),sizes);
		ex=at, pbid=m1;
	});
	doSeg(pbid,content.substring(ex),sizes); //don't forget to process last segment
	return sizes;
}

var segsize=doFile(fs.readFileSync(fn,"utf8"));
segsize.sort(function(a,b){return b[1]-a[1]});
console.log(segsize);
var totalsize=segsize.reduce(function(prev,seg){return seg[1]+prev} ,0);
console.log("average",totalsize/segsize.length);