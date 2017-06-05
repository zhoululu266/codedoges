const path = require( 'path' ),
	koa = require( 'koa' ),
	app = new koa( ),
	router = require( 'koa-router' )({ prefix: '/api' }),
	routes = require( './routes' ),
	koaBody = require( 'koa-body' )( ),
	mongoose = require( 'mongoose' ),
	server = require( 'koa-static' ),
	NODE_PORT = parseInt( process.env.NODE_PORT )
mongoose.connect( 'mongodb://localhost:27017/codedoges' )
mongoose.Promise = global.Promise

routes( router, koaBody )

app.use(router.routes( )).use(router.allowedMethods( ))
if ( !NODE_PORT ) {
	app.use(server(path.resolve( __dirname, '../dist' )))
}

app.listen( NODE_PORT
	? NODE_PORT
	: 80 )
