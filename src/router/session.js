'use strict';

const Router = require('koa-router');

const router = new Router;

function fake(ctx) {
	ctx.body = [
		ctx.request.method,
		ctx.request.url,
		JSON.stringify(ctx.state),
	].join(' ');
}

router
	.post('/session', fake)
	.post('/session/:session_key', fake)
	.post('/session/:session_key/grant', fake)
	.del('/session/:session_key', fake);

exports.routes = router.routes.bind(router);
