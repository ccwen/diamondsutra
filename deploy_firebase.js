//turn write to true in https://pradigm.firebaseio.com/?page=Security

var overwrite=false;
var remainingjob=0;

var Firebase=require("firebase");
var rootRef = new Firebase("https://cmphuiping.firebaseio.com");
var fs=require("fs");
var parseKepan=function(fn) {
	var kepan=JSON.parse(fs.readFileSync(fn,"utf8"));
	var fbdata={};
	kepan.forEach(function(entry,idx){
		var dot=entry.indexOf(".");
		var level=parseInt(entry.substr(0,dot));
		entry=entry.substr(dot+1);
		fbdata[idx]={d:level,t:entry};
	});

	return fbdata;
}


var parseXMLWithKW=function(dbid,fn) {
	var lines=fs.readFileSync(fn,"utf8").split(/\r?\n/);
	var json={},segcount=1,content="",lastname,lastsegid;

	var putentry=function() {
		json[lastsegid]={text:content};
		if (lastname) json[lastsegid].name=lastname;
		//build link from kepan entries to source text segid
		content.replace(/<kw a="(.+?)" n="(.+?)"/g,function(m,author,kepanid){
			kepanid=parseInt(kepanid);
			if (!kepan[author][kepanid]){
				console.log(kepan[author][kepanid-1])
				console.log(dbid,author,kepanid)
			}
			if (!kepan[author][kepanid].link) kepan[author][kepanid].link={};
			kepan[author][kepanid].link[dbid]=lastsegid;
		});
	}
	lines.forEach(function(line,idx){
		if (idx==0||idx==lines.length-1) return;
		if (line.substr(0,4)==="<seg") {
			var m=line.match(/<seg id="(.*?)" name="(.+?)"/);
			if (!m) m=line.match(/<seg id="(.*?)"/); //no name
			var tagend=line.indexOf(">");
			if (m) {
				if (lastsegid) {
					putentry();
					content="";
				}
				lastname=m[2],lastsegid=m[1];
			} else {
				content+=line.substr(tagend+1);
			}
		} else {
			content+=line;
		}
	});
	putentry();

	return json;
}

var deploy=function(path,key,json,overwrite) {
	var kepan=rootRef.child(path).child(key);
	remainingjob++;
	kepan.once("value",function(snapshot){
		if (!snapshot.val() || overwrite) {
			var obj={};
			obj[key]=json;
			rootRef.child(path).update(obj,function(err){
				remainingjob--;
				if (err) console.log('cannot save ',key,"on ",path);
				else console.log("saved",key,"on ",path)
			});
		} else {
			remainingjob--;
			console.log(key,"already on firebaseio.com/",path)
		}
	});
}


var kepan={};
kepan.jwn=parseKepan("kepan_jwn.json");
kepan.yinshun=parseKepan("kepan_yinshun.json");
kepan.huiping=parseKepan("kepan_huiping_jwn.json");

var ds=parseXMLWithKW("ds","ds.xml");
deploy("jingwen","ds",ds,overwrite);

var dsl=parseXMLWithKW("dsl","dsl_jwn.xml");
deploy("jingwen","dsl",dsl,overwrite);

deploy("kepan","ds_jwn",kepan.jwn,overwrite);
deploy("kepan","ds_yinshun",kepan.yinshun,overwrite);
deploy("kepan","dsl_huiping",kepan.huiping,overwrite);

setInterval(function(){
	if (!remainingjob)	process.exit();
},1000);