'use strict';

const Router = require('koa-router');

const router = new Router;

async function extract_account(key, ctx, next) {
	ctx.state.account = await fetch_account(key);
	return await next();
}
async function extract_identity_type(key, ctx, next) {
	ctx.state.identity_type = key;
	return await next();
}
async function extract_credential_type(key, ctx, next) {
	ctx.state.credential_type = key;
	return await next();
}

function fake(ctx) {
	ctx.body = [
		ctx.request.method,
		ctx.request.url,
		JSON.stringify(ctx.state),
	].join(' ');
}

function fetch_account(key) {
	return { key };
//	await AccountAccessor.load(key);
}

router
	.param('account_key', extract_account)
	.param('credential_type', extract_credential_type)
	.param('identity_type', extract_identity_type)
	.get('/account', fake)
	.post('/account', fake)
	.get('/account/:account_key', fake)
	.post('/account/:account_key/reactivate', fake)
	.post('/account/:account_key/deactivate', fake)
	.put('/account/:account_key/credential/:credential_type', fake)
	.get('/account/:account_key/identity/:identity_type', fake)
	.put('/account/:account_key/identity/:identity_type', fake);

exports.routes = router.routes.bind(router);
