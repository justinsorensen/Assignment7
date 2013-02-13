var http    = require('http');
var fs      = require('fs');

var server = http.createServer(function (request, response) {

	//Serving the static files
    if (request.method === "GET"){
				//Files will be stored in "public" folder
        var url = './public' + (request.url == '/' ? '/index.html' : request.url);
				
				//Using included "file system" functionality
				//Other plugins also available to handle these kinds of requests
		
		//synchronous alternative: fs.readFileSync(filename,[encoding])
		//fs.readFile(filename,[encoding],[callback])		
        fs.readFile(url, function(error, content) {
            if(error) {
                console.log('error loading file ' + url + ': ', error);
                response.writeHead(404);
                response.end();
            }else {
                // Check mime type
                var temp     = url.lastIndexOf(".");
                var ext     = url.substring((temp));
                var mime    = mimes[ext] || 'text/plain';
				
                // Write the file
				//response.writeHead(statusCode,[reasonPhrase],[headers])
                response.writeHead(200, { 'Content-Type': mime });
				
				//response.end([data],[encoding])
                response.end(content, 'utf-8');
            }
        });
    }
});
 
// Listen to port 5000, log to console
server.listen(5000, function() {
  console.log('Listening to port ' + server.address().port);
  });
 
 //Mime type definitions
var mimes = {
    '.css' :  'text/css',
    '.js' :   'text/javascript',
    '.htm' :  'text/html',
    '.html' : 'text/html',
	'.png' : 'image/png',
	'.gif' : 'image/gif',
	'.jpg' : 'image/jpg',
	'.bmp' : 'image/bmp'
};