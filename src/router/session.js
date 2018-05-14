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

function createSession() {
	// missing credential args: 401
	//look up user
	//  - fail with 403
	// match credentials
	//  - fail with 403
	// create session token
	//  - succeed with 201
}

function renewSession() {
	// if token is invalidL 403
	//
}

router
	.post('/session', fake)
	.post('/session/:session_key', fake)
	.post('/session/:session_key/grant', fake)
	.del('/session/:session_key', fake);

exports.routes = router.routes.bind(router);
