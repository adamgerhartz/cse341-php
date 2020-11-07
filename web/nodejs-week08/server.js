let http = require('http');
let url = require('url');
let querystring = require('querystring');

function parseNumber(data) {
	data.left = Number(data.left);
	data.right = Number(data.right);
	return data;
}

function isValid(data) {
	if (isNaN(data.left) || isNaN(data.right)) {
		return false;
	} 
	return true;
}

function onRequest(req, res) {
	let q = url.parse(req.url, true);

	console.log(`Received a request for ${q.pathname}`);	 
	let data = q.query;
	data = parseNumber(data);

	if (q.pathname === '/home') {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write('<h1>Welcome to the Home Page</h1>');
	} else if (q.pathname === '/getData') {
		res.writeHead(200, {"Content-Type": "application/json"});
		res.write(JSON.stringify({name:'Br. Burton', class:'cs313'}));
	} else if (q.pathname === '/add') {
		if (isValid(data)) {
			res.writeHead(200, {"Content-Type": "text/html"});
			res.write(`<h1>${data.left} + ${data.right} = ${data.left + data.right}</h1>`);
		} else {
			res.writeHead(404, {"Content-Type": "text/html"});
			res.write('<h1>404. Page Not Found.</h1>');
		}
	} else {
		res.writeHead(404, {"Content-Type": "text/html"});
		res.write('<h1>404. Page Not Found.</h1>');
	}
	res.end();

}

let server = http.createServer(onRequest);
const port = 8888;
server.listen(port);

console.log(`The server is now listening on port ${port}`);