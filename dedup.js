var fs=require("fs");
var dsl=fs.readFileSync("dsl_jwn.xml","utf8").split(/\r?\n/);
var names={};

dsl.map(function(line,idx){
	line.replace(/<seg(.*?)>/g,function(m,m1){
		if (m1) {
			var m=m1.match(/name="(.+?)"/);
			if (m) {
				var name=m[1];
				if (names[name]) {
					console.log("repeat name '"+name+"' at line",idx+1)
				}
				names[name]=true;
			} else {
				console.log("invalid format at line",idx+1)
			}
		}
	});
});