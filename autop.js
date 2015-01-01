var fs=require("fs");
var arr=fs.readFileSync("lecture2.xml","utf8").replace(/\r\n/g,"\n").split("\n");
var para=0,nextp=false,out=[];
for (var i=0;i<arr.length;i++) {

	var line=arr[i];
	if (nextp && line.length>5 && line.substr(0,4)!="<pb ") {
		line="<p>"+line;
		nextp=false;
	}
	var last=line.substr(line.length-1);
	if (last=="。" ||last=="！" || last=="）" && line.length<75) {
		nextp=true;
		line+="</p>";
		para++;
	}
	out.push(line);
}
var output=out.join("");
output=output.replace(/<p>/g,"\n<p>");
fs.writeFileSync("lecture2p.xml",output,"utf8");
console.log("para count",para)
