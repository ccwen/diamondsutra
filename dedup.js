var fs=require("fs");
var dsl=fs.readFileSync(process.argv[2]||"dsl_jwn.xml","utf8").split(/\r?\n/);
var idarr={};

dsl.map(function(line,idx){
	line.replace(/<p (.*?)>/g,function(m,m1){
		if (m1) {
			var m=m1.match(/id="(.+?)"/);
			if (m) {
				var id=m[1];

				if (id.indexOf("-")>-1) {
					console.log("invalid id '"+id+"' at line",idx+1);
				}
				if (idarr[id]) {
					console.log("repeat id '"+id+"' at line",idx+1)
				}
				idarr[id]=true;
			} else {
				console.log("invalid format at line",idx+1)
			}
		}
	});
});