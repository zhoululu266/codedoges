import http from 'http'
import https from 'https'
import fs from 'fs'
import path from 'path'
import koa from 'koa'
import routes from './routes'
import mongoose from 'mongoose'
import session from 'koa-session'
const NODE_ENV = process.env.NODE_ENV,
	app = new koa(),
	options = {
		key: fs.readFileSync(path.resolve(__dirname, 'security/214144041820578.key'), 'utf8'),
		cert: fs.readFileSync(path.resolve(__dirname, 'security/214144041820578.pem'), 'utf8')
	}
mongoose.connect('mongodb://localhost:27017/codedoges')
mongoose.Promise = global.Promise

routes(app)
app.keys = ['some secret hurr'];

const CONFIG = {
	key: 'koa:sess',
	/** (string) cookie key (default is koa:sess) */
	/** (number || 'session') maxAge in ms (default is 1 days) */
	/** 'session' will result in a cookie that expires when session/browser is closed */
	/** Warning: If a session cookie is stolen, this cookie will never expire */
	maxAge: 86400000,
	overwrite: true,
	/** (boolean) can overwrite or not (default true) */
	httpOnly: true,
	/** (boolean) httpOnly or not (default true) */
	signed: true,
	/** (boolean) signed or not (default true) */
	rolling: false,
	/** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};

app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));

http.createServer(app.callback()).listen(8080)
https.createServer(options, app.callback()).listen(443)
