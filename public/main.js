var http    = require('http');
var assert  = require('assert');

var body = new Buffer('hi', 'utf8');

function requestHandler(req, res) {
  res.writeHead(200, {
    'Connection': 'close',
    'Content-Type': 'text/plain',
    'Content-Length': body.length
  });
  res.end(body);
}

var server = http.createServer(requestHandler);

server.listen(5000, function() {
  console.log('Listening to port ' + server.address().port);
});