/*
	report syntax error at exact line,
	outest must be an array, first line must be [ , last line must be ]
	from second line must start with ,

	[
		{xxx}
		,{xxxx}
	]

*/

var readjson=function(content) {
	var out=[];

	for (var i=0;i<content.length;i++) {
		try {
			line=content[i].trim();
			if (i==0) line=","+line;
			if (line[0]!==",") {
				console.log("missing ,"+" at line "+i+2);
				process.exit();
			}
			out.push(JSON.parse(line.substr(1)));
		} catch(e) {
			console.log("syntax error at line",i+2,line)
			console.log(e);
			process.exit();
		}
	}
	return out;
}


var main=function(fn) {
	var input=require("fs").readFileSync(fn,"utf8").trim().split(/\r?\n/);
	input.pop();
	input.shift();
	return readjson(input)	;
}
module.exports=main;