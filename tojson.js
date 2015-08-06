var fs=require("fs");
var content=fs.readFileSync("dsl_jwn.xml","utf8");
var startid=18;
var endid=79;
var lastidx=0,lastid=null,lastname;

var output=[],totalsegcount=0,maxsegid=null,maxseglength=0;

var processcontent=function(segid,content) {
	var lastidx=0,subsegcount=0;
	content.replace(/<seg\/>/g,function(m,idx){
		totalsegcount++;
		var segcontent=content.substring(lastidx,idx).trim().replace(/\n/g,"\\n");
		id=segid;
		if (subsegcount) id+="-"+subsegcount;

		if (segcontent.length>maxseglength) {
			maxseglength=segcontent.length;
			maxsegid=id;
		}
		output.push('"'+id+'":"'+segcontent+'"');
		subsegcount++;
		lastidx=idx+6;
	});
}
content.replace(/<seg id="(\d+)" name="(.+)"\/>/g,function(m,m1,m2,idx){
	var id=parseInt(m1);
	if (id<startid) return;
	if (id>endid) return;

	var seg=content.substring(lastidx,idx);
	lastidx=idx+m.length;
	if (lastid) {
		processcontent(lastname,seg);
	}
	lastid=id;
	lastname=m2;
});
console.log("max",maxsegid,maxseglength);
console.log("average seg size",output.join("\n").length/totalsegcount);
fs.writeFileSync("dsl_jwn.json",output.join("\n"),"utf8");

