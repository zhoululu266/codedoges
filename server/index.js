const path = require('path'),
	koa = require('koa'),
	app = new koa(),
	routes = require('./routes'),
	mongoose = require('mongoose'),
	server = require('koa-static'),
	http = require('http'),
	https = require('https'),
	fs = require('fs'),
	NODE_PORT = parseInt(process.env.NODE_PORT),
	options = {
		key: fs.readFileSync(path.resolve(__dirname, 'security/214144041820578.key'), 'utf8'),
		cert: fs.readFileSync(path.resolve(__dirname, 'security/214144041820578.pem'), 'utf8')
	}
mongoose.connect('mongodb://localhost:27017/codedoges')
mongoose.Promise = global.Promise

routes(app)

app.use(server(path.resolve(__dirname, 'data')))
if (!NODE_PORT) {
	app.use(server(path.resolve(__dirname, '../dist')))
}

http.createServer(app.callback()).listen(NODE_PORT
	? NODE_PORT
	: 80)
https.createServer(options, app.callback()).listen(443)
