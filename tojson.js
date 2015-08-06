var fs=require("fs");
var content=fs.readFileSync("dsl_jwn.xml","utf8").replace(/\r?\n/g,"\n");
var startid=18;
var endid=79;
var lastidx=0,lastid=null,lastname;

var kepan_huiping=require("./kepan_huiping_jwn.json");
var kepan_jwn=require("./kepan_jwn.json");
var kepan={jwn:kepan_jwn,huiping:kepan_huiping};
var output=[],totalsegcount=0,maxsegid=null,maxseglength=0;
var interlink=[];

var extractkw=function(id,content) { 
	
	var lastidx=0, totalm=0;
	return content.replace(/<kw a="(.+?)" n="(\d+)"\/>\n?/g,function(m,m1,m2,idx){
		var offset=idx-=totalm;
		totalm+=m.length;
		var kewen=kepan[m1][parseInt(m2)];
		//console.log(id,m1,m2,kewen)
		interlink.push({ author:m1, id:id,text:kewen ,start:offset} );
		return "";
	});


}
var processcontent=function(segid,content) {
	var lastidx=0,subsegcount=0;

	var process_seg=function(from,to) {
		var segcontent=content.substring(from,to).trim().replace(/<br\/>/g,"").replace(/<pb.*?>/g,"");
		var id=segid+"-"+ (++subsegcount);

		if (segcontent.length>maxseglength) {
			maxseglength=segcontent.length;
			maxsegid=id;
		}

		var segcontent=extractkw(id,segcontent).replace(/\n/g,"\\n");

		output.push('"'+id+'":"'+segcontent+'"');
		
	}

	if (content.indexOf("<seg/>")==-1) {
		process_seg(0,content.length);
	} else {
		content.replace(/<seg\/>/g,function(m,idx){
			process_seg(lastidx,idx);
			totalsegcount++;
			lastidx=idx+6;
		});		
		process_seg(lastidx,content.length);
	}

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
fs.writeFileSync("dsl_jwn.json","{\n"+output.join("\n,")+"\n}","utf8");
fs.writeFileSync("dsl_jwn_links.json",JSON.stringify(interlink,""," "),"utf8");
