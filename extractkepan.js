var fs=require("fs");
var fn=process.argv[2]||"lecture_ganzhi.xml";
var content=fs.readFileSync(fn,"utf8");
var ganzhi="甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥";
var pat=new RegExp('<(['+ganzhi+']) t="([^"^/].*?)" ?/>','g');
var kepancount=0;
var kepan=[];

var lastdepth=0;
content=content.replace(pat,function(m,m1,m2){
	kepancount++;
	var depth=ganzhi.indexOf(m1);
	if (depth==-1) {
		console.log("not a kepan",m2);
		throw "";
	}
	
	if (depth-lastdepth>1){
		console.log("kepan depth error",m2);
	}
	kepan.push((depth+1)+"."+m2);
	lastdepth=depth;
	return '<kw n="'+kepancount+'"/>'
})
fs.writeFileSync(fn+"_kepan.json",JSON.stringify(kepan,""," "),"utf8");
fs.writeFileSync(fn+"_extracted",content,"utf8");