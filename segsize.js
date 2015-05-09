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
var average=totalsize/segsize.length;
console.log("total",totalsize,"segcount",segsize.length,"average",average);

//http://blog.sina.com.cn/s/blog_3ec2fda00100070c.html
var gini=function(segs,total) {
	var subtotal=0,W=0;
	segs.sort(function(a,b){return a[1]-b[1]});
	for (var i=0;i<segs.length;i++) {
		subtotal+=segs[i][1];
		W+= (subtotal/total);
		console.log(subtotal,subtotal/total,W)
	}
	return 1-(2*W+1)/segs.length;
}


console.log("gini coefficient",  gini(segsize,totalsize) );
