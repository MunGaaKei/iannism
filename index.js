const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const mime = require("mime");

http.createServer((req, res) => {
	const urlObj = url.parse(req.url);

	switch (handleUrl(req.url)) {
		case 1:
			const pathname = path.join(__dirname, urlObj.pathname);
			handleFile(pathname, res);
			break;
		default:
			handleFile("./index.html", res);
			break;
	}
}).listen(8080, () => {
	console.log("iannman listening ...");
});

function handleUrl(url) {
	const whitelist = ["/assets", "/components", "/articles"];
	const filtered = whitelist.find((path) => url.startsWith(path));

	if (filtered) {
		return 1;
	} else {
		return 0;
	}
}

function handleFile(filepath, res) {
	const ext = path.parse(filepath).ext;
	const mimeType = mime.getType(ext);

	fs.readFile(filepath, (err, data) => {
		if (err) {
			res.writeHead(404);
			res.end();
		} else {
			res.writeHead(200, { "Content-Type": mimeType });
			res.end(data);
		}
	});
}
