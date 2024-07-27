var http = require('http'); var url = require("url"); var fs = require("fs"); 
var rad = require("./radicalModule.js"); 
var mail = require("./mail.js"); 

// Change references of script and style files to contain a "v" query paremeter so caches are updated
datetime = new Date(); datetime = "D"+datetime.toISOString().slice(0,19).replaceAll(":","").replaceAll("-","");
for (html of ["top.html","bottom.html"]) {
  content = fs.readFileSync("html/"+html,"utf8");
  content = content.replace(/\?v=.*\"/g,"?v="+datetime+"\"");
  fs.writeFileSync("html/"+html,content);
}

function daServer(request, response) {
  deets = url.parse(request.url, true);
 
  if (deets.pathname == "/") { //homepage
    if (request.method == "GET") { rad.servePage("index",200,{},response) }
    else if (request.method == "POST") {  
      rad.processPOST(request,(formData,error)=>{
        if (error) { response.writeHead(400,{}); response.end("Something went wrong, please try again or contact us directly") }
        mail.sendEmail("RSVP from "+formData.firstName+" "+formData.lastName,
          "Number of Adults: "+formData.adultCount+
          "<br>Number of Children: "+formData.childCount+
          "<br>Chance of Attending: "+formData.chance+
          "<br>Things to Know: "+formData.info+
          "<br>Questions: "+formData.questions,
          formData.firstName+" "+formData.lastName+"<br>"+formData.phone
        );
        response.writeHead(200,{});
        response.end("Thank you for letting us know about your attendance!\nWe will respond by text if you had any questions. See you there!");
      })
    }
  }
  else if (deets.pathname.includes("/style")) { rad.serveFile(deets.pathname.slice(1),200,{"Content-type":"text/css"},response) }
  else if (deets.pathname.includes("/script")) { rad.serveFile(deets.pathname.slice(1),200,{"Content-type":"text/javascript"},response) }
  else if (deets.pathname.includes("/image")) { 
    extension = deets.pathname.slice(deets.pathname.indexOf(".")+1);
    if (extension == "svg") { extension = "svg+xml" }
    rad.serveFile(deets.pathname.slice(1),200,{"Content-type":"image/"+extension},response) 
  }
  else if (deets.pathname == "/sitemap.xml") { rad.serveFile("sitemap.xml",200,{},response) }
  else { rad.servePage("missing",404,{},response) }
}

http.createServer(daServer).listen(80);

