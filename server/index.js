import http from 'http'
import https from 'https'
import fs from 'fs'
import path from 'path'
import koa from 'koa'
import routes from './routes'
import mongoose from 'mongoose'
const NODE_PORT = parseInt(process.env.NODE_PORT),
	NODE_ENV = process.env.NODE_ENV,
	app = new koa(),
	options = {
		key: fs.readFileSync(path.resolve(__dirname, 'security/214144041820578.key'), 'utf8'),
		cert: fs.readFileSync(path.resolve(__dirname, 'security/214144041820578.pem'), 'utf8')
	}
mongoose.connect('mongodb://localhost:27017/codedoges')
mongoose.Promise = global.Promise

routes(app)

http.createServer(app.callback()).listen(NODE_PORT
	? NODE_PORT
	: 80)
https.createServer(options, app.callback()).listen(443)
